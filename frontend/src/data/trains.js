export const trains = [
  { id: 'TRN001', name: 'Taj Express', trainNumber: '19951', source: 'Delhi', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2043, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 24, amenities: ["E-Catering", "Clean Bedding", "Charging Point", "Bio-Toilets"] },
  { id: 'TRN002', name: 'Rajdhani Express', trainNumber: '17286', source: 'Lucknow', destination: 'Delhi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1199, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 70, amenities: ["Clean Bedding", "Charging Point"] },
  { id: 'TRN003', name: 'Gomti Express', trainNumber: '18463', source: 'Mumbai', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2230, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 73, amenities: ["Charging Point", "Clean Bedding"] },
  { id: 'TRN004', name: 'Vande Bharat Exp', trainNumber: '13295', source: 'Lucknow', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 803, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 26, amenities: ["Pantry Car", "Bio-Toilets", "Charging Point"] },
  { id: 'TRN005', name: 'Gomti Express', trainNumber: '12419', source: 'Bangalore', destination: 'Agra', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1391, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 94, amenities: ["E-Catering", "Clean Bedding", "Bio-Toilets", "Pantry Car"] },
  { id: 'TRN006', name: 'Vande Bharat Exp', trainNumber: '14648', source: 'Bangalore', destination: 'Delhi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1062, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 91, amenities: ["Pantry Car", "Bio-Toilets", "Charging Point"] },
  { id: 'TRN007', name: 'Duronto Express', trainNumber: '18720', source: 'Kanpur', destination: 'Agra', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 646, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 56, amenities: ["E-Catering", "Bio-Toilets"] },
  { id: 'TRN008', name: 'Duronto Express', trainNumber: '19822', source: 'Varanasi', destination: 'Agra', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2374, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 79, amenities: ["E-Catering", "Bio-Toilets", "Charging Point", "Pantry Car"] },
  { id: 'TRN009', name: 'Rajdhani Express', trainNumber: '13986', source: 'Lucknow', destination: 'Firozabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 641, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 45, amenities: ["E-Catering", "Charging Point", "Bio-Toilets"] },
  { id: 'TRN010', name: 'Kalindi Express', trainNumber: '16098', source: 'Bangalore', destination: 'Pune', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 835, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 56, amenities: ["Bio-Toilets", "Charging Point", "E-Catering"] },
  { id: 'TRN011', name: 'Shatabdi Express', trainNumber: '11591', source: 'Hyderabad', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 944, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 32, amenities: ["Bio-Toilets", "Clean Bedding"] },
  { id: 'TRN012', name: 'Intercity Exp', trainNumber: '14519', source: 'Delhi', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 693, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 89, amenities: ["Clean Bedding", "Charging Point"] },
  { id: 'TRN013', name: 'Taj Express', trainNumber: '19351', source: 'Hyderabad', destination: 'Lucknow', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1378, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 12, amenities: ["E-Catering", "Clean Bedding", "Charging Point"] },
  { id: 'TRN014', name: 'Kalindi Express', trainNumber: '19465', source: 'Varanasi', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 490, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 12, amenities: ["Bio-Toilets", "E-Catering", "Pantry Car"] },
  { id: 'TRN015', name: 'Duronto Express', trainNumber: '17876', source: 'Jaipur', destination: 'Delhi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 447, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 76, amenities: ["Bio-Toilets", "Pantry Car", "Charging Point", "E-Catering"] },
  { id: 'TRN016', name: 'Kalindi Express', trainNumber: '16703', source: 'Pune', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1694, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 99, amenities: ["Bio-Toilets", "Pantry Car", "Charging Point"] },
  { id: 'TRN017', name: 'Rajdhani Express', trainNumber: '17546', source: 'Bangalore', destination: 'Firozabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1683, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 83, amenities: ["Pantry Car", "Clean Bedding", "E-Catering"] },
  { id: 'TRN018', name: 'Shatabdi Express', trainNumber: '13605', source: 'Lucknow', destination: 'Kanpur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2303, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 41, amenities: ["E-Catering", "Bio-Toilets", "Charging Point"] },
  { id: 'TRN019', name: 'Duronto Express', trainNumber: '14527', source: 'Firozabad', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 891, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 65, amenities: ["Bio-Toilets", "E-Catering", "Charging Point"] },
  { id: 'TRN020', name: 'Vande Bharat Exp', trainNumber: '15025', source: 'Bangalore', destination: 'Pune', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 887, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 34, amenities: ["Bio-Toilets", "Pantry Car"] },
  { id: 'TRN021', name: 'Kalindi Express', trainNumber: '16112', source: 'Varanasi', destination: 'Kochi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1249, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 28, amenities: ["Bio-Toilets", "Charging Point", "E-Catering", "Pantry Car"] },
  { id: 'TRN022', name: 'Gomti Express', trainNumber: '15792', source: 'Pune', destination: 'Kochi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 502, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 68, amenities: ["Clean Bedding", "Charging Point", "Bio-Toilets", "Pantry Car"] },
  { id: 'TRN023', name: 'Intercity Exp', trainNumber: '15549', source: 'Firozabad', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1337, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 53, amenities: ["Pantry Car", "Charging Point", "Clean Bedding", "Bio-Toilets"] },
  { id: 'TRN024', name: 'Rajdhani Express', trainNumber: '14677', source: 'Kochi', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1069, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 68, amenities: ["Bio-Toilets", "E-Catering", "Clean Bedding", "Charging Point"] },
  { id: 'TRN025', name: 'Shatabdi Express', trainNumber: '18613', source: 'Bangalore', destination: 'Pune', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2373, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 87, amenities: ["Charging Point", "Pantry Car", "Clean Bedding"] },
  { id: 'TRN026', name: 'Vande Bharat Exp', trainNumber: '11937', source: 'Kochi', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1536, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 29, amenities: ["Charging Point", "E-Catering", "Pantry Car", "Bio-Toilets"] },
  { id: 'TRN027', name: 'Rajdhani Express', trainNumber: '18965', source: 'Agra', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1703, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 21, amenities: ["E-Catering", "Charging Point", "Bio-Toilets", "Clean Bedding"] },
  { id: 'TRN028', name: 'Taj Express', trainNumber: '19623', source: 'Bangalore', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1154, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 29, amenities: ["Charging Point", "Pantry Car", "Bio-Toilets", "Clean Bedding"] },
  { id: 'TRN029', name: 'Intercity Exp', trainNumber: '19510', source: 'Varanasi', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1279, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 48, amenities: ["Clean Bedding", "Pantry Car", "E-Catering", "Bio-Toilets"] },
  { id: 'TRN030', name: 'Shatabdi Express', trainNumber: '12080', source: 'Mumbai', destination: 'Firozabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2076, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 58, amenities: ["Clean Bedding", "Pantry Car", "E-Catering", "Bio-Toilets"] },
  { id: 'TRN031', name: 'Intercity Exp', trainNumber: '17131', source: 'Agra', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2013, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 75, amenities: ["Clean Bedding", "Bio-Toilets", "Pantry Car"] },
  { id: 'TRN032', name: 'Duronto Express', trainNumber: '14442', source: 'Jaipur', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2253, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 31, amenities: ["Pantry Car", "E-Catering", "Clean Bedding", "Bio-Toilets"] },
  { id: 'TRN033', name: 'Gomti Express', trainNumber: '17380', source: 'Agra', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1511, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 24, amenities: ["Clean Bedding", "Pantry Car"] },
  { id: 'TRN034', name: 'Duronto Express', trainNumber: '14116', source: 'Pune', destination: 'Agra', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1165, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 71, amenities: ["E-Catering", "Pantry Car", "Bio-Toilets"] },
  { id: 'TRN035', name: 'Gomti Express', trainNumber: '18914', source: 'Lucknow', destination: 'Kochi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1302, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 11, amenities: ["E-Catering", "Clean Bedding"] },
  { id: 'TRN036', name: 'Rajdhani Express', trainNumber: '18147', source: 'Varanasi', destination: 'Lucknow', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1178, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 74, amenities: ["Charging Point", "Clean Bedding", "Pantry Car", "Bio-Toilets"] },
  { id: 'TRN037', name: 'Kalindi Express', trainNumber: '19239', source: 'Pune', destination: 'Kochi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 683, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 99, amenities: ["Charging Point", "Bio-Toilets", "Clean Bedding", "E-Catering"] },
  { id: 'TRN038', name: 'Taj Express', trainNumber: '15762', source: 'Delhi', destination: 'Varanasi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 853, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 66, amenities: ["Charging Point", "E-Catering", "Bio-Toilets", "Clean Bedding"] },
  { id: 'TRN039', name: 'Shatabdi Express', trainNumber: '11612', source: 'Varanasi', destination: 'Agra', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1515, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 58, amenities: ["E-Catering", "Clean Bedding"] },
  { id: 'TRN040', name: 'Rajdhani Express', trainNumber: '11482', source: 'Bangalore', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1352, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 40, amenities: ["Clean Bedding", "Bio-Toilets", "Charging Point", "Pantry Car"] },
  { id: 'TRN041', name: 'Rajdhani Express', trainNumber: '13191', source: 'Firozabad', destination: 'Mumbai', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 350, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 93, amenities: ["Bio-Toilets", "Clean Bedding", "E-Catering", "Charging Point"] },
  { id: 'TRN042', name: 'Taj Express', trainNumber: '14553', source: 'Delhi', destination: 'Jaipur', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1517, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 12, amenities: ["Clean Bedding", "Bio-Toilets", "E-Catering"] },
  { id: 'TRN043', name: 'Intercity Exp', trainNumber: '17600', source: 'Mumbai', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1856, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 90, amenities: ["Pantry Car", "Clean Bedding", "E-Catering", "Charging Point"] },
  { id: 'TRN044', name: 'Taj Express', trainNumber: '12990', source: 'Kochi', destination: 'Varanasi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 501, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 80, amenities: ["Charging Point", "Clean Bedding", "E-Catering"] },
  { id: 'TRN045', name: 'Kalindi Express', trainNumber: '11336', source: 'Delhi', destination: 'Bangalore', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2256, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 48, amenities: ["Bio-Toilets", "Pantry Car"] },
  { id: 'TRN046', name: 'Shatabdi Express', trainNumber: '13910', source: 'Lucknow', destination: 'Delhi', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2498, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 27, amenities: ["Bio-Toilets", "Charging Point", "E-Catering", "Clean Bedding"] },
  { id: 'TRN047', name: 'Gomti Express', trainNumber: '13198', source: 'Hyderabad', destination: 'Firozabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1861, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 89, amenities: ["Clean Bedding", "E-Catering", "Pantry Car"] },
  { id: 'TRN048', name: 'Kalindi Express', trainNumber: '11197', source: 'Hyderabad', destination: 'Pune', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 1612, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 11, amenities: ["Charging Point", "E-Catering", "Bio-Toilets"] },
  { id: 'TRN049', name: 'Taj Express', trainNumber: '13094', source: 'Agra', destination: 'Hyderabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 399, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 43, amenities: ["Charging Point", "Bio-Toilets", "Clean Bedding", "E-Catering"] },
  { id: 'TRN050', name: 'Gomti Express', trainNumber: '16787', source: 'Pune', destination: 'Firozabad', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: 2398, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 55, amenities: ["E-Catering", "Charging Point", "Bio-Toilets", "Pantry Car"] }
];

const CLASS_MULTIPLIERS = { Sleeper: 1.0, '3AC': 1.8, '2AC': 2.5, '1AC': 3.5, CC: 1.2, EC: 1.6, FC: 2.0, SL: 1.0 };

function buildClasses(classTypes, basePrice, seats) {
  const seatDist = { Sleeper: seats, SL: seats, '3AC': Math.max(8, Math.floor(seats/3)), '2AC': Math.max(4, Math.floor(seats/5)), '1AC': Math.max(2, Math.floor(seats/10)), CC: seats, EC: Math.max(4, Math.floor(seats/2)), FC: Math.max(2, Math.floor(seats/4)) };
  return classTypes.map(c => ({
    type: c, name: c,
    price: Math.round(basePrice * (CLASS_MULTIPLIERS[c] || 1.0)),
    available: seatDist[c] || Math.max(4, Math.floor(seats / classTypes.length)),
  }));
}

export const searchTrains = (source, destination, date, passengers) => {
  const filtered = trains.filter(t =>
    (!source || t.source.toLowerCase().includes(source.toLowerCase()) || source.toLowerCase().includes(t.source.toLowerCase())) &&
    (!destination || t.destination.toLowerCase().includes(destination.toLowerCase()) || destination.toLowerCase().includes(t.destination.toLowerCase()))
  );
  const results = filtered.map(t => ({
    ...t,
    classes: buildClasses(t.classes, t.price, t.availableSeats || 50),
    base_price: t.price,
    passengers,
    travel_date: date,
    is_demo: true,
  }));
  if (results.length === 0 && source && destination) {
    const base = 450;
    results.push({
      id: 'TRN-FALLBACK', name: 'TripPilot Express', trainNumber: '19900',
      source, destination, departure: '08:00', arrival: '20:00', duration: '12h 00m',
      price: base, base_price: base,
      classes: buildClasses(['Sleeper','3AC','2AC','1AC'], base, 100),
      availableSeats: 100, amenities: ['Clean Bedding','Pantry Car'],
      passengers, travel_date: date, is_demo: true,
    });
  }
  return results;
};
