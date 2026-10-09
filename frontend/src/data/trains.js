/**
 * Train Service — Dynamic & Tiered Indian Railway Pricing
 * Calculates realistic rail distances, durations by train category,
 * and structured class pricing (Sleeper ₹300–₹500, 3AC ₹800–₹1200, 2AC ₹1200–₹1800, 1AC ₹1900–₹2500).
 */

import { getRouteMetrics, calculateTrainTierPrices } from './routeCalculator';

const RAW_TRAINS = [
  // ── Ayodhya (Heritage & Spiritual) ──
  { id: 'TRN051', name: 'Ayodhya Vande Bharat', trainNumber: '22425', source: 'Delhi', destination: 'Ayodhya', departure: '06:10', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 85, amenities: ["Onboard WiFi", "Pantry Car", "Charging Point", "Bio-Toilets"] },
  { id: 'TRN052', name: 'Ayodhya Express', trainNumber: '14206', source: 'Delhi', destination: 'Ayodhya', departure: '18:20', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 64, amenities: ["E-Catering", "Bio-Toilets", "Clean Bedding"] },
  { id: 'TRN053', name: 'Saryu Yamuna Exp', trainNumber: '14650', source: 'Lucknow', destination: 'Ayodhya', departure: '06:40', type: 'express', class_types: ['Sleeper', '3AC', '2AC'], availableSeats: 90, amenities: ["Bio-Toilets", "Charging Point"] },
  { id: 'TRN054', name: 'Ayodhya Cantt SF Exp', trainNumber: '22183', source: 'Mumbai', destination: 'Ayodhya', departure: '06:00', type: 'rajdhani', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 34, amenities: ["Pantry Car", "Clean Bedding", "Charging Point"] },

  // ── Haridwar (Ghats & Ashrams) ──
  { id: 'TRN055', name: 'Haridwar Vande Bharat', trainNumber: '22457', source: 'Delhi', destination: 'Haridwar', departure: '17:50', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 80, amenities: ["Onboard WiFi", "Meals Included", "Clean Coaches"] },
  { id: 'TRN056', name: 'Jan Shatabdi Exp', trainNumber: '12055', source: 'Delhi', destination: 'Haridwar', departure: '15:20', type: 'express', class_types: ['CC', 'Sleeper'], availableSeats: 95, amenities: ["Bio-Toilets", "Charging Point"] },
  { id: 'TRN057', name: 'Haridwar Mail', trainNumber: '19031', source: 'Mumbai', destination: 'Haridwar', departure: '11:25', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 40, amenities: ["Pantry Car", "Clean Bedding"] },
  { id: 'TRN058', name: 'Kumbh Express', trainNumber: '12369', source: 'Lucknow', destination: 'Haridwar', departure: '08:15', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 55, amenities: ["E-Catering", "Bio-Toilets"] },

  // ── Nainital (Nature & Lakes — via Kathgodam KGM) ──
  { id: 'TRN059', name: 'Kathgodam Shatabdi', trainNumber: '12040', source: 'Delhi', destination: 'Nainital', departure: '06:20', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 70, amenities: ["Meals Included", "Pantry Car", "Clean Coaches"] },
  { id: 'TRN060', name: 'Ranikhet Express', trainNumber: '15013', source: 'Delhi', destination: 'Nainital', departure: '22:00', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 60, amenities: ["Clean Bedding", "Charging Point"] },
  { id: 'TRN061', name: 'Bagh Express', trainNumber: '13019', source: 'Lucknow', destination: 'Nainital', departure: '00:30', type: 'express', class_types: ['Sleeper', '3AC', '2AC'], availableSeats: 50, amenities: ["Bio-Toilets", "E-Catering"] },

  // ── Varanasi (Kashi Vishwanath & Banaras) ──
  { id: 'TRN062', name: 'Varanasi Vande Bharat', trainNumber: '22436', source: 'Delhi', destination: 'Varanasi', departure: '06:00', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 85, amenities: ["Pantry Car", "Onboard WiFi", "Meals Included"] },
  { id: 'TRN063', name: 'Shiv Ganga Superfast', trainNumber: '12560', source: 'Delhi', destination: 'Varanasi', departure: '20:05', type: 'rajdhani', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 70, amenities: ["Clean Bedding", "Bio-Toilets"] },
  { id: 'TRN064', name: 'Kashi Vishwanath Exp', trainNumber: '15128', source: 'Lucknow', destination: 'Varanasi', departure: '21:15', type: 'express', class_types: ['Sleeper', '3AC', '2AC'], availableSeats: 80, amenities: ["Charging Point", "Clean Coaches"] },

  // ── Jammu & Kashmir (Jammu Tawi JAT) ──
  { id: 'TRN065', name: 'Vande Bharat Express', trainNumber: '22439', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '06:00', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 90, amenities: ["Meals Included", "Pantry Car", "High Speed"] },
  { id: 'TRN066', name: 'Jammu Rajdhani', trainNumber: '12425', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '20:40', type: 'rajdhani', class_types: ['3AC', '2AC', '1AC'], availableSeats: 60, amenities: ["Meals Included", "Clean Bedding"] },
  { id: 'TRN067', name: 'Malwa Express', trainNumber: '12919', source: 'Mumbai', destination: 'Jammu and Kashmir', departure: '09:15', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 35, amenities: ["Pantry Car", "Clean Bedding"] },

  // ── Raipur (Tribal Culture & Nature) ──
  { id: 'TRN068', name: 'Bilaspur Rajdhani', trainNumber: '12442', source: 'Delhi', destination: 'Raipur', departure: '15:25', type: 'rajdhani', class_types: ['3AC', '2AC', '1AC'], availableSeats: 45, amenities: ["Meals Included", "Clean Bedding"] },
  { id: 'TRN069', name: 'Chhattisgarh Express', trainNumber: '18238', source: 'Mumbai', destination: 'Raipur', departure: '00:30', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 50, amenities: ["Pantry Car", "Charging Point"] },
  { id: 'TRN070', name: 'Howrah Mail', trainNumber: '12809', source: 'Kolkata', destination: 'Raipur', departure: '20:05', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 60, amenities: ["Clean Bedding", "Bio-Toilets"] },

  // ── Karnataka (Bangalore, Mysore, Hampi) ──
  { id: 'TRN071', name: 'Karnataka Express', trainNumber: '12627', source: 'Delhi', destination: 'Karnataka', departure: '20:15', type: 'rajdhani', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 50, amenities: ["E-Catering", "Clean Bedding", "Pantry Car"] },
  { id: 'TRN072', name: 'Mysore Vande Bharat', trainNumber: '20607', source: 'Chennai', destination: 'Karnataka', departure: '05:50', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 85, amenities: ["Meals Included", "Pantry Car", "Clean Coaches"] },
  { id: 'TRN073', name: 'Hampi Express', trainNumber: '16591', source: 'Bangalore', destination: 'Karnataka', departure: '21:50', type: 'express', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 65, amenities: ["Clean Bedding", "Bio-Toilets"] },

  // ── Delhi ↔ Lucknow / Mumbai ──
  { id: 'TRN001', name: 'Lucknow Shatabdi', trainNumber: '12004', source: 'Delhi', destination: 'Lucknow', departure: '06:10', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 75, amenities: ["Meals Included", "WiFi", "Charging Point"] },
  { id: 'TRN002', name: 'Lucknow Mail', trainNumber: '12230', source: 'Delhi', destination: 'Lucknow', departure: '22:00', type: 'rajdhani', class_types: ['Sleeper', '3AC', '2AC', '1AC'], availableSeats: 85, amenities: ["Clean Bedding", "E-Catering"] },
  { id: 'TRN003', name: 'Tejas Express', trainNumber: '82502', source: 'Delhi', destination: 'Lucknow', departure: '15:40', type: 'vande_bharat', class_types: ['CC', 'EC'], availableSeats: 60, amenities: ["Infotainment", "Meals Included"] },
  { id: 'TRN012', name: 'Mumbai Rajdhani', trainNumber: '12951', source: 'Delhi', destination: 'Mumbai', departure: '16:55', type: 'rajdhani', class_types: ['3AC', '2AC', '1AC'], availableSeats: 81, amenities: ["Meals Included", "Clean Bedding", "Charging Point"] },
  { id: 'TRN013', name: 'August Kranti Rajdhani', trainNumber: '12954', source: 'Delhi', destination: 'Mumbai', departure: '17:15', type: 'rajdhani', class_types: ['3AC', '2AC', '1AC'], availableSeats: 65, amenities: ["Meals Included", "Pantry Car"] }
];

