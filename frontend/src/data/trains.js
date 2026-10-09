export const trains = [
  // ── Ayodhya (Heritage & Spiritual) ──
  { id: 'TRN051', name: 'Vande Bharat Exp', trainNumber: '22425', source: 'Delhi', destination: 'Ayodhya', departure: '06:10', arrival: '14:30', duration: '8h 20m', price: 950, classes: ['CC','EC'], availableSeats: 85, amenities: ["Onboard WiFi","Pantry Car","Charging Point","Bio-Toilets"] },
  { id: 'TRN052', name: 'Ayodhya Express', trainNumber: '14206', source: 'Delhi', destination: 'Ayodhya', departure: '18:20', arrival: '07:15', duration: '12h 55m', price: 380, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 64, amenities: ["E-Catering","Bio-Toilets","Clean Bedding"] },
  { id: 'TRN053', name: 'Saryu Yamuna Exp', trainNumber: '14650', source: 'Lucknow', destination: 'Ayodhya', departure: '06:40', arrival: '09:10', duration: '2h 30m', price: 140, classes: ['Sleeper','3AC','2AC'], availableSeats: 90, amenities: ["Bio-Toilets","Charging Point"] },
  { id: 'TRN054', name: 'Ayodhya Cantt Exp', trainNumber: '22183', source: 'Mumbai', destination: 'Ayodhya', departure: '06:00', arrival: '07:30', duration: '25h 30m', price: 680, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 34, amenities: ["Pantry Car","Clean Bedding","Charging Point"] },

  // ── Haridwar (Ghats & Ashrams) ──
  { id: 'TRN055', name: 'Vande Bharat Exp', trainNumber: '22457', source: 'Delhi', destination: 'Haridwar', departure: '17:50', arrival: '21:35', duration: '3h 45m', price: 750, classes: ['CC','EC'], availableSeats: 80, amenities: ["Onboard WiFi","Meals Included","Clean Coaches"] },
  { id: 'TRN056', name: 'Jan Shatabdi Exp', trainNumber: '12055', source: 'Delhi', destination: 'Haridwar', departure: '15:20', arrival: '19:35', duration: '4h 15m', price: 220, classes: ['CC','2S'], availableSeats: 95, amenities: ["Bio-Toilets","Charging Point"] },
  { id: 'TRN057', name: 'Haridwar Mail', trainNumber: '19031', source: 'Mumbai', destination: 'Haridwar', departure: '11:25', arrival: '12:30', duration: '25h 05m', price: 650, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 40, amenities: ["Pantry Car","Clean Bedding"] },
  { id: 'TRN058', name: 'Kumbh Express', trainNumber: '12369', source: 'Lucknow', destination: 'Haridwar', departure: '08:15', arrival: '15:55', duration: '7h 40m', price: 310, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 55, amenities: ["E-Catering","Bio-Toilets"] },

  // ── Nainital (Nature & Lakes — Kathgodam KGM) ──
  { id: 'TRN059', name: 'Kathgodam Shatabdi', trainNumber: '12040', source: 'Delhi', destination: 'Nainital', departure: '06:20', arrival: '11:40', duration: '5h 20m', price: 680, classes: ['CC','EC'], availableSeats: 70, amenities: ["Meals Included","Pantry Car","Clean Coaches"] },
  { id: 'TRN060', name: 'Ranikhet Express', trainNumber: '15013', source: 'Delhi', destination: 'Nainital', departure: '22:00', arrival: '05:05', duration: '7h 05m', price: 280, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 60, amenities: ["Clean Bedding","Charging Point"] },
  { id: 'TRN061', name: 'Bagh Express', trainNumber: '13019', source: 'Lucknow', destination: 'Nainital', departure: '00:30', arrival: '09:25', duration: '8h 55m', price: 260, classes: ['Sleeper','3AC','2AC'], availableSeats: 50, amenities: ["Bio-Toilets","E-Catering"] },

  // ── Varanasi (Kashi Vishwanath & Banaras) ──
  { id: 'TRN062', name: 'Vande Bharat Exp', trainNumber: '22436', source: 'Delhi', destination: 'Varanasi', departure: '06:00', arrival: '14:00', duration: '8h 00m', price: 1050, classes: ['CC','EC'], availableSeats: 85, amenities: ["Pantry Car","Onboard WiFi","Meals Included"] },
  { id: 'TRN063', name: 'Shiv Ganga Exp', trainNumber: '12560', source: 'Delhi', destination: 'Varanasi', departure: '20:05', arrival: '06:10', duration: '10h 05m', price: 420, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 70, amenities: ["Clean Bedding","Bio-Toilets"] },
  { id: 'TRN064', name: 'Kashi Vishwanath', trainNumber: '15128', source: 'Lucknow', destination: 'Varanasi', departure: '21:15', arrival: '04:40', duration: '7h 25m', price: 210, classes: ['Sleeper','3AC','2AC'], availableSeats: 80, amenities: ["Charging Point","Clean Coaches"] },

  // ── Jammu & Kashmir (Jammu Tawi) ──
  { id: 'TRN065', name: 'Vande Bharat Exp', trainNumber: '22439', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '06:00', arrival: '14:00', duration: '8h 00m', price: 1100, classes: ['CC','EC'], availableSeats: 90, amenities: ["Meals Included","Pantry Car","High Speed"] },
  { id: 'TRN066', name: 'Jammu Rajdhani', trainNumber: '12425', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '20:40', arrival: '05:00', duration: '8h 20m', price: 750, classes: ['3AC','2AC','1AC'], availableSeats: 60, amenities: ["Meals Included","Clean Bedding"] },
  { id: 'TRN067', name: 'Malwa Express', trainNumber: '12919', source: 'Mumbai', destination: 'Jammu and Kashmir', departure: '09:15', arrival: '16:05', duration: '30h 50m', price: 820, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 35, amenities: ["Pantry Car","Clean Bedding"] },

  // ── Raipur (Tribal Culture & Nature) ──
  { id: 'TRN068', name: 'Bilaspur Rajdhani', trainNumber: '12442', source: 'Delhi', destination: 'Raipur', departure: '15:25', arrival: '08:15', duration: '16h 50m', price: 680, classes: ['3AC','2AC','1AC'], availableSeats: 45, amenities: ["Meals Included","Clean Bedding"] },
  { id: 'TRN069', name: 'Chhattisgarh Exp', trainNumber: '18238', source: 'Mumbai', destination: 'Raipur', departure: '00:30', arrival: '19:00', duration: '18h 30m', price: 530, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 50, amenities: ["Pantry Car","Charging Point"] },
  { id: 'TRN070', name: 'Howrah Mail', trainNumber: '12809', source: 'Kolkata', destination: 'Raipur', departure: '20:05', arrival: '08:50', duration: '12h 45m', price: 460, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 60, amenities: ["Clean Bedding","Bio-Toilets"] },

  // ── Karnataka (Bangalore, Mysore, Hampi) ──
  { id: 'TRN071', name: 'Karnataka Exp', trainNumber: '12627', source: 'Delhi', destination: 'Karnataka', departure: '20:15', arrival: '06:30', duration: '34h 15m', price: 750, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 50, amenities: ["E-Catering","Clean Bedding","Pantry Car"] },
  { id: 'TRN072', name: 'Mysore Vande Bharat', trainNumber: '20607', source: 'Chennai', destination: 'Karnataka', departure: '05:50', arrival: '12:20', duration: '6h 30m', price: 780, classes: ['CC','EC'], availableSeats: 85, amenities: ["Meals Included","Pantry Car","Clean Coaches"] },
  { id: 'TRN073', name: 'Hampi Express', trainNumber: '16591', source: 'Bangalore', destination: 'Karnataka', departure: '21:50', arrival: '07:10', duration: '9h 20m', price: 320, classes: ['Sleeper','3AC','2AC','1AC'], availableSeats: 65, amenities: ["Clean Bedding","Bio-Toilets"] },
];

