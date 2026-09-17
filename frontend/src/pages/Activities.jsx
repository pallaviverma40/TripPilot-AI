import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { activityService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Plus, Check, MapPin, Clock } from 'lucide-react';

function Activities() {
  const { searchParams, selectedActivities, addActivity, removeActivity } = useTripContext();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams.destination) return navigate('/plan');
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const results = await activityService.search(searchParams);
        setActivities(results);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchActivities();
  }, [searchParams, navigate]);

  if (loading) return <LoadingState message="Finding things to do..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">DEMO MODE</div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Activities in {searchParams.destination}</h2>
          <p className="text-slate-400">Select what you'd like to do during your trip.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-300 bg-slate-800 px-4 py-2 rounded-lg">{selectedActivities.length} Selected</div>
          <button onClick={() => navigate('/itinerary')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Continue to Itinerary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(activity => {
          const isSelected = selectedActivities.some(a => a.id === activity.id);
          return (
            <div key={activity.id} className={`glass p-5 rounded-xl border ${isSelected ? 'border-indigo-500 bg-indigo-900/10' : 'border-slate-700'}`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded capitalize">{activity.category}</span>
                <span className="text-indigo-400 font-bold">{activity.price === 0 ? 'Free' : `₹${activity.price}`}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{activity.name}</h3>
              <p className="text-sm text-slate-400 mb-4 h-10 overflow-hidden">{activity.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {activity.duration}</span>
                <span className="flex items-center gap-1 capitalize"><MapPin className="w-3 h-3"/> {activity.timeOfDay}</span>
              </div>

              <button 
                onClick={() => isSelected ? removeActivity(activity.id) : addActivity(activity)}
                className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${isSelected ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
              >
                {isSelected ? <><Check className="w-4 h-4"/> Added</> : <><Plus className="w-4 h-4"/> Add Activity</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Activities;
