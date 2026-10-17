<?php
// POST: lease enquiry from the Contact Us / Home forms → customers table + email.
declare(strict_types=1);
require __DIR__ . '/_private/lib.php';
bootstrap(['POST']);

$input = body();
if (is_bot($input)) {
    json_out(['success' => true]); // silently ignore spam bots
}

$data = validate_input($input, [
    'name'        => ['required' => true, 'type' => 'name', 'min' => 2, 'max' => 60],
    'designation' => ['max' => 60],
    'email'       => ['required' => true, 'type' => 'email', 'max' => 100],
    'contact_no'  => ['required' => true, 'type' => 'phone', 'max' => 18],
    'whatsapp_no' => ['type' => 'phone', 'max' => 18],
    'country'     => ['max' => 60],
    'message'     => ['required' => true, 'min' => 10, 'max' => 500],
]);
$data['country'] = $data['country'] ?: 'India';

rate_limit('customers');

$stmt = db()->prepare(
    'INSERT INTO customers (name, designation, email, contact_no, whatsapp_no, contact_digits, whatsapp_digits, country, message, status, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([
    $data['name'], $data['designation'], $data['email'], $data['contact_no'], $data['whatsapp_no'],
    digits($data['contact_no']), digits($data['whatsapp_no']), $data['country'], $data['message'], 'Enquired', client_ip(),
]);
$id = (int)db()->lastInsertId();

$mailed = send_mail(
    config()['mail']['enquiry_to'],
    "New Lease Enquiry #$id – {$data['name']}",
    '<h2 style="font-family:Arial;color:#3b1d12">New Lease Enquiry – IndraKrishna Global Suite</h2>'
    . mail_table([
        'S.No' => $id,
        'Name' => $data['name'],
        'Designation' => $data['designation'],
        'Mail Id' => $data['email'],
        'Contact No' => $data['contact_no'],
        'WhatsApp No' => $data['whatsapp_no'],
        'Country' => $data['country'],
        'Message' => $data['message'],
        'Status' => 'Enquired',
        'Date' => date('d M Y, h:i A'),
    ]),
    $data['email']
);

json_out(['success' => true, 'id' => $id, 'mailed' => $mailed]);
