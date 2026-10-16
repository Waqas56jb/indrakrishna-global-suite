<?php
// POST: Refer & Earn form → referrals table + email.
declare(strict_types=1);
require __DIR__ . '/_private/lib.php';
bootstrap(['POST']);

$input = body();
if (is_bot($input)) {
    json_out(['success' => true]);
}

$data = validate_input($input, [
    'name'        => ['required' => true, 'type' => 'name', 'min' => 2, 'max' => 60],
    'email'       => ['required' => true, 'type' => 'email', 'max' => 100],
    'contact_no'  => ['required' => true, 'type' => 'phone', 'max' => 18],
    'whatsapp_no' => ['type' => 'phone', 'max' => 18],
    'country'     => ['max' => 60],
    'message'     => ['required' => true, 'min' => 10, 'max' => 500],
]);
$data['country'] = $data['country'] ?: 'India';

rate_limit('referrals');

$stmt = db()->prepare(
    'INSERT INTO referrals (name, email, contact_no, whatsapp_no, contact_digits, whatsapp_digits, country, message, status, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
$stmt->execute([
    $data['name'], $data['email'], $data['contact_no'], $data['whatsapp_no'],
    digits($data['contact_no']), digits($data['whatsapp_no']), $data['country'], $data['message'], 'Referred', client_ip(),
]);
$id = (int)db()->lastInsertId();

$mailed = send_mail(
    config()['mail']['referral_to'],
    "New Referral #$id – {$data['name']}",
    '<h2 style="font-family:Arial;color:#3b1d12">New Referral – IndraKrishna Global Suite</h2>'
    . mail_table([
        'S.No' => $id,
        'Name' => $data['name'],
        'Mail Id' => $data['email'],
        'Contact No' => $data['contact_no'],
        'WhatsApp No' => $data['whatsapp_no'],
        'Country' => $data['country'],
        'Message' => $data['message'],
        'Date' => date('d M Y, h:i A'),
    ]),
    $data['email']
);

json_out(['success' => true, 'id' => $id, 'mailed' => $mailed]);
