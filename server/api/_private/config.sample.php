<?php
// Copy this file to config.php (same folder) and fill in the MilesWeb details.
// config.php is never committed and is blocked from web access by .htaccess.

return [
    // MySQL / MariaDB (cPanel → MySQL Databases)
    'db' => [
        'host' => 'localhost',
        'name' => 'cpaneluser_ikgs',
        'user' => 'cpaneluser_ikgs',
        'pass' => 'CHANGE_ME',
    ],

    // Where form submissions are emailed
    'mail' => [
        'from_email'     => 'no-reply@indrakrishnadominance.com', // must be a mailbox on this domain
        'from_name'      => 'IndraKrishna Global Suite',
        'enquiry_to'     => 'enquiry@indrakrishnadominance.com',
        'referral_to'    => 'referral@indrakrishnadominance.com',
        // Leave smtp.host empty to use PHP mail(). For cPanel SMTP use e.g.
        // host 'mail.indrakrishnadominance.com', port 465, secure 'ssl'.
        'smtp' => [
            'host'   => '',
            'port'   => 465,
            'secure' => 'ssl', // 'ssl', 'tls' (STARTTLS) or ''
            'user'   => '',
            'pass'   => '',
        ],
    ],

    // First admin account – created by install.php
    'admin' => [
        'name'     => 'Admin',
        'mobile'   => '9003280221',
        'password' => 'CHANGE_ME_STRONG_PASSWORD',
    ],

    // Secret needed to run install.php once: /api/install.php?key=...
    'install_key' => 'CHANGE_ME_RANDOM_STRING',

    // Login session length (hours)
    'session_hours' => 12,

    // Only needed if the frontend is served from a different domain
    'cors_origin' => '',
];
