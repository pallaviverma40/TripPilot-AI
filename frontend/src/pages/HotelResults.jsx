import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../context/TripContext';
import { hotelService } from '../services/travelService';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Hotel, MapPin, Star, Filter, Calendar, Users, Coffee, Check, ArrowRight, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';

function HotelResults() {
  const { searchParams, setSelectedHotel } = useTripContext();
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Sorting state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState(30000);
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [freeBreakfastOnly, setFreeBreakfastOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Compute stay duration and occupancy from searchParams
  const checkinDate = searchParams.departureDate || new Date().toISOString().split('T')[0];
  const checkoutDate = searchParams.returnDate || new Date(new Date(checkinDate).getTime() + 2 * 86400000).toISOString().split('T')[0];
  const guestsCount = Number(searchParams.passengers) || 1;

  const stayNights = useMemo(() => {
    try {
      const d1 = new Date(checkinDate);
      const d2 = new Date(checkoutDate);
      const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 2;
    } catch {
      return 2;
    }
  }, [checkinDate, checkoutDate]);

  useEffect(() => {
    if (!searchParams.destination) {
      navigate('/plan');
      return;
    }

    const fetchHotels = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await hotelService.search({
          ...searchParams,
          checkin: checkinDate,
          checkout: checkoutDate,
          guests: guestsCount,
        });

        setHotels(Array.isArray(results) ? results : []);

        // Dynamically adjust price slider to max available price
        if (Array.isArray(results) && results.length > 0) {
          const maxP = Math.max(...results.map(h => Number(h.pricePerNight ?? h.price_per_night ?? h.price ?? 3500)));
          if (maxP > 0) {
            setMaxPriceFilter(Math.ceil((maxP * 1.1) / 1000) * 1000);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to find hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams, checkinDate, checkoutDate, guestsCount, navigate]);

  // Safe price extraction helper
  const getNightlyRate = (hotel) => {
    const raw = hotel?.pricePerNight ?? hotel?.price_per_night ?? hotel?.price ?? hotel?.nightly_price;
    const num = Number(raw);
    return !isNaN(num) && num > 0 ? num : 3500;
  };

  const getTotalStayCost = (hotel) => {
    const rawTotal = hotel?.total_price ?? hotel?.totalPrice ?? hotel?.total_stay_price;
    const numTotal = Number(rawTotal);
    if (!isNaN(numTotal) && numTotal > 0) return numTotal;
    return getNightlyRate(hotel) * stayNights;
  };

  // Filtered and sorted hotel list
  const filteredHotels = useMemo(() => {
    return hotels
      .filter(hotel => {
        const rate = getNightlyRate(hotel);
        if (rate > maxPriceFilter) return false;
        if (minRatingFilter > 0 && (hotel.rating || 0) < minRatingFilter) return false;
        if (freeBreakfastOnly && !hotel.breakfast) return false;
        if (selectedCategory !== 'All' && hotel.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        return true;
      })
      .sort((a, b) => {
        const rateA = getNightlyRate(a);
        const rateB = getNightlyRate(b);
        if (sortBy === 'cheapest') return rateA - rateB;
        if (sortBy === 'expensive') return rateB - rateA;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.rating || 0) * 1000 - rateA - ((a.rating || 0) * 1000 - rateB); // recommended
      });
  }, [hotels, maxPriceFilter, minRatingFilter, freeBreakfastOnly, selectedCategory, sortBy]);

  const handleSelect = (hotel) => {
    const nightly = getNightlyRate(hotel);
    const total = getTotalStayCost(hotel);
    const normalizedHotel = {
      ...hotel,
      price: nightly,
      pricePerNight: nightly,
      price_per_night: nightly,
      nightly_price: nightly,
      total_price: total,
      totalPrice: total,
      total_stay_price: total,
      nights: stayNights,
      guests: guestsCount,
    };
    setSelectedHotel(normalizedHotel);
    navigate('/activities');
  };

  if (loading) return <LoadingState message={`Finding curated stays in ${searchParams.destination || 'your destination'}...`} />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  const categories = ['All', 'Luxury', 'Heritage', 'Premium', 'Standard', 'Budget'];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Demo Mode Notice */}
      <div className="bg-amber-500/15 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-xl mb-6 flex items-center justify-between text-xs font-semibold">
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> Demo Mode: Verified pricing & availability for all properties
        </span>
        <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
          Live Rates
        </span>
      </div>

      {/* Header with Stay & Occupancy Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-700/60">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Hotel className="w-8 h-8 text-indigo-400" /> Stays in {searchParams.destination}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              {checkinDate} → {checkoutDate} ({stayNights} Night{stayNights !== 1 ? 's' : ''})
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              {guestsCount} Guest{guestsCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/activities')}
          className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors"
        >
          Skip Accommodation & Continue →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="glass p-5 rounded-2xl border border-slate-700/60 h-fit space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" /> Filter Stays
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setMinRatingFilter(0);
                setFreeBreakfastOnly(false);
              }}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Reset
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Property Tier
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow-sm'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Max Nightly Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Max Nightly Rate
              </label>
              <span className="text-indigo-400 font-bold text-sm">
                ₹{maxPriceFilter.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="35000"
              step="500"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹500</span>
              <span>₹35,000+</span>
            </div>
          </div>

          {/* Guest Rating Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Guest Rating
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { label: 'All', val: 0 },
                { label: '4.0+ ★', val: 4.0 },
                { label: '4.5+ ★', val: 4.5 }
              ].map(r => (
                <button
                  key={r.val}
                  onClick={() => setMinRatingFilter(r.val)}
                  className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                    minRatingFilter === r.val
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inclusions Checkbox */}
          <div className="pt-2 border-t border-slate-700/60">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300 hover:text-white select-none">
              <input
                type="checkbox"
                checked={freeBreakfastOnly}
                onChange={(e) => setFreeBreakfastOnly(e.target.checked)}
                className="rounded bg-slate-900 border-slate-600 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span className="flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-amber-400" /> Free Breakfast Included
              </span>
            </label>
          </div>
        </div>

        {/* Hotel Cards List */}
        <div className="lg:col-span-3 space-y-4">
          {/* Sorting & Count Bar */}
          <div className="glass p-3.5 rounded-xl border border-slate-700/60 flex flex-wrap justify-between items-center gap-3 bg-slate-900/40">
            <span className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-white font-bold">{filteredHotels.length}</strong> available propert{filteredHotels.length !== 1 ? 'ies' : 'y'}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
              >
                <option value="recommended">Recommended / Value</option>
                <option value="cheapest">Price: Low to High</option>
                <option value="expensive">Price: High to Low</option>
                <option value="rating">Highest Guest Rating</option>
              </select>
            </div>
          </div>

          {filteredHotels.length === 0 ? (
            <EmptyState
              title="No hotels match your filters"
              description="Try adjusting your maximum price range, property tier, or rating criteria."
            />
          ) : (
            filteredHotels.map(hotel => {
              const nightly = getNightlyRate(hotel);
              const totalStay = getTotalStayCost(hotel);

              return (
                <div
                  key={hotel.id}
                  className="glass rounded-2xl flex flex-col md:flex-row overflow-hidden border border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all duration-200 group shadow-lg relative"
                >
                  {/* Left: Category Indicator Banner */}
                  <div className="w-full md:w-56 bg-gradient-to-br from-slate-800 to-slate-900 min-h-[190px] flex flex-col items-center justify-center p-6 text-center border-b md:border-b-0 md:border-r border-slate-700/50 relative overflow-hidden">
                    <Hotel className="w-12 h-12 text-indigo-400/70 group-hover:text-indigo-300 transition-colors mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-800/90 px-2.5 py-0.5 rounded-full border border-slate-700">
                      {hotel.category || 'Hotel'}
                    </span>
                    {hotel.breakfast && (
                      <span className="text-[10px] text-emerald-400 font-semibold mt-2 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                        <Coffee className="w-3 h-3" /> Free Breakfast
                      </span>
                    )}
                  </div>

                  {/* Center & Right: Details and Price */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Rating */}
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {hotel.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            {hotel.address || `${searchParams.destination}`}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                          <span>{hotel.rating || 4.5}</span>
                          {hotel.review_count || hotel.reviewCount ? (
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({(hotel.review_count || hotel.reviewCount).toLocaleString()})
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 line-clamp-2 leading-relaxed">
                        {hotel.description || 'Enjoy a comfortable stay with curated amenities and prime connectivity.'}
                      </p>

                      {/* Amenities Pills */}
                      {hotel.amenities && hotel.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {hotel.amenities.slice(0, 5).map(a => (
                            <span
                              key={a}
                              className="text-[10px] bg-slate-800/90 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700/70"
                            >
                              {a}
                            </span>
                          ))}
                          {hotel.amenities.length > 5 && (
                            <span className="text-[10px] text-slate-500 self-center">
                              +{hotel.amenities.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Pricing & Select Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-5 pt-4 border-t border-slate-700/60 gap-4">
                      {/* Price Block with Safe Currency Display */}
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight">
                            ₹{nightly.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">/ night</span>
                        </div>

                        <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-1.5">
                          <span className="font-semibold text-slate-300">
                            ₹{totalStay.toLocaleString()}
                          </span>
                          <span>total for {stayNights} night{stayNights !== 1 ? 's' : ''}</span>
                          <span className="text-[10px] text-slate-500">• {guestsCount} guest{guestsCount !== 1 ? 's' : ''}</span>
                        </div>

                        {hotel.cancellation && (
                          <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            {hotel.cancellation}
                          </div>
                        )}
                      </div>

                      {/* Select Hotel CTA */}
                      <button
                        onClick={() => handleSelect(hotel)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                      >
                        Select Hotel <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelResults;
