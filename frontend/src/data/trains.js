export const trains = [
  { id: 'TRN001', name: 'Express 11306', trainNumber: '11306', source: 'Kanpur', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 783, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 27 },
  { id: 'TRN002', name: 'Express 12060', trainNumber: '12060', source: 'Hyderabad', destination: 'Lucknow', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1372, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 25 },
  { id: 'TRN003', name: 'Express 14058', trainNumber: '14058', source: 'Kochi', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1659, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 16 },
  { id: 'TRN004', name: 'Express 11124', trainNumber: '11124', source: 'Bangalore', destination: 'Delhi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1823, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 33 },
  { id: 'TRN005', name: 'Express 11435', trainNumber: '11435', source: 'Jaipur', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 693, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 68 },
  { id: 'TRN006', name: 'Express 18637', trainNumber: '18637', source: 'Delhi', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1896, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 78 },
  { id: 'TRN007', name: 'Express 13766', trainNumber: '13766', source: 'Firozabad', destination: 'Kochi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 614, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 23 },
  { id: 'TRN008', name: 'Express 15776', trainNumber: '15776', source: 'Mumbai', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 576, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 28 },
  { id: 'TRN009', name: 'Express 13199', trainNumber: '13199', source: 'Firozabad', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 947, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 58 },
  { id: 'TRN010', name: 'Express 12245', trainNumber: '12245', source: 'Agra', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1074, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 50 },
  { id: 'TRN011', name: 'Express 14208', trainNumber: '14208', source: 'Mumbai', destination: 'Kanpur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1460, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 92 },
  { id: 'TRN012', name: 'Express 18375', trainNumber: '18375', source: 'Mumbai', destination: 'Firozabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 973, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 19 },
  { id: 'TRN013', name: 'Express 12704', trainNumber: '12704', source: 'Hyderabad', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 594, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 91 },
  { id: 'TRN014', name: 'Express 13765', trainNumber: '13765', source: 'Firozabad', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1058, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 83 },
  { id: 'TRN015', name: 'Express 14794', trainNumber: '14794', source: 'Hyderabad', destination: 'Agra', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1516, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 28 },
  { id: 'TRN016', name: 'Express 15626', trainNumber: '15626', source: 'Firozabad', destination: 'Delhi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1069, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 29 },
  { id: 'TRN017', name: 'Express 13663', trainNumber: '13663', source: 'Bangalore', destination: 'Kanpur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1512, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 57 },
  { id: 'TRN018', name: 'Express 16091', trainNumber: '16091', source: 'Mumbai', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1438, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 74 },
  { id: 'TRN019', name: 'Express 11249', trainNumber: '11249', source: 'Lucknow', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 808, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 44 },
  { id: 'TRN020', name: 'Express 19062', trainNumber: '19062', source: 'Delhi', destination: 'Kochi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1645, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 66 }
];

export const searchTrains = (source, destination, date, passengers) => {
  return trains.filter(t => (!source || t.source.toLowerCase() === source.toLowerCase()) && (!destination || t.destination.toLowerCase() === destination.toLowerCase()));
};