function formatArrival(depTime, durMins) {
  const [h, m] = depTime.split(':').map(Number);
  const arrMins = h * 60 + m + durMins;
  const arrH = Math.floor(arrMins / 60) % 24;
  const arrM = arrMins % 60;
  const days = Math.floor(arrMins / (24 * 60));
  const daySuffix = days > 0 ? `+${days}` : '';
  return `${arrH.toString().padStart(2, '0')}:${arrM.toString().padStart(2, '0')}${daySuffix}`;
}

function buildTrainObject(t, source, destination, date, passengers) {
  const metrics = getRouteMetrics(source, destination);
  const railKm = metrics.rail_km;
  const tType = t.type || 'express';

  let duration;
  let durMins;
  if (tType === 'vande_bharat') {
    duration = metrics.train_durations.vande_bharat;
    durMins = Math.round((railKm / 78.0) * 60);
  } else if (tType === 'rajdhani') {
    duration = metrics.train_durations.rajdhani;
    durMins = Math.round((railKm / 68.0) * 60);
  } else {
    duration = metrics.train_durations.express;
    durMins = Math.round((railKm / 52.0) * 60);
  }

  const priceMap = calculateTrainTierPrices(railKm, t.name || '');
  const classTypes = t.class_types || ['Sleeper', '3AC', '2AC', '1AC'];
  const seats = t.availableSeats || 60;

  const classes = classTypes.map(c => ({
    type: c,
    name: c,
    price: priceMap[c] || priceMap.base || 350,
    available: Math.max(4, c === 'Sleeper' || c === 'CC' ? seats : Math.floor(seats / 2)),
  }));

  const dep = t.departure || '08:00';
  const arr = formatArrival(dep, durMins);

  return {
    id: t.id,
    name: t.name,
    trainNumber: t.trainNumber || '12000',
    source: t.source || source,
    destination: t.destination || destination,
    departure: dep,
    arrival: arr,
    duration,
    distance: `${railKm} km`,
    price: classes[0] ? classes[0].price : priceMap.base,
    base_price: priceMap.base || 350,
    classes,
    availableSeats: seats,
    amenities: t.amenities || ['Clean Bedding', 'Bio-Toilets', 'Charging Point'],
    passengers: passengers || 1,
    travel_date: date,
    is_demo: true,
  };
}

