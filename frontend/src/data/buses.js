/**
 * Bus Service — Dynamic & Tiered Bus Pricing
 * Calculates realistic road distances, durations based on road/terrain,
 * and structured seat-type pricing (Seater ₹500–₹750, Semi-Sleeper ₹650–₹900, AC Sleeper ₹850–₹1200).
 */

import { getRouteMetrics, calculateBusSeatPrices } from './routeCalculator';

const RAW_BUSES = [
  // ── Ayodhya (Heritage & Spiritual) ──
  { id: 'BUS051', operator: 'UPSRTC Janrath', bus_type: 'A/C Seater (2+2)', source: 'Lucknow', destination: 'Ayodhya', departure: '06:00', available_seats: 32, amenities: ["CCTV", "Track My Bus", "Charging Point"], rating: 4.5 },
  { id: 'BUS052', operator: 'IntrCity SmartBus', bus_type: 'Volvo A/C Sleeper', source: 'Delhi', destination: 'Ayodhya', departure: '21:30', available_seats: 24, amenities: ["WiFi", "Blanket", "Water Bottle", "Charging Point"], rating: 4.7 },
  { id: 'BUS053', operator: 'NueGo Electric', bus_type: 'A/C Seater (Electric)', source: 'Lucknow', destination: 'Ayodhya', departure: '09:30', available_seats: 20, amenities: ["CCTV", "Clean Air", "Live Tracking"], rating: 4.8 },
  { id: 'BUS054', operator: 'Zingbus', bus_type: 'Volvo Multi-Axle Sleeper', source: 'Varanasi', destination: 'Ayodhya', departure: '07:00', available_seats: 18, amenities: ["Reading Light", "Blanket", "Snacks"], rating: 4.6 },

  // ── Haridwar (Spiritual Ghats & Ashrams) ──
  { id: 'BUS055', operator: 'Zingbus', bus_type: 'Volvo A/C Sleeper', source: 'Delhi', destination: 'Haridwar', departure: '22:00', available_seats: 28, amenities: ["Blanket", "Charging Point", "WiFi", "Water Bottle"], rating: 4.7 },
  { id: 'BUS056', operator: 'NueGo Electric', bus_type: 'A/C Seater (Electric)', source: 'Delhi', destination: 'Haridwar', departure: '07:00', available_seats: 35, amenities: ["CCTV", "Live Tracking", "USB Charging"], rating: 4.8 },
  { id: 'BUS057', operator: 'UTC Volvo', bus_type: 'Volvo A/C Seater/Sleeper', source: 'Chandigarh', destination: 'Haridwar', departure: '06:30', available_seats: 22, amenities: ["Water Bottle", "Clean Interior"], rating: 4.4 },

  // ── Nainital (Nature & Lakes) ──
  { id: 'BUS058', operator: 'UTC Royal Cruiser', bus_type: 'Volvo A/C Seater', source: 'Delhi', destination: 'Nainital', departure: '21:00', available_seats: 26, amenities: ["Mountain Certified", "Blanket", "Charging Point"], rating: 4.6 },
  { id: 'BUS059', operator: 'Zingbus', bus_type: 'Volvo A/C Sleeper', source: 'Delhi', destination: 'Nainital', departure: '22:30', available_seats: 16, amenities: ["WiFi", "Blanket", "Live Tracking", "Snacks"], rating: 4.7 },
  { id: 'BUS060', operator: 'City Land Travels', bus_type: 'A/C Seater (2+2)', source: 'Lucknow', destination: 'Nainital', departure: '20:00', available_seats: 30, amenities: ["Track My Bus", "Charging Point"], rating: 4.3 },

  // ── Varanasi (Banaras Ghats & Culture) ──
  { id: 'BUS061', operator: 'UPSRTC Volvo', bus_type: 'Volvo A/C Seater/Sleeper', source: 'Lucknow', destination: 'Varanasi', departure: '06:00', available_seats: 28, amenities: ["Clean Bedding", "Charging Point"], rating: 4.5 },
  { id: 'BUS062', operator: 'IntrCity SmartBus', bus_type: 'Volvo A/C Sleeper', source: 'Delhi', destination: 'Varanasi', departure: '19:00', available_seats: 19, amenities: ["WiFi", "Clean Bedding", "Live Tracking"], rating: 4.8 },
  { id: 'BUS063', operator: 'NueGo Electric', bus_type: 'A/C Seater (Electric)', source: 'Patna', destination: 'Varanasi', departure: '07:30', available_seats: 30, amenities: ["USB Charging", "CCTV"], rating: 4.6 },

  // ── Jammu and Kashmir ──
  { id: 'BUS064', operator: 'JKSRTC Volvo', bus_type: 'Volvo A/C Sleeper', source: 'Delhi', destination: 'Jammu and Kashmir', departure: '18:00', available_seats: 20, amenities: ["Blanket", "Water Bottle", "Heater"], rating: 4.6 },
  { id: 'BUS065', operator: 'Zingbus', bus_type: 'Volvo Multi-Axle Sleeper', source: 'Chandigarh', destination: 'Jammu and Kashmir', departure: '21:00', available_seats: 24, amenities: ["WiFi", "Blanket", "Charging Point"], rating: 4.7 },

  // ── Raipur (Tribal Culture & Nature) ──
  { id: 'BUS066', operator: 'Mahendra Travels', bus_type: 'Volvo A/C Sleeper', source: 'Nagpur', destination: 'Raipur', departure: '23:00', available_seats: 32, amenities: ["Clean Bedding", "CCTV", "Track My Bus"], rating: 4.5 },
  { id: 'BUS067', operator: 'Royal Travels', bus_type: 'A/C Sleeper', source: 'Bhubaneswar', destination: 'Raipur', departure: '19:30', available_seats: 18, amenities: ["Blanket", "Charging Point"], rating: 4.3 },

  // ── Karnataka (Bangalore, Mysore, Coorg, Hampi) ──
  { id: 'BUS068', operator: 'KSRTC Airavat', bus_type: 'Volvo Multi-Axle Club Class', source: 'Chennai', destination: 'Karnataka', departure: '23:00', available_seats: 34, amenities: ["WiFi", "Water Bottle", "Blanket"], rating: 4.8 },
  { id: 'BUS069', operator: 'Greenline Travels', bus_type: 'Volvo A/C Sleeper', source: 'Hyderabad', destination: 'Karnataka', departure: '21:30', available_seats: 20, amenities: ["Track My Bus", "Clean Bedding"], rating: 4.6 },
  { id: 'BUS070', operator: 'Orange Tours', bus_type: 'Volvo Multi-Axle Sleeper', source: 'Goa', destination: 'Karnataka', departure: '20:00', available_seats: 18, amenities: ["WiFi", "Blanket", "Snacks"], rating: 4.7 },

  // ── Delhi ↔ Lucknow / Jaipur ──
  { id: 'BUS002', operator: 'NueGo Electric', bus_type: 'A/C Seater (Electric)', source: 'Lucknow', destination: 'Delhi', departure: '22:00', available_seats: 28, amenities: ["Charging Point", "Blanket", "CCTV", "Water Bottle"], rating: 4.8 },
  { id: 'BUS003', operator: 'Zingbus Premium', bus_type: 'Volvo Multi-Axle Sleeper', source: 'Delhi', destination: 'Lucknow', departure: '21:30', available_seats: 22, amenities: ["WiFi", "Live Tracking", "Blanket"], rating: 4.7 },
  { id: 'BUS004', operator: 'Orange Tours', bus_type: 'Volvo Multi-Axle Sleeper', source: 'Lucknow', destination: 'Jaipur', departure: '20:30', available_seats: 23, amenities: ["WiFi", "Reading Light", "Track My Bus", "Blanket"], rating: 4.7 }
];

