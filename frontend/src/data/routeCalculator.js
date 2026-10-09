/**
 * Route Calculator & Distance Engine for Indian Cities
 * Calculates realistic aerial, rail, and road distances, mode-specific durations,
 * and dynamic tiered pricing according to Indian transport standards.
 */

export const CITY_COORDINATES = {
  delhi: [28.6139, 77.2090],
  lucknow: [26.8467, 80.9462],
  mumbai: [19.0760, 72.8777],
  goa: [15.2993, 74.1240],
  bangalore: [12.9716, 77.5946],
  karnataka: [12.9716, 77.5946],
  mysore: [12.2958, 76.6394],
  coorg: [12.3375, 75.8069],
  hampi: [15.3350, 76.4600],
  kolkata: [22.5726, 88.3639],
  chennai: [13.0827, 80.2707],
  jaipur: [26.9124, 75.7873],
  hyderabad: [17.3850, 78.4867],
  pune: [18.5204, 73.8567],
  ahmedabad: [23.0225, 72.5714],
  kochi: [9.9312, 76.2673],
  varanasi: [25.3176, 82.9739],
  amritsar: [31.6340, 74.8723],
  chandigarh: [30.7333, 76.7794],
  srinagar: [34.0837, 74.7973],
  jammu: [32.7266, 74.8570],
  'jammu and kashmir': [34.0837, 74.7973],
  leh: [34.1526, 77.5771],
  dehradun: [30.3165, 78.0322],
  haridwar: [29.9457, 78.1642],
  rishikesh: [30.0869, 78.2676],
  nainital: [29.3919, 79.4542],
  ayodhya: [26.7922, 82.1998],
  raipur: [21.2514, 81.6296],
  ranchi: [23.3441, 85.3096],
  udaipur: [24.5854, 73.7125],
  jodhpur: [26.2389, 73.0243],
  jaisalmer: [26.9157, 70.9083],
  patna: [25.5941, 85.1376],
  bhubaneswar: [20.2961, 85.8245],
  visakhapatnam: [17.6868, 83.2185],
  coimbatore: [11.0168, 76.9558],
  madurai: [9.9252, 78.1198],
  thiruvananthapuram: [8.5241, 76.9366],
  indore: [22.7196, 75.8577],
  bhopal: [23.2599, 77.4126],
  nagpur: [21.1458, 79.0882],
  guwahati: [26.1445, 91.7362],
  'port blair': [11.6234, 92.7265],
  agra: [27.1767, 78.0081],
  shimla: [31.1048, 77.1734],
  manali: [32.2432, 77.1892],
  firozabad: [27.1590, 78.3957],
};

const HILL_DESTINATIONS = ['nainital', 'shimla', 'manali', 'leh', 'srinagar', 'coorg', 'rishikesh', 'dehradun'];

export function getCityCoords(cityName) {
  if (!cityName) return [28.6139, 77.2090];
  const c = cityName.toLowerCase().trim();
  if (CITY_COORDINATES[c]) return CITY_COORDINATES[c];
  const matchedKey = Object.keys(CITY_COORDINATES).find(k => k.includes(c) || c.includes(k));
  return matchedKey ? CITY_COORDINATES[matchedKey] : [28.6139, 77.2090];
}

export function haversineDistance(coord1, coord2) {
  const [lat1, lon1] = coord1.map(v => (v * Math.PI) / 180);
  const [lat2, lon2] = coord2.map(v => (v * Math.PI) / 180);
  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;
  const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371.0 * c;
}

