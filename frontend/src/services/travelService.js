import api from './api';
import { searchFlights as mockSearchFlights } from '../data/flights';
import { searchTrains as mockSearchTrains } from '../data/trains';
import { searchBuses as mockSearchBuses } from '../data/buses';
import { searchHotels as mockSearchHotels } from '../data/hotels';
import { searchActivities as mockSearchActivities } from '../data/activities';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const generateBookingId = () => 'BK' + Date.now();
const mockBookingResult = { success: true, status: 'confirmed', isDemo: true };

// ── Flights ──────────────────────────────────────────────────
export const flightService = {
  search: async (params) => {
    try {
      const res = await api.get('/api/flights/search', {
        params: {
          source: params.source,
          destination: params.destination,
          date: params.departureDate,
          passengers: params.passengers || 1,
        }
      });
      // Backend wraps result in { success, flights, ... }
      return res.flights || res || [];
    } catch {
      await delay(800);
      return mockSearchFlights(params.source, params.destination, params.departureDate, params.passengers);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/flights/book', bookingData);
    } catch {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

// ── Trains ───────────────────────────────────────────────────
export const trainService = {
  search: async (params) => {
    try {
      const res = await api.get('/api/trains/search', {
        params: {
          source: params.source,
          destination: params.destination,
          date: params.departureDate,
          passengers: params.passengers || 1,
        }
      });
      return res.trains || res || [];
    } catch {
      await delay(800);
      return mockSearchTrains(params.source, params.destination, params.departureDate, params.passengers);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/trains/book', bookingData);
    } catch {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

// ── Buses ────────────────────────────────────────────────────
export const busService = {
  search: async (params) => {
    try {
      const res = await api.get('/api/buses/search', {
        params: {
          source: params.source,
          destination: params.destination,
          date: params.departureDate,
          passengers: params.passengers || 1,
        }
      });
      return res.buses || res || [];
    } catch {
      await delay(800);
      return mockSearchBuses(params.source, params.destination, params.departureDate, params.passengers);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/buses/book', bookingData);
    } catch {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

// ── Hotels ───────────────────────────────────────────────────
export const hotelService = {
  search: async (params) => {
    try {
      const res = await api.get('/api/hotels/search', {
        params: {
          destination: params.destination,
          checkin: params.checkin || params.departureDate,
          checkout: params.checkout || params.returnDate,
          guests: params.guests || params.passengers || 1,
        }
      });
      return res.hotels || res || [];
    } catch {
      await delay(800);
      return mockSearchHotels(params.destination, params.checkin, params.checkout, params.guests);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/hotels/book', bookingData);
    } catch {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

// ── Activities ───────────────────────────────────────────────
export const activityService = {
  search: async (params) => {
    try {
      const res = await api.get('/api/activities/search', {
        params: { destination: params.destination }
      });
      return res.activities || res || [];
    } catch {
      await delay(800);
      return mockSearchActivities(params.destination);
    }
  }
};

// ── Trips ─────────────────────────────────────────────────────
export const normalizeTrip = (rawTrip) => {
  if (!rawTrip || typeof rawTrip !== 'object') return null;

  const source = rawTrip.source || rawTrip.origin || rawTrip.searchParams?.source || '';
  const destination = rawTrip.destination || rawTrip.dest || rawTrip.searchParams?.destination || '';

  // Filter out truly corrupt/empty objects
  if (!destination && !source) return null;
  if (destination === 'Unknown' && (!source || source === '—')) return null;

  const departure_date = rawTrip.departure_date || rawTrip.departureDate || rawTrip.travelDate || rawTrip.travel_date || rawTrip.date || rawTrip.searchParams?.departureDate || '';
  const return_date = rawTrip.return_date || rawTrip.returnDate || rawTrip.searchParams?.returnDate || null;
  const passengers = Number(rawTrip.passengers || rawTrip.searchParams?.passengers) || 1;
  const budget = Number(rawTrip.budget || rawTrip.searchParams?.budget) || 0;
  const transport_mode = rawTrip.transport_mode || rawTrip.transportMode || rawTrip.transport?.mode || 'flight';
  
  let total_cost = Number(rawTrip.total_cost || rawTrip.totalPrice);
  if (!total_cost && rawTrip.budgetBreakdown) {
    const bb = rawTrip.budgetBreakdown;
    total_cost = (bb.transport || 0) + (bb.hotel || 0) + (bb.activities || 0) + (bb.food || 0) + (bb.misc || 0);
  }
  if (!total_cost && rawTrip.budget?.total) {
    total_cost = Number(rawTrip.budget.total);
  }
  if (!total_cost) total_cost = 0;

  return {
    ...rawTrip,
    id: String(rawTrip.id || rawTrip._id || rawTrip.tripId || ('TRP' + Date.now())),
    source: source || 'Departure City',
    destination: destination || 'Destination City',
    departure_date: departure_date || 'Upcoming',
    return_date,
    passengers,
    budget,
    transport_mode,
    transport_details: rawTrip.transport_details || rawTrip.transport?.flight || rawTrip.transport?.train || rawTrip.transport?.bus || null,
    hotel_details: rawTrip.hotel_details || rawTrip.hotel || null,
    activities: Array.isArray(rawTrip.activities) ? rawTrip.activities : [],
    total_cost,
    created_at: rawTrip.created_at || new Date().toISOString(),
    is_demo: true,
  };
};

export const tripService = {
  getAll: async () => {
    let localTrips = [];
    try {
      // 1. Clean and normalize localStorage demo trips
      const stored = localStorage.getItem('trippilot_demo_trips');
      const legacyStored = localStorage.getItem('trips'); // legacy key cleanup
      let rawList = [];
      if (stored) {
        try { rawList = JSON.parse(stored); } catch { rawList = []; }
      }
      if (legacyStored) {
        try {
          const parsedLegacy = JSON.parse(legacyStored);
          if (Array.isArray(parsedLegacy)) rawList = [...rawList, ...parsedLegacy];
        } catch { /* ignore */ }
        localStorage.removeItem('trips'); // remove deprecated key
      }

      if (Array.isArray(rawList)) {
        localTrips = rawList.map(normalizeTrip).filter(Boolean);
        // Persist cleaned list
        localStorage.setItem('trippilot_demo_trips', JSON.stringify(localTrips));
      }
    } catch {
      localTrips = [];
    }

    try {
      const res = await api.get('/api/trips');
      let apiTrips = [];
      if (Array.isArray(res)) apiTrips = res;
      else if (res && Array.isArray(res.trips)) apiTrips = res.trips;

      const normalizedApi = apiTrips.map(normalizeTrip).filter(Boolean);
      
      // Combine API trips and Local trips by ID
      const map = new Map();
      [...normalizedApi, ...localTrips].forEach(t => {
        if (t && t.id) map.set(t.id, t);
      });

      return Array.from(map.values());
    } catch {
      return localTrips;
    }
  },

  create: async (tripData) => {
    const normalized = normalizeTrip(tripData) || {
      id: 'TRP' + Date.now(),
      source: tripData.source || 'Origin',
      destination: tripData.destination || 'Destination',
      departure_date: tripData.departure_date || 'Upcoming',
      passengers: 1,
      transport_mode: 'flight',
      total_cost: 0,
      created_at: new Date().toISOString(),
      is_demo: true
    };

    // Save to localStorage immediately
    try {
      const stored = localStorage.getItem('trippilot_demo_trips');
      let existing = [];
      if (stored) {
        try { existing = JSON.parse(stored); } catch { existing = []; }
      }
      const cleaned = existing.map(normalizeTrip).filter(Boolean);
      const updated = [normalized, ...cleaned.filter(t => t.id !== normalized.id)];
      localStorage.setItem('trippilot_demo_trips', JSON.stringify(updated));
    } catch { /* ignore */ }

    // Try backend persistence
    try {
      const res = await api.post('/api/trips', {
        source: normalized.source,
        destination: normalized.destination,
        departure_date: normalized.departure_date,
        return_date: normalized.return_date,
        passengers: normalized.passengers,
        budget: normalized.budget,
        transport_mode: normalized.transport_mode,
        transport_details: normalized.transport_details,
        hotel_details: normalized.hotel_details,
        activities: normalized.activities,
        total_cost: normalized.total_cost,
        status: 'confirmed',
        is_demo: true
      });
      return { success: true, tripId: res.trip_id || normalized.id, isDemo: true };
    } catch {
      return { success: true, tripId: normalized.id, isDemo: true };
    }
  },

  delete: async (id) => {
    try {
      const stored = localStorage.getItem('trippilot_demo_trips');
      let existing = [];
      if (stored) {
        try { existing = JSON.parse(stored); } catch { existing = []; }
      }
      const updated = existing.filter(t => String(t.id) !== String(id) && String(t._id) !== String(id));
      localStorage.setItem('trippilot_demo_trips', JSON.stringify(updated));
    } catch { /* ignore */ }

    try {
      await api.delete(`/api/trips/${id}`);
    } catch { /* backend optional */ }

    return { success: true };
  },

  update: async (id, tripData) => {
    await delay(300);
    return { success: true };
  },
};
