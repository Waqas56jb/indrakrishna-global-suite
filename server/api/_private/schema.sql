-- IndraKrishna Global Suite – MySQL / MariaDB schema (utf8mb4).
-- install.php runs this automatically; it can also be imported via phpMyAdmin.

CREATE TABLE IF NOT EXISTS customers (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,   -- S.No (auto generated)
  name             VARCHAR(60)  NOT NULL,
  designation      VARCHAR(60)  NOT NULL DEFAULT '',
  home_address1    VARCHAR(150) NOT NULL DEFAULT '',
  home_address2    VARCHAR(150) NOT NULL DEFAULT '',
  city             VARCHAR(60)  NOT NULL DEFAULT '',
  state            VARCHAR(60)  NOT NULL DEFAULT '',
  country          VARCHAR(60)  NOT NULL DEFAULT 'India',
  email            VARCHAR(100) NOT NULL,
  contact_no       VARCHAR(20)  NOT NULL,
  whatsapp_no      VARCHAR(20)  NOT NULL DEFAULT '',
  contact_digits   VARCHAR(15)  NOT NULL DEFAULT '',        -- digits only, for mobile search
  whatsapp_digits  VARCHAR(15)  NOT NULL DEFAULT '',
  rent_amount      DECIMAL(12,2) NULL,                       -- Rent Enq. Amount
  message          TEXT NULL,
  office_address1  VARCHAR(150) NOT NULL DEFAULT '',
  office_no        VARCHAR(30)  NOT NULL DEFAULT '',
  status           VARCHAR(30)  NOT NULL DEFAULT 'Enquired', -- Enquired / Willing to take / Taken on Lease / Not interested
  ip               VARCHAR(45)  NOT NULL DEFAULT '',
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME     NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_name (name),
  KEY idx_country (country),
  KEY idx_status (status),
  KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS referrals (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,   -- S.No (auto generated)
  name             VARCHAR(60)  NOT NULL,
  address1         VARCHAR(150) NOT NULL DEFAULT '',
  address2         VARCHAR(150) NOT NULL DEFAULT '',
  city             VARCHAR(60)  NOT NULL DEFAULT '',
  state            VARCHAR(60)  NOT NULL DEFAULT '',
  country          VARCHAR(60)  NOT NULL DEFAULT 'India',
  email            VARCHAR(100) NOT NULL,
  contact_no       VARCHAR(20)  NOT NULL,
  whatsapp_no      VARCHAR(20)  NOT NULL DEFAULT '',
  contact_digits   VARCHAR(15)  NOT NULL DEFAULT '',
  whatsapp_digits  VARCHAR(15)  NOT NULL DEFAULT '',
  message          TEXT NULL,
  amount           DECIMAL(12,2) NULL,
  status           VARCHAR(30)  NOT NULL DEFAULT 'Referred',
  receipt_no       VARCHAR(40)  NOT NULL DEFAULT '',
  payment_mode     VARCHAR(30)  NOT NULL DEFAULT '',
  payment_date     DATE NULL,
  ip               VARCHAR(45)  NOT NULL DEFAULT '',
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME     NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_name (name),
  KEY idx_country (country),
  KEY idx_status (status),
  KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admins (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name           VARCHAR(60)  NOT NULL DEFAULT '',
  mobile         VARCHAR(15)  NOT NULL,                     -- digits only
  password_hash  VARCHAR(255) NOT NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_mobile (mobile)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash  CHAR(64)     NOT NULL,
  admin_id    INT UNSIGNED NOT NULL,
  expires_at  DATETIME     NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (token_hash),
  KEY idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS login_attempts (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  ip          VARCHAR(45)  NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_ip_time (ip, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
