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
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {train.name || train.trainName}
                    <span className="text-[10px] bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 whitespace-nowrap">Indian Railways</span>
                  </h3>
                  <p className="text-sm text-slate-400">#{train.trainNumber}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {train.amenities && train.amenities.map(am => (
                      <span key={am} className="text-[10px] bg-slate-700/50 text-slate-300 px-2 py-1 rounded border border-slate-600/50">{am}</span>
                    ))}
                  </div>
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
                {train.classes && train.classes.map(c => {
                  const classObj = typeof c === 'string' ? {
                    type: c,
                    name: c,
                    price: train.price || 1200,
                    available: train.availableSeats || 50
                  } : c;
                  return (
                  <div key={classObj.type} className="flex-1 min-w-[150px] border border-slate-600 rounded-lg p-3 hover:border-indigo-400 transition-colors bg-slate-800 flex flex-col justify-between shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-100">{classObj.name}</span>
                      <span className="text-indigo-300 font-bold text-lg">₹{classObj.price}</span>
                    </div>
                    <div className="text-xs text-emerald-400 mb-3 font-medium">Available: {classObj.available} Seats</div>
                    <button onClick={() => handleSelect(train, classObj)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm transition-colors font-medium shadow-sm">
                      Select
                    </button>
                  </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TrainResults;
