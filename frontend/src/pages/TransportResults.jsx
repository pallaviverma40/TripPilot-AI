import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { flightService, trainService, busService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Plane, Train, Bus, Clock, Filter, Star, CheckCircle, ArrowRight, IndianRupee, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

function parseDurationMinutes(durationStr) {
  if (!durationStr) return 9999;
  let minutes = 0;
  const hMatch = durationStr.match(/(\d+)\s*h/);
  const mMatch = durationStr.match(/(\d+)\s*m/);
  if (hMatch) minutes += parseInt(hMatch[1], 10) * 60;
  if (mMatch) minutes += parseInt(mMatch[1], 10);
  return minutes || 9999;
}

function parseDepartureHour(timeStr) {
  if (!timeStr) return 12;
  const parts = timeStr.split(':');
  return parseInt(parts[0], 10) || 0;
}

function TransportResults() {
  const { searchParams, setSearchParams, setSelectedFlight, setSelectedTrain, setSelectedBus, setSelectedTransportMode } = useTripContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Raw fetched data
  const [flights, setFlights] = useState([]);
  const [trains, setTrains] = useState([]);
  const [buses, setBuses] = useState([]);

  // Active filters
  const [selectedModes, setSelectedModes] = useState(() => {
    // If navigated from specific path (e.g., /flights, /trains, /buses), default accordingly or use searchParams
    if (location.pathname === '/flights') return ['flight'];
    if (location.pathname === '/trains') return ['train'];
    if (location.pathname === '/buses') return ['bus'];
    if (searchParams.transportModes && searchParams.transportModes.length > 0) {
      return searchParams.transportModes;
    }
    return ['flight', 'train', 'bus'];
  });

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'flight' | 'train' | 'bus'
  const [sortBy, setSortBy] = useState('cheapest'); // 'cheapest' | 'fastest' | 'earliest' | 'recommended'
  const [maxPriceFilter, setMaxPriceFilter] = useState(15000);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all' | 'morning' | 'afternoon' | 'evening' | 'night'

  // Fetch all selected transport options
  useEffect(() => {
    if (!searchParams.source || !searchParams.destination) {
      navigate('/plan');
      return;
    }

    const fetchAllTransport = async () => {
      setLoading(true);
      setError(null);

      try {
        const [flightRes, trainRes, busRes] = await Promise.allSettled([
          flightService.search(searchParams),
          trainService.search(searchParams),
          busService.search(searchParams)
        ]);

        const fetchedFlights = flightRes.status === 'fulfilled' && Array.isArray(flightRes.value) ? flightRes.value : [];
        const fetchedTrains = trainRes.status === 'fulfilled' && Array.isArray(trainRes.value) ? trainRes.value : [];
        const fetchedBuses = busRes.status === 'fulfilled' && Array.isArray(busRes.value) ? busRes.value : [];

        setFlights(fetchedFlights);
        setTrains(fetchedTrains);
        setBuses(fetchedBuses);

        // Calculate max price from all fetched options
        let highest = 5000;
        fetchedFlights.forEach(f => { if (f.price > highest) highest = f.price; });
        fetchedTrains.forEach(t => { 
          if (t.classes) t.classes.forEach(c => { if (c.price > highest) highest = c.price; });
          else if (t.price > highest) highest = t.price;
        });
        fetchedBuses.forEach(b => {
          if (b.seat_types) b.seat_types.forEach(s => { if (s.price > highest) highest = s.price; });
          else if (b.price > highest) highest = b.price;
        });
        setMaxPriceFilter(Math.ceil(highest / 1000) * 1000 + 1000);

      } catch (err) {
        setError(err.message || 'Failed to search transport options');
      } finally {
        setLoading(false);
      }
    };

    fetchAllTransport();
  }, [searchParams, navigate]);

  // Handler for mode checkboxes in filter sidebar
  const toggleMode = (mode) => {
    setSelectedModes(prev => {
      if (prev.includes(mode)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter(m => m !== mode);
      } else {
        return [...prev, mode];
      }
    });
  };

  // Selection handlers
  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setSelectedTrain(null);
    setSelectedBus(null);
    setSelectedTransportMode('flight');
    navigate('/hotels');
  };

  const handleSelectTrain = (train, trainClass) => {
    setSelectedTrain({
      ...train,
      price: trainClass.price,
      selectedClass: trainClass.name,
      total_price: trainClass.price * (searchParams.passengers || 1)
    });
    setSelectedFlight(null);
    setSelectedBus(null);
    setSelectedTransportMode('train');
    navigate('/hotels');
  };

  const handleSelectBus = (bus, seatType) => {
    const unitPrice = seatType ? seatType.price : bus.price;
    setSelectedBus({
      ...bus,
      selectedSeatType: seatType ? seatType.type : 'Standard',
      price: unitPrice,
      total_price: unitPrice * (searchParams.passengers || 1)
    });
    setSelectedFlight(null);
    setSelectedTrain(null);
    setSelectedTransportMode('bus');
    navigate('/hotels');
  };

  // Combine and normalize items
  const combinedList = useMemo(() => {
    const list = [];

    if (selectedModes.includes('flight') && (activeTab === 'all' || activeTab === 'flight')) {
      flights.forEach(f => {
        list.push({
          ...f,
          transportType: 'flight',
          displayPrice: f.price,
          sortPrice: f.price,
          sortDuration: parseDurationMinutes(f.duration),
          depHour: parseDepartureHour(f.departure),
        });
      });
    }

    if (selectedModes.includes('train') && (activeTab === 'all' || activeTab === 'train')) {
      trains.forEach(t => {
        const minClassPrice = t.classes && t.classes.length > 0 
          ? Math.min(...t.classes.map(c => c.price)) 
          : (t.price || 500);
        list.push({
          ...t,
          transportType: 'train',
          displayPrice: minClassPrice,
          sortPrice: minClassPrice,
          sortDuration: parseDurationMinutes(t.duration),
          depHour: parseDepartureHour(t.departure),
        });
      });
    }

    if (selectedModes.includes('bus') && (activeTab === 'all' || activeTab === 'bus')) {
      buses.forEach(b => {
        const minSeatPrice = b.seat_types && b.seat_types.length > 0
          ? Math.min(...b.seat_types.map(s => s.price))
          : (b.price || 400);
        list.push({
          ...b,
          transportType: 'bus',
          displayPrice: minSeatPrice,
          sortPrice: minSeatPrice,
          sortDuration: parseDurationMinutes(b.duration),
          depHour: parseDepartureHour(b.departure),
        });
      });
    }

    // Apply Time Filter
    let filtered = list.filter(item => {
      if (item.sortPrice > maxPriceFilter) return false;

      if (timeFilter === 'morning') return item.depHour >= 6 && item.depHour < 12;
      if (timeFilter === 'afternoon') return item.depHour >= 12 && item.depHour < 18;
      if (timeFilter === 'evening') return item.depHour >= 18 && item.depHour < 24;
      if (timeFilter === 'night') return item.depHour >= 0 && item.depHour < 6;
      return true;
    });

    // Apply Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'cheapest') return a.sortPrice - b.sortPrice;
      if (sortBy === 'fastest') return a.sortDuration - b.sortDuration;
      if (sortBy === 'earliest') return a.depHour - b.depHour;
      if (sortBy === 'recommended') {
        // Balance of duration & price
        const scoreA = a.sortPrice + (a.sortDuration * 2);
        const scoreB = b.sortPrice + (b.sortDuration * 2);
        return scoreA - scoreB;
      }
      return 0;
    });

    return filtered;
  }, [flights, trains, buses, selectedModes, activeTab, sortBy, maxPriceFilter, timeFilter]);

  if (loading) return <LoadingState message="Searching combined flights, trains, and buses..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  const pax = searchParams.passengers || 1;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Demo Mode Banner */}
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2.5 rounded-xl mb-6 flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span><strong>Multi-Modal Transport Search:</strong> Comparing all available Flights, Trains, and Buses side-by-side.</span>
        </div>
        <span className="text-xs bg-amber-500/30 px-2 py-0.5 rounded text-amber-300 font-bold uppercase">Demo Mode</span>
      </div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Select Your Transport
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            <span className="text-indigo-400 font-semibold">{searchParams.source}</span> → <span className="text-indigo-400 font-semibold">{searchParams.destination}</span> • {searchParams.departureDate} • {pax} Traveler{pax > 1 ? 's' : ''}
          </p>
        </div>

        {/* Quick View Tabs */}
        <div className="flex items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Options ({flights.length + trains.length + buses.length})
          </button>
          <button
            onClick={() => setActiveTab('flight')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'flight' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plane className="w-3.5 h-3.5 text-sky-400" /> Flights ({flights.length})
          </button>
          <button
            onClick={() => setActiveTab('train')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'train' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-emerald-400" /> Trains ({trains.length})
          </button>
          <button
            onClick={() => setActiveTab('bus')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'bus' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bus className="w-3.5 h-3.5 text-amber-400" /> Buses ({buses.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Filters */}
        <div className="space-y-6">
          <div className="glass p-5 rounded-2xl border border-slate-700/60 space-y-6 bg-slate-900/60 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> Filters
              </div>
              <button 
                onClick={() => {
                  setSelectedModes(['flight', 'train', 'bus']);
                  setTimeFilter('all');
                  setActiveTab('all');
                  setSortBy('cheapest');
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Reset
              </button>
            </div>

            {/* Transport Modes Multi-select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Include Modes
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/80 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedModes.includes('flight')}
                      onChange={() => toggleMode('flight')}
                      className="rounded bg-slate-900 border-slate-600 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200">
                      <Plane className="w-4 h-4 text-sky-400" /> Flights
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300">
                    {flights.length}
                  </span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/80 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedModes.includes('train')}
                      onChange={() => toggleMode('train')}
                      className="rounded bg-slate-900 border-slate-600 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200">
                      <Train className="w-4 h-4 text-emerald-400" /> Trains
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300">
                    {trains.length}
                  </span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/80 cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedModes.includes('bus')}
                      onChange={() => toggleMode('bus')}
                      className="rounded bg-slate-900 border-slate-600 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-200">
                      <Bus className="w-4 h-4 text-amber-400" /> Buses
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300">
                    {buses.length}
                  </span>
                </label>
              </div>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Max Price / Person
                </label>
                <span className="text-indigo-400 font-bold text-sm">₹{maxPriceFilter.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="300"
                max="20000"
                step="200"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Departure Time Slots */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Departure Time
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'all', label: 'Any Time' },
                  { id: 'morning', label: 'Morning (6A-12P)' },
                  { id: 'afternoon', label: 'Afternoon (12P-6P)' },
                  { id: 'evening', label: 'Evening (6P-12A)' },
                  { id: 'night', label: 'Night (12A-6A)' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTimeFilter(t.id)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      timeFilter === t.id 
                        ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-bold'
                        : 'border-slate-700/60 bg-slate-800/30 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Sorting Bar */}
          <div className="glass p-3.5 rounded-xl border border-slate-700/60 flex flex-wrap justify-between items-center gap-3 bg-slate-900/40">
            <span className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-white font-bold">{combinedList.length}</strong> combined travel option{combinedList.length !== 1 ? 's' : ''}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" /> Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              >
                <option value="cheapest">Cheapest First (Price ↑)</option>
                <option value="fastest">Fastest First (Duration ↓)</option>
                <option value="earliest">Earliest Departure (Time ↑)</option>
                <option value="recommended">Recommended / Best Value</option>
              </select>
            </div>
          </div>

          {/* Unified Cards */}
          {combinedList.length === 0 ? (
            <EmptyState
              title="No transport options match your filters"
              description="Try adjusting your price range, departure time, or include more transport modes."
            />
          ) : (
            combinedList.map(item => {
              // ✈️ FLIGHT CARD
              if (item.transportType === 'flight') {
                return (
                  <div 
                    key={`flight-${item.id}`} 
                    className="glass p-5 rounded-2xl border border-slate-700/60 hover:border-sky-500/50 hover:bg-slate-800/70 transition-all space-y-4 shadow-lg group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-500" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Left: Airline info */}
                      <div className="w-full md:w-1/4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                            <Plane className="w-3 h-3" /> Flight
                          </span>
                          <span className="text-xs text-slate-400 font-mono">#{item.flightNumber || item.flight_number}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                          {item.airline}
                        </h3>
                        <p className="text-xs text-slate-400">{item.aircraft || 'Airbus A320'} • {item.class || 'Economy'}</p>
                      </div>

                      {/* Center: Timings & Path */}
                      <div className="flex items-center justify-between w-full md:w-1/2 text-center px-2">
                        <div>
                          <div className="text-xl font-extrabold text-white">{item.departure}</div>
                          <div className="text-xs text-slate-400">{item.source} ({item.source_code || 'SRC'})</div>
                        </div>

                        <div className="flex flex-col items-center flex-1 px-4">
                          <span className="text-xs text-slate-400 mb-1 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-sky-400"/> {item.duration}
                            {item.distance && <span className="text-[10px] text-slate-500 font-normal">({item.distance})</span>}
                          </span>
                          <div className="w-full h-[2px] bg-slate-700 relative flex items-center justify-center">
                            <Plane className="w-3.5 h-3.5 text-sky-400 rotate-90" />
                          </div>
                          <span className="text-[10px] font-semibold text-emerald-400 mt-1">
                            {item.stops === 0 ? 'Non-Stop Direct' : `${item.stops} Stop(s)`}
                          </span>
                        </div>

                        <div>
                          <div className="text-xl font-extrabold text-white">{item.arrival}</div>
                          <div className="text-xs text-slate-400">{item.destination} ({item.destination_code || 'DST'})</div>
                        </div>
                      </div>

                      {/* Right: Pricing & Select */}
                      <div className="flex flex-row md:flex-col justify-between md:items-end w-full md:w-1/4 gap-2 border-t md:border-t-0 border-slate-700/50 pt-3 md:pt-0">
                        <div className="text-left md:text-right">
                          <div className="text-2xl font-black text-sky-400">
                            ₹{item.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-400">per person</div>
                          {pax > 1 && (
                            <div className="text-xs text-amber-400 font-semibold mt-0.5">
                              Total: ₹{(item.price * pax).toLocaleString()} ({pax} pax)
                            </div>
                          )}
                        </div>

                        <button 
                          onClick={() => handleSelectFlight(item)}
                          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-sm font-bold shadow-md shadow-sky-600/25 transition-all flex items-center gap-1.5 self-center md:self-stretch justify-center"
                        >
                          Select Flight <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // 🚆 TRAIN CARD
              if (item.transportType === 'train') {
                return (
                  <div 
                    key={`train-${item.id}`} 
                    className="glass p-5 rounded-2xl border border-slate-700/60 hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all space-y-4 shadow-lg group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Left: Train info */}
                      <div className="w-full md:w-1/3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            <Train className="w-3 h-3" /> Train
                          </span>
                          <span className="text-[10px] bg-indigo-950/60 text-indigo-300 px-2 py-0.5 rounded font-semibold border border-indigo-500/30">
                            Indian Railways
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {item.name || item.trainName}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">#{item.trainNumber || item.train_number}</p>
                        
                        {/* Amenities pills */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {item.amenities && item.amenities.slice(0, 3).map(am => (
                            <span key={am} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Center: Timings */}
                      <div className="flex items-center justify-between w-full md:w-1/2 text-center px-2">
                        <div>
                          <div className="text-xl font-extrabold text-white">{item.departure}</div>
                          <div className="text-xs text-slate-400">{item.source}</div>
                        </div>

                        <div className="flex flex-col items-center flex-1 px-4">
                          <span className="text-xs text-slate-400 mb-1 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-emerald-400"/> {item.duration}
                            {item.distance && <span className="text-[10px] text-slate-500 font-normal">({item.distance})</span>}
                          </span>
                          <div className="w-full h-[2px] bg-slate-700 relative flex items-center justify-center">
                            <Train className="w-3.5 h-3.5 text-emerald-400" />
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1">Direct Route</span>
                        </div>

                        <div>
                          <div className="text-xl font-extrabold text-white">{item.arrival}</div>
                          <div className="text-xs text-slate-400">{item.destination}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Class Selectors with individual pricing */}
                    <div className="border-t border-slate-700/60 pt-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        Available Travel Classes:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {item.classes && item.classes.map(c => {
                          const classObj = typeof c === 'string' 
                            ? { type: c, name: c, price: item.price || 800, available: 40 }
                            : c;
                          const totalClassPrice = classObj.price * pax;

                          return (
                            <div 
                              key={classObj.type}
                              className="border border-slate-700 rounded-xl p-3 bg-slate-900/70 hover:border-emerald-500/60 hover:bg-slate-800 transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-slate-100 text-sm">{classObj.name}</span>
                                  <span className="text-emerald-400 font-extrabold text-base">₹{classObj.price.toLocaleString()}</span>
                                </div>
                                <div className="text-[10px] text-slate-400">per person</div>
                                {pax > 1 && (
                                  <div className="text-[10px] text-amber-400 font-medium mt-0.5">
                                    Total: ₹{totalClassPrice.toLocaleString()}
                                  </div>
                                )}
                                <div className="text-[10px] text-emerald-400/90 font-medium my-1.5">
                                  {classObj.available} Seats Available
                                </div>
                              </div>

                              <button
                                onClick={() => handleSelectTrain(item, classObj)}
                                className="w-full mt-2 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                              >
                                Select {classObj.name}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              // 🚌 BUS CARD
              if (item.transportType === 'bus') {
                return (
                  <div 
                    key={`bus-${item.id}`} 
                    className="glass p-5 rounded-2xl border border-slate-700/60 hover:border-amber-500/50 hover:bg-slate-800/70 transition-all space-y-4 shadow-lg group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Left: Bus operator info */}
                      <div className="w-full md:w-1/3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            <Bus className="w-3 h-3" /> Bus
                          </span>
                          <span className="flex items-center gap-1 text-xs bg-slate-800 px-2 py-0.5 rounded font-bold text-yellow-400 border border-slate-700">
                            <Star className="w-3 h-3 fill-current text-yellow-400" /> {item.rating || '4.5'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.operator}
                        </h3>
                        <p className="text-xs text-slate-400">{item.bus_type || item.busType || 'Volvo A/C Sleeper'}</p>

                        {/* Amenities pills */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {item.amenities && item.amenities.slice(0, 3).map(am => (
                            <span key={am} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Center: Timings */}
                      <div className="flex items-center justify-between w-full md:w-1/2 text-center px-2">
                        <div>
                          <div className="text-xl font-extrabold text-white">{item.departure}</div>
                          <div className="text-xs text-slate-400">{item.source}</div>
                        </div>

                        <div className="flex flex-col items-center flex-1 px-4">
                          <span className="text-xs text-slate-400 mb-1 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-amber-400"/> {item.duration}
                            {item.distance && <span className="text-[10px] text-slate-500 font-normal">({item.distance})</span>}
                          </span>
                          <div className="w-full h-[2px] bg-slate-700 relative flex items-center justify-center">
                            <Bus className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <span className="text-[10px] text-slate-400 mt-1">Intercity Highway</span>
                        </div>

                        <div>
                          <div className="text-xl font-extrabold text-white">{item.arrival}</div>
                          <div className="text-xs text-slate-400">{item.destination}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Seat Types or Direct Select */}
                    <div className="border-t border-slate-700/60 pt-3">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                        Available Seat Options:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {item.seat_types && item.seat_types.length > 0 ? (
                          item.seat_types.map(st => {
                            const totalSeatPrice = st.price * pax;
                            return (
                              <div
                                key={st.type}
                                className="border border-slate-700 rounded-xl p-3 bg-slate-900/70 hover:border-amber-500/60 hover:bg-slate-800 transition-all flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-slate-100 text-sm">{st.type}</span>
                                    <span className="text-amber-400 font-extrabold text-base">₹{st.price.toLocaleString()}</span>
                                  </div>
                                  <div className="text-[10px] text-slate-400">per person</div>
                                  {pax > 1 && (
                                    <div className="text-[10px] text-amber-400 font-medium mt-0.5">
                                      Total: ₹{totalSeatPrice.toLocaleString()}
                                    </div>
                                  )}
                                  <div className="text-[10px] text-emerald-400/90 font-medium my-1.5">
                                    {st.available} seats left
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleSelectBus(item, st)}
                                  className="w-full mt-2 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                                >
                                  Select {st.type}
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <div className="col-span-full flex items-center justify-between bg-slate-900/70 p-3 rounded-xl border border-slate-700">
                            <div>
                              <div className="text-amber-400 font-extrabold text-lg">₹{item.price.toLocaleString()}</div>
                              <div className="text-xs text-slate-400">Standard Seat • per person</div>
                            </div>
                            <button
                              onClick={() => handleSelectBus(item, null)}
                              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition-all"
                            >
                              Select Bus
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default TransportResults;

