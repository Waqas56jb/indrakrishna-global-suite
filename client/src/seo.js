// Per-page SEO: title, description, canonical URL and social tags.
const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')
const BRAND = 'IndraKrishna Global Suite'

export const PAGES = {
  '/': {
    title: `${BRAND} – Apartment For Lease, Ready to Occupy by Nov 2028 | West Mambalam, Chennai`,
    description:
      'Premium 2-BHK suite apartments for lease in West Mambalam, Chennai – 6 semi-furnished flats (610 & 1200 sq.ft) for corporate staff quarters & guest houses. Lease 8 + 2 = 10 years. Ready to occupy by Nov 2028.',
  },
  '/project': {
    title: `Project – 2-BHK Flats, Specifications & FAQ | ${BRAND}`,
    description:
      'Stilt + 2 floors, 6 semi-furnished 2-BHK flats of 610 & 1200 sq.ft with lift, covered car park, solar/inverter support and 24x7 CCTV.',
  },
  '/refer-and-earn': {
    title: `Refer & Earn up to ₹25,000 | ${BRAND}`,
    description:
      'Refer your family, friends or colleagues to lease a flat at IndraKrishna Global Suite, West Mambalam for 8 + 2 = 10 years and earn up to Rs. 25,000.',
  },
  '/loan-assistance': {
    title: `Loan Assistance & NRI Tenants | ${BRAND}`,
    description:
      'Documents required for salaried and business customers, and NRI tenant requirements for leasing flats at IndraKrishna Global Suite, West Mambalam, Chennai.',
  },
  '/contact': {
    title: `Contact Us – Lease Enquiries +91 90032 80221 | ${BRAND}`,
    description:
      '62, IndraKrishna Global Suite, Naickamar Street, West Mambalam, Chennai – 600033 (opp. R3 Police Booth). Enquire for lease: +91 90032 80221.',
  },
  '/terms': {
    title: `Terms & Conditions | ${BRAND}`,
    description: 'Referral bonus scheme policy, payment & cancellation terms for IndraKrishna Global Suite.',
  },
  '/login': { title: `Login | ${BRAND}`, description: 'Admin login.', noindex: true },
  '/admin/customers': { title: `Customers List | ${BRAND}`, description: '', noindex: true },
  '/admin/referrals': { title: `Referral List | ${BRAND}`, description: '', noindex: true },
}

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function applySeo(pathname) {
  const page = PAGES[pathname] || { title: `Page Not Found | ${BRAND}`, description: '', noindex: true }
  const url = SITE_URL + (pathname === '/' ? '/' : pathname)
  document.title = page.title
  if (page.description) {
    setMeta('name', 'description', page.description)
    setMeta('property', 'og:description', page.description)
    setMeta('name', 'twitter:description', page.description)
  }
  setMeta('property', 'og:title', page.title)
  setMeta('name', 'twitter:title', page.title)
  setMeta('property', 'og:url', url)
  setMeta('name', 'robots', page.noindex ? 'noindex, nofollow' : 'index, follow')

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url
}
