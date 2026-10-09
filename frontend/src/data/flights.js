/**
 * Flight Service — Dynamic & Tiered Flight Pricing
 * Calculates realistic aerial distances, flight durations (~50m - 2h 45m),
 * and realistic economy fares starting around ₹3,500–₹5,500 based on Indian route metrics.
 */

import { getRouteMetrics, calculateFlightBaseFare } from './routeCalculator';

const RAW_FLIGHTS = [
  // ── Lucknow ↔ Delhi ──
  { id: 'FL001', airline: 'IndiGo', flightNumber: '6E-234', source: 'Lucknow', destination: 'Delhi', departure: '06:30', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 45, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL002', airline: 'Air India', flightNumber: 'AI-432', source: 'Lucknow', destination: 'Delhi', departure: '10:00', price_offset: 600, stops: 0, class: 'Economy', availableSeats: 30, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },
  { id: 'FL003', airline: 'SpiceJet', flightNumber: 'SG-112', source: 'Delhi', destination: 'Lucknow', departure: '14:20', price_offset: -200, stops: 0, class: 'Economy', availableSeats: 58, aircraft: 'Boeing 737 MAX', baggage: '15kg', meal: false },

  // ── Delhi ↔ Goa ──
  { id: 'FL005', airline: 'IndiGo', flightNumber: '6E-711', source: 'Delhi', destination: 'Goa', departure: '07:00', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Airbus A321', baggage: '15kg', meal: false },
  { id: 'FL006', airline: 'Air India', flightNumber: 'AI-661', source: 'Delhi', destination: 'Goa', departure: '11:30', price_offset: 800, stops: 0, class: 'Economy', availableSeats: 28, aircraft: 'Airbus A319', baggage: '25kg', meal: true },

  // ── Delhi ↔ Mumbai ──
  { id: 'FL013', airline: 'Air India', flightNumber: 'AI-101', source: 'Delhi', destination: 'Mumbai', departure: '06:00', price_offset: 700, stops: 0, class: 'Economy', availableSeats: 22, aircraft: 'Boeing 787', baggage: '25kg', meal: true },
  { id: 'FL014', airline: 'IndiGo', flightNumber: '6E-601', source: 'Delhi', destination: 'Mumbai', departure: '10:00', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 48, aircraft: 'Airbus A321', baggage: '15kg', meal: false },

  // ── Ayodhya (Heritage & Spiritual) ──
  { id: 'FL030', airline: 'IndiGo', flightNumber: '6E-2412', source: 'Delhi', destination: 'Ayodhya', departure: '07:15', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 52, aircraft: 'Airbus A320neo', baggage: '15kg', meal: false },
  { id: 'FL031', airline: 'Air India Express', flightNumber: 'IX-1590', source: 'Delhi', destination: 'Ayodhya', departure: '11:45', price_offset: 300, stops: 0, class: 'Economy', availableSeats: 38, aircraft: 'Boeing 737-800', baggage: '20kg', meal: true },
  { id: 'FL032', airline: 'SpiceJet', flightNumber: 'SG-3421', source: 'Mumbai', destination: 'Ayodhya', departure: '08:30', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 44, aircraft: 'Boeing 737', baggage: '15kg', meal: false },
  { id: 'FL033', airline: 'Akasa Air', flightNumber: 'QP-1618', source: 'Bangalore', destination: 'Ayodhya', departure: '06:10', price_offset: 200, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Boeing 737 MAX', baggage: '15kg', meal: true },

  // ── Varanasi (Kashi & Banaras Ghats) ──
  { id: 'FL036', airline: 'IndiGo', flightNumber: '6E-481', source: 'Delhi', destination: 'Varanasi', departure: '08:15', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 42, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL037', airline: 'Air India', flightNumber: 'AI-406', source: 'Delhi', destination: 'Varanasi', departure: '15:30', price_offset: 600, stops: 0, class: 'Economy', availableSeats: 28, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },
  { id: 'FL038', airline: 'Vistara', flightNumber: 'UK-631', source: 'Mumbai', destination: 'Varanasi', departure: '07:45', price_offset: 800, stops: 0, class: 'Economy', availableSeats: 20, aircraft: 'Airbus A320neo', baggage: '20kg', meal: true },
  { id: 'FL039', airline: 'IndiGo', flightNumber: '6E-892', source: 'Bangalore', destination: 'Varanasi', departure: '10:15', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 48, aircraft: 'Airbus A321', baggage: '15kg', meal: false },

  // ── Jammu & Kashmir (Srinagar SXR / Jammu IXJ) ──
  { id: 'FL042', airline: 'IndiGo', flightNumber: '6E-2015', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '06:00', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 55, aircraft: 'Airbus A320neo', baggage: '15kg', meal: false },
  { id: 'FL043', airline: 'Vistara', flightNumber: 'UK-611', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '09:30', price_offset: 900, stops: 0, class: 'Economy', availableSeats: 22, aircraft: 'Airbus A320neo', baggage: '20kg', meal: true },
  { id: 'FL045', airline: 'SpiceJet', flightNumber: 'SG-1044', source: 'Mumbai', destination: 'Jammu and Kashmir', departure: '07:10', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 35, aircraft: 'Boeing 737', baggage: '15kg', meal: false },

  // ── Raipur (Tribal Culture & Nature) ──
  { id: 'FL047', airline: 'IndiGo', flightNumber: '6E-728', source: 'Delhi', destination: 'Raipur', departure: '07:05', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 44, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL048', airline: 'Air India', flightNumber: 'AI-477', source: 'Mumbai', destination: 'Raipur', departure: '10:30', price_offset: 500, stops: 0, class: 'Economy', availableSeats: 32, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },

  // ── Karnataka (Bangalore BLR) ──
  { id: 'FL051', airline: 'Vistara', flightNumber: 'UK-811', source: 'Delhi', destination: 'Karnataka', departure: '06:00', price_offset: 800, stops: 0, class: 'Economy', availableSeats: 15, aircraft: 'Airbus A320neo', baggage: '20kg', meal: true },
  { id: 'FL052', airline: 'IndiGo', flightNumber: '6E-211', source: 'Delhi', destination: 'Karnataka', departure: '12:30', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 40, aircraft: 'Airbus A321', baggage: '15kg', meal: false },
  { id: 'FL053', airline: 'Akasa Air', flightNumber: 'QP-1314', source: 'Mumbai', destination: 'Karnataka', departure: '14:15', price_offset: -200, stops: 0, class: 'Economy', availableSeats: 70, aircraft: 'Boeing 737 MAX', baggage: '15kg', meal: true },

  // ── Nainital & Haridwar ──
  { id: 'FL055', airline: 'IndiGo', flightNumber: '6E-7201', source: 'Delhi', destination: 'Haridwar', departure: '07:20', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 38, aircraft: 'ATR 72', baggage: '15kg', meal: false },
  { id: 'FL057', airline: 'Alliance Air', flightNumber: '9I-812', source: 'Delhi', destination: 'Nainital', departure: '08:00', price_offset: 200, stops: 0, class: 'Economy', availableSeats: 28, aircraft: 'ATR 72', baggage: '15kg', meal: false },
  { id: 'FL058', airline: 'IndiGo', flightNumber: '6E-804', source: 'Lucknow', destination: 'Nainital', departure: '11:20', price_offset: 0, stops: 0, class: 'Economy', availableSeats: 30, aircraft: 'ATR 72', baggage: '15kg', meal: false },
];

function formatFlightArrival(depTime, durMins) {
  const [h, m] = depTime.split(':').map(Number);
  const arrMins = h * 60 + m + durMins;
  const arrH = Math.floor(arrMins / 60) % 24;
  const arrM = arrMins % 60;
  return `${arrH.toString().padStart(2, '0')}:${arrM.toString().padStart(2, '0')}`;
}

function buildFlightObject(f, source, destination, date, passengers) {
  const metrics = getRouteMetrics(source, destination);
  const airKm = metrics.air_km;
  const durMins = metrics.flight_mins;
  const duration = metrics.flight_duration;

  const baseFare = calculateFlightBaseFare(airKm);
  const finalPrice = Math.max(3500, baseFare + (f.price_offset || 0));

  const dep = f.departure || '09:00';
  const arr = formatFlightArrival(dep, durMins);

  return {
    id: f.id,
    airline: f.airline,
    flightNumber: f.flightNumber || '6E-100',
    source: f.source || source,
    destination: f.destination || destination,
    departure: dep,
    arrival: arr,
    duration,
    distance: `${airKm} km`,
    price: finalPrice,
    stops: f.stops || 0,
    aircraft: f.aircraft || 'Airbus A320neo',
    baggage: f.baggage || '15kg',
    meal: f.meal || false,
    availableSeats: f.availableSeats || 40,
    class: f.class || 'Economy',
    totalPrice: finalPrice * (passengers || 1),
    passengers: passengers || 1,
    travel_date: date,
    is_demo: true,
  };
}

export const searchFlights = (source, destination, date, passengers) => {
  const src = (source || '').toLowerCase().trim();
  const dst = (destination || '').toLowerCase().trim();

  const matched = [];
  for (const f of RAW_FLIGHTS) {
    const fSrc = f.source.toLowerCase();
    const fDst = f.destination.toLowerCase();
    if ((src.includes(fSrc) || fSrc.includes(src)) && (dst.includes(fDst) || fDst.includes(dst))) {
      matched.push(buildFlightObject(f, f.source, f.destination, date, passengers));
    }
  }

  if (matched.length === 0 && source && destination) {
    const dynamicOptions = [
      {
        id: `FL-${source.slice(0, 3).toUpperCase()}1`,
        airline: 'IndiGo',
        flightNumber: `6E-${Math.floor(Math.random() * 800) + 100}`,
        departure: '07:30',
        price_offset: 0,
        stops: 0,
        aircraft: 'Airbus A320neo',
        baggage: '15kg',
        meal: false,
        availableSeats: 48,
        class: 'Economy'
      },
      {
        id: `FL-${source.slice(0, 3).toUpperCase()}2`,
        airline: 'Air India',
        flightNumber: `AI-${Math.floor(Math.random() * 700) + 100}`,
        departure: '13:45',
        price_offset: 600,
        stops: 0,
        aircraft: 'Boeing 737 MAX',
        baggage: '25kg',
        meal: true,
        availableSeats: 32,
        class: 'Economy'
      },
      {
        id: `FL-${source.slice(0, 3).toUpperCase()}3`,
        airline: 'Vistara',
        flightNumber: `UK-${Math.floor(Math.random() * 600) + 200}`,
        departure: '18:20',
        price_offset: 900,
        stops: 0,
        aircraft: 'Airbus A321',
        baggage: '20kg',
        meal: true,
        availableSeats: 24,
        class: 'Economy'
      }
    ];

    for (const opt of dynamicOptions) {
      matched.push(buildFlightObject(opt, source, destination, date, passengers));
    }
  }

  return matched;
};

export const flights = RAW_FLIGHTS;
