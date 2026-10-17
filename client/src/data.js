// Client-supplied pictures live in public/images; stock photos (from Unsplash) are in public/images/stock.
export const IMAGES = {
  elevation1: '/images/elevation/elevation-angle-1.jpeg',
  elevation2: '/images/elevation/elevation-angle-2.jpeg',
  elevation3: '/images/elevation/elevation-front.jpg',
  entrance: '/images/flat-1/entrance.jpg',
  flat1: {
    hall: '/images/flat-1/hall.jpg',
    kitchen: '/images/flat-1/kitchen.jpg',
    bedroom: '/images/flat-1/bedroom.jpg',
    restroom: '/images/flat-1/restroom.jpg',
    balcony: '/images/flat-1/balcony.jpg',
  },
  flat2: {
    hall: '/images/flat-2/hall.jpg',
    kitchen: '/images/flat-2/kitchen.jpg',
    bedroom1: '/images/flat-2/bedroom-1.jpg',
    bedroom2: '/images/flat-2/bedroom-2.jpg',
    restroom: '/images/flat-2/restroom.jpg',
    lobby: '/images/flat-2/lobby-lift.jpg',
  },
  interior: '/images/stock/interior.jpg',
  electrical: '/images/stock/electrical.jpg',
  keys: '/images/stock/keys.jpg',
  documents: '/images/stock/documents.jpg',
  office: '/images/stock/office.jpg',
}

export const STATUS_LINE = 'Apartment For Lease – Under Construction, Ready to Occupy by Nov 2028'
export const LEASE_TERM = '8 + 2 (Construction) = 10 Years'
export const TRUST_LINE = 'Built on Trust • Driven by Quality • Anchored in Ethics'

export const SLIDES = [
  {
    image: IMAGES.elevation1,
    eyebrow: 'West Mambalam, Chennai',
    title: 'IndraKrishna Global Suite',
    text: 'Purely residential apartment designed for Corporate Companies, Staff Quarters & Guest Houses.',
  },
  {
    image: IMAGES.elevation2,
    eyebrow: 'Premium 2-BHK Suite Apartments',
    title: '6 Semi-Furnished Flats for Lease',
    text: '610 sq.ft & 1200 sq.ft flats with lift access, covered car park and 24x7 CCTV security.',
  },
  {
    image: IMAGES.flat2.hall,
    eyebrow: 'Long-Term Corporate Lease',
    title: 'Lease for 8 + 2 = 10 Years',
    text: 'Ideal staff quarters for Banks, Software, FMCG, Colleges, Government & more.',
  },
  {
    image: IMAGES.elevation3,
    eyebrow: 'Under Construction',
    title: 'Ready to Occupy by Nov 2028',
    text: 'Semi-furnished 2-BHK flats for long-term lease. Lease enquiries open now.',
  },
]

export const HIGHLIGHTS = [
  { value: '6', label: 'Semi-Furnished Flats' },
  { value: '610 / 1200', label: 'Sq. Feet' },
  { value: '10 Yrs', label: 'Lease (8 + 2)' },
  { value: 'Nov 2028', label: 'Ready to Occupy' },
]

export const SECTORS = [
  'Banks', 'BPO & KPO', 'College & University', 'Finance', 'FMCG', 'Government',
  'Manufacturing', 'Software', 'Stocks & Securities, Mutual Funds',
]

// Project highlights from the client's content.
export const FEATURES = [
  { icon: 'home', title: '6 Semi-Furnished Flats', text: 'Premium 2-BHK suite apartments.' },
  { icon: 'ruler', title: '610 & 1200 Sq. Feet', text: 'Two flat sizes to suit your team.' },
  { icon: 'layers', title: 'Stilt + 2 Floors', text: '4 flats on First Floor, 2 flats on Second Floor.' },
  { icon: 'car', title: 'Covered Car Park', text: 'Stilt floor reserved for parking.' },
  { icon: 'lift', title: 'Lift Access', text: 'Easy access to every flat.' },
  { icon: 'bolt', title: 'Solar / Inverter Support', text: 'Uninterrupted everyday comfort.' },
  { icon: 'wifi', title: 'High Speed Internet', text: 'Work-from-home ready.' },
  { icon: 'shield', title: '24x7 CCTV Security', text: 'Round-the-clock surveillance.' },
]

export const WORKFLOW = [
  { title: 'Plan Approval & Permits', text: 'Approved.' },
  {
    title: 'Superstructure Execution',
    text: 'Pile foundations, RCC framing, bricklaying, and electrical / plumbing rough-ins with grade-A materials.',
  },
  {
    title: 'Finishing & Handover',
    text: 'Plastering, flooring, painting, fixture installation, and full quality audit before key handover.',
  },
]

export const FAQS = [
  ['Is the IndraKrishna Global Suite apartment approved?', 'Yes, it is approved by Greater Chennai Corporation.'],
  ['Where is the site located?', 'West Mambalam, just opposite R3 Police Booth – 62, Naickamar Street, West Mambalam, Chennai – 600033.'],
  ['What is the total area?', 'Around 3080 sq.feet, with a built-up area of around 2700 sq.feet.'],
  ['When will the apartment be completed?', 'The residential flats are under construction. The apartment will be ready to occupy by Nov 2028.'],
  ['How many flats are in the apartment?', 'The First Floor has 4 flats of 610 sq.feet each and the Second Floor has 2 flats of 1200 sq.feet each – a total of 6 flats.'],
  ['What is the lease period?', 'Flats are offered on lease for 8 + 2 (construction) = 10 years.'],
  ['How many flats can a tenant take?', 'Tenants can take 1 / 2 / 4 or 6 flats on lease.'],
  ['Who can take the flats on lease?', 'Corporate companies, working professionals, Government organisations and clients worldwide with an office in India – as staff quarters, guest houses or employee accommodation.'],
]

