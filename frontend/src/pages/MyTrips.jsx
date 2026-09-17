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
