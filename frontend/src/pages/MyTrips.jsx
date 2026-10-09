import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { MapPin, Plane, Train, Bus, Hotel, Trash2, Calendar, Users, IndianRupee } from 'lucide-react';

const transportIcon = (mode) => {
  if (!mode) return <Plane className="w-4 h-4" />;
  if (mode === 'train') return <Train className="w-4 h-4" />;
  if (mode === 'bus') return <Bus className="w-4 h-4" />;
  return <Plane className="w-4 h-4" />;
};

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tripService.getAll();
      setTrips(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Could not load trips. Please try again.');
      setTrips([]);
    } finally {
      setLoading(false);   // ← always runs, no more infinite spinner
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    if (!window.confirm('Delete this trip?')) return;
    await tripService.delete(tripId);
    setTrips(prev => prev.filter(t => t.id !== tripId));
  };

  if (loading) return <LoadingState message="Loading your trips..." />;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Trips</h1>
        <Link
          to="/plan"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + Plan New Trip
        </Link>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchTrips} className="text-sm underline hover:text-red-300">Retry</button>
        </div>
      )}

      {/* Demo mode note */}
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-lg mb-6 text-sm">
        🟡 <strong>Demo Mode:</strong> Trips are saved locally in your browser. They will persist until you clear browser data.
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon={<MapPin className="w-12 h-12 text-slate-600" />}
          title="No trips yet"
          description="You haven't planned any trips. Start planning your next adventure!"
          action={
            <Link to="/plan" className="mt-4 inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors">
              Plan Your First Trip
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="glass p-5 rounded-xl flex flex-col justify-between gap-4 hover:border-indigo-500/40 transition-colors border border-slate-700/50">

              {/* Header */}
              <div className="flex justify-between items-start">
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded font-medium">DEMO</span>
                <button
                  onClick={() => handleDelete(trip.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded"
                  title="Delete trip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Route */}
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">{trip.source || '—'}</span>
                  <span className="text-slate-500">→</span>
                  <span className="truncate">{trip.destination || 'Unknown'}</span>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{trip.departure_date || trip.date || 'No date'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>{trip.passengers || 1} passenger{(trip.passengers || 1) > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  {transportIcon(trip.transport_mode)}
                  <span className="capitalize">{trip.transport_mode || 'Flight'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Hotel className="w-3.5 h-3.5" />
                  <span>{trip.hotel_details?.name ? trip.hotel_details.name.split(' ').slice(0, 2).join(' ') : 'No hotel'}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
                <div className="flex items-center gap-1 text-white font-bold">
                  <IndianRupee className="w-4 h-4 text-indigo-400" />
                  <span>{(trip.total_cost || trip.budget?.total || 0).toLocaleString('en-IN')}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {trip.created_at ? new Date(trip.created_at).toLocaleDateString('en-IN') : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
