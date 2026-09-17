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
                    <span className="text-[10px] text-slate-500 mt-1">{flight.stops === 0 ? 'Direct' : `${flight.stops} Stop(s)`}</span>
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
