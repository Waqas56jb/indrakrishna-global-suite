<?php
// One-time setup: creates the tables and the first admin from config.php.
// Run once in the browser: https://your-domain/api/install.php?key=<install_key>
// then DELETE this file from the server.
declare(strict_types=1);
require __DIR__ . '/_private/lib.php';
bootstrap(['GET']);

$cfg = config();
$key = (string)($_GET['key'] ?? '');
if ($cfg['install_key'] === 'CHANGE_ME_RANDOM_STRING' || !hash_equals($cfg['install_key'], $key)) {
    fail('Invalid install key.', 403);
}

$pdo = db();
$sql = file_get_contents(__DIR__ . '/_private/schema.sql');
$sql = preg_replace('/^\s*--.*$/m', '', $sql);
foreach (array_filter(array_map('trim', explode(';', $sql))) as $statement) {
    $pdo->exec($statement);
}

$created = false;
if ((int)$pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn() === 0) {
    $a = $cfg['admin'];
    if ($a['password'] === 'CHANGE_ME_STRONG_PASSWORD' || strlen($a['password']) < 8) {
        fail('Set a strong admin password (8+ characters) in config.php first.');
    }
    $pdo->prepare('INSERT INTO admins (name, mobile, password_hash) VALUES (?, ?, ?)')
        ->execute([$a['name'], digits($a['mobile']), password_hash($a['password'], PASSWORD_DEFAULT)]);
    $created = true;
}

json_out([
    'success' => true,
    'message' => 'Database ready.' . ($created ? ' Admin account created.' : ' Admin already exists.') . ' Now delete install.php from the server.',
]);
