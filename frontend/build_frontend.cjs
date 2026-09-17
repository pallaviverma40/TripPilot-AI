const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\priyaverma13102000\\.gemini\\antigravity\\scratch\\TripPilot-AI\\frontend\\src';

const ensureDir = (filePath) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const write = (filePath, content) => {
  const fullPath = path.join(rootDir, filePath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log(`Created ${filePath}`);
};

const files = {};

files['main.jsx'] = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { TripProvider } from './context/TripContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TripProvider>
      <App />
    </TripProvider>
  </React.StrictMode>
);
`;

files['App.jsx'] = `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PlanTrip from './pages/PlanTrip';
import FlightResults from './pages/FlightResults';
import TrainResults from './pages/TrainResults';
import BusResults from './pages/BusResults';
import HotelResults from './pages/HotelResults';
import Activities from './pages/Activities';
import Itinerary from './pages/Itinerary';
import BookingConfirmation from './pages/BookingConfirmation';
import MyTrips from './pages/MyTrips';
import AgentMonitor from './pages/AgentMonitor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="plan" element={<PlanTrip />} />
          <Route path="flights" element={<FlightResults />} />
          <Route path="trains" element={<TrainResults />} />
          <Route path="buses" element={<BusResults />} />
          <Route path="hotels" element={<HotelResults />} />
          <Route path="activities" element={<Activities />} />
          <Route path="itinerary" element={<Itinerary />} />
          <Route path="confirmation" element={<BookingConfirmation />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="agent-monitor" element={<AgentMonitor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`;

files['context/TripContext.jsx'] = `
import React, { createContext, useContext, useState } from 'react';

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    source: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'one-way',
    budget: 40000,
    transportModes: []
  });

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [budgetBreakdown, setBudgetBreakdown] = useState({ transport: 0, hotel: 0, activities: 0, food: 0, misc: 0 });
  const [currentTrip, setCurrentTrip] = useState(null);

  const addActivity = (activity) => {
    if (!selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const removeActivity = (activityId) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== activityId));
  };

  const clearTrip = () => {
    setSearchParams({ source: '', destination: '', departureDate: '', returnDate: '', passengers: 1, tripType: 'one-way', budget: 40000, transportModes: [] });
    setSelectedFlight(null);
    setSelectedTrain(null);
    setSelectedBus(null);
    setSelectedTransportMode(null);
    setSelectedHotel(null);
    setSelectedActivities([]);
    setBudgetBreakdown({ transport: 0, hotel: 0, activities: 0, food: 0, misc: 0 });
    setCurrentTrip(null);
  };

  const calculateBudget = () => {
    let transport = 0;
    if (selectedFlight) transport += selectedFlight.price * searchParams.passengers;
    if (selectedTrain) transport += selectedTrain.price * searchParams.passengers;
    if (selectedBus) transport += selectedBus.price * searchParams.passengers;
    
    let hotel = 0;
    if (selectedHotel) {
      const start = new Date(searchParams.departureDate);
      const end = searchParams.returnDate ? new Date(searchParams.returnDate) : new Date(start.getTime() + 2 * 24 * 60 * 60 * 1000);
      const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      hotel += selectedHotel.pricePerNight * nights;
    }

    let activities = selectedActivities.reduce((acc, act) => acc + (act.price * searchParams.passengers), 0);
    
    // Assume trips have some duration
    const start = new Date(searchParams.departureDate || new Date());
    const end = searchParams.returnDate ? new Date(searchParams.returnDate) : new Date(start.getTime() + 2 * 24 * 60 * 60 * 1000);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    
    let food = 500 * searchParams.passengers * days;
    let misc = 300 * searchParams.passengers * days;

    setBudgetBreakdown({ transport, hotel, activities, food, misc });
  };

  return (
    <TripContext.Provider value={{
      searchParams, setSearchParams,
      selectedFlight, setSelectedFlight,
      selectedTrain, setSelectedTrain,
      selectedBus, setSelectedBus,
      selectedTransportMode, setSelectedTransportMode,
      selectedHotel, setSelectedHotel,
      selectedActivities, addActivity, removeActivity,
      budgetBreakdown, calculateBudget,
      currentTrip, setCurrentTrip,
      clearTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => useContext(TripContext);
`;

files['data/flights.js'] = `
const flights = [
  { id: 'FL001', airline: 'IndiGo', flightNumber: '6E-234', source: 'Lucknow', destination: 'Delhi', departure: '06:30', arrival: '08:00', duration: '1h 30m', price: 4200, stops: 0, class: 'Economy', availableSeats: 45, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL002', airline: 'Air India', flightNumber: 'AI-432', source: 'Lucknow', destination: 'Delhi', departure: '10:00', arrival: '11:45', duration: '1h 45m', price: 4500, stops: 0, class: 'Economy', availableSeats: 30, aircraft: 'Airbus A320neo', baggage: '25kg', meal: true },
  { id: 'FL003', airline: 'Vistara', flightNumber: 'UK-991', source: 'Delhi', destination: 'Goa', departure: '07:00', arrival: '09:30', duration: '2h 30m', price: 6500, stops: 0, class: 'Economy', availableSeats: 15, aircraft: 'Boeing 737', baggage: '15kg', meal: true },
  { id: 'FL004', airline: 'SpiceJet', flightNumber: 'SG-112', source: 'Delhi', destination: 'Mumbai', departure: '08:00', arrival: '10:15', duration: '2h 15m', price: 5500, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Boeing 737 Max', baggage: '15kg', meal: false },
  { id: 'FL005', airline: 'Go First', flightNumber: 'G8-332', source: 'Mumbai', destination: 'Goa', departure: '14:00', arrival: '15:15', duration: '1h 15m', price: 3200, stops: 0, class: 'Economy', availableSeats: 20, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL006', airline: 'Akasa Air', flightNumber: 'QP-111', source: 'Lucknow', destination: 'Mumbai', departure: '12:30', arrival: '14:50', duration: '2h 20m', price: 5800, stops: 0, class: 'Economy', availableSeats: 55, aircraft: 'Boeing 737 Max', baggage: '15kg', meal: true },
  { id: 'FL007', airline: 'IndiGo', flightNumber: '6E-543', source: 'Kolkata', destination: 'Delhi', departure: '09:00', arrival: '11:30', duration: '2h 30m', price: 4800, stops: 0, class: 'Economy', availableSeats: 40, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL008', airline: 'Vistara', flightNumber: 'UK-773', source: 'Chennai', destination: 'Delhi', departure: '11:00', arrival: '13:50', duration: '2h 50m', price: 7200, stops: 0, class: 'Economy', availableSeats: 25, aircraft: 'Airbus A320neo', baggage: '15kg', meal: true },
  { id: 'FL009', airline: 'Air India', flightNumber: 'AI-881', source: 'Bangalore', destination: 'Delhi', departure: '16:00', arrival: '18:45', duration: '2h 45m', price: 6800, stops: 0, class: 'Economy', availableSeats: 35, aircraft: 'Boeing 777', baggage: '25kg', meal: true },
  { id: 'FL010', airline: 'IndiGo', flightNumber: '6E-789', source: 'Delhi', destination: 'Jaipur', departure: '06:00', arrival: '07:00', duration: '1h', price: 2500, stops: 0, class: 'Economy', availableSeats: 50, aircraft: 'ATR 72', baggage: '15kg', meal: false },
  { id: 'FL011', airline: 'SpiceJet', flightNumber: 'SG-444', source: 'Jaipur', destination: 'Mumbai', departure: '18:00', arrival: '19:45', duration: '1h 45m', price: 4100, stops: 0, class: 'Economy', availableSeats: 20, aircraft: 'Boeing 737', baggage: '15kg', meal: false },
  { id: 'FL012', airline: 'Vistara', flightNumber: 'UK-812', source: 'Mumbai', destination: 'Bangalore', departure: '09:30', arrival: '11:15', duration: '1h 45m', price: 5100, stops: 0, class: 'Economy', availableSeats: 12, aircraft: 'Airbus A320neo', baggage: '15kg', meal: true },
  { id: 'FL013', airline: 'IndiGo', flightNumber: '6E-101', source: 'Delhi', destination: 'Lucknow', departure: '19:00', arrival: '20:15', duration: '1h 15m', price: 3900, stops: 0, class: 'Economy', availableSeats: 45, aircraft: 'Airbus A320', baggage: '15kg', meal: false },
  { id: 'FL014', airline: 'Air India', flightNumber: 'AI-102', source: 'Delhi', destination: 'Kolkata', departure: '20:30', arrival: '22:45', duration: '2h 15m', price: 5400, stops: 0, class: 'Economy', availableSeats: 60, aircraft: 'Airbus A321', baggage: '25kg', meal: true },
  { id: 'FL015', airline: 'Akasa Air', flightNumber: 'QP-202', source: 'Bangalore', destination: 'Mumbai', departure: '14:15', arrival: '16:00', duration: '1h 45m', price: 3800, stops: 0, class: 'Economy', availableSeats: 70, aircraft: 'Boeing 737 Max', baggage: '15kg', meal: true }
];

export const searchFlights = (source, destination, date, passengers) => {
  return flights.filter(f => 
    (!source || f.source.toLowerCase() === source.toLowerCase()) && 
    (!destination || f.destination.toLowerCase() === destination.toLowerCase()) &&
    f.availableSeats >= passengers
  );
};
`;

files['data/trains.js'] = `
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
`;

files['data/buses.js'] = `
const buses = [
  { id: 'BU001', operator: 'RedBus Travels', busType: 'AC Sleeper', source: 'Lucknow', destination: 'Delhi', departure: '21:00', arrival: '07:00', duration: '10h', price: 950, totalSeats: 40, availableSeats: 22, rating: 4.2, amenities: ['WiFi', 'Charging Point', 'Blanket'], boardingPoint: 'Amausi', droppingPoint: 'Kashmere Gate ISBT' },
  { id: 'BU002', operator: 'IntrCity SmartBus', busType: 'Volvo AC Seater', source: 'Lucknow', destination: 'Delhi', departure: '22:30', arrival: '06:30', duration: '8h', price: 1200, totalSeats: 45, availableSeats: 15, rating: 4.5, amenities: ['Water Bottle', 'Charging Point', 'Blanket', 'Reading Light'], boardingPoint: 'Alambagh', droppingPoint: 'Anand Vihar' },
  { id: 'BU003', operator: 'Zingbus', busType: 'Premium AC Sleeper', source: 'Delhi', destination: 'Jaipur', departure: '06:00', arrival: '11:00', duration: '5h', price: 650, totalSeats: 36, availableSeats: 30, rating: 4.0, amenities: ['WiFi', 'Charging Point'], boardingPoint: 'Dhaula Kuan', droppingPoint: 'Sindhi Camp' },
  { id: 'BU004', operator: 'Neeta Travels', busType: 'Volvo AC Sleeper', source: 'Mumbai', destination: 'Goa', departure: '19:00', arrival: '07:00', duration: '12h', price: 1500, totalSeats: 30, availableSeats: 10, rating: 4.3, amenities: ['Blanket', 'Charging Point', 'Movie'], boardingPoint: 'Borivali', droppingPoint: 'Panjim' }
];

export const searchBuses = (source, destination, date, passengers) => {
  return buses.filter(b => 
    (!source || b.source.toLowerCase() === source.toLowerCase()) && 
    (!destination || b.destination.toLowerCase() === destination.toLowerCase()) &&
    b.availableSeats >= passengers
  );
};
`;

files['data/hotels.js'] = `
const hotels = [
  { id: 'HT001', name: 'The Taj Mahal Hotel', destination: 'Delhi', address: 'Mansingh Road, New Delhi', rating: 5, reviewCount: 2840, pricePerNight: 8500, totalPrice: 0, category: 'Luxury', amenities: ['Pool', 'Gym', 'Spa', 'Restaurant', 'WiFi', 'Parking'], images: [], description: 'Iconic 5-star hotel in the heart of New Delhi.', cancellation: 'Free cancellation before 24h', breakfast: true },
  { id: 'HT002', name: 'Lemon Tree Premier', destination: 'Delhi', address: 'Aerocity, New Delhi', rating: 4, reviewCount: 1520, pricePerNight: 4200, totalPrice: 0, category: 'Standard', amenities: ['Gym', 'Restaurant', 'WiFi'], images: [], description: 'Modern business hotel conveniently located near the airport.', cancellation: 'Non-refundable', breakfast: true },
  { id: 'HT003', name: 'Taj Holiday Village', destination: 'Goa', address: 'Sinquerim, Candolim', rating: 5, reviewCount: 3100, pricePerNight: 12500, totalPrice: 0, category: 'Luxury', amenities: ['Beach Access', 'Pool', 'Spa', 'Bar', 'WiFi'], images: [], description: 'Heritage resort with Goan-Portuguese architecture.', cancellation: 'Free cancellation before 48h', breakfast: true },
  { id: 'HT004', name: 'Zuri White Sands', destination: 'Goa', address: 'Varca Beach', rating: 4, reviewCount: 950, pricePerNight: 6800, totalPrice: 0, category: 'Standard', amenities: ['Pool', 'Casino', 'Restaurant', 'WiFi'], images: [], description: 'Beautiful beachfront resort in South Goa.', cancellation: 'Free cancellation before 24h', breakfast: true },
  { id: 'HT005', name: 'Taj Lands End', destination: 'Mumbai', address: 'Bandra West, Mumbai', rating: 5, reviewCount: 4200, pricePerNight: 11000, totalPrice: 0, category: 'Luxury', amenities: ['Sea View', 'Pool', 'Spa', 'WiFi'], images: [], description: 'Overlooking the Arabian Sea and the Bandra Worli Sea Link.', cancellation: 'Free cancellation before 24h', breakfast: false },
  { id: 'HT006', name: 'Rambagh Palace', destination: 'Jaipur', address: 'Bhawani Singh Road', rating: 5, reviewCount: 2100, pricePerNight: 25000, totalPrice: 0, category: 'Luxury', amenities: ['Palace', 'Pool', 'Spa', 'Royal Dining'], images: [], description: 'Experience the finest traditions of Rajput hospitality.', cancellation: 'Free cancellation before 7 days', breakfast: true },
  { id: 'HT007', name: 'Renaissance Hotel', destination: 'Lucknow', address: 'Gomti Nagar', rating: 5, reviewCount: 890, pricePerNight: 5500, totalPrice: 0, category: 'Luxury', amenities: ['Rooftop Pool', 'Gym', 'Restaurant', 'WiFi'], images: [], description: 'Tallest hotel in Lucknow with spectacular city views.', cancellation: 'Free cancellation before 24h', breakfast: true }
];

export const searchHotels = (destination, checkin, checkout, guests) => {
  return hotels.filter(h => 
    (!destination || h.destination.toLowerCase() === destination.toLowerCase())
  );
};
`;

files['data/activities.js'] = `
const activities = [
  { id: 'AC001', name: 'India Gate Visit', destination: 'Delhi', category: 'sightseeing', duration: '2 hours', price: 0, rating: 4.7, description: 'Visit the iconic war memorial in the heart of Delhi.', tags: ['Free', 'Outdoor', 'Historical'], timeOfDay: 'any', difficulty: 'Easy' },
  { id: 'AC002', name: 'Red Fort Light & Sound Show', destination: 'Delhi', category: 'entertainment', duration: '1.5 hours', price: 500, rating: 4.5, description: 'Spectacular historical show at the Red Fort.', tags: ['Historical', 'Evening'], timeOfDay: 'evening', difficulty: 'Easy' },
  { id: 'AC003', name: 'Chandni Chowk Food Walk', destination: 'Delhi', category: 'food', duration: '3 hours', price: 1200, rating: 4.8, description: 'Taste the best street food in Old Delhi.', tags: ['Food', 'Walking'], timeOfDay: 'afternoon', difficulty: 'Medium' },
  
  { id: 'AC004', name: 'Scuba Diving at Grande Island', destination: 'Goa', category: 'adventure', duration: '6 hours', price: 2500, rating: 4.6, description: 'Explore underwater life with professional instructors.', tags: ['Water Sports', 'Adventure'], timeOfDay: 'morning', difficulty: 'Hard' },
  { id: 'AC005', name: 'Dudhsagar Trek', destination: 'Goa', category: 'nature', duration: '8 hours', price: 1500, rating: 4.9, description: 'Trek to the majestic Dudhsagar waterfalls.', tags: ['Trekking', 'Nature'], timeOfDay: 'morning', difficulty: 'Medium' },
  { id: 'AC006', name: 'Baga Beach Parasailing', destination: 'Goa', category: 'adventure', duration: '1 hour', price: 800, rating: 4.3, description: 'Thrilling parasailing experience over the Arabian Sea.', tags: ['Water Sports'], timeOfDay: 'any', difficulty: 'Easy' },

  { id: 'AC007', name: 'Elephanta Caves Tour', destination: 'Mumbai', category: 'culture', duration: '5 hours', price: 900, rating: 4.4, description: 'Ferry ride and guided tour of the ancient caves.', tags: ['Historical', 'Ferry'], timeOfDay: 'morning', difficulty: 'Medium' },
  { id: 'AC008', name: 'Marine Drive Evening Walk', destination: 'Mumbai', category: 'nature', duration: '2 hours', price: 0, rating: 4.8, description: 'Enjoy the sunset at the Queen\\'s Necklace.', tags: ['Free', 'Relaxing'], timeOfDay: 'evening', difficulty: 'Easy' },
  
  { id: 'AC009', name: 'Amer Fort Elephant Ride', destination: 'Jaipur', category: 'sightseeing', duration: '3 hours', price: 1100, rating: 4.5, description: 'Royal entry to the fort on an elephant.', tags: ['Historical', 'Royal'], timeOfDay: 'morning', difficulty: 'Easy' },
  { id: 'AC010', name: 'Chokhi Dhani Dinner', destination: 'Jaipur', category: 'culture', duration: '4 hours', price: 950, rating: 4.7, description: 'Traditional Rajasthani dinner and cultural performances.', tags: ['Food', 'Cultural'], timeOfDay: 'evening', difficulty: 'Easy' },

  { id: 'AC011', name: 'Bara Imambara Tour', destination: 'Lucknow', category: 'historical', duration: '3 hours', price: 200, rating: 4.6, description: 'Explore the Bhool Bhulaiya and the grand architecture.', tags: ['Historical', 'Architecture'], timeOfDay: 'any', difficulty: 'Medium' },
  { id: 'AC012', name: 'Tunday Kababi Dinner', destination: 'Lucknow', category: 'food', duration: '2 hours', price: 500, rating: 4.9, description: 'Taste the world-famous Galouti kebabs.', tags: ['Food', 'Iconic'], timeOfDay: 'evening', difficulty: 'Easy' }
];

export const searchActivities = (destination) => {
  return activities.filter(a => 
    (!destination || a.destination.toLowerCase() === destination.toLowerCase())
  );
};
`;

files['services/api.js'] = `
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.detail || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
`;

files['services/travelService.js'] = `
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
`;

files['components/LoadingState.jsx'] = `
import React from 'react';

function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
}

export default LoadingState;
`;

files['components/ErrorMessage.jsx'] = `
import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="text-4xl">⚠️</div>
      <p className="text-red-400 font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
`;

files['components/EmptyState.jsx'] = `
import React from 'react';

function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      {icon && <div className="text-5xl text-slate-500 mb-2">{icon}</div>}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-slate-400 max-w-sm">{description}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
`;

files['pages/PlanTrip.jsx'] = `
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { Plane, Train, Bus, MapPin, Search } from 'lucide-react';

function PlanTrip() {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useTripContext();
  const [localParams, setLocalParams] = useState(searchParams);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!localParams.source) err.source = 'Source is required';
    if (!localParams.destination) err.destination = 'Destination is required';
    if (!localParams.departureDate) err.departureDate = 'Departure date is required';
    if (localParams.tripType === 'round-trip' && !localParams.returnDate) err.returnDate = 'Return date is required';
    if (localParams.transportModes.length === 0) err.transportModes = 'Select at least one transport mode';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSearchParams(localParams);
      if (localParams.transportModes.includes('flight')) navigate('/flights');
      else if (localParams.transportModes.includes('train')) navigate('/trains');
      else if (localParams.transportModes.includes('bus')) navigate('/buses');
      else navigate('/hotels'); // fallback
    }
  };

  const handleTransportToggle = (mode) => {
    setLocalParams(prev => {
      const modes = prev.transportModes.includes(mode) 
        ? prev.transportModes.filter(m => m !== mode)
        : [...prev.transportModes, mode];
      return { ...prev, transportModes: modes };
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Plan Your Trip</h1>
      
      <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-2xl space-y-6 bg-slate-800/50">
        
        {/* Source & Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={localParams.source}
                onChange={e => setLocalParams({...localParams, source: e.target.value})}
                placeholder="e.g. Lucknow"
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            {errors.source && <p className="text-red-400 text-xs mt-1">{errors.source}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={localParams.destination}
                onChange={e => setLocalParams({...localParams, destination: e.target.value})}
                placeholder="e.g. Delhi"
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            {errors.destination && <p className="text-red-400 text-xs mt-1">{errors.destination}</p>}
          </div>
        </div>

        {/* Trip Type & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Trip Type</label>
            <select 
              value={localParams.tripType}
              onChange={e => setLocalParams({...localParams, tripType: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="one-way">One Way</option>
              <option value="round-trip">Round Trip</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Departure Date</label>
            <input 
              type="date" 
              value={localParams.departureDate}
              onChange={e => setLocalParams({...localParams, departureDate: e.target.value})}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.departureDate && <p className="text-red-400 text-xs mt-1">{errors.departureDate}</p>}
          </div>
          {localParams.tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Return Date</label>
              <input 
                type="date" 
                value={localParams.returnDate}
                onChange={e => setLocalParams({...localParams, returnDate: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {errors.returnDate && <p className="text-red-400 text-xs mt-1">{errors.returnDate}</p>}
            </div>
          )}
        </div>

        {/* Passengers & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Travelers</label>
            <input 
              type="number" 
              min="1" max="10"
              value={localParams.passengers}
              onChange={e => setLocalParams({...localParams, passengers: parseInt(e.target.value)})}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Total Budget (₹ {localParams.budget.toLocaleString()})</label>
            <input 
              type="range" 
              min="5000" max="200000" step="1000"
              value={localParams.budget}
              onChange={e => setLocalParams({...localParams, budget: parseInt(e.target.value)})}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-3"
            />
          </div>
        </div>

        {/* Transport Modes */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Transport Preferences</label>
          <div className="flex gap-4">
            <button type="button" onClick={() => handleTransportToggle('flight')} className={\`flex items-center gap-2 px-4 py-2 rounded-full border \${localParams.transportModes.includes('flight') ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-400'}\`}>
              <Plane className="w-4 h-4" /> Flight
            </button>
            <button type="button" onClick={() => handleTransportToggle('train')} className={\`flex items-center gap-2 px-4 py-2 rounded-full border \${localParams.transportModes.includes('train') ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-400'}\`}>
              <Train className="w-4 h-4" /> Train
            </button>
            <button type="button" onClick={() => handleTransportToggle('bus')} className={\`flex items-center gap-2 px-4 py-2 rounded-full border \${localParams.transportModes.includes('bus') ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-400'}\`}>
              <Bus className="w-4 h-4" /> Bus
            </button>
          </div>
          {errors.transportModes && <p className="text-red-400 text-xs mt-2">{errors.transportModes}</p>}
        </div>

        <button type="submit" className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg flex justify-center items-center gap-2 transition-colors">
          <Search className="w-5 h-5" /> Search Trip
        </button>
      </form>
    </div>
  );
}

export default PlanTrip;
`;

files['pages/FlightResults.jsx'] = `
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { flightService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Plane, Filter, Clock } from 'lucide-react';

function FlightResults() {
  const { searchParams, setSelectedFlight, setSelectedTransportMode } = useTripContext();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams.source) {
      navigate('/plan');
      return;
    }
    
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await flightService.search(searchParams);
        setFlights(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [searchParams, navigate]);

  const handleSelect = (flight) => {
    setSelectedFlight(flight);
    setSelectedTransportMode('flight');
    navigate('/hotels');
  };

  if (loading) return <LoadingState message="Searching best flights..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">
        DEMO MODE: Showing mock flight data for testing.
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Select Flight</h2>
        <div className="text-slate-400 text-sm">
          {searchParams.source} to {searchParams.destination} • {searchParams.departureDate} • {searchParams.passengers} Traveler(s)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="glass p-5 rounded-xl h-fit space-y-6">
          <div className="flex items-center gap-2 text-white font-medium mb-4">
            <Filter className="w-4 h-4" /> Filters
          </div>
          {/* Mock filters for visual completeness */}
          <div>
            <h4 className="text-sm text-slate-400 mb-2">Stops</h4>
            <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" className="rounded bg-slate-800" /> Direct</label>
            <label className="flex items-center gap-2 text-sm text-slate-300 mt-2"><input type="checkbox" className="rounded bg-slate-800" /> 1 Stop</label>
          </div>
          <div>
            <h4 className="text-sm text-slate-400 mb-2">Airlines</h4>
            <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" className="rounded bg-slate-800" /> IndiGo</label>
            <label className="flex items-center gap-2 text-sm text-slate-300 mt-2"><input type="checkbox" className="rounded bg-slate-800" /> Air India</label>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {flights.length === 0 ? (
            <EmptyState title="No flights found" description="Try changing your search criteria or dates." />
          ) : (
            flights.map(flight => (
              <div key={flight.id} className="glass p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-slate-800/80 transition-colors">
                <div className="flex flex-col gap-1 w-full md:w-1/4">
                  <span className="font-semibold text-white">{flight.airline}</span>
                  <span className="text-xs text-slate-400">{flight.flightNumber} • {flight.class}</span>
                </div>
                
                <div className="flex items-center justify-between w-full md:w-1/2">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{flight.departure}</div>
                    <div className="text-xs text-slate-400">{flight.source}</div>
                  </div>
                  <div className="flex flex-col items-center flex-1 px-4">
                    <span className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> {flight.duration}</span>
                    <div className="w-full h-[1px] bg-slate-600 relative">
                      <Plane className="w-4 h-4 text-indigo-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1">{flight.stops === 0 ? 'Direct' : \`\${flight.stops} Stop(s)\`}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{flight.arrival}</div>
                    <div className="text-xs text-slate-400">{flight.destination}</div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end w-full md:w-1/4 gap-2">
                  <div className="text-2xl font-bold text-indigo-400">₹{flight.price.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 mb-2">per person</div>
                  <button onClick={() => handleSelect(flight)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors">
                    Select Flight
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightResults;
`;

files['pages/TrainResults.jsx'] = `
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { trainService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Train, Filter, Clock } from 'lucide-react';

function TrainResults() {
  const { searchParams, setSelectedTrain, setSelectedTransportMode } = useTripContext();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams.source) return navigate('/plan');
    const fetchTrains = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await trainService.search(searchParams);
        setTrains(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, [searchParams, navigate]);

  const handleSelect = (train, trainClass) => {
    setSelectedTrain({ ...train, price: trainClass.price, selectedClass: trainClass.name });
    setSelectedTransportMode('train');
    navigate('/hotels');
  };

  if (loading) return <LoadingState message="Searching available trains..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">
        DEMO MODE: Showing mock train data.
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Select Train</h2>
        <div className="text-slate-400 text-sm">{searchParams.source} to {searchParams.destination}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass p-5 rounded-xl h-fit space-y-6">
          <div className="flex items-center gap-2 text-white font-medium"><Filter className="w-4 h-4"/> Filters</div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          {trains.length === 0 ? <EmptyState title="No trains found" /> : trains.map(train => (
            <div key={train.id} className="glass p-5 rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">{train.trainName}</h3>
                  <p className="text-sm text-slate-400">#{train.trainNumber} • {train.type}</p>
                </div>
                <div className="flex items-center gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">{train.departure}</div>
                    <div className="text-xs text-slate-400">{train.source}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-400">{train.duration}</span>
                    <Train className="w-5 h-5 text-indigo-400 my-1"/>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{train.arrival}</div>
                    <div className="text-xs text-slate-400">{train.destination}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-2 border-t border-slate-700 pt-4">
                {train.classes.map(c => (
                  <div key={c.type} className="flex-1 min-w-[150px] border border-slate-700 rounded-lg p-3 hover:border-indigo-500 transition-colors bg-slate-800/50 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-indigo-400 font-bold">₹{c.price}</span>
                    </div>
                    <div className="text-xs text-green-400 mb-3">Available: {c.available}</div>
                    <button onClick={() => handleSelect(train, c)} className="w-full py-1.5 bg-slate-700 hover:bg-indigo-600 text-white rounded text-sm transition-colors">
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TrainResults;
`;

files['pages/BusResults.jsx'] = `
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { busService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Bus, Filter, Star } from 'lucide-react';

function BusResults() {
  const { searchParams, setSelectedBus, setSelectedTransportMode } = useTripContext();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams.source) return navigate('/plan');
    const fetchBuses = async () => {
      setLoading(true);
      try {
        const results = await busService.search(searchParams);
        setBuses(results);
      } catch (err) {
        setError(err.message);
      } finally { setLoading(false); }
    };
    fetchBuses();
  }, [searchParams, navigate]);

  const handleSelect = (bus) => {
    setSelectedBus(bus);
    setSelectedTransportMode('bus');
    navigate('/hotels');
  };

  if (loading) return <LoadingState message="Searching buses..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">DEMO MODE</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass p-5 rounded-xl h-fit space-y-6">
          <div className="flex items-center gap-2 text-white font-medium"><Filter className="w-4 h-4"/> Filters</div>
        </div>
        <div className="lg:col-span-3 space-y-4">
          {buses.length === 0 ? <EmptyState title="No buses found" /> : buses.map(bus => (
            <div key={bus.id} className="glass p-5 rounded-xl flex flex-col md:flex-row justify-between gap-4">
              <div className="w-full md:w-1/3">
                <h3 className="font-bold text-white text-lg">{bus.operator}</h3>
                <p className="text-sm text-slate-400 mb-2">{bus.busType}</p>
                <div className="flex items-center gap-1 text-xs bg-slate-800 w-fit px-2 py-1 rounded text-yellow-400"><Star className="w-3 h-3 fill-current"/> {bus.rating}</div>
              </div>
              
              <div className="flex justify-between items-center w-full md:w-1/3 text-center">
                 <div>
                    <div className="text-lg font-bold text-white">{bus.departure}</div>
                    <div className="text-xs text-slate-400">{bus.source}</div>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className="text-xs text-slate-400">{bus.duration}</span>
                    <Bus className="w-4 h-4 text-indigo-400 my-1"/>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{bus.arrival}</div>
                    <div className="text-xs text-slate-400">{bus.destination}</div>
                  </div>
              </div>

              <div className="w-full md:w-1/3 flex flex-col justify-between items-end gap-2">
                 <div className="text-2xl font-bold text-indigo-400">₹{bus.price}</div>
                 <button onClick={() => handleSelect(bus)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium">Select Bus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BusResults;
`;

files['pages/HotelResults.jsx'] = `
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { hotelService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Hotel, MapPin, Star, Filter } from 'lucide-react';

function HotelResults() {
  const { searchParams, setSelectedHotel } = useTripContext();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams.destination) return navigate('/plan');
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const results = await hotelService.search(searchParams);
        setHotels(results);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchHotels();
  }, [searchParams, navigate]);

  const handleSelect = (hotel) => {
    setSelectedHotel(hotel);
    navigate('/activities');
  };

  if (loading) return <LoadingState message="Finding perfect stays..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">DEMO MODE</div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Hotels in {searchParams.destination}</h2>
        <button onClick={() => navigate('/activities')} className="text-slate-400 hover:text-white underline">Skip Hotels</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass p-5 rounded-xl h-fit space-y-6">
           <div className="flex items-center gap-2 text-white font-medium"><Filter className="w-4 h-4"/> Filters</div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          {hotels.length === 0 ? <EmptyState title="No hotels found" /> : hotels.map(hotel => (
            <div key={hotel.id} className="glass rounded-xl flex flex-col md:flex-row overflow-hidden border border-slate-700/50">
              <div className="w-full md:w-1/3 bg-slate-800 min-h-[200px] flex items-center justify-center">
                <Hotel className="w-12 h-12 text-slate-600" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                    <div className="flex items-center gap-1 bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-sm">
                      <Star className="w-4 h-4 fill-current"/> {hotel.rating}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {hotel.address}</p>
                  <p className="text-sm text-slate-300 mt-3">{hotel.description}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {hotel.amenities.slice(0,4).map(a => <span key={a} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{a}</span>)}
                  </div>
                </div>
                <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-2xl font-bold text-white">₹{hotel.pricePerNight}</div>
                    <div className="text-xs text-slate-400">per night</div>
                  </div>
                  <button onClick={() => handleSelect(hotel)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">
                    Select Hotel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HotelResults;
`;

files['pages/Activities.jsx'] = `
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { activityService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Plus, Check, MapPin, Clock } from 'lucide-react';

function Activities() {
  const { searchParams, selectedActivities, addActivity, removeActivity } = useTripContext();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams.destination) return navigate('/plan');
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const results = await activityService.search(searchParams);
        setActivities(results);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchActivities();
  }, [searchParams, navigate]);

  if (loading) return <LoadingState message="Finding things to do..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">DEMO MODE</div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Activities in {searchParams.destination}</h2>
          <p className="text-slate-400">Select what you'd like to do during your trip.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-300 bg-slate-800 px-4 py-2 rounded-lg">{selectedActivities.length} Selected</div>
          <button onClick={() => navigate('/itinerary')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Continue to Itinerary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(activity => {
          const isSelected = selectedActivities.some(a => a.id === activity.id);
          return (
            <div key={activity.id} className={\`glass p-5 rounded-xl border \${isSelected ? 'border-indigo-500 bg-indigo-900/10' : 'border-slate-700'}\`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded capitalize">{activity.category}</span>
                <span className="text-indigo-400 font-bold">{activity.price === 0 ? 'Free' : \`₹\${activity.price}\`}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{activity.name}</h3>
              <p className="text-sm text-slate-400 mb-4 h-10 overflow-hidden">{activity.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {activity.duration}</span>
                <span className="flex items-center gap-1 capitalize"><MapPin className="w-3 h-3"/> {activity.timeOfDay}</span>
              </div>

              <button 
                onClick={() => isSelected ? removeActivity(activity.id) : addActivity(activity)}
                className={\`w-full py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors \${isSelected ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}\`}
              >
                {isSelected ? <><Check className="w-4 h-4"/> Added</> : <><Plus className="w-4 h-4"/> Add Activity</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Activities;
`;

files['pages/Itinerary.jsx'] = `
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { tripService } from '../services/travelService';
import { Plane, Train, Bus, Hotel, MapPin, Check } from 'lucide-react';

function Itinerary() {
  const { searchParams, selectedFlight, selectedTrain, selectedBus, selectedTransportMode, selectedHotel, selectedActivities, budgetBreakdown, calculateBudget, setCurrentTrip } = useTripContext();
  const navigate = useNavigate();

  useEffect(() => {
    calculateBudget();
  }, [selectedFlight, selectedTrain, selectedBus, selectedHotel, selectedActivities]);

  const handleBook = async () => {
    // In a real app we would call services for each booking. Here we create a master trip.
    const tripData = { searchParams, transport: { mode: selectedTransportMode, flight: selectedFlight, train: selectedTrain, bus: selectedBus }, hotel: selectedHotel, activities: selectedActivities, budget: budgetBreakdown };
    const res = await tripService.create(tripData);
    if(res.success) {
      setCurrentTrip({ ...tripData, id: res.tripId });
      navigate('/confirmation');
    }
  };

  const total = budgetBreakdown.transport + budgetBreakdown.hotel + budgetBreakdown.activities + budgetBreakdown.food + budgetBreakdown.misc;
  const remaining = searchParams.budget - total;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Trip Itinerary</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Timeline</h3>
          
          {/* Day 1 Transport */}
          <div className="glass p-5 rounded-xl border-l-4 border-indigo-500">
            <h4 className="font-bold text-white mb-3">Departure - {searchParams.departureDate}</h4>
            {selectedTransportMode === 'flight' && selectedFlight && (
              <div className="flex items-center gap-4 text-slate-300"><Plane className="w-5 h-5 text-indigo-400"/> {selectedFlight.airline} ({selectedFlight.source} → {selectedFlight.destination}) at {selectedFlight.departure}</div>
            )}
            {selectedTransportMode === 'train' && selectedTrain && (
              <div className="flex items-center gap-4 text-slate-300"><Train className="w-5 h-5 text-indigo-400"/> {selectedTrain.trainName} ({selectedTrain.source} → {selectedTrain.destination}) at {selectedTrain.departure}</div>
            )}
            {selectedTransportMode === 'bus' && selectedBus && (
              <div className="flex items-center gap-4 text-slate-300"><Bus className="w-5 h-5 text-indigo-400"/> {selectedBus.operator} ({selectedBus.source} → {selectedBus.destination}) at {selectedBus.departure}</div>
            )}
            {!selectedTransportMode && <div className="text-slate-500">No transport selected.</div>}
          </div>

          {/* Hotel */}
          {selectedHotel && (
            <div className="glass p-5 rounded-xl border-l-4 border-indigo-500">
              <h4 className="font-bold text-white mb-3">Accommodation</h4>
              <div className="flex items-center gap-4 text-slate-300"><Hotel className="w-5 h-5 text-indigo-400"/> {selectedHotel.name}, {selectedHotel.destination}</div>
            </div>
          )}

          {/* Activities */}
          {selectedActivities.length > 0 && (
            <div className="glass p-5 rounded-xl border-l-4 border-indigo-500">
               <h4 className="font-bold text-white mb-3">Planned Activities</h4>
               <ul className="space-y-3">
                 {selectedActivities.map(a => (
                   <li key={a.id} className="flex items-start gap-3 text-slate-300">
                     <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5"/>
                     <div><div className="font-medium text-white">{a.name}</div><div className="text-sm text-slate-400">{a.duration}</div></div>
                   </li>
                 ))}
               </ul>
            </div>
          )}
        </div>

        {/* Budget Summary */}
        <div className="glass p-6 rounded-xl h-fit sticky top-24">
          <h3 className="text-xl font-bold text-white mb-6">Budget Summary</h3>
          <div className="space-y-3 text-sm text-slate-300 mb-6">
            <div className="flex justify-between"><span>Transport</span><span>₹{budgetBreakdown.transport.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Accommodation</span><span>₹{budgetBreakdown.hotel.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Activities</span><span>₹{budgetBreakdown.activities.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Est. Food</span><span>₹{budgetBreakdown.food.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Est. Misc</span><span>₹{budgetBreakdown.misc.toLocaleString()}</span></div>
          </div>
          <div className="border-t border-slate-700 pt-4 mb-4">
            <div className="flex justify-between font-bold text-lg text-white mb-2"><span>Total Cost</span><span>₹{total.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span>Budget Set</span><span>₹{searchParams.budget.toLocaleString()}</span></div>
            <div className={\`flex justify-between font-medium mt-1 \${remaining >= 0 ? 'text-green-400' : 'text-red-400'}\`}>
              <span>Remaining</span><span>₹{remaining.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={handleBook} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Check className="w-5 h-5"/> Save & Book Trip
          </button>
        </div>
      </div>
    </div>
  );
}
export default Itinerary;
`;

files['pages/BookingConfirmation.jsx'] = `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { Check, Calendar, MapPin } from 'lucide-react';

function BookingConfirmation() {
  const { currentTrip, clearTrip } = useTripContext();
  const navigate = useNavigate();

  if (!currentTrip) return <div className="text-center py-20 text-white">No active booking.</div>;

  const handlePlanAnother = () => {
    clearTrip();
    navigate('/plan');
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 flex flex-col items-center">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
        <Check className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
      <p className="text-slate-400 mb-6">Your trip has been successfully planned and booked.</p>
      
      <div className="bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8">
        DEMO BOOKING
      </div>

      <div className="glass w-full p-8 rounded-2xl mb-8">
        <div className="flex justify-between border-b border-slate-700 pb-4 mb-4">
          <div><p className="text-sm text-slate-400">Booking ID</p><p className="font-mono text-white">{currentTrip.id}</p></div>
          <div className="text-right"><p className="text-sm text-slate-400">Status</p><p className="text-green-400 font-bold">Confirmed</p></div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-slate-300 mb-1"><MapPin className="w-4 h-4"/> Route</div>
            <div className="text-lg font-bold text-white">{currentTrip.searchParams.source} to {currentTrip.searchParams.destination}</div>
          </div>
          <div>
             <div className="flex items-center gap-2 text-slate-300 mb-1"><Calendar className="w-4 h-4"/> Dates</div>
             <div className="text-lg font-bold text-white">{currentTrip.searchParams.departureDate}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button onClick={() => navigate('/my-trips')} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors">
          View My Trips
        </button>
        <button onClick={handlePlanAnother} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
          Plan Another Trip
        </button>
      </div>
    </div>
  );
}
export default BookingConfirmation;
`;

files['pages/MyTrips.jsx'] = `
import React, { useEffect, useState } from 'react';
import { tripService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { Map } from 'lucide-react';

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      const data = await tripService.getAll();
      setTrips(data);
      setLoading(false);
    };
    fetchTrips();
  }, []);

  if (loading) return <LoadingState message="Loading your trips..." />;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">My Trips</h1>
      {trips.length === 0 ? (
        <EmptyState icon={<Map />} title="No trips yet" description="You haven't planned any trips. Start planning your next adventure!" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="glass p-5 rounded-xl">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded font-medium">DEMO</span>
                <span className="text-slate-400 text-sm">#{trip.id}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{trip.destination || 'Unknown Destination'}</h3>
              <p className="text-slate-400 text-sm mb-4">{trip.date || 'No Date'}</p>
              <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
                 <span className="text-white font-bold">₹{trip.budget?.total || 0}</span>
                 <button className="text-indigo-400 text-sm hover:text-indigo-300">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default MyTrips;
`;

files['pages/AgentMonitor.jsx'] = `
import React, { useState } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

const initialAgents = [
  { id: 1, icon: '🧠', name: 'Supervisor Agent', status: 'Running', lastAction: 'Delegating tasks', time: '12s' },
  { id: 2, icon: '✈️', name: 'Flight Agent', status: 'Complete', lastAction: 'Found 15 flights', time: '4s' },
  { id: 3, icon: '🚆', name: 'Train Agent', status: 'Idle', lastAction: '-', time: '-' },
  { id: 4, icon: '🚌', name: 'Bus Agent', status: 'Idle', lastAction: '-', time: '-' },
  { id: 5, icon: '🏨', name: 'Hotel Agent', status: 'Running', lastAction: 'Scanning properties', time: '8s' },
  { id: 6, icon: '🎯', name: 'Activity Agent', status: 'Idle', lastAction: '-', time: '-' },
  { id: 7, icon: '🌦️', name: 'Weather Agent', status: 'Complete', lastAction: 'Fetched forecast', time: '2s' },
  { id: 8, icon: '💰', name: 'Budget Agent', status: 'Running', lastAction: 'Calculating totals', time: '5s' },
  { id: 9, icon: '📅', name: 'Itinerary Agent', status: 'Idle', lastAction: 'Waiting for inputs', time: '-' },
  { id: 10, icon: '🔄', name: 'Replanning Agent', status: 'Idle', lastAction: '-', time: '-' },
];

function AgentMonitor() {
  const [agents, setAgents] = useState(initialAgents);

  const simulateProgress = () => {
    setAgents(prev => prev.map(a => {
      if (a.status === 'Running') return { ...a, status: 'Complete', lastAction: 'Finished task' };
      if (a.status === 'Idle' && Math.random() > 0.5) return { ...a, status: 'Running', lastAction: 'Started task', time: '1s' };
      return a;
    }));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Complete': return <Check className="w-4 h-4 text-green-400" />;
      case 'Running': return <div className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />;
      case 'Error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Agent Monitor</h1>
          <p className="text-slate-400">Developer dashboard for autonomous travel agents.</p>
        </div>
        <button onClick={simulateProgress} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
          Simulate Step
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-700">
              <th className="p-4 text-slate-300 font-medium">Agent</th>
              <th className="p-4 text-slate-300 font-medium">Status</th>
              <th className="p-4 text-slate-300 font-medium">Last Action</th>
              <th className="p-4 text-slate-300 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {agents.map(agent => (
              <tr key={agent.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <span className="font-medium text-white">{agent.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <span className={\`text-sm \${agent.status === 'Complete' ? 'text-green-400' : agent.status === 'Running' ? 'text-indigo-400' : 'text-slate-400'}\`}>
                      {agent.status}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-300">{agent.lastAction}</td>
                <td className="p-4 text-sm text-slate-400 text-right">{agent.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AgentMonitor;
`;

Object.keys(files).forEach(filePath => write(filePath, files[filePath]));
console.log('All files generated successfully.');
