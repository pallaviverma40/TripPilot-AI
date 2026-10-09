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

  // seatType = { type, price, available }
  const handleSelect = (bus, seatType) => {
    setSelectedBus({
      ...bus,
      selectedSeatType: seatType.type,
      price: seatType.price,
      total_price: seatType.price * (searchParams.passengers || 1),
    });
    setSelectedTransportMode('bus');
    navigate('/hotels');
  };

  if (loading) return <LoadingState message="Searching available buses..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">
        DEMO MODE: Showing mock bus data.
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Select Bus</h2>
        <div className="text-slate-400 text-sm">{searchParams.source} to {searchParams.destination}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <div className="glass p-5 rounded-xl h-fit space-y-6">
          <div className="flex items-center gap-2 text-white font-medium">
            <Filter className="w-4 h-4"/> Filters
          </div>
          <div className="text-xs text-slate-400">Select your preferred bus from the results.</div>
        </div>

        {/* Bus cards */}
        <div className="lg:col-span-3 space-y-4">
          {buses.length === 0 ? (
            <EmptyState title="No buses found" description="Try a different route or date." />
          ) : buses.map(bus => (
            <div key={bus.id} className="glass p-5 rounded-xl flex flex-col gap-4">
              {/* Top row: operator info + timings */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left: operator */}
                <div className="md:w-1/3">
                  <h3 className="font-bold text-white text-lg">{bus.operator}</h3>
                  <p className="text-sm text-slate-400 mb-2">{bus.bus_type || bus.busType}</p>
                  <div className="flex items-center gap-1 text-xs bg-slate-800 w-fit px-2 py-1 rounded text-yellow-400">
                    <Star className="w-3 h-3 fill-current"/> {bus.rating ?? '4.5'}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {bus.amenities && bus.amenities.map(am => (
                      <span key={am} className="text-[10px] bg-slate-700/50 text-slate-300 px-2 py-1 rounded border border-slate-600/50">{am}</span>
                    ))}
                  </div>
                </div>

                {/* Centre: timings */}
                <div className="flex justify-between items-center md:w-1/3 text-center">
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

                {/* Right: base price label */}
                <div className="md:w-1/3 flex flex-col justify-center items-end">
                  <div className="text-xs text-slate-400 mb-1">Starting from</div>
                  <div className="text-2xl font-bold text-indigo-400">
                    ₹{bus.seat_types ? Math.min(...bus.seat_types.map(s => s.price)) : bus.price}
                  </div>
                  <div className="text-xs text-slate-500">per person</div>
                </div>
              </div>

              {/* Seat type cards */}
              {bus.seat_types && bus.seat_types.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t border-slate-700 pt-4">
                  {bus.seat_types.map(st => (
                    <div
                      key={st.type}
                      className="flex-1 min-w-[140px] border border-slate-600 rounded-lg p-3 hover:border-indigo-400 transition-colors bg-slate-800 flex flex-col justify-between shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-slate-100 text-sm">{st.type}</span>
                        <span className="text-indigo-300 font-bold text-lg">₹{st.price}</span>
                      </div>
                      <div className="text-xs text-emerald-400 mb-3 font-medium">
                        {st.available} seats left
                      </div>
                      <button
                        onClick={() => handleSelect(bus, st)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm transition-colors font-medium"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BusResults;
