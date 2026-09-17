const activities = [
  { id: 'AC001', name: 'India Gate Visit', destination: 'Delhi', category: 'sightseeing', duration: '2 hours', price: 0, rating: 4.7, description: 'Visit the iconic war memorial in the heart of Delhi.', tags: ['Free', 'Outdoor', 'Historical'], timeOfDay: 'any', difficulty: 'Easy' },
  { id: 'AC002', name: 'Red Fort Light & Sound Show', destination: 'Delhi', category: 'entertainment', duration: '1.5 hours', price: 500, rating: 4.5, description: 'Spectacular historical show at the Red Fort.', tags: ['Historical', 'Evening'], timeOfDay: 'evening', difficulty: 'Easy' },
  { id: 'AC003', name: 'Chandni Chowk Food Walk', destination: 'Delhi', category: 'food', duration: '3 hours', price: 1200, rating: 4.8, description: 'Taste the best street food in Old Delhi.', tags: ['Food', 'Walking'], timeOfDay: 'afternoon', difficulty: 'Medium' },
  
  { id: 'AC004', name: 'Scuba Diving at Grande Island', destination: 'Goa', category: 'adventure', duration: '6 hours', price: 2500, rating: 4.6, description: 'Explore underwater life with professional instructors.', tags: ['Water Sports', 'Adventure'], timeOfDay: 'morning', difficulty: 'Hard' },
  { id: 'AC005', name: 'Dudhsagar Trek', destination: 'Goa', category: 'nature', duration: '8 hours', price: 1500, rating: 4.9, description: 'Trek to the majestic Dudhsagar waterfalls.', tags: ['Trekking', 'Nature'], timeOfDay: 'morning', difficulty: 'Medium' },
  { id: 'AC006', name: 'Baga Beach Parasailing', destination: 'Goa', category: 'adventure', duration: '1 hour', price: 800, rating: 4.3, description: 'Thrilling parasailing experience over the Arabian Sea.', tags: ['Water Sports'], timeOfDay: 'any', difficulty: 'Easy' },

  { id: 'AC007', name: 'Elephanta Caves Tour', destination: 'Mumbai', category: 'culture', duration: '5 hours', price: 900, rating: 4.4, description: 'Ferry ride and guided tour of the ancient caves.', tags: ['Historical', 'Ferry'], timeOfDay: 'morning', difficulty: 'Medium' },
  { id: 'AC008', name: 'Marine Drive Evening Walk', destination: 'Mumbai', category: 'nature', duration: '2 hours', price: 0, rating: 4.8, description: 'Enjoy the sunset at the Queen\'s Necklace.', tags: ['Free', 'Relaxing'], timeOfDay: 'evening', difficulty: 'Easy' },
  
  { id: 'AC009', name: 'Amer Fort Elephant Ride', destination: 'Jaipur', category: 'sightseeing', duration: '3 hours', price: 1100, rating: 4.5, description: 'Royal entry to the fort on an elephant.', tags: ['Historical', 'Royal'], timeOfDay: 'morning', difficulty: 'Easy' },
  { id: 'AC010', name: 'Chokhi Dhani Dinner', destination: 'Jaipur', category: 'culture', duration: '4 hours', price: 950, rating: 4.7, description: 'Traditional Rajasthani dinner and cultural performances.', tags: ['Food', 'Cultural'], timeOfDay: 'evening', difficulty: 'Easy' },

  { id: 'AC011', name: 'Bara Imambara Tour', destination: 'Lucknow', category: 'historical', duration: '3 hours', price: 200, rating: 4.6, description: 'Explore the Bhool Bhulaiya and the grand architecture.', tags: ['Historical', 'Architecture'], timeOfDay: 'any', difficulty: 'Medium' },
  { id: 'AC012', name: 'Tunday Kababi Dinner', destination: 'Lucknow', category: 'food', duration: '2 hours', price: 500, rating: 4.9, description: 'Taste the world-famous Galouti kebabs.', tags: ['Food', 'Iconic'], timeOfDay: 'evening', difficulty: 'Easy' }
];

export const searchActivities = (destination) => {
  return activities.filter(a => 
    (!destination || a.destination.toLowerCase() === destination.toLowerCase())
  );
};
