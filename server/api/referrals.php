<?php
// Admin: GET → Referral list (search / filter / paginate), POST ?id=N → update a referral.
declare(strict_types=1);
require __DIR__ . '/_private/lib.php';
bootstrap(['GET', 'POST']);
require_admin();

$rules = [
    'name'         => ['required' => true, 'type' => 'name', 'min' => 2, 'max' => 60],
    'address1'     => ['max' => 150],
    'address2'     => ['max' => 150],
    'city'         => ['max' => 60],
    'state'        => ['max' => 60],
    'country'      => ['max' => 60],
    'email'        => ['required' => true, 'type' => 'email', 'max' => 100],
    'contact_no'   => ['required' => true, 'type' => 'phone', 'max' => 18],
    'whatsapp_no'  => ['type' => 'phone', 'max' => 18],
    'message'      => ['max' => 2000],
    'amount'       => ['type' => 'amount', 'max' => 15],
    'status'       => ['required' => true, 'type' => 'enum', 'options' => REFERRAL_STATUSES],
    'receipt_no'   => ['max' => 40],
    'payment_mode' => ['type' => 'enum', 'options' => PAYMENT_MODES],
    'payment_date' => ['type' => 'date'],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    update_record('referrals', $rules);
}
list_records('referrals', array_keys($rules));
