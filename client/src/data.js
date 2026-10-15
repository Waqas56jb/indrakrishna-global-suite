const u = (id, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  elevation1: '/West-Mambalam-Main-Image-1.jpeg',
  elevation2: '/West-Mambalam-Main-Image-2.jpeg',
  elevation3: '/Elevation.jpg',
  entrance: '/2-BHK-Entrace-1st-Floor.jpg',
  living: u('1600210492486-724fe5c67fb0'),
  living2: u('1600607687939-ce8a6c25118c'),
  kitchen: u('1556911220-bff31c812dba'),
  kitchen2: u('1600566753190-17f0baa2a6c3'),
  bedroom: u('1505693416388-ac5ce068fe85'),
  bedroom2: u('1616594039964-ae9021a400a0'),
  bathroom: u('1552321554-5fefe8c9ef14'),
  bathroom2: u('1584622650111-993a426fbf0a'),
  dining: u('1600566752355-35792bedcfea'),
  apartment: u('1522708323590-d24dbb6b0267'),
  apartment2: u('1502672260266-1c1ef2d93688'),
  interior: u('1618221195710-dd6b41faaea6'),
  interior2: u('1600573472550-8090b5e0745e'),
}

export const SLIDES = [
  {
    image: IMAGES.elevation1,
    eyebrow: 'West Mambalam, Chennai',
    title: 'IndraKrishna Global Suite',
    text: 'Premium apartments for lease – ready to occupy by November 2028.',
  },
  {
    image: IMAGES.elevation3,
    eyebrow: 'Elegant Elevation',
    title: 'A Landmark Address',
    text: 'Contemporary architecture with warm tones, lit facades and a gated entrance.',
  },
  {
    image: IMAGES.entrance,
    eyebrow: '2 BHK Residences',
    title: 'Finished to Perfection',
    text: 'Granite staircases, teak-finish doors and premium fittings throughout.',
  },
  {
    image: IMAGES.elevation2,
    eyebrow: 'Lease Enquiries Open',
    title: 'Reserve Your Home Today',
    text: 'Limited apartments available. Enquire now for early-bird lease terms.',
  },
]

export const HIGHLIGHTS = [
  { value: 'G+2', label: 'Floors' },
  { value: '2 BHK', label: 'Apartments' },
  { value: '24/7', label: 'Security' },
  { value: 'Nov 2028', label: 'Ready to Occupy' },
]

// Shown on Home in the red "Specifications" style the client shared.
export const SPECIFICATIONS = [
  {
    title: 'Flooring',
    image: IMAGES.living,
    items: [
      ['Living, Dining & Kitchen', 'Vitrified / Italian Marble finish flooring'],
      ['Bedrooms', 'Premium vitrified tiles'],
      ['Staircase', 'Black granite with steel handrails'],
    ],
  },
  {
    title: 'Wall Finish',
    image: IMAGES.interior2,
    items: [
      ['Exterior', 'Weather Proof Emulsion (Texture finish)'],
      ['Interior', 'Putty finish with premium emulsion paint'],
      ['Lobby', 'Textured walls with decorative lighting'],
    ],
  },
  {
    title: 'Bathrooms',
    image: IMAGES.bathroom,
    items: [
      ['Fittings', 'Kohler / Jaquar or equivalent CP fittings'],
      ['Wall Tiles', 'Designer ceramic tiles up to 7 ft'],
      ['Sanitary', 'Wall-mounted EWC with concealed cistern'],
    ],
  },
  {
    title: 'Kitchen',
    image: IMAGES.kitchen,
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
    title: 'Electrical',
    image: IMAGES.interior,
    items: [
      ['Wiring', 'Concealed copper wiring (Finolex / Havells)'],
      ['Switches', 'Modular switches (Legrand or equivalent)'],
      ['Backup', 'Power backup for common areas & lift'],
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

export const NEARBY = [
  ['West Mambalam Railway Station', '0.5 km'],
  ['Ashok Nagar Metro Station', '2.0 km'],
  ['T. Nagar Shopping District', '2.5 km'],
  ['Schools & Colleges', '1.0 km'],
  ['Hospitals', '1.5 km'],
  ['Chennai Airport', '12 km'],
]

export const APARTMENTS = [
  {
    type: '2 BHK – Type A',
    area: '~950 sq.ft',
    floor: 'First & Second Floor',
    image: IMAGES.living2,
    features: ['2 Bedrooms with attached bath', 'Spacious living & dining', 'Utility area', 'Balcony'],
  },
  {
    type: '2 BHK – Type B',
    area: '~1,050 sq.ft',
    floor: 'First & Second Floor',
    image: IMAGES.apartment,
    features: ['2 Bedrooms + Study nook', 'Open kitchen with dining', '2 Bathrooms', 'Corner balcony'],
  },
  {
    type: '3 BHK – Premium',
    area: '~1,350 sq.ft',
    floor: 'Second Floor',
    image: IMAGES.interior,
    features: ['3 Bedrooms (1 master suite)', 'Large living room', '3 Bathrooms', 'Twin balconies'],
  },
]

export const GALLERY = [
  { src: IMAGES.elevation1, caption: 'Front Elevation', tag: 'Elevation' },
  { src: IMAGES.elevation3, caption: 'Evening Elevation', tag: 'Elevation' },
  { src: IMAGES.elevation2, caption: 'Side Elevation', tag: 'Elevation' },
  { src: IMAGES.entrance, caption: '2 BHK Entrance – 1st Floor', tag: 'Interior' },
  { src: IMAGES.living, caption: 'Living Room', tag: 'Interior' },
  { src: IMAGES.kitchen2, caption: 'Modular Kitchen', tag: 'Interior' },
  { src: IMAGES.bedroom, caption: 'Master Bedroom', tag: 'Interior' },
  { src: IMAGES.bathroom2, caption: 'Bathroom', tag: 'Interior' },
  { src: IMAGES.dining, caption: 'Dining Area', tag: 'Interior' },
  { src: IMAGES.bedroom2, caption: 'Bedroom', tag: 'Interior' },
]

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
  'Kuwait', 'Oman', 'Bahrain', 'Singapore', 'Malaysia', 'Australia', 'Canada', 'Germany',
  'New Zealand', 'Sri Lanka', 'Other',
]