function formatBusArrival(depTime, durMins) {
  const [h, m] = depTime.split(':').map(Number);
  const arrMins = h * 60 + m + durMins;
  const arrH = Math.floor(arrMins / 60) % 24;
  const arrM = arrMins % 60;
  const days = Math.floor(arrMins / (24 * 60));
  const daySuffix = days > 0 ? `+${days}` : '';
  return `${arrH.toString().padStart(2, '0')}:${arrM.toString().padStart(2, '0')}${daySuffix}`;
}

function buildBusObject(b, source, destination, date, passengers) {
  const metrics = getRouteMetrics(source, destination);
  const roadKm = metrics.road_km;
  const durMins = metrics.bus_mins;
  const duration = metrics.bus_duration;

  const prices = calculateBusSeatPrices(roadKm, b.bus_type || '');
  const bt = (b.bus_type || '').toLowerCase();

  let seatTypes;
  if (bt.includes('sleeper') && !bt.includes('seater')) {
    seatTypes = [
      { type: 'Lower Berth', price: prices['Lower Berth'], available: 10 },
      { type: 'Upper Berth', price: prices['Upper Berth'], available: 14 },
      { type: 'Single Sleeper', price: prices['Single Sleeper'], available: 4 },
    ];
  } else if (bt.includes('seater/sleeper') || bt.includes('multi-axle')) {
    seatTypes = [
      { type: 'Semi-Sleeper', price: prices['Semi-Sleeper'], available: 12 },
      { type: 'Lower Berth', price: prices['Lower Berth'], available: 8 },
      { type: 'Full Sleeper', price: prices['Full Sleeper'], available: 6 },
    ];
  } else {
    seatTypes = [
      { type: 'Window Seat', price: prices['Window Seat'], available: 12 },
      { type: 'Aisle Seat', price: prices['Aisle Seat'], available: 18 },
    ];
  }

  const dep = b.departure || '21:00';
  const arr = formatBusArrival(dep, durMins);

  return {
    id: b.id,
    operator: b.operator,
    bus_type: b.bus_type || 'Volvo A/C Sleeper',
    source: b.source || source,
    destination: b.destination || destination,
    departure: dep,
    arrival: arr,
    duration,
    distance: `${roadKm} km`,
    price: seatTypes[0].price,
    base_price: prices.base,
    seat_types: seatTypes,
    available_seats: b.available_seats || 30,
    amenities: b.amenities || ['WiFi', 'Blanket', 'Charging Point', 'Water Bottle'],
    rating: b.rating || 4.6,
    passengers: passengers || 1,
    travel_date: date,
    is_demo: true,
  };
}

