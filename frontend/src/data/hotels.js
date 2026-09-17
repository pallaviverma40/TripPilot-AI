const hotels = [
  { id: 'HT001', name: 'The Taj Mahal Hotel', destination: 'Delhi', address: 'Mansingh Road, New Delhi', rating: 5, reviewCount: 2840, pricePerNight: 8500, totalPrice: 0, category: 'Luxury', amenities: ['Pool', 'Gym', 'Spa', 'Restaurant', 'WiFi', 'Parking'], images: [], description: 'Iconic 5-star hotel in the heart of New Delhi.', cancellation: 'Free cancellation before 24h', breakfast: true },
  { id: 'HT002', name: 'Lemon Tree Premier', destination: 'Delhi', address: 'Aerocity, New Delhi', rating: 4, reviewCount: 1520, pricePerNight: 4200, totalPrice: 0, category: 'Standard', amenities: ['Gym', 'Restaurant', 'WiFi'], images: [], description: 'Modern business hotel conveniently located near the airport.', cancellation: 'Non-refundable', breakfast: true },
  { id: 'HT003', name: 'Taj Holiday Village', destination: 'Goa', address: 'Sinquerim, Candolim', rating: 5, reviewCount: 3100, pricePerNight: 12500, totalPrice: 0, category: 'Luxury', amenities: ['Beach Access', 'Pool', 'Spa', 'Bar', 'WiFi'], images: [], description: 'Heritage resort with Goan-Portuguese architecture.', cancellation: 'Free cancellation before 48h', breakfast: true },
  { id: 'HT004', name: 'Zuri White Sands', destination: 'Goa', address: 'Varca Beach', rating: 4, reviewCount: 950, pricePerNight: 6800, totalPrice: 0, category: 'Standard', amenities: ['Pool', 'Casino', 'Restaurant', 'WiFi'], images: [], description: 'Beautiful beachfront resort in South Goa.', cancellation: 'Free cancellation before 24h', breakfast: true },
  { id: 'HT005', name: 'Taj Lands End', destination: 'Mumbai', address: 'Bandra West, Mumbai', rating: 5, reviewCount: 4200, pricePerNight: 11000, totalPrice: 0, category: 'Luxury', amenities: ['Sea View', 'Pool', 'Spa', 'WiFi'], images: [], description: 'Overlooking the Arabian Sea and the Bandra Worli Sea Link.', cancellation: 'Free cancellation before 24h', breakfast: false },
  { id: 'HT006', name: 'Rambagh Palace', destination: 'Jaipur', address: 'Bhawani Singh Road', rating: 5, reviewCount: 2100, pricePerNight: 25000, totalPrice: 0, category: 'Luxury', amenities: ['Palace', 'Pool', 'Spa', 'Royal Dining'], images: [], description: 'Experience the finest traditions of Rajput hospitality.', cancellation: 'Free cancellation before 7 days', breakfast: true },
  { id: 'HT007', name: 'Renaissance Hotel', destination: 'Lucknow', address: 'Gomti Nagar', rating: 5, reviewCount: 890, pricePerNight: 5500, totalPrice: 0, category: 'Luxury', amenities: ['Rooftop Pool', 'Gym', 'Restaurant', 'WiFi'], images: [], description: 'Tallest hotel in Lucknow with spectacular city views.', cancellation: 'Free cancellation before 24h', breakfast: true }
];

export const searchHotels = (destination, checkin, checkout, guests) => {
  return hotels.filter(h => 
    (!destination || h.destination.toLowerCase() === destination.toLowerCase())
  );
};
