# Deploying to MilesWeb (cPanel)

The site is a React frontend plus a PHP/MySQL API. `npm run build` puts both into one folder,
`client/dist/`, and that folder is uploaded to `public_html`.

## 1. Build

```bash
cd client
npm install
npm run build
```

Before building, check that `VITE_SITE_URL` in `client/.env.production` is the live domain. It is used in
`sitemap.xml`, `robots.txt`, canonical links and social-share previews.

`client/dist/` now contains the website, `api/`, `sitemap.xml`, `robots.txt` and `.htaccess`.

## 2. Database (cPanel → MySQL Databases)

1. Create a database, for example `cpaneluser_ikgs`.
2. Create a database user with a strong password.
3. Add the user to the database with **All Privileges**.

## 3. Email account (cPanel → Email Accounts)

Create `no-reply@<domain>` to use as the sender. Enquiry emails go to `enquiry@indrakrishnadominance.com`
and referral emails go to `referral@indrakrishnadominance.com`.

## 4. Upload

Upload **everything inside** `client/dist/` to `public_html/`, including the hidden `.htaccess` files.
In File Manager, turn on "Show Hidden Files".

## 5. Configure the API

In `public_html/api/_private/`, copy `config.sample.php` to `config.php` and fill in:

- `db`: the database name, user and password from step 2.
- `mail`: `from_email`. To send through SMTP instead of PHP `mail()`, also fill in
  `smtp.host` (`mail.<domain>`), port `465`, secure `ssl`, and the mailbox user/password.
- `admin`: the login mobile number and a strong password (8+ characters).
- `install_key`: any long random text.

Never upload a `config.php` from your computer: it would overwrite the server's real one.
The build deliberately leaves `config.php` out.

## 6. Install (one time)

Open `https://<domain>/api/install.php?key=<install_key>` in a browser. It creates the tables and the
admin account, and should reply `"success": true`.

**Then delete `public_html/api/install.php`.**

## 7. Check

- Submit the Contact Us form. The email should arrive at enquiry@…, and the row should appear under
  Login → Customers List.
- Submit the Refer & Earn form. The email should arrive at referral@…, and the row should appear under Referral List.
- Log in at `/login` with the admin mobile number and password.
- `https://<domain>/api/_private/config.php` must show **403 Forbidden**.
- Enable SSL (cPanel → SSL/TLS Status → AutoSSL) so the site runs on https.
- Submit `https://<domain>/sitemap.xml` in Google Search Console.

## Updating later

Run `npm run build` again and re-upload `client/dist/`, **except** `api/_private/config.php` on the server,
which is not in the build and must be left in place.

## Local development

- `cd client && npm run dev` runs the site with demo data saved in the browser. Demo login: 9003280221 / admin123.
- To run against a real PHP backend locally, set `VITE_USE_MOCK=false` and
  `VITE_API_PROXY=http://localhost:8080` in `client/.env.development.local`.
