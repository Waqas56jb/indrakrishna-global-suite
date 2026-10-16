<?php
// POST { mobile, password } → { token }  (admin login for Customers / Referral lists)
declare(strict_types=1);
require __DIR__ . '/_private/lib.php';
bootstrap(['POST']);

$input = body();
$mobile = digits((string)($input['mobile'] ?? ''));
$password = (string)($input['password'] ?? '');
if (strlen($mobile) < 10 || $password === '') {
    fail('Enter a valid mobile number and password.');
}

// Max 5 failed attempts per IP in 15 minutes.
$pdo = db();
$pdo->exec('DELETE FROM login_attempts WHERE created_at < (NOW() - INTERVAL 1 DAY)');
$stmt = $pdo->prepare('SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND created_at > (NOW() - INTERVAL 15 MINUTE)');
$stmt->execute([client_ip()]);
if ((int)$stmt->fetchColumn() >= 5) {
    fail('Too many attempts. Please try again after 15 minutes.', 429);
}

// Accept with or without country code: match on the last 10 digits.
$stmt = $pdo->prepare('SELECT id, password_hash FROM admins WHERE RIGHT(mobile, 10) = ? LIMIT 1');
$stmt->execute([substr($mobile, -10)]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password_hash'])) {
    $pdo->prepare('INSERT INTO login_attempts (ip) VALUES (?)')->execute([client_ip()]);
    fail('Invalid mobile number or password.', 401);
}

$token = bin2hex(random_bytes(32));
$hours = (int)(config()['session_hours'] ?? 12);
$pdo->exec('DELETE FROM admin_sessions WHERE expires_at < NOW()');
$pdo->prepare('INSERT INTO admin_sessions (token_hash, admin_id, expires_at) VALUES (?, ?, NOW() + INTERVAL ? HOUR)')
    ->execute([hash('sha256', $token), $admin['id'], $hours]);

json_out(['success' => true, 'token' => $token]);
