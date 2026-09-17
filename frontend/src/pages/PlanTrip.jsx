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
            <button type="button" onClick={() => handleTransportToggle('flight')} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${localParams.transportModes.includes('flight') ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-400'}`}>
              <Plane className="w-4 h-4" /> Flight
            </button>
            <button type="button" onClick={() => handleTransportToggle('train')} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${localParams.transportModes.includes('train') ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-400'}`}>
              <Train className="w-4 h-4" /> Train
            </button>
            <button type="button" onClick={() => handleTransportToggle('bus')} className={`flex items-center gap-2 px-4 py-2 rounded-full border ${localParams.transportModes.includes('bus') ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400' : 'border-slate-700 bg-slate-900 text-slate-400'}`}>
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
