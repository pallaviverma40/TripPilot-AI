const activities = [
  // ── Nainital (Nature & Lakes) ──
  {
    id: 'AC101',
    name: 'Naini Lake Boating & Yacht Ride',
    destination: 'Nainital',
    category: 'nature',
    duration: '1.5 hours',
    price: 400,
    rating: 4.9,
    description: 'Glide along the emerald waters of Naini Lake in a traditional paddle boat or romantic yacht.',
    tags: ['Boating', 'Lake', 'Scenic', 'Romantic'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC102',
    name: 'Snow View Point Aerial Ropeway',
    destination: 'Nainital',
    category: 'adventure',
    duration: '2 hours',
    price: 350,
    rating: 4.7,
    description: 'Cable car ride up to 2,270m offering breathtaking panoramic vistas of Trishul and Nanda Devi peaks.',
    tags: ['Cable Car', 'Himalayas', 'Panoramic Views'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC103',
    name: "Tiffin Top (Dorothy's Seat) Trek",
    destination: 'Nainital',
    category: 'adventure',
    duration: '3 hours',
    price: 0,
    rating: 4.8,
    description: 'Scenic hilltop trek amidst oak and deodar forests with 360-degree views of the Kumaon valley.',
    tags: ['Free', 'Trek', 'Nature', 'Himalayan Vistas'],
    timeOfDay: 'afternoon',
    difficulty: 'Moderate'
  },
  {
    id: 'AC104',
    name: 'Naina Devi Temple & Mall Road Evening Walk',
    destination: 'Nainital',
    category: 'culture',
    duration: '2.5 hours',
    price: 0,
    rating: 4.6,
    description: 'Visit the sacred 51 Shakti Peeth temple by the lake followed by shopping for handmade scented candles.',
    tags: ['Free', 'Spiritual', 'Shopping', 'Lakeside'],
    timeOfDay: 'evening',
    difficulty: 'Easy'
  },

  // ── Haridwar (Spiritual & Ghats) ──
  {
    id: 'AC105',
    name: 'Sacred Ganga Aarti at Har Ki Pauri',
    destination: 'Haridwar',
    category: 'culture',
    duration: '2 hours',
    price: 0,
    rating: 5.0,
    description: 'Witness the divine spectacle of floating diya lamps, ringing temple bells, and chanting at the holiest ghat.',
    tags: ['Free', 'Spiritual', 'Iconic', 'Divine Experience'],
    timeOfDay: 'evening',
    difficulty: 'Easy'
  },
  {
    id: 'AC106',
    name: 'Mansa Devi & Chandi Devi Cable Car Pilgrimage',
    destination: 'Haridwar',
    category: 'culture',
    duration: '3.5 hours',
    price: 380,
    rating: 4.7,
    description: 'Ropeway ride to the sacred hilltop shrines overlooking the holy city and Shivalik mountain ranges.',
    tags: ['Spiritual', 'Cable Car', 'Hilltop Shrine'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC107',
    name: 'Moti Bazaar Street Food & Sweets Trail',
    destination: 'Haridwar',
    category: 'food',
    duration: '2 hours',
    price: 450,
    rating: 4.8,
    description: 'Relish famous hot kachoris with aloo sabzi, rabri jalebi, and refreshing kulhad lassi.',
    tags: ['Street Food', 'Vegetarian', 'Traditional'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC108',
    name: 'Rajaji National Park Jungle Safari',
    destination: 'Haridwar',
    category: 'adventure',
    duration: '4 hours',
    price: 2200,
    rating: 4.6,
    description: '4x4 open jeep safari to spot wild Asian elephants, leopards, and over 300 species of migratory birds.',
    tags: ['Wildlife', 'Safari', 'Nature', 'Elephants'],
    timeOfDay: 'morning',
    difficulty: 'Moderate'
  },

  // ── Ayodhya (Heritage & Spiritual) ──
  {
    id: 'AC109',
    name: 'Ram Janmabhoomi & Mandir Complex Darshan',
    destination: 'Ayodhya',
    category: 'culture',
    duration: '3 hours',
    price: 0,
    rating: 5.0,
    description: 'Darshan at the grand Nagara-style Ram Mandir, featuring pink sandstone architecture and ornate carvings.',
    tags: ['Free', 'Spiritual', 'Heritage', 'Iconic'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC110',
    name: 'Saryu River Sunset Boat Ride & Maha Aarti',
    destination: 'Ayodhya',
    category: 'culture',
    duration: '2 hours',
    price: 300,
    rating: 4.9,
    description: 'Peaceful cruise on the sacred Saryu river accompanied by glowing evening oil lamps and grand river aarti.',
    tags: ['Boating', 'River Aarti', 'Spiritual', 'Sunset'],
    timeOfDay: 'evening',
    difficulty: 'Easy'
  },
  {
    id: 'AC111',
    name: 'Hanuman Garhi & Kanak Bhawan Heritage Walk',
    destination: 'Ayodhya',
    category: 'culture',
    duration: '2.5 hours',
    price: 0,
    rating: 4.8,
    description: 'Climb the 76 steps of the 10th-century fort-temple of Lord Hanuman and visit the ornate palace of Sita.',
    tags: ['Free', 'Heritage Walk', 'Ancient Fort', 'Spiritual'],
    timeOfDay: 'morning',
    difficulty: 'Moderate'
  },
  {
    id: 'AC112',
    name: 'Traditional Awadhi Sattvik Culinary Trail',
    destination: 'Ayodhya',
    category: 'food',
    duration: '2 hours',
    price: 400,
    rating: 4.7,
    description: 'Taste local delicacies including Ramdana laddoos, khurchan peda, and authentic ghee-cooked poori sabzi.',
    tags: ['Food', 'Sattvik', 'Traditional Sweets'],
    timeOfDay: 'afternoon',
    difficulty: 'Easy'
  },

  // ── Raipur (Tribal Culture & Nature) ──
  {
    id: 'AC113',
    name: 'Bastar Tribal Art & Bell Metal Craft Tour',
    destination: 'Raipur',
    category: 'culture',
    duration: '3.5 hours',
    price: 600,
    rating: 4.8,
    description: 'Live demonstration of 4000-year-old Dhokra lost-wax bronze metal casting by indigenous master artisans.',
    tags: ['Tribal Art', 'Dhokra Craft', 'Culture', 'Workshops'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC114',
    name: 'Chitrakote Falls Day Excursion',
    destination: 'Raipur',
    category: 'nature',
    duration: '8 hours',
    price: 1800,
    rating: 4.9,
    description: "Visit the majestic 300-meter-wide horseshoe waterfall on Indravati river, known as India's Niagara.",
    tags: ['Waterfalls', 'Nature', 'Scenic Day Trip'],
    timeOfDay: 'morning',
    difficulty: 'Moderate'
  },
  {
    id: 'AC115',
    name: 'Barnawapara Wildlife Sanctuary Safari',
    destination: 'Raipur',
    category: 'adventure',
    duration: '5 hours',
    price: 1500,
    rating: 4.6,
    description: 'Explore dense sal and teak forests home to Indian bison (Gaur), sloth bears, and flying squirrels.',
    tags: ['Safari', 'Wildlife', 'Jungle'],
    timeOfDay: 'morning',
    difficulty: 'Moderate'
  },

  // ── Jammu and Kashmir (Srinagar / Gulmarg / Pahalgam) ──
  {
    id: 'AC116',
    name: 'Dal Lake Sunset Shikara & Floating Market',
    destination: 'Jammu and Kashmir',
    category: 'nature',
    duration: '2 hours',
    price: 750,
    rating: 5.0,
    description: 'Relax on a cushioned Kashmiri wooden boat gliding past floating gardens and lotus flower blooms.',
    tags: ['Shikara', 'Dal Lake', 'Romantic', 'Iconic'],
    timeOfDay: 'evening',
    difficulty: 'Easy'
  },
  {
    id: 'AC117',
    name: 'Gulmarg Gondola Snow Cable Car',
    destination: 'Jammu and Kashmir',
    category: 'adventure',
    duration: '4 hours',
    price: 1650,
    rating: 4.9,
    description: 'World’s second highest operating cable car reaching Apharwat Peak (3,980m) for skiing and snow views.',
    tags: ['Snow', 'Gondola', 'Himalayas', 'Adventure'],
    timeOfDay: 'morning',
    difficulty: 'Moderate'
  },
  {
    id: 'AC118',
    name: 'Mughal Gardens (Nishat & Shalimar) Tour',
    destination: 'Jammu and Kashmir',
    category: 'culture',
    duration: '3 hours',
    price: 100,
    rating: 4.7,
    description: 'Stroll through terraced water gardens built by Emperor Jahangir lined with majestic chinar trees.',
    tags: ['Gardens', 'Mughal Heritage', 'Photography'],
    timeOfDay: 'afternoon',
    difficulty: 'Easy'
  },
  {
    id: 'AC119',
    name: 'Traditional Kashmiri Wazwan Feast',
    destination: 'Jammu and Kashmir',
    category: 'food',
    duration: '2 hours',
    price: 1200,
    rating: 4.9,
    description: 'Indulge in a royal multi-course culinary heritage meal including Rogan Josh and Gushtaba.',
    tags: ['Food', 'Royal Wazwan', 'Authentic Cuisine'],
    timeOfDay: 'evening',
    difficulty: 'Easy'
  },

  // ── Varanasi (Kashi Culture & Ghats) ──
  {
    id: 'AC120',
    name: 'Subah-e-Banaras Sunrise Boat Ride',
    destination: 'Varanasi',
    category: 'culture',
    duration: '2.5 hours',
    price: 500,
    rating: 5.0,
    description: 'Row across the morning mist on holy river Ganga watching morning prayers, rituals, and sacred chants.',
    tags: ['Sunrise', 'Boat Ride', 'Ghats', 'Spiritual'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC121',
    name: 'Grand Evening Ganga Aarti at Dashashwamedh',
    destination: 'Varanasi',
    category: 'culture',
    duration: '2 hours',
    price: 0,
    rating: 5.0,
    description: 'Witness the world-renowned ritual performed by young Vedic priests with multi-tiered brass oil lamps.',
    tags: ['Free', 'Aarti', 'Divine', 'Iconic'],
    timeOfDay: 'evening',
    difficulty: 'Easy'
  },
  {
    id: 'AC122',
    name: 'Kashi Vishwanath Corridor & Temple Darshan',
    destination: 'Varanasi',
    category: 'culture',
    duration: '2 hours',
    price: 0,
    rating: 4.9,
    description: 'Visit one of the 12 Jyotirlingas, newly interconnected with the sacred river ghats.',
    tags: ['Free', 'Jyotirlinga', 'Spiritual'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },
  {
    id: 'AC123',
    name: 'Banarasi Silk Weaving Village Masterclass',
    destination: 'Varanasi',
    category: 'culture',
    duration: '3 hours',
    price: 450,
    rating: 4.8,
    description: 'Meet generational weavers and learn how pure gold and silver zari threads are woven into sarees.',
    tags: ['Handloom', 'Silk', 'Workshops', 'Artisans'],
    timeOfDay: 'afternoon',
    difficulty: 'Easy'
  },

  // ── Karnataka (Mysore, Coorg, Hampi) ──
  {
    id: 'AC124',
    name: 'Mysore Palace Illuminated Night Tour',
    destination: 'Karnataka',
    category: 'culture',
    duration: '2.5 hours',
    price: 200,
    rating: 4.9,
    description: 'Witness the magical illumination of the Indo-Saracenic royal palace with nearly 100,000 glowing bulbs.',
    tags: ['Royal Palace', 'Illumination', 'Architecture'],
    timeOfDay: 'evening',
    difficulty: 'Easy'
  },
  {
    id: 'AC125',
    name: 'Hampi UNESCO Ruins Heritage Walk',
    destination: 'Karnataka',
    category: 'culture',
    duration: '4.5 hours',
    price: 350,
    rating: 4.9,
    description: 'Explore the stone chariot at Vijaya Vittala Temple and the grand monuments of the 14th-century Vijayanagara empire.',
    tags: ['UNESCO', 'Ancient Ruins', 'Stone Chariot', 'History'],
    timeOfDay: 'morning',
    difficulty: 'Moderate'
  },
  {
    id: 'AC126',
    name: 'Coorg Coffee & Spice Plantation Walk',
    destination: 'Karnataka',
    category: 'nature',
    duration: '3 hours',
    price: 600,
    rating: 4.8,
    description: 'Guided walking tour through lush Arabica coffee estates with fresh coffee bean roasting and tasting.',
    tags: ['Coffee', 'Plantation', 'Nature', 'Tasting'],
    timeOfDay: 'morning',
    difficulty: 'Easy'
  },

  // ── Base Cities ──
  { id: 'AC001', name: 'India Gate Visit', destination: 'Delhi', category: 'sightseeing', duration: '2 hours', price: 0, rating: 4.7, description: 'Visit the iconic war memorial in the heart of Delhi.', tags: ['Free', 'Outdoor', 'Historical'], timeOfDay: 'any', difficulty: 'Easy' },
  { id: 'AC002', name: 'Red Fort Light & Sound Show', destination: 'Delhi', category: 'entertainment', duration: '1.5 hours', price: 500, rating: 4.5, description: 'Spectacular historical show at the Red Fort.', tags: ['Historical', 'Evening'], timeOfDay: 'evening', difficulty: 'Easy' },
  { id: 'AC003', name: 'Chandni Chowk Food Walk', destination: 'Delhi', category: 'food', duration: '3 hours', price: 1200, rating: 4.8, description: 'Taste the best street food in Old Delhi.', tags: ['Food', 'Walking'], timeOfDay: 'afternoon', difficulty: 'Medium' },
  
  { id: 'AC004', name: 'Scuba Diving at Grande Island', destination: 'Goa', category: 'adventure', duration: '6 hours', price: 2500, rating: 4.6, description: 'Explore underwater life with professional instructors.', tags: ['Water Sports', 'Adventure'], timeOfDay: 'morning', difficulty: 'Hard' },
  { id: 'AC005', name: 'Dudhsagar Trek', destination: 'Goa', category: 'nature', duration: '8 hours', price: 1500, rating: 4.9, description: 'Trek to the majestic Dudhsagar waterfalls.', tags: ['Trekking', 'Nature'], timeOfDay: 'morning', difficulty: 'Medium' },
  { id: 'AC006', name: 'Baga Beach Parasailing', destination: 'Goa', category: 'adventure', duration: '1 hour', price: 800, rating: 4.3, description: 'Thrilling parasailing experience over the Arabian Sea.', tags: ['Water Sports'], timeOfDay: 'any', difficulty: 'Easy' },

  { id: 'AC007', name: 'Elephanta Caves Tour', destination: 'Mumbai', category: 'culture', duration: '5 hours', price: 900, rating: 4.4, description: 'Ferry ride and guided tour of the ancient caves.', tags: ['Historical', 'Ferry'], timeOfDay: 'morning', difficulty: 'Medium' },
  { id: 'AC008', name: 'Marine Drive Evening Walk', destination: 'Mumbai', category: 'nature', duration: '2 hours', price: 0, rating: 4.8, description: "Enjoy the sunset at the Queen's Necklace.", tags: ['Free', 'Relaxing'], timeOfDay: 'evening', difficulty: 'Easy' },
  
  { id: 'AC009', name: 'Amer Fort Elephant Ride', destination: 'Jaipur', category: 'sightseeing', duration: '3 hours', price: 1100, rating: 4.5, description: 'Royal entry to the fort on an elephant.', tags: ['Historical', 'Royal'], timeOfDay: 'morning', difficulty: 'Easy' },
  { id: 'AC010', name: 'Chokhi Dhani Dinner', destination: 'Jaipur', category: 'culture', duration: '4 hours', price: 950, rating: 4.7, description: 'Traditional Rajasthani dinner and cultural performances.', tags: ['Food', 'Cultural'], timeOfDay: 'evening', difficulty: 'Easy' },

  { id: 'AC011', name: 'Bara Imambara Tour', destination: 'Lucknow', category: 'historical', duration: '3 hours', price: 200, rating: 4.6, description: 'Explore the Bhool Bhulaiya and the grand architecture.', tags: ['Historical', 'Architecture'], timeOfDay: 'any', difficulty: 'Medium' },
  { id: 'AC012', name: 'Tunday Kababi Dinner', destination: 'Lucknow', category: 'food', duration: '2 hours', price: 500, rating: 4.9, description: 'Taste the world-famous Galouti kebabs.', tags: ['Food', 'Iconic'], timeOfDay: 'evening', difficulty: 'Easy' }
];

export const searchActivities = (destination) => {
  if (!destination) return activities;
  const d = destination.toLowerCase().trim();
  const results = activities.filter(a => {
    const actDest = a.destination.toLowerCase();
    return actDest.includes(d) || d.includes(actDest);
  });

  if (results.length > 0) return results;

  // Fallback activity if none matched directly
  return [
    {
      id: 'AC-FALLBACK',
      name: `Explore ${destination} Heritage & Local Sights`,
      destination: destination,
      category: 'sightseeing',
      duration: '3 hours',
      price: 350,
      rating: 4.8,
      description: `Guided walking tour discovering the landmarks, stories, and hidden cultural gems of ${destination}.`,
      tags: ['Culture', 'Sightseeing', 'Guided'],
      timeOfDay: 'morning',
      difficulty: 'Easy'
    }
  ];
};