export const searchTrains = (source, destination, date, passengers) => {
  const src = (source || '').toLowerCase().trim();
  const dst = (destination || '').toLowerCase().trim();

  const matched = [];
  for (const t of RAW_TRAINS) {
    const tSrc = t.source.toLowerCase();
    const tDst = t.destination.toLowerCase();
    if ((src.includes(tSrc) || tSrc.includes(src)) && (dst.includes(tDst) || tDst.includes(dst))) {
      matched.push(buildTrainObject(t, t.source, t.destination, date, passengers));
    }
  }

  if (matched.length === 0 && source && destination) {
    const dynamicOptions = [
      {
        id: `TRN-${source.slice(0, 3).toUpperCase()}1`,
        name: `${destination} Superfast Express`,
        trainNumber: '12901',
        departure: '06:30',
        type: 'rajdhani',
        class_types: ['Sleeper', '3AC', '2AC', '1AC'],
        availableSeats: 80,
        amenities: ['Pantry Car', 'Clean Bedding', 'Charging Point', 'Bio-Toilets']
      },
      {
        id: `TRN-${source.slice(0, 3).toUpperCase()}2`,
        name: `${destination} Vande Bharat Exp`,
        trainNumber: '20801',
        departure: '14:15',
        type: 'vande_bharat',
        class_types: ['CC', 'EC'],
        availableSeats: 75,
        amenities: ['Onboard WiFi', 'Meals Included', 'Bio-Toilets', 'Infotainment']
      },
      {
        id: `TRN-${source.slice(0, 3).toUpperCase()}3`,
        name: `${source}-${destination} Overnight Mail`,
        trainNumber: '14055',
        departure: '21:45',
        type: 'express',
        class_types: ['Sleeper', '3AC', '2AC'],
        availableSeats: 95,
        amenities: ['E-Catering', 'Clean Bedding', 'Bio-Toilets']
      }
    ];

    for (const opt of dynamicOptions) {
      matched.push(buildTrainObject(opt, source, destination, date, passengers));
    }
  }

  return matched;
};

export const trains = RAW_TRAINS;
