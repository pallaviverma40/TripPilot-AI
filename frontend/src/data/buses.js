export const buses = [
  { id: 'BUS001', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Delhi', destination: 'Hyderabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 647, availableSeats: 23 },
  { id: 'BUS002', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Hyderabad', destination: 'Bangalore', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1312, availableSeats: 31 },
  { id: 'BUS003', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Hyderabad', destination: 'Delhi', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 860, availableSeats: 16 },
  { id: 'BUS004', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Bangalore', destination: 'Jaipur', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1283, availableSeats: 39 },
  { id: 'BUS005', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Firozabad', destination: 'Bangalore', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1352, availableSeats: 17 },
  { id: 'BUS006', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Mumbai', destination: 'Firozabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 981, availableSeats: 15 },
  { id: 'BUS007', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Mumbai', destination: 'Hyderabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 802, availableSeats: 24 },
  { id: 'BUS008', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Firozabad', destination: 'Bangalore', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1401, availableSeats: 32 },
  { id: 'BUS009', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Bangalore', destination: 'Delhi', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1020, availableSeats: 36 },
  { id: 'BUS010', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Lucknow', destination: 'Firozabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1217, availableSeats: 11 },
  { id: 'BUS011', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Hyderabad', destination: 'Jaipur', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1374, availableSeats: 27 },
  { id: 'BUS012', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Bangalore', destination: 'Mumbai', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1047, availableSeats: 15 },
  { id: 'BUS013', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Hyderabad', destination: 'Bangalore', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1392, availableSeats: 8 },
  { id: 'BUS014', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Hyderabad', destination: 'Kanpur', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 842, availableSeats: 7 },
  { id: 'BUS015', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Kochi', destination: 'Firozabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 970, availableSeats: 8 },
  { id: 'BUS016', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Jaipur', destination: 'Hyderabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1344, availableSeats: 7 },
  { id: 'BUS017', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Bangalore', destination: 'Jaipur', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 930, availableSeats: 5 },
  { id: 'BUS018', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Jaipur', destination: 'Firozabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 649, availableSeats: 32 },
  { id: 'BUS019', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Kanpur', destination: 'Hyderabad', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 1053, availableSeats: 38 },
  { id: 'BUS020', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: 'Agra', destination: 'Kanpur', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: 772, availableSeats: 32 }
];

export const searchBuses = (source, destination, date, passengers) => {
  return buses.filter(b => (!source || b.source.toLowerCase() === source.toLowerCase()) && (!destination || b.destination.toLowerCase() === destination.toLowerCase()));
};
