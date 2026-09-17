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
