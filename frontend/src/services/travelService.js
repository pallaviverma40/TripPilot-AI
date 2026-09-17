import api from './api';
import { searchFlights as mockSearchFlights } from '../data/flights';
import { searchTrains as mockSearchTrains } from '../data/trains';
import { searchBuses as mockSearchBuses } from '../data/buses';
import { searchHotels as mockSearchHotels } from '../data/hotels';
import { searchActivities as mockSearchActivities } from '../data/activities';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const generateBookingId = () => 'BK' + Date.now();
const mockBookingResult = { success: true, status: 'confirmed', isDemo: true };

export const flightService = {
  search: async (params) => {
    try {
      return await api.post('/api/flights/search', params);
    } catch (e) {
      await delay(800);
      return mockSearchFlights(params.source, params.destination, params.departureDate, params.passengers);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/flights/book', bookingData);
    } catch (e) {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

export const trainService = {
  search: async (params) => {
    try {
      return await api.post('/api/trains/search', params);
    } catch (e) {
      await delay(800);
      return mockSearchTrains(params.source, params.destination, params.departureDate, params.passengers);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/trains/book', bookingData);
    } catch (e) {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

export const busService = {
  search: async (params) => {
    try {
      return await api.post('/api/buses/search', params);
    } catch (e) {
      await delay(800);
      return mockSearchBuses(params.source, params.destination, params.departureDate, params.passengers);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/buses/book', bookingData);
    } catch (e) {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

export const hotelService = {
  search: async (params) => {
    try {
      return await api.post('/api/hotels/search', params);
    } catch (e) {
      await delay(800);
      return mockSearchHotels(params.destination, params.checkin, params.checkout, params.guests);
    }
  },
  book: async (bookingData) => {
    try {
      return await api.post('/api/hotels/book', bookingData);
    } catch (e) {
      await delay(1000);
      return { ...mockBookingResult, bookingId: generateBookingId() };
    }
  }
};

export const activityService = {
  search: async (params) => {
    try {
      return await api.post('/api/activities/search', params);
    } catch (e) {
      await delay(800);
      return mockSearchActivities(params.destination);
    }
  }
};

export const tripService = {
  getAll: async () => {
    try {
      return await api.get('/api/trips');
    } catch (e) {
      await delay(500);
      return [];
    }
  },
  create: async (tripData) => {
    try {
      return await api.post('/api/trips', tripData);
    } catch (e) {
      await delay(1500);
      return { success: true, tripId: 'TRP' + Date.now(), isDemo: true };
    }
  },
  update: async (id, tripData) => {
    // mock update
    await delay(500);
    return { success: true };
  },
  delete: async (id) => {
    await delay(500);
    return { success: true };
  }
};
