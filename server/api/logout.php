<?php
// POST: ends the current admin session.
declare(strict_types=1);
require __DIR__ . '/_private/lib.php';
bootstrap(['POST']);

$token = bearer_token();
if ($token !== '') {
    db()->prepare('DELETE FROM admin_sessions WHERE token_hash = ?')->execute([hash('sha256', $token)]);
}
json_out(['success' => true]);