export const SPECIFICATIONS = [
  { title: 'Flooring', image: IMAGES.flat2.hall, items: [['Flooring', 'Quality Vitrified Tiles']] },
  {
    title: 'Kitchen',
    image: IMAGES.flat2.kitchen,
    items: [['Kitchen', 'Sink, Granite Platform & Stainless Steel Tap']],
  },
  {
    title: 'Electrical',
    image: IMAGES.flat1.hall,
    items: [['Power', '3-Phase Electric Current with Sub Meter'], ['Fittings', 'AC Provision, Lights & Fans']],
  },
  { title: 'Wall Finish', image: IMAGES.elevation3, items: [['Exterior', 'Weather Proof Emulsion']] },
  {
    title: 'Bathroom',
    image: IMAGES.flat1.restroom,
    items: [['Bathroom', 'Shower & Stainless Steel Taps']],
  },
  { title: 'Lobby & Lift', image: IMAGES.flat2.lobby, items: [['Lift', 'Lift Access']] },
]

export const LOAN_DOCS = [
  {
    title: 'Salaried',
    icon: 'user',
    docs: ['Aadhaar Proof', 'Address Proof', 'Salary Slips – last 6 months', 'Bank Statement – last 6 months', 'ITR – last 6 months'],
  },
  {
    title: 'Business',
    icon: 'users',
    docs: ['Aadhaar Proof', 'Address Proof', 'Bank Statement – last 6 months', 'ITR – last 6 months'],
  },
]

export const NRI_DOCS = [
  'Indian Passport',
  'PIO card / OCI card, if applicable',
  'PAN card',
  'Latest salary pay slips for the past 6 months',
  'Income tax returns for the last 2 years',
  'Copy of employment contract',
  'Appointment letter, if applicable',
  'Work permit, if applicable',
  'Bank statement for the past 1 year from an external bank account',
  'Bank statement for the last 1 year from an NRE / NRO account',
  'Address proof',
  'Credit report',
]

// Two 2 BHK flat sets supplied by the client.
export const FLATS = [
  {
    id: 'flat-1',
    type: '2 BHK – 610 Sq.ft',
    short: 'First Floor',
    floor: 'First Floor · 4 Flats',
    cover: IMAGES.flat1.hall,
    text: 'Compact, well-planned semi-furnished 2-BHK flats – ideal as staff quarters for working professionals.',
    features: ['610 sq.feet each', 'Hall with feature wall', 'Kitchen with granite platform', '2 Bedrooms', 'Bathroom with shower', 'Balcony'],
    photos: [
      { src: IMAGES.entrance, caption: 'Entrance – 1st Floor' },
      { src: IMAGES.flat1.hall, caption: 'Hall' },
      { src: IMAGES.flat1.kitchen, caption: 'Kitchen' },
      { src: IMAGES.flat1.bedroom, caption: 'Bedroom' },
      { src: IMAGES.flat1.restroom, caption: 'Rest Room' },
      { src: IMAGES.flat1.balcony, caption: 'Balcony' },
    ],
  },
  {
    id: 'flat-2',
    type: '2 BHK – 1200 Sq.ft',
    short: 'Second Floor',
    floor: 'Second Floor · 2 Flats',
    cover: IMAGES.flat2.hall,
    text: 'Spacious semi-furnished 2-BHK suites with a large living area opening to the balcony – ideal as guest houses or senior staff quarters.',
    features: ['1200 sq.feet each', 'Large living & dining', 'Modern kitchen', '2 Bedrooms', 'Designer bathroom', 'Lobby with lift'],
    photos: [
      { src: IMAGES.flat2.hall, caption: 'Hall' },
      { src: IMAGES.flat2.kitchen, caption: 'Kitchen' },
      { src: IMAGES.flat2.bedroom1, caption: 'Bedroom 1' },
      { src: IMAGES.flat2.bedroom2, caption: 'Bedroom 2' },
      { src: IMAGES.flat2.restroom, caption: 'Rest Room' },
      { src: IMAGES.flat2.lobby, caption: 'Lobby & Lift' },
    ],
  },
]

export const GALLERY = [
  { src: IMAGES.elevation1, caption: 'Elevation – Angle 1', tag: 'Elevation' },
  { src: IMAGES.elevation2, caption: 'Elevation – Angle 2', tag: 'Elevation' },
  { src: IMAGES.elevation3, caption: 'Front Elevation', tag: 'Elevation' },
  ...FLATS.flatMap((f) => f.photos.map((p) => ({ ...p, caption: `${f.short} · ${p.caption}`, tag: f.short }))),
]

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
  'Kuwait', 'Oman', 'Bahrain', 'Singapore', 'Malaysia', 'Australia', 'Canada', 'Germany',
  'New Zealand', 'Sri Lanka', 'Other',
]

export const CUSTOMER_STATUSES = ['Enquired', 'Willing to take', 'Taken on Lease', 'Not interested']
export const REFERRAL_STATUSES = ['Referred', 'In Progress', 'Eligible', 'Paid', 'Cancelled']
export const PAYMENT_MODES = ['Bank Transfer', 'Cheque', 'UPI', 'Cash']
