// Site-wide details. Replace placeholders once the client confirms them.
export const SITE = {
  name: 'IndraKrishna Global Suite',
  tagline: 'Apartments for Lease – Ready to Occupy by Nov 2028',
  company: 'IndraKrishna TechieTrading (P) Ltd.',
  location: 'West Mambalam, Chennai',
  siteAddress: 'IndraKrishna Global Suite, West Mambalam, Chennai, Tamil Nadu 600033, India',
  officeAddress:
    '715-A, 7th Floor, Spencer Plaza, Suite No. 875, Mount Road, Anna Salai, Chennai – 600 002, Tamil Nadu, India',
  email: 'info@indrakrishna.com',
  phone: '+91 98400 00000', // TODO: client to confirm
  whatsapp: '919840000000', // TODO: client to confirm (country code + number, digits only)
  mapEmbed:
    'https://www.google.com/maps?q=West+Mambalam,+Chennai,+Tamil+Nadu&output=embed', // TODO: exact site pin
  mapLink: 'https://www.google.com/maps/search/?api=1&query=West+Mambalam+Chennai',
  video: '/videos/apartment.mp4', // TODO: client will send the apartment video
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
  },
}

export const whatsappLink = (number, text = '') =>
  `https://wa.me/${String(number).replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`
