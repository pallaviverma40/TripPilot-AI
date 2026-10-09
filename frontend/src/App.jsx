import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import PlanTrip from './pages/PlanTrip';
import TransportResults from './pages/TransportResults';
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
          <Route path="transport" element={<TransportResults />} />
          <Route path="flights" element={<TransportResults />} />
          <Route path="trains" element={<TransportResults />} />
          <Route path="buses" element={<TransportResults />} />
          <Route path="hotels" element={<HotelResults />} />
          <Route path="activities" element={<Activities />} />
          <Route path="itinerary" element={<Itinerary />} />
          <Route path="confirmation" element={<BookingConfirmation />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="agents" element={<AgentMonitor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
