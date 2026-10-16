<?php
// Shared helpers for the IndraKrishna Global Suite API.
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');
date_default_timezone_set('Asia/Kolkata');

const CUSTOMER_STATUSES = ['Enquired', 'Willing to take', 'Taken on Lease', 'Not interested'];
const REFERRAL_STATUSES = ['Referred', 'In Progress', 'Eligible', 'Paid', 'Cancelled'];
const PAYMENT_MODES = ['Bank Transfer', 'Cheque', 'UPI', 'Cash'];

function config(): array
{
    static $cfg;
    if ($cfg === null) {
        $file = __DIR__ . '/config.php';
        if (!is_file($file)) {
            json_out(['success' => false, 'message' => 'Server is not configured yet.'], 500);
        }
        $cfg = require $file;
    }
    return $cfg;
}

function json_out(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fail(string $message, int $status = 400, array $errors = []): void
{
    json_out(['success' => false, 'message' => $message] + ($errors ? ['errors' => $errors] : []), $status);
}

// Run once at the top of every endpoint.
function bootstrap(array $methods): void
{
    set_exception_handler(function (Throwable $e) {
        error_log('[ikgs-api] ' . $e->getMessage() . ' @ ' . $e->getFile() . ':' . $e->getLine());
        fail('Something went wrong. Please try again later.', 500);
    });

    $origin = config()['cors_origin'] ?? '';
    if ($origin !== '') {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: ' . implode(', ', array_merge($methods, ['OPTIONS'])));
    }
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
    if (!in_array($method, $methods, true)) {
        fail('Method not allowed.', 405);
    }
}

function db(): PDO
{
    static $pdo;
    if ($pdo === null) {
        $c = config()['db'];
        $pdo = new PDO(
            "mysql:host={$c['host']};dbname={$c['name']};charset=utf8mb4",
            $c['user'],
            $c['pass'],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        $pdo->exec("SET time_zone = '+05:30'");
    }
    return $pdo;
}

function body(): array
{
    $raw = file_get_contents('php://input') ?: '';
    if (strlen($raw) > 20000) {
        fail('Request too large.', 413);
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function client_ip(): string
{
    return substr((string)($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
}

function digits(string $s): string
{
    return substr(preg_replace('/\D+/', '', $s) ?? '', 0, 15);
}

// ---------- validation ----------

/**
 * Cleans and validates input against rules.
 * Rule keys: required, max, min, type (name|email|phone|text|amount|date|enum), options.
 */
function validate_input(array $input, array $rules): array
{
    $clean = [];
    $errors = [];
    foreach ($rules as $field => $r) {
        $v = $input[$field] ?? '';
        $v = is_scalar($v) ? trim((string)$v) : '';
        $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
        $type = $r['type'] ?? 'text';

        if ($v === '') {
            if (!empty($r['required'])) {
                $errors[$field] = 'This field is required';
            }
            $clean[$field] = in_array($type, ['amount', 'date'], true) ? null : '';
            continue;
        }
        $max = $r['max'] ?? 150;
        if (mb_strlen($v) > $max) {
            $errors[$field] = "Maximum $max characters";
        } elseif (isset($r['min']) && mb_strlen($v) < $r['min']) {
            $errors[$field] = "Enter at least {$r['min']} characters";
        } elseif ($type === 'name' && !preg_match("/^\p{L}[\p{L} .'-]*$/u", $v)) {
            $errors[$field] = 'Use letters only';
        } elseif ($type === 'email' && !filter_var($v, FILTER_VALIDATE_EMAIL)) {
            $errors[$field] = 'Enter a valid email address';
        } elseif ($type === 'phone' && (!preg_match('/^\+?[\d\s()-]+$/', $v) || strlen(digits($v)) < 10 || strlen(digits($v)) > 13)) {
            $errors[$field] = 'Enter a valid 10–13 digit number';
        } elseif ($type === 'amount' && (!is_numeric($v) || (float)$v < 0)) {
            $errors[$field] = 'Enter a valid amount';
        } elseif ($type === 'date' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $v)) {
            $errors[$field] = 'Enter a valid date';
        } elseif ($type === 'enum' && !in_array($v, $r['options'], true)) {
            $errors[$field] = 'Invalid option';
        }
        $clean[$field] = $v;
    }
    if ($errors) {
        fail('Please correct the highlighted fields.', 422, $errors);
    }
    return $clean;
}

// Simple per-IP flood protection for public forms.
function rate_limit(string $table, int $max = 5, int $minutes = 10): void
{
    $stmt = db()->prepare("SELECT COUNT(*) FROM `$table` WHERE ip = ? AND created_at > (NOW() - INTERVAL ? MINUTE)");
    $stmt->execute([client_ip(), $minutes]);
    if ((int)$stmt->fetchColumn() >= $max) {
        fail('Too many submissions. Please try again in a few minutes.', 429);
    }
}

// Hidden "website" field – real visitors leave it empty, bots fill it.
function is_bot(array $input): bool
{
    return trim((string)($input['website'] ?? '')) !== '';
}

// ---------- auth ----------

function bearer_token(): string
{
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if ($h === '' && function_exists('getallheaders')) {
        foreach (getallheaders() as $k => $v) {
            if (strcasecmp($k, 'Authorization') === 0) {
                $h = $v;
            }
        }
    }
    return preg_match('/^Bearer\s+([a-f0-9]{64})$/i', trim($h), $m) ? strtolower($m[1]) : '';
}

function require_admin(): int
{
    $token = bearer_token();
    if ($token === '') {
        fail('Please login again.', 401);
    }
    $stmt = db()->prepare('SELECT admin_id FROM admin_sessions WHERE token_hash = ? AND expires_at > NOW()');
    $stmt->execute([hash('sha256', $token)]);
    $id = $stmt->fetchColumn();
    if (!$id) {
        fail('Session expired. Please login again.', 401);
    }
    return (int)$id;
}

// ---------- list / update shared by customers.php & referrals.php ----------

function list_records(string $table, array $columns): void
{
    $page = max(1, (int)($_GET['page'] ?? 1));
    $perPage = min(10000, max(1, (int)($_GET['per_page'] ?? 10)));
    $search = trim((string)($_GET['search'] ?? ''));
    $field = (string)($_GET['field'] ?? 'all');
    $status = trim((string)($_GET['status'] ?? ''));
    $date = (string)($_GET['date'] ?? '');

    if (mb_strlen($search) > 50) {
        fail('Search text is too long.');
    }

    $where = [];
    $args = [];
    if ($search !== '') {
        $like = '%' . str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $search) . '%';
        $d = digits($search);
        $mobile = strlen($d) >= 3 ? '(contact_digits LIKE ? OR whatsapp_digits LIKE ?)' : null;
        $mobileArgs = ["%$d%", "%$d%"];
        switch ($field) {
            case 'name':
                $where[] = 'name LIKE ?';
                $args[] = $like;
                break;
            case 'country':
                $where[] = 'country LIKE ?';
                $args[] = $like;
                break;
            case 'mobile':
                if (!$mobile) {
                    fail('Enter at least 3 digits of the mobile number.');
                }
                $where[] = $mobile;
                array_push($args, ...$mobileArgs);
                break;
            default:
                $parts = ['name LIKE ?', 'country LIKE ?'];
                array_push($args, $like, $like);
                if ($mobile) {
                    $parts[] = $mobile;
                    array_push($args, ...$mobileArgs);
                }
                $where[] = '(' . implode(' OR ', $parts) . ')';
        }
    }
    if ($status !== '') {
        $where[] = 'status = ?';
        $args[] = $status;
    }
    if ($date !== '') {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            fail('Invalid date.');
        }
        $where[] = 'created_at >= ? AND created_at < (? + INTERVAL 1 DAY)';
        array_push($args, $date, $date);
    }
    $sqlWhere = $where ? 'WHERE ' . implode(' AND ', $where) : '';

    $count = db()->prepare("SELECT COUNT(*) FROM `$table` $sqlWhere");
    $count->execute($args);
    $total = (int)$count->fetchColumn();

    $cols = implode(', ', array_map(fn($c) => "`$c`", array_merge(['id', 'created_at'], $columns)));
    $offset = ($page - 1) * $perPage;
    $stmt = db()->prepare("SELECT $cols FROM `$table` $sqlWhere ORDER BY id DESC LIMIT $perPage OFFSET $offset");
    $stmt->execute($args);
    $rows = $stmt->fetchAll();
    foreach ($rows as &$r) {
        $r['id'] = (int)$r['id'];
        // ISO 8601 with IST offset so browsers show the correct local date.
        $r['created_at'] = date('c', strtotime($r['created_at']));
    }

    json_out(['success' => true, 'data' => $rows, 'total' => $total, 'page' => $page, 'per_page' => $perPage]);
}

function update_record(string $table, array $rules): void
{
    $id = (int)($_GET['id'] ?? 0);
    if ($id < 1) {
        fail('Missing record id.');
    }
    $input = body();
    $clean = validate_input(array_intersect_key($input, $rules), array_intersect_key($rules, $input));
    if (!$clean) {
        fail('Nothing to update.');
    }
    if (array_key_exists('contact_no', $clean)) {
        $clean['contact_digits'] = digits($clean['contact_no']);
    }
    if (array_key_exists('whatsapp_no', $clean)) {
        $clean['whatsapp_digits'] = digits($clean['whatsapp_no']);
    }
    $set = implode(', ', array_map(fn($k) => "`$k` = ?", array_keys($clean)));
    $stmt = db()->prepare("UPDATE `$table` SET $set WHERE id = ?");
    $stmt->execute([...array_values($clean), $id]);
    json_out(['success' => true]);
}

// ---------- email ----------

function mail_table(array $rows): string
{
    $html = '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">';
    foreach ($rows as $label => $value) {
        if ($value === null || $value === '') {
            continue;
        }
        $html .= '<tr><td style="border:1px solid #e7dccb;background:#faf5ec;font-weight:bold">' . htmlspecialchars($label)
            . '</td><td style="border:1px solid #e7dccb">' . nl2br(htmlspecialchars((string)$value)) . '</td></tr>';
    }
    return $html . '</table>';
}

function send_mail(string $to, string $subject, string $html, string $replyTo = ''): bool
{
    $m = config()['mail'];
    $subjectEnc = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $fromName = '=?UTF-8?B?' . base64_encode($m['from_name']) . '?=';
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        "From: $fromName <{$m['from_email']}>",
        'Date: ' . date('r'),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . (explode('@', $m['from_email'])[1] ?? 'localhost') . '>',
    ];
    if ($replyTo !== '' && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = "Reply-To: $replyTo";
    }
    $body = chunk_split(base64_encode('<!doctype html><html><body>' . $html . '</body></html>'));

    try {
        if (!empty($m['smtp']['host'])) {
            return smtp_send($m['smtp'], $m['from_email'], $to, $subjectEnc, $headers, $body);
        }
        return mail($to, $subjectEnc, $body, implode("\r\n", $headers), '-f' . $m['from_email']);
    } catch (Throwable $e) {
        error_log('[ikgs-mail] ' . $e->getMessage());
        return false;
    }
}

// Minimal SMTP client (AUTH LOGIN, SSL or STARTTLS) – no Composer needed on shared hosting.
function smtp_send(array $s, string $from, string $to, string $subject, array $headers, string $body): bool
{
    $host = ($s['secure'] === 'ssl' ? 'ssl://' : '') . $s['host'];
    $fp = @stream_socket_client("$host:{$s['port']}", $errno, $errstr, 15);
    if (!$fp) {
        throw new RuntimeException("SMTP connect failed: $errstr");
    }
    stream_set_timeout($fp, 15);
    $read = function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 515)) !== false) {
            $out .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $out;
    };
    $cmd = function (string $c, array $ok) use ($fp, $read): string {
        if ($c !== '') {
            fwrite($fp, $c . "\r\n");
        }
        $res = $read();
        if (!in_array((int)substr($res, 0, 3), $ok, true)) {
            throw new RuntimeException('SMTP error: ' . trim($res));
        }
        return $res;
    };
    $ehlo = 'EHLO ' . (gethostname() ?: 'localhost');
    $cmd('', [220]);
    $cmd($ehlo, [250]);
    if ($s['secure'] === 'tls') {
        $cmd('STARTTLS', [220]);
        stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $cmd($ehlo, [250]);
    }
    if (!empty($s['user'])) {
        $cmd('AUTH LOGIN', [334]);
        $cmd(base64_encode($s['user']), [334]);
        $cmd(base64_encode($s['pass']), [235]);
    }
    $cmd("MAIL FROM:<$from>", [250]);
    $cmd("RCPT TO:<$to>", [250, 251]);
    $cmd('DATA', [354]);
    $msg = implode("\r\n", array_merge(["To: <$to>", "Subject: $subject"], $headers)) . "\r\n\r\n" . $body;
    $msg = preg_replace('/^\./m', '..', $msg);
    $cmd($msg . "\r\n.", [250]);
    $cmd('QUIT', [221]);
    fclose($fp);
    return true;
}