export const searchBuses = (source, destination, date, passengers) => {
  const src = (source || '').toLowerCase().trim();
  const dst = (destination || '').toLowerCase().trim();

  const matched = [];
  for (const b of RAW_BUSES) {
    const bSrc = b.source.toLowerCase();
    const bDst = b.destination.toLowerCase();
    if ((src.includes(bSrc) || bSrc.includes(src)) && (dst.includes(bDst) || bDst.includes(dst))) {
      matched.push(buildBusObject(b, b.source, b.destination, date, passengers));
    }
  }

  if (matched.length === 0 && source && destination) {
    const dynamicOptions = [
      {
        id: `BUS-${source.slice(0, 3).toUpperCase()}1`,
        operator: 'Zingbus Electric',
        bus_type: 'Volvo A/C Semi-Sleeper',
        departure: '07:00',
        available_seats: 28,
        amenities: ['WiFi', 'Water Bottle', 'Charging Point', 'Live Tracking'],
        rating: 4.8
      },
      {
        id: `BUS-${source.slice(0, 3).toUpperCase()}2`,
        operator: 'IntrCity SmartBus',
        bus_type: 'Volvo Multi-Axle Sleeper',
        departure: '21:30',
        available_seats: 22,
        amenities: ['Clean Bedding', 'WiFi', 'Reading Light', 'Water Bottle'],
        rating: 4.7
      },
      {
        id: `BUS-${source.slice(0, 3).toUpperCase()}3`,
        operator: 'State Roadways Royal Cruiser',
        bus_type: 'A/C Seater (2+2)',
        departure: '14:00',
        available_seats: 35,
        amenities: ['CCTV', 'Track My Bus', 'Charging Point'],
        rating: 4.4
      }
    ];

    for (const opt of dynamicOptions) {
      matched.push(buildBusObject(opt, source, destination, date, passengers));
    }
  }

  return matched;
};

export const buses = RAW_BUSES;
