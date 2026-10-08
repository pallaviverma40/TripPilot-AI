import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { Plane, Train, Bus, MapPin, Search } from 'lucide-react';

const CITIES = [
  "Lucknow", "Delhi", "Mumbai", "Goa", "Bangalore", "Kolkata", "Chennai",
  "Jaipur", "Hyderabad", "Pune", "Ahmedabad", "Kochi", "Varanasi", "Amritsar",
  "Chandigarh", "Srinagar", "Leh", "Dehradun", "Haridwar", "Rishikesh",
  "Udaipur", "Jodhpur", "Jaisalmer", "Patna", "Bhubaneswar", "Visakhapatnam",
  "Coimbatore", "Madurai", "Thiruvananthapuram", "Indore", "Bhopal", "Nagpur",
  "Raipur", "Ranchi", "Guwahati", "Port Blair", "Agra", "Shimla", "Manali", "Firozabad"
];

const AutocompleteInput = ({ label, value, onChange, placeholder, icon: Icon, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(value.toLowerCase()));

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          value={value}
          onChange={e => { onChange(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        {isOpen && filteredCities.length > 0 && (
          <ul className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-xl shadow-black/50 text-slate-200 scrollbar-thin">
            {filteredCities.map(city => (
              <li 
                key={city}
                onMouseDown={(e) => { e.preventDefault(); onChange(city); setIsOpen(false); }}
                className="px-4 py-2 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

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
          <AutocompleteInput
            label="From"
            value={localParams.source}
            onChange={(val) => setLocalParams({...localParams, source: val})}
            placeholder="e.g. Lucknow"
            icon={MapPin}
            error={errors.source}
          />
          <AutocompleteInput
            label="To"
            value={localParams.destination}
            onChange={(val) => setLocalParams({...localParams, destination: val})}
            placeholder="e.g. Delhi"
            icon={MapPin}
            error={errors.destination}
          />
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
