<?php
// Admin: GET → Customers list (search / filter / paginate), POST ?id=N → update a customer.
declare(strict_types=1);
require __DIR__ . '/_private/lib.php';
bootstrap(['GET', 'POST']);
require_admin();

$rules = [
    'name'            => ['required' => true, 'type' => 'name', 'min' => 2, 'max' => 60],
    'designation'     => ['max' => 60],
    'home_address1'   => ['max' => 150],
    'home_address2'   => ['max' => 150],
    'city'            => ['max' => 60],
    'state'           => ['max' => 60],
    'country'         => ['max' => 60],
    'email'           => ['required' => true, 'type' => 'email', 'max' => 100],
    'contact_no'      => ['required' => true, 'type' => 'phone', 'max' => 18],
    'whatsapp_no'     => ['type' => 'phone', 'max' => 18],
    'rent_amount'     => ['type' => 'amount', 'max' => 15],
    'message'         => ['max' => 2000],
    'office_address1' => ['max' => 150],
    'office_no'       => ['max' => 30],
    'status'          => ['required' => true, 'type' => 'enum', 'options' => CUSTOMER_STATUSES],
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    update_record('customers', $rules);
}
list_records('customers', array_keys($rules));
