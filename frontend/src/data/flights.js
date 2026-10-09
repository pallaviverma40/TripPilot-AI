const flights = [
  // ── Lucknow ↔ Delhi ──
  { id: 'FL001', airline: 'IndiGo', flightNumber: '6E-234', source: 'Lucknow', destination: 'Delhi', departure: '06:30', arrival: '08:00', duration: '1h 30m', price: 4200, stops: 0, class: 'Economy', availableSeats: 45, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL002', airline: 'Air India', flightNumber: 'AI-432', source: 'Lucknow', destination: 'Delhi', departure: '10:00', arrival: '11:45', duration: '1h 45m', price: 4500, stops: 0, class: 'Economy', availableSeats: 30, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },
  { id: 'FL003', airline: 'Vistara', flightNumber: 'UK-991', source: 'Delhi', destination: 'Goa', departure: '07:00', arrival: '09:30', duration: '2h 30m', price: 6500, stops: 0, class: 'Economy', availableSeats: 15, aircraft: 'Boeing 737', baggage: '15kg', meal: true },
  { id: 'FL004', airline: 'SpiceJet', flightNumber: 'SG-112', source: 'Delhi', destination: 'Mumbai', departure: '08:00', arrival: '10:15', duration: '2h 15m', price: 5500, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Boeing 737 Max', baggage: '15kg', meal: false },

  // ── Ayodhya (Heritage & Spiritual) ──
  { id: 'FL030', airline: 'IndiGo', flightNumber: '6E-2412', source: 'Delhi', destination: 'Ayodhya', departure: '07:15', arrival: '08:35', duration: '1h 20m', price: 3850, stops: 0, class: 'Economy', availableSeats: 52, aircraft: 'Airbus A320neo', baggage: '15kg', meal: false },
  { id: 'FL031', airline: 'Air India Express', flightNumber: 'IX-1590', source: 'Delhi', destination: 'Ayodhya', departure: '11:45', arrival: '13:10', duration: '1h 25m', price: 4200, stops: 0, class: 'Economy', availableSeats: 38, aircraft: 'Boeing 737-800', baggage: '20kg', meal: true },
  { id: 'FL032', airline: 'SpiceJet', flightNumber: 'SG-3421', source: 'Mumbai', destination: 'Ayodhya', departure: '08:30', arrival: '10:45', duration: '2h 15m', price: 5400, stops: 0, class: 'Economy', availableSeats: 44, aircraft: 'Boeing 737', baggage: '15kg', meal: false },
  { id: 'FL033', airline: 'Akasa Air', flightNumber: 'QP-1618', source: 'Bangalore', destination: 'Ayodhya', departure: '06:10', arrival: '08:50', duration: '2h 40m', price: 6100, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Boeing 737 MAX', baggage: '15kg', meal: true },
  { id: 'FL034', airline: 'IndiGo', flightNumber: '6E-2413', source: 'Ayodhya', destination: 'Delhi', departure: '14:15', arrival: '15:35', duration: '1h 20m', price: 3850, stops: 0, class: 'Economy', availableSeats: 55, aircraft: 'Airbus A320neo', baggage: '15kg', meal: false },
  { id: 'FL035', airline: 'IndiGo', flightNumber: '6E-2415', source: 'Ahmedabad', destination: 'Ayodhya', departure: '09:00', arrival: '10:55', duration: '1h 55m', price: 4900, stops: 0, class: 'Economy', availableSeats: 34, aircraft: 'Airbus A320', baggage: '15kg', meal: false },

  // ── Varanasi (Kashi & Banaras Ghats) ──
  { id: 'FL036', airline: 'IndiGo', flightNumber: '6E-481', source: 'Delhi', destination: 'Varanasi', departure: '08:15', arrival: '09:40', duration: '1h 25m', price: 4100, stops: 0, class: 'Economy', availableSeats: 42, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL037', airline: 'Air India', flightNumber: 'AI-406', source: 'Delhi', destination: 'Varanasi', departure: '15:30', arrival: '16:55', duration: '1h 25m', price: 4800, stops: 0, class: 'Economy', availableSeats: 28, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },
  { id: 'FL038', airline: 'Vistara', flightNumber: 'UK-631', source: 'Mumbai', destination: 'Varanasi', departure: '07:45', arrival: '10:00', duration: '2h 15m', price: 6200, stops: 0, class: 'Economy', availableSeats: 20, aircraft: 'Airbus A320neo', baggage: '20kg', meal: true },
  { id: 'FL039', airline: 'IndiGo', flightNumber: '6E-892', source: 'Bangalore', destination: 'Varanasi', departure: '10:15', arrival: '12:50', duration: '2h 35m', price: 5900, stops: 0, class: 'Economy', availableSeats: 48, aircraft: 'Airbus A321', baggage: '15kg', meal: false },
  { id: 'FL040', airline: 'SpiceJet', flightNumber: 'SG-704', source: 'Kolkata', destination: 'Varanasi', departure: '13:20', arrival: '14:45', duration: '1h 25m', price: 3700, stops: 0, class: 'Economy', availableSeats: 50, aircraft: 'Boeing 737', baggage: '15kg', meal: false },

  // ── Jammu & Kashmir (Srinagar & Jammu) ──
  { id: 'FL042', airline: 'IndiGo', flightNumber: '6E-2015', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '06:00', arrival: '07:35', duration: '1h 35m', price: 5800, stops: 0, class: 'Economy', availableSeats: 55, aircraft: 'Airbus A320neo', baggage: '15kg', meal: false },
  { id: 'FL043', airline: 'Vistara', flightNumber: 'UK-611', source: 'Delhi', destination: 'Srinagar', departure: '09:30', arrival: '11:05', duration: '1h 35m', price: 7200, stops: 0, class: 'Economy', availableSeats: 22, aircraft: 'Airbus A320neo', baggage: '20kg', meal: true },
  { id: 'FL044', airline: 'Air India', flightNumber: 'AI-825', source: 'Delhi', destination: 'Jammu', departure: '11:15', arrival: '12:35', duration: '1h 20m', price: 4900, stops: 0, class: 'Economy', availableSeats: 30, aircraft: 'Airbus A319', baggage: '25kg', meal: true },
  { id: 'FL045', airline: 'SpiceJet', flightNumber: 'SG-1044', source: 'Mumbai', destination: 'Jammu and Kashmir', departure: '07:10', arrival: '10:10', duration: '3h 00m', price: 8600, stops: 0, class: 'Economy', availableSeats: 35, aircraft: 'Boeing 737', baggage: '15kg', meal: false },

  // ── Raipur (Tribal Culture & Nature) ──
  { id: 'FL047', airline: 'IndiGo', flightNumber: '6E-728', source: 'Delhi', destination: 'Raipur', departure: '07:05', arrival: '08:50', duration: '1h 45m', price: 4600, stops: 0, class: 'Economy', availableSeats: 44, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL048', airline: 'Air India', flightNumber: 'AI-477', source: 'Mumbai', destination: 'Raipur', departure: '10:30', arrival: '12:15', duration: '1h 45m', price: 5200, stops: 0, class: 'Economy', availableSeats: 32, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },
  { id: 'FL049', airline: 'IndiGo', flightNumber: '6E-348', source: 'Kolkata', destination: 'Raipur', departure: '14:50', arrival: '16:20', duration: '1h 30m', price: 3800, stops: 0, class: 'Economy', availableSeats: 50, aircraft: 'Airbus A320', baggage: '15kg', meal: false },

  // ── Karnataka (Bangalore, Mysore, Coorg, Hampi) ──
  { id: 'FL051', airline: 'Vistara', flightNumber: 'UK-811', source: 'Delhi', destination: 'Karnataka', departure: '06:00', arrival: '08:55', duration: '2h 55m', price: 7500, stops: 0, class: 'Economy', availableSeats: 15, aircraft: 'Airbus A320neo', baggage: '20kg', meal: true },
  { id: 'FL052', airline: 'IndiGo', flightNumber: '6E-211', source: 'Delhi', destination: 'Karnataka', departure: '12:30', arrival: '15:20', duration: '2h 50m', price: 6100, stops: 0, class: 'Economy', availableSeats: 40, aircraft: 'Airbus A321', baggage: '15kg', meal: false },
  { id: 'FL053', airline: 'Akasa Air', flightNumber: 'QP-1314', source: 'Mumbai', destination: 'Karnataka', departure: '14:15', arrival: '16:00', duration: '1h 45m', price: 3800, stops: 0, class: 'Economy', availableSeats: 70, aircraft: 'Boeing 737 MAX', baggage: '15kg', meal: true },

  // ── Nainital & Haridwar ──
  { id: 'FL055', airline: 'IndiGo', flightNumber: '6E-7201', source: 'Delhi', destination: 'Haridwar', departure: '07:20', arrival: '08:15', duration: '0h 55m', price: 3200, stops: 0, class: 'Economy', availableSeats: 38, aircraft: 'ATR 72', baggage: '15kg', meal: false },
  { id: 'FL057', airline: 'Alliance Air', flightNumber: '9I-812', source: 'Delhi', destination: 'Nainital', departure: '08:00', arrival: '09:05', duration: '1h 05m', price: 3900, stops: 0, class: 'Economy', availableSeats: 28, aircraft: 'ATR 72', baggage: '15kg', meal: false },
  { id: 'FL058', airline: 'IndiGo', flightNumber: '6E-804', source: 'Lucknow', destination: 'Nainital', departure: '11:20', arrival: '12:35', duration: '1h 15m', price: 3400, stops: 0, class: 'Economy', availableSeats: 30, aircraft: 'ATR 72', baggage: '15kg', meal: false },
];

export const searchFlights = (source, destination, date, passengers) => {
  const src = (source || '').toLowerCase().trim();
  const dst = (destination || '').toLowerCase().trim();

  const res = flights.filter(f => 
    (!src || f.source.toLowerCase().includes(src) || src.includes(f.source.toLowerCase())) && 
    (!dst || f.destination.toLowerCase().includes(dst) || dst.includes(f.destination.toLowerCase()))
  );

  if (res.length === 0 && source && destination) {
    res.push({
      id: 'FL-FALLBACK', airline: 'TripPilot Regional', flightNumber: 'TP-101',
      source, destination, departure: '10:00', arrival: '12:00', duration: '2h 00m',
      price: 4500, stops: 0, class: 'Economy', availableSeats: 50,
      aircraft: 'Airbus A320', baggage: '15kg', meal: false
    });
  }
  return res;
};
