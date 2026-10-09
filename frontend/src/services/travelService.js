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
export const tripService = {
  getAll: async () => {
    try {
      const res = await api.get('/api/trips');
      // Backend returns { success, trips: [...] } — extract the array
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.trips)) return res.trips;
      return [];
    } catch {
      // Backend not running — return demo trips from localStorage
      try {
        const stored = localStorage.getItem('trippilot_demo_trips');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
  },
  create: async (tripData) => {
    // Always save to localStorage for demo mode
    try {
      const stored = localStorage.getItem('trippilot_demo_trips');
      const existing = stored ? JSON.parse(stored) : [];
      const newTrip = {
        ...tripData,
        id: 'TRP' + Date.now(),
        created_at: new Date().toISOString(),
        is_demo: true,
      };
      localStorage.setItem('trippilot_demo_trips', JSON.stringify([newTrip, ...existing]));

      // Also try the backend
      try {
        return await api.post('/api/trips', tripData);
      } catch {
        return { success: true, tripId: newTrip.id, isDemo: true };
      }
    } catch {
      return { success: true, tripId: 'TRP' + Date.now(), isDemo: true };
    }
  },
  delete: async (id) => {
    try {
      const stored = localStorage.getItem('trippilot_demo_trips');
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter(t => t.id !== id);
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
