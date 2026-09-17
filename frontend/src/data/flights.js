const flights = [
  { id: 'FL001', airline: 'IndiGo', flightNumber: '6E-234', source: 'Lucknow', destination: 'Delhi', departure: '06:30', arrival: '08:00', duration: '1h 30m', price: 4200, stops: 0, class: 'Economy', availableSeats: 45, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL002', airline: 'Air India', flightNumber: 'AI-432', source: 'Lucknow', destination: 'Delhi', departure: '10:00', arrival: '11:45', duration: '1h 45m', price: 4500, stops: 0, class: 'Economy', availableSeats: 30, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },
  { id: 'FL003', airline: 'Vistara', flightNumber: 'UK-991', source: 'Delhi', destination: 'Goa', departure: '07:00', arrival: '09:30', duration: '2h 30m', price: 6500, stops: 0, class: 'Economy', availableSeats: 15, aircraft: 'Boeing 737', baggage: '15kg', meal: true },
  { id: 'FL004', airline: 'SpiceJet', flightNumber: 'SG-112', source: 'Delhi', destination: 'Mumbai', departure: '08:00', arrival: '10:15', duration: '2h 15m', price: 5500, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Boeing 737 Max', baggage: '15kg', meal: false },
  { id: 'FL005', airline: 'Go First', flightNumber: 'G8-332', source: 'Mumbai', destination: 'Goa', departure: '14:00', arrival: '15:15', duration: '1h 15m', price: 3200, stops: 0, class: 'Economy', availableSeats: 20, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL006', airline: 'Akasa Air', flightNumber: 'QP-111', source: 'Lucknow', destination: 'Mumbai', departure: '12:30', arrival: '14:50', duration: '2h 20m', price: 5800, stops: 0, class: 'Economy', availableSeats: 55, aircraft: 'Boeing 737 Max', baggage: '15kg', meal: true },
  { id: 'FL007', airline: 'IndiGo', flightNumber: '6E-543', source: 'Kolkata', destination: 'Delhi', departure: '09:00', arrival: '11:30', duration: '2h 30m', price: 4800, stops: 0, class: 'Economy', availableSeats: 40, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL008', airline: 'Vistara', flightNumber: 'UK-773', source: 'Chennai', destination: 'Delhi', departure: '11:00', arrival: '13:50', duration: '2h 50m', price: 7200, stops: 0, class: 'Economy', availableSeats: 25, aircraft: 'Airbus A320neo', baggage: '15kg', meal: true },
  { id: 'FL009', airline: 'Air India', flightNumber: 'AI-881', source: 'Bangalore', destination: 'Delhi', departure: '16:00', arrival: '18:45', duration: '2h 45m', price: 6800, stops: 0, class: 'Economy', availableSeats: 35, aircraft: 'Boeing 777', baggage: '25kg', meal: true },
  { id: 'FL010', airline: 'IndiGo', flightNumber: '6E-789', source: 'Delhi', destination: 'Jaipur', departure: '06:00', arrival: '07:00', duration: '1h', price: 2500, stops: 0, class: 'Economy', availableSeats: 50, aircraft: 'ATR 72', baggage: '15kg', meal: false },
  { id: 'FL011', airline: 'SpiceJet', flightNumber: 'SG-444', source: 'Jaipur', destination: 'Mumbai', departure: '18:00', arrival: '19:45', duration: '1h 45m', price: 4100, stops: 0, class: 'Economy', availableSeats: 20, aircraft: 'Boeing 737', baggage: '15kg', meal: false },
  { id: 'FL012', airline: 'Vistara', flightNumber: 'UK-812', source: 'Mumbai', destination: 'Bangalore', departure: '09:30', arrival: '11:15', duration: '1h 45m', price: 5100, stops: 0, class: 'Economy', availableSeats: 12, aircraft: 'Airbus A320neo', baggage: '15kg', meal: true },
  { id: 'FL013', airline: 'IndiGo', flightNumber: '6E-101', source: 'Delhi', destination: 'Lucknow', departure: '19:00', arrival: '20:15', duration: '1h 15m', price: 3900, stops: 0, class: 'Economy', availableSeats: 45, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL014', airline: 'Air India', flightNumber: 'AI-102', source: 'Delhi', destination: 'Kolkata', departure: '20:30', arrival: '22:45', duration: '2h 15m', price: 5400, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Airbus A321', baggage: '25kg', meal: true },
  { id: 'FL015', airline: 'Akasa Air', flightNumber: 'QP-202', source: 'Bangalore', destination: 'Mumbai', departure: '14:15', arrival: '16:00', duration: '1h 45m', price: 3800, stops: 0, class: 'Economy', availableSeats: 70, aircraft: 'Boeing 737 Max', baggage: '15kg', meal: true }
];

export const searchFlights = (source, destination, date, passengers) => {
  return flights.filter(f => 
    (!source || f.source.toLowerCase() === source.toLowerCase()) && 
    (!destination || f.destination.toLowerCase() === destination.toLowerCase()) &&
    f.availableSeats >= passengers
  );
};
