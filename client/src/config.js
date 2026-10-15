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
  mapEmbed:
    'https://www.google.com/maps?q=Naickamar+Street,+West+Mambalam,+Chennai+600033&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Naickamar+Street+West+Mambalam+Chennai+600033',
  // YouTube links or local files in public/videos (2-BHK video still to come from client).
  videos: {
    elevation: 'https://www.youtube.com/watch?v=LYwMVPmriXU',
    flat: '/videos/2bhk.mp4',
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
