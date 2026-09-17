import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { tripService } from '../services/travelService';
import { Plane, Train, Bus, Hotel, MapPin, Check } from 'lucide-react';

function Itinerary() {
  const { searchParams, selectedFlight, selectedTrain, selectedBus, selectedTransportMode, selectedHotel, selectedActivities, budgetBreakdown, calculateBudget, setCurrentTrip } = useTripContext();
  const navigate = useNavigate();

  useEffect(() => {
    calculateBudget();
  }, [selectedFlight, selectedTrain, selectedBus, selectedHotel, selectedActivities]);

  const handleBook = async () => {
    // In a real app we would call services for each booking. Here we create a master trip.
    const tripData = { searchParams, transport: { mode: selectedTransportMode, flight: selectedFlight, train: selectedTrain, bus: selectedBus }, hotel: selectedHotel, activities: selectedActivities, budget: budgetBreakdown };
    const res = await tripService.create(tripData);
    if(res.success) {
      setCurrentTrip({ ...tripData, id: res.tripId });
      navigate('/confirmation');
    }
  };

  const total = budgetBreakdown.transport + budgetBreakdown.hotel + budgetBreakdown.activities + budgetBreakdown.food + budgetBreakdown.misc;
  const remaining = searchParams.budget - total;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Trip Itinerary</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Timeline</h3>
          
          {/* Day 1 Transport */}
          <div className="glass p-5 rounded-xl border-l-4 border-indigo-500">
            <h4 className="font-bold text-white mb-3">Departure - {searchParams.departureDate}</h4>
            {selectedTransportMode === 'flight' && selectedFlight && (
              <div className="flex items-center gap-4 text-slate-300"><Plane className="w-5 h-5 text-indigo-400"/> {selectedFlight.airline} ({selectedFlight.source} → {selectedFlight.destination}) at {selectedFlight.departure}</div>
            )}
            {selectedTransportMode === 'train' && selectedTrain && (
              <div className="flex items-center gap-4 text-slate-300"><Train className="w-5 h-5 text-indigo-400"/> {selectedTrain.trainName} ({selectedTrain.source} → {selectedTrain.destination}) at {selectedTrain.departure}</div>
            )}
            {selectedTransportMode === 'bus' && selectedBus && (
              <div className="flex items-center gap-4 text-slate-300"><Bus className="w-5 h-5 text-indigo-400"/> {selectedBus.operator} ({selectedBus.source} → {selectedBus.destination}) at {selectedBus.departure}</div>
            )}
            {!selectedTransportMode && <div className="text-slate-500">No transport selected.</div>}
          </div>

          {/* Hotel */}
          {selectedHotel && (
            <div className="glass p-5 rounded-xl border-l-4 border-indigo-500">
              <h4 className="font-bold text-white mb-3">Accommodation</h4>
              <div className="flex items-center gap-4 text-slate-300"><Hotel className="w-5 h-5 text-indigo-400"/> {selectedHotel.name}, {selectedHotel.destination}</div>
            </div>
          )}

          {/* Activities */}
          {selectedActivities.length > 0 && (
            <div className="glass p-5 rounded-xl border-l-4 border-indigo-500">
               <h4 className="font-bold text-white mb-3">Planned Activities</h4>
               <ul className="space-y-3">
                 {selectedActivities.map(a => (
                   <li key={a.id} className="flex items-start gap-3 text-slate-300">
                     <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5"/>
                     <div><div className="font-medium text-white">{a.name}</div><div className="text-sm text-slate-400">{a.duration}</div></div>
                   </li>
                 ))}
               </ul>
            </div>
          )}
        </div>

        {/* Budget Summary */}
        <div className="glass p-6 rounded-xl h-fit sticky top-24">
          <h3 className="text-xl font-bold text-white mb-6">Budget Summary</h3>
          <div className="space-y-3 text-sm text-slate-300 mb-6">
            <div className="flex justify-between"><span>Transport</span><span>₹{budgetBreakdown.transport.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Accommodation</span><span>₹{budgetBreakdown.hotel.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Activities</span><span>₹{budgetBreakdown.activities.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Est. Food</span><span>₹{budgetBreakdown.food.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Est. Misc</span><span>₹{budgetBreakdown.misc.toLocaleString()}</span></div>
          </div>
          <div className="border-t border-slate-700 pt-4 mb-4">
            <div className="flex justify-between font-bold text-lg text-white mb-2"><span>Total Cost</span><span>₹{total.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span>Budget Set</span><span>₹{searchParams.budget.toLocaleString()}</span></div>
            <div className={`flex justify-between font-medium mt-1 ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              <span>Remaining</span><span>₹{remaining.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={handleBook} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Check className="w-5 h-5"/> Save & Book Trip
          </button>
        </div>
      </div>
    </div>
  );
}
export default Itinerary;
