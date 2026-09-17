const trains = [
  {
    id: 'TR001', trainName: 'Lucknow Mail', trainNumber: '12230', source: 'Lucknow', destination: 'Delhi',
    departure: '22:30', arrival: '06:00', duration: '7h 30m', price: 850,
    classes: [
      { type: 'SL', name: 'Sleeper', price: 850, available: 120 },
      { type: '3A', name: 'AC 3 Tier', price: 1850, available: 45 },
      { type: '2A', name: 'AC 2 Tier', price: 2650, available: 20 }
    ], stops: 3, distance: '512km', type: 'Superfast'
  },
  {
    id: 'TR002', trainName: 'Shatabdi Exp', trainNumber: '12003', source: 'Lucknow', destination: 'Delhi',
    departure: '15:35', arrival: '22:15', duration: '6h 40m', price: 1200,
    classes: [
      { type: 'CC', name: 'AC Chair Car', price: 1200, available: 80 },
      { type: 'EC', name: 'Executive Class', price: 2400, available: 15 }
    ], stops: 4, distance: '512km', type: 'Shatabdi'
  },
  {
    id: 'TR003', trainName: 'Rajdhani Exp', trainNumber: '12952', source: 'Delhi', destination: 'Mumbai',
    departure: '16:55', arrival: '08:35', duration: '15h 40m', price: 2800,
    classes: [
      { type: '3A', name: 'AC 3 Tier', price: 2800, available: 50 },
      { type: '2A', name: 'AC 2 Tier', price: 3900, available: 30 },
      { type: '1A', name: 'AC First Class', price: 4700, available: 10 }
    ], stops: 6, distance: '1384km', type: 'Rajdhani'
  },
  {
    id: 'TR004', trainName: 'Goa Express', trainNumber: '12780', source: 'Delhi', destination: 'Goa',
    departure: '15:00', arrival: '06:30', duration: '39h 30m', price: 1100,
    classes: [
      { type: 'SL', name: 'Sleeper', price: 1100, available: 200 },
      { type: '3A', name: 'AC 3 Tier', price: 2900, available: 40 },
      { type: '2A', name: 'AC 2 Tier', price: 4100, available: 15 }
    ], stops: 25, distance: '2150km', type: 'Superfast'
  }
];

export const searchTrains = (source, destination, date, passengers) => {
  return trains.filter(t => 
    (!source || t.source.toLowerCase() === source.toLowerCase()) && 
    (!destination || t.destination.toLowerCase() === destination.toLowerCase())
  );
};
