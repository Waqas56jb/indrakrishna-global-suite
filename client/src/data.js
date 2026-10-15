const u = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Client-supplied pictures live in public/images; Unsplash images fill the rest.
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
  interior: u('1618221195710-dd6b41faaea6'),
  interior2: u('1600573472550-8090b5e0745e'),
  living: u('1600210492486-724fe5c67fb0'),
  keys: u('1560518883-ce09059eeffa'),
}

export const STATUS_LINE = 'Apartment for Lease – Under Construction, Ready to Occupy by Nov 2028'

export const SLIDES = [
  {
    image: IMAGES.elevation1,
    eyebrow: 'West Mambalam, Chennai',
    title: 'IndraKrishna Global Suite',
    text: 'Apartments for Lease – Under Construction, Ready to Occupy by Nov 2028.',
  },
  {
    image: IMAGES.elevation2,
    eyebrow: 'Elegant Elevation',
    title: 'A Landmark Address',
    text: 'Contemporary architecture with warm tones, lit facades and a gated entrance.',
  },
  {
    image: IMAGES.flat2.hall,
    eyebrow: '2 BHK Residences',
    title: 'Spacious, Bright Living',
    text: 'Marble-finish floors, teak-finish doors and balconies with open views.',
  },
  {
    image: IMAGES.elevation3,
    eyebrow: 'Lease Enquiries Open',
    title: 'Reserve Your Home Today',
    text: 'Limited apartments available. Loan assistance provided.',
  },
]

export const HIGHLIGHTS = [
  { value: 'G+2', label: 'Floors' },
  { value: '2 BHK', label: 'Apartments' },
  { value: 'Lift', label: '& Power Backup' },
  { value: 'Nov 2028', label: 'Ready to Occupy' },
]

// Shown on Home in the red "Specifications" style the client shared.
export const SPECIFICATIONS = [
  {
    title: 'Flooring',
    image: IMAGES.flat2.hall,
    items: [
      ['Living, Dining & Kitchen', 'Vitrified / Marble finish flooring'],
      ['Bedrooms', 'Premium vitrified tiles'],
      ['Staircase', 'Black granite with steel handrails'],
    ],
  },
  {
    title: 'Wall Finish',
    image: IMAGES.flat1.hall,
    items: [
      ['Exterior', 'Weather Proof Emulsion (Texture finish)'],
      ['Interior', 'Putty finish with premium emulsion paint'],
      ['Lobby', 'Textured walls with decorative lighting'],
    ],
  },
  {
    title: 'Bathrooms',
    image: IMAGES.flat1.restroom,
    items: [
      ['Fittings', 'Jaquar / Hindware or equivalent CP fittings'],
      ['Wall Tiles', 'Designer ceramic tiles up to 7 ft'],
      ['Sanitary', 'Wall-mounted EWC with concealed cistern'],
    ],
  },
  {
    title: 'Kitchen',
    image: IMAGES.flat2.kitchen,
    items: [
      ['Counter', 'Granite platform with stainless steel sink'],
      ['Dado', 'Ceramic tiles 2 ft above counter'],
      ['Provision', 'Water purifier & exhaust fan points'],
    ],
  },
  {
    title: 'Doors & Windows',
    image: IMAGES.entrance,
    items: [
      ['Main Door', 'Teak wood frame with designer shutter'],
      ['Internal Doors', 'Flush doors with laminate finish'],
      ['Windows', 'UPVC windows with mosquito mesh'],
    ],
  },
  {
    title: 'Lobby & Lift',
    image: IMAGES.flat2.lobby,
    items: [
      ['Lift', 'Branded passenger lift with power backup'],
      ['Lobby', 'Marble flooring with ambient lighting'],
      ['Electrical', 'Concealed copper wiring & modular switches'],
    ],
  },
]

export const AMENITIES = [
  { icon: 'shield', title: '24/7 Security', text: 'CCTV surveillance and gated entry.' },
  { icon: 'car', title: 'Covered Parking', text: 'Dedicated stilt parking for residents.' },
  { icon: 'lift', title: 'Passenger Lift', text: 'Branded lift with power backup.' },
  { icon: 'bolt', title: 'Power Backup', text: 'Generator backup for common areas.' },
  { icon: 'drop', title: '24 Hrs Water', text: 'Borewell + metro water with sump.' },
  { icon: 'leaf', title: 'Landscaped Entrance', text: 'Green hedges and lit pathways.' },
  { icon: 'wifi', title: 'Internet Ready', text: 'Broadband & DTH provisions.' },
  { icon: 'pin', title: 'Prime Location', text: 'Close to rail, metro and markets.' },
]

export const LOAN_POINTS = [
  'Tie-ups with leading nationalised & private banks',
  'Help with documentation and eligibility check',
  'Quick processing and attractive interest rates',
  'Dedicated support from enquiry to disbursement',
]

export const NEARBY = [
  ['West Mambalam Railway Station', '0.5 km'],
  ['Ashok Nagar Metro Station', '2.0 km'],
  ['T. Nagar Shopping District', '2.5 km'],
  ['Schools & Colleges', '1.0 km'],
  ['Hospitals', '1.5 km'],
  ['Chennai Airport', '12 km'],
]

// Two 2 BHK flat sets supplied by the client.
export const FLATS = [
  {
    id: 'flat-1',
    type: '2 BHK – Flat 1',
    floor: 'First Floor',
    cover: IMAGES.flat1.hall,
    text: 'A warm, well-lit 2 BHK with a feature-wall living room, modular kitchen and a sit-out balcony overlooking the street.',
    features: ['Spacious hall with feature wall', 'Modular kitchen', '2 Bedrooms', 'Attached rest room', 'Balcony'],
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
    type: '2 BHK – Flat 2',
    floor: 'Second Floor',
    cover: IMAGES.flat2.hall,
    text: 'A bright, open-plan 2 BHK with marble-finish flooring, a large living area opening to the balcony, and lift access from a premium lobby.',
    features: ['Open living & dining', 'Modern kitchen', '2 Bedrooms', 'Designer rest room', 'Lobby with lift'],
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
  ...FLATS.flatMap((f) => f.photos.map((p) => ({ ...p, caption: `${f.type.split('– ')[1]} · ${p.caption}`, tag: f.type.split('– ')[1] }))),
]

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
  'Kuwait', 'Oman', 'Bahrain', 'Singapore', 'Malaysia', 'Australia', 'Canada', 'Germany',
  'New Zealand', 'Sri Lanka', 'Other',
]