const CLASS_MULTIPLIERS = { Sleeper: 1.0, SL: 1.0, '2S': 0.8, '3AC': 1.8, '2AC': 2.5, '1AC': 3.5, CC: 1.2, EC: 1.6, FC: 2.0 };

function buildClasses(classTypes, basePrice, seats) {
  const seatDist = {
    Sleeper: seats, SL: seats, '2S': seats,
    '3AC': Math.max(8, Math.floor(seats / 3)),
    '2AC': Math.max(4, Math.floor(seats / 5)),
    '1AC': Math.max(2, Math.floor(seats / 10)),
    CC: seats,
    EC: Math.max(4, Math.floor(seats / 2)),
    FC: Math.max(2, Math.floor(seats / 4))
  };
  return (classTypes || ['Sleeper','3AC','2AC']).map(c => ({
    type: c, name: c,
    price: Math.round(basePrice * (CLASS_MULTIPLIERS[c] || 1.0)),
    available: seatDist[c] || Math.max(4, Math.floor(seats / classTypes.length)),
  }));
}

export const searchTrains = (source, destination, date, passengers) => {
  const src = (source || '').toLowerCase().trim();
  const dst = (destination || '').toLowerCase().trim();

  const filtered = trains.filter(t =>
    (!src || t.source.toLowerCase().includes(src) || src.includes(t.source.toLowerCase())) &&
    (!dst || t.destination.toLowerCase().includes(dst) || dst.includes(t.destination.toLowerCase()))
  );

  const results = filtered.map(t => ({
    ...t,
    classes: buildClasses(t.classes, t.price, t.availableSeats || 50),
    base_price: t.price,
    passengers: passengers || 1,
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
      passengers: passengers || 1, travel_date: date, is_demo: true,
    });
  }
  return results;
};
