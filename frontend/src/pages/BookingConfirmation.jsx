import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { Check, Calendar, MapPin } from 'lucide-react';

function BookingConfirmation() {
  const { currentTrip, clearTrip } = useTripContext();
  const navigate = useNavigate();

  if (!currentTrip) return <div className="text-center py-20 text-white">No active booking.</div>;

  const handlePlanAnother = () => {
    clearTrip();
    navigate('/plan');
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 flex flex-col items-center">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
        <Check className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
      <p className="text-slate-400 mb-6">Your trip has been successfully planned and booked.</p>
      
      <div className="bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8">
        DEMO BOOKING
      </div>

      <div className="glass w-full p-8 rounded-2xl mb-8">
        <div className="flex justify-between border-b border-slate-700 pb-4 mb-4">
          <div><p className="text-sm text-slate-400">Booking ID</p><p className="font-mono text-white">{currentTrip.id}</p></div>
          <div className="text-right"><p className="text-sm text-slate-400">Status</p><p className="text-green-400 font-bold">Confirmed</p></div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-slate-300 mb-1"><MapPin className="w-4 h-4"/> Route</div>
            <div className="text-lg font-bold text-white">{currentTrip.searchParams.source} to {currentTrip.searchParams.destination}</div>
          </div>
          <div>
             <div className="flex items-center gap-2 text-slate-300 mb-1"><Calendar className="w-4 h-4"/> Dates</div>
             <div className="text-lg font-bold text-white">{currentTrip.searchParams.departureDate}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button onClick={() => navigate('/my-trips')} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors">
          View My Trips
        </button>
        <button onClick={handlePlanAnother} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors">
          Plan Another Trip
        </button>
      </div>
    </div>
  );
}
export default BookingConfirmation;
