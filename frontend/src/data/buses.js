const buses = [
  { id: 'BU001', operator: 'RedBus Travels', busType: 'AC Sleeper', source: 'Lucknow', destination: 'Delhi', departure: '21:00', arrival: '07:00', duration: '10h', price: 950, totalSeats: 40, availableSeats: 22, rating: 4.2, amenities: ['WiFi', 'Charging Point', 'Blanket'], boardingPoint: 'Amausi', droppingPoint: 'Kashmere Gate ISBT' },
  { id: 'BU002', operator: 'IntrCity SmartBus', busType: 'Volvo AC Seater', source: 'Lucknow', destination: 'Delhi', departure: '22:30', arrival: '06:30', duration: '8h', price: 1200, totalSeats: 45, availableSeats: 15, rating: 4.5, amenities: ['Water Bottle', 'Charging Point', 'Blanket', 'Reading Light'], boardingPoint: 'Alambagh', droppingPoint: 'Anand Vihar' },
  { id: 'BU003', operator: 'Zingbus', busType: 'Premium AC Sleeper', source: 'Delhi', destination: 'Jaipur', departure: '06:00', arrival: '11:00', duration: '5h', price: 650, totalSeats: 36, availableSeats: 30, rating: 4.0, amenities: ['WiFi', 'Charging Point'], boardingPoint: 'Dhaula Kuan', droppingPoint: 'Sindhi Camp' },
  { id: 'BU004', operator: 'Neeta Travels', busType: 'Volvo AC Sleeper', source: 'Mumbai', destination: 'Goa', departure: '19:00', arrival: '07:00', duration: '12h', price: 1500, totalSeats: 30, availableSeats: 10, rating: 4.3, amenities: ['Blanket', 'Charging Point', 'Movie'], boardingPoint: 'Borivali', droppingPoint: 'Panjim' }
];

export const searchBuses = (source, destination, date, passengers) => {
  return buses.filter(b => 
    (!source || b.source.toLowerCase() === source.toLowerCase()) && 
    (!destination || b.destination.toLowerCase() === destination.toLowerCase()) &&
    b.availableSeats >= passengers
  );
};
