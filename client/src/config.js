// Site-wide details supplied by the client.
export const SITE = {
  name: 'IndraKrishna Global Suite',
  tagline: 'Apartment For Lease – Under Construction, Ready to Occupy by Nov 2028',
  company: 'IndraKrishna Techie Trading (P) Ltd',
  companySite: 'https://www.indrakrishna.com',
  location: 'West Mambalam, Chennai',
  siteAddress: '62, IndraKrishna Global Suite, Naickamar Street, West Mambalam, Chennai – 600033',
  landmark: 'Just opp. R3 Police Booth, West Mambalam',
  email: 'enquiry@indrakrishnadominance.com', // lease enquiries are mailed here
  phone: '+91 90032 80221', // Lease Enquiries
  whatsapp: '919003280221', // country code + number, digits only
  referral: {
    phone: '+91 95510 27261',
    whatsapp: '919551027261',
    email: 'referral@indrakrishnadominance.com',
    bonus: '₹25,000',
  },
  // Exact site pin shared by the client (13.0345007, 80.2191277).
  geo: { lat: 13.0345007, lng: 80.2191277 },
  mapEmbed: 'https://www.google.com/maps?q=IndraKrishna+Global+Suite@13.0345007,80.2191277&z=17&output=embed',
  mapLink:
    'https://www.google.com/maps/place/IndraKrishna+Global+Suite/@13.0345007,80.2165528,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267000514bc35:0xc8857e1938ad5edd!8m2!3d13.0345007!4d80.2191277!16s%2Fg%2F11zy6p1lq6',
  // Default WhatsApp message from visitors (client's wording).
  waGreeting: "Hi, I'm interested in IndraKrishna Global Suite apartments for lease, Ready to Occupy from Nov 2028.",
  // YouTube links or local files in public/videos.
  videos: {
    elevation: 'https://www.youtube.com/watch?v=LYwMVPmriXU',
    flat: 'https://www.youtube.com/watch?v=xm5FszFc3nY',
  },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
}

export const tel = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`

export const whatsappLink = (number, text = '') =>
  `https://wa.me/${String(number).replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`
