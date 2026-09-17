import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { hotelService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Hotel, MapPin, Star, Filter } from 'lucide-react';

function HotelResults() {
  const { searchParams, setSelectedHotel } = useTripContext();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchParams.destination) return navigate('/plan');
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const results = await hotelService.search(searchParams);
        setHotels(results);
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchHotels();
  }, [searchParams, navigate]);

  const handleSelect = (hotel) => {
    setSelectedHotel(hotel);
    navigate('/activities');
  };

  if (loading) return <LoadingState message="Finding perfect stays..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="bg-amber-500/20 border border-amber-500/50 text-amber-400 px-4 py-2 rounded-lg mb-6 flex justify-center text-sm font-medium">DEMO MODE</div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Hotels in {searchParams.destination}</h2>
        <button onClick={() => navigate('/activities')} className="text-slate-400 hover:text-white underline">Skip Hotels</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="glass p-5 rounded-xl h-fit space-y-6">
           <div className="flex items-center gap-2 text-white font-medium"><Filter className="w-4 h-4"/> Filters</div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          {hotels.length === 0 ? <EmptyState title="No hotels found" /> : hotels.map(hotel => (
            <div key={hotel.id} className="glass rounded-xl flex flex-col md:flex-row overflow-hidden border border-slate-700/50">
              <div className="w-full md:w-1/3 bg-slate-800 min-h-[200px] flex items-center justify-center">
                <Hotel className="w-12 h-12 text-slate-600" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">{hotel.name}</h3>
                    <div className="flex items-center gap-1 bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-sm">
                      <Star className="w-4 h-4 fill-current"/> {hotel.rating}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {hotel.address}</p>
                  <p className="text-sm text-slate-300 mt-3">{hotel.description}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {hotel.amenities.slice(0,4).map(a => <span key={a} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{a}</span>)}
                  </div>
                </div>
                <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-700">
                  <div>
                    <div className="text-2xl font-bold text-white">₹{hotel.pricePerNight}</div>
                    <div className="text-xs text-slate-400">per night</div>
                  </div>
                  <button onClick={() => handleSelect(hotel)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">
                    Select Hotel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HotelResults;
