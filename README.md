# IndraKrishna Global Suite

Real estate website for **IndraKrishna Global Suite – Apartment For Lease, Ready to Occupy by Nov 2028**
(West Mambalam, Chennai).

- **Frontend:** React (Vite) in `client/`, responsive on mobile, tablet and desktop.
- **Backend:** PHP 8 + MySQL/MariaDB API in `server/api/`, for MilesWeb shared hosting.

## Pages

Home · Project · Refer & Earn · Loan Assistance · Contact Us · Login (Customers List, Referral List) · Terms & Conditions

## Features

- Enquiry and referral forms with validation. Submissions are saved in MySQL and emailed. Each form also
  has a one-tap WhatsApp message.
- Admin lists:
  - search by name, mobile or country
  - status and date filters, 10/20 rows per page
  - edit records and export to CSV
- Spam protection on forms (honeypot field and per-IP rate limit) and login throttling.
- SEO: per-page titles and descriptions, canonical URLs, Open Graph tags, `ApartmentComplex` structured data,
  and `sitemap.xml`/`robots.txt` generated at build time.

## Structure

```
client/          React app (npm run dev / npm run build → client/dist)
  src/config.js  Phone numbers, emails, map, videos, WhatsApp greeting
  src/data.js    Page content: features, FAQ, specifications, flats, documents
server/api/      PHP endpoints (copied into dist/api at build time)
  _private/      lib.php, schema.sql, config.sample.php (blocked from the web)
DEPLOY.md        Step-by-step MilesWeb deployment
```

See [DEPLOY.md](DEPLOY.md) to go live.
