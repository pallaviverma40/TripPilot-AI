import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import { MapPin, Plane, Train, Bus, Hotel, Trash2, Calendar, Users, IndianRupee, Sparkles, Compass, CheckCircle2, X } from 'lucide-react';

const transportIcon = (mode) => {
  if (!mode) return <Plane className="w-4 h-4 text-sky-400" />;
  if (mode === 'train') return <Train className="w-4 h-4 text-emerald-400" />;
  if (mode === 'bus') return <Bus className="w-4 h-4 text-amber-400" />;
  return <Plane className="w-4 h-4 text-sky-400" />;
};

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTripDetails, setSelectedTripDetails] = useState(null);

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tripService.getAll();
      // Ensure only valid objects with either destination or source are shown
      const valid = (Array.isArray(data) ? data : []).filter(t => {
        if (!t || typeof t !== 'object') return false;
        const dest = t.destination || t.dest || t.searchParams?.destination;
        const src = t.source || t.origin || t.searchParams?.source;
        return (dest && dest !== 'Unknown') || (src && src !== '—');
      });
      setTrips(valid);
    } catch (err) {
      setError('Could not load trips. Please try again.');
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    if (!window.confirm('Delete this trip from your history?')) return;
    await tripService.delete(tripId);
    setTrips(prev => prev.filter(t => t.id !== tripId));
  };

  const handleClearAll = async () => {
    if (!window.confirm('Clear all saved trips?')) return;
    localStorage.removeItem('trippilot_demo_trips');
    localStorage.removeItem('trips');
    setTrips([]);
  };

  if (loading) return <LoadingState message="Loading your saved trips..." />;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Compass className="w-8 h-8 text-indigo-400" /> My Trips
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your booked itineraries, travel plans, and receipts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {trips.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-red-400 bg-slate-800/80 hover:bg-red-500/10 border border-slate-700 rounded-lg transition-all"
            >
              Clear All Trips
            </button>
          )}
          <Link
            to="/plan"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            + Plan New Trip
          </Link>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchTrips} className="text-sm underline hover:text-red-300 font-semibold">Retry</button>
        </div>
      )}

      {/* Demo mode note */}
      <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-4 py-2.5 rounded-xl mb-6 text-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span><strong>Demo Mode Active:</strong> Itineraries and bookings are persisted locally in your browser storage.</span>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full font-bold uppercase">
          {trips.length} Saved Trip{trips.length !== 1 ? 's' : ''}
        </span>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon={<MapPin className="w-12 h-12 text-indigo-400/60" />}
          title="No trips saved yet"
          description="You haven't planned any trips. Create your customized itinerary with flights, trains, hotels, and activities now!"
          action={
            <Link to="/plan" className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/30">
              Plan Your First Trip
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => {
            const src = trip.source || trip.origin || trip.searchParams?.source || 'Origin';
            const dst = trip.destination || trip.searchParams?.destination || 'Destination';
            const date = trip.departure_date || trip.departureDate || trip.travelDate || trip.travel_date || trip.date || trip.searchParams?.departureDate || 'Upcoming';
            const pax = trip.passengers || trip.searchParams?.passengers || 1;
            const mode = trip.transport_mode || trip.transportMode || trip.transport?.mode || 'flight';
            const hotelName = trip.hotel_details?.name || trip.hotel?.name || 'Self-Arranged Hotel';
            const cost = Number(trip.total_cost || trip.totalPrice || trip.budget?.total) || 0;
            const activitiesCount = Array.isArray(trip.activities) ? trip.activities.length : 0;

            return (
              <div 
                key={trip.id} 
                className="glass p-5 rounded-2xl flex flex-col justify-between gap-4 hover:border-indigo-500/50 hover:bg-slate-800/70 transition-all border border-slate-700/60 shadow-lg relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

                {/* Header Badge & Action */}
                <div className="flex justify-between items-start pt-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Confirmed
                    </span>
                    <span className="text-slate-400 text-xs font-mono">#{String(trip.id).slice(-6)}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(trip.id)}
                    className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors p-1.5 rounded-lg"
                    title="Delete trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Route Header */}
                <div>
                  <div className="flex items-center gap-2 text-white font-extrabold text-xl">
                    <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span className="truncate">{src}</span>
                    <span className="text-slate-500 font-normal">→</span>
                    <span className="truncate text-indigo-300">{dst}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Trip to <strong className="text-slate-200">{dst}</strong></p>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-2 gap-2.5 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate font-medium">{date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-medium">{pax} traveler{pax > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    {transportIcon(mode)}
                    <span className="capitalize font-medium">{mode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Hotel className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate font-medium">{hotelName}</span>
                  </div>
                </div>

                {activitiesCount > 0 && (
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>Includes <strong>{activitiesCount}</strong> planned activit{activitiesCount > 1 ? 'ies' : 'y'}</span>
                  </div>
                )}

                {/* Footer: Price & View Details */}
                <div className="border-t border-slate-700/60 pt-3 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Cost</div>
                    <div className="flex items-center text-indigo-300 font-black text-lg">
                      ₹{cost.toLocaleString('en-IN')}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedTripDetails(trip)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedTripDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="glass max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedTripDetails(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedTripDetails.source || 'Origin'} → {selectedTripDetails.destination || 'Destination'}
                </h3>
                <p className="text-xs text-slate-400">Booking #{selectedTripDetails.id}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Transport</div>
                <div className="flex justify-between text-slate-200">
                  <span className="capitalize">{selectedTripDetails.transport_mode || 'Transport'}:</span>
                  <span className="font-semibold text-white">
                    {selectedTripDetails.transport_details?.name || 
                     selectedTripDetails.transport_details?.airline || 
                     selectedTripDetails.transport_details?.operator || 
                     'Confirmed'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Hotel</div>
                <div className="flex justify-between text-slate-200">
                  <span>Hotel Name:</span>
                  <span className="font-semibold text-white">
                    {selectedTripDetails.hotel_details?.name || 'Self-Arranged'}
                  </span>
                </div>
              </div>

              {Array.isArray(selectedTripDetails.activities) && selectedTripDetails.activities.length > 0 && (
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Activities ({selectedTripDetails.activities.length})</div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
                    {selectedTripDetails.activities.map(a => (
                      <li key={a.id || a.name}>{a.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-slate-700">
                <span className="text-slate-400">Total Price Paid:</span>
                <span className="text-xl font-black text-indigo-400">
                  ₹{(selectedTripDetails.total_cost || selectedTripDetails.totalPrice || 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTripDetails(null)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