export function getRouteMetrics(source, destination) {
  const c1 = getCityCoords(source);
  const c2 = getCityCoords(destination);
  let directKm = haversineDistance(c1, c2);

  if (directKm < 30) {
    directKm = 450.0;
  }

  const airKm = Math.max(180, Math.round(directKm));
  const railKm = Math.max(200, Math.round(directKm * 1.16));
  const roadKm = Math.max(210, Math.round(directKm * 1.22));

  const sLow = (source || '').toLowerCase();
  const dLow = (destination || '').toLowerCase();
  const isHill = HILL_DESTINATIONS.some(h => sLow.includes(h) || dLow.includes(h));

  // 1. Flight Duration
  const flightMins = Math.max(50, Math.round((airKm / 650.0) * 60) + 30);
  const flightH = Math.floor(flightMins / 60);
  const flightM = flightMins % 60;
  const flightDuration = flightH > 0 ? `${flightH}h ${flightM.toString().padStart(2, '0')}m` : `${flightM}m`;

  const fmtDur = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  };

  // 2. Train Durations
  const vandeMins = Math.max(180, Math.round((railKm / 78.0) * 60));
  const rajdhaniMins = Math.max(210, Math.round((railKm / 68.0) * 60));
  const expressMins = Math.max(240, Math.round((railKm / 52.0) * 60));

  // 3. Bus Duration
  const busSpeed = isHill ? 38.0 : 58.0;
  const busBreaks = isHill ? 45 : 30;
  const busMins = Math.max(120, Math.round((roadKm / busSpeed) * 60) + busBreaks);
  const busDuration = fmtDur(busMins);

  return {
    air_km: airKm,
    rail_km: railKm,
    road_km: roadKm,
    flight_duration: flightDuration,
    flight_mins: flightMins,
    train_durations: {
      vande_bharat: fmtDur(vandeMins),
      rajdhani: fmtDur(rajdhaniMins),
      express: fmtDur(expressMins),
    },
    bus_duration: busDuration,
    bus_mins: busMins,
  };
}

export function calculateTrainTierPrices(railKm, trainType = 'express') {
  const baseSL = Math.max(180, Math.min(850, Math.round((130 + railKm * 0.42) / 10) * 10));

  if (trainType.toLowerCase().includes('vande') || trainType.toLowerCase().includes('shatabdi')) {
    const ccPrice = Math.max(650, Math.min(1450, Math.round((baseSL * 2.2) / 10) * 10));
    const ecPrice = Math.max(1350, Math.min(2450, Math.round((ccPrice * 1.85) / 10) * 10));
    return {
      CC: ccPrice,
      EC: ecPrice,
      base: ccPrice,
    };
  }

  const slPrice = baseSL;
  const ac3Price = Math.max(780, Math.min(1450, Math.round((baseSL * 2.75) / 10) * 10));
  const ac2Price = Math.max(1180, Math.min(2100, Math.round((baseSL * 3.95) / 10) * 10));
  const ac1Price = Math.max(1880, Math.min(3200, Math.round((baseSL * 6.20) / 10) * 10));

  return {
    Sleeper: slPrice,
    SL: slPrice,
    '3AC': ac3Price,
    '2AC': ac2Price,
    '1AC': ac1Price,
    base: slPrice,
  };
}

export function calculateFlightBaseFare(airKm) {
  const fare = 3500 + Math.round((airKm * 1.55) / 100) * 100;
  return Math.max(3500, Math.min(8500, fare));
}

export function calculateBusSeatPrices(roadKm, busType = 'volvo') {
  const baseFare = Math.max(380, Math.min(1100, Math.round((160 + roadKm * 1.28) / 10) * 10));

  return {
    'Aisle Seat': Math.max(450, Math.round((baseFare * 0.90) / 10) * 10),
    'Window Seat': Math.max(520, Math.round((baseFare * 1.05) / 10) * 10),
    'Lower Berth': Math.max(750, Math.min(1450, Math.round((baseFare * 1.25) / 10) * 10)),
    'Upper Berth': Math.max(680, Math.min(1300, Math.round((baseFare * 1.15) / 10) * 10)),
    'Single Sleeper': Math.max(890, Math.min(1650, Math.round((baseFare * 1.45) / 10) * 10)),
    Seater: Math.max(480, Math.round((baseFare * 0.90) / 10) * 10),
    'Semi-Sleeper': Math.max(620, Math.round((baseFare * 1.10) / 10) * 10),
    'Full Sleeper': Math.max(850, Math.min(1500, Math.round((baseFare * 1.35) / 10) * 10)),
    base: baseFare,
  };
}

