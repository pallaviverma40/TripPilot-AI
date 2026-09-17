import React, { createContext, useContext, useState } from 'react';

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    source: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'one-way',
    budget: 40000,
    transportModes: []
  });

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [budgetBreakdown, setBudgetBreakdown] = useState({ transport: 0, hotel: 0, activities: 0, food: 0, misc: 0 });
  const [currentTrip, setCurrentTrip] = useState(null);

  const addActivity = (activity) => {
    if (!selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const removeActivity = (activityId) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== activityId));
  };

  const clearTrip = () => {
    setSearchParams({ source: '', destination: '', departureDate: '', returnDate: '', passengers: 1, tripType: 'one-way', budget: 40000, transportModes: [] });
    setSelectedFlight(null);
    setSelectedTrain(null);
    setSelectedBus(null);
    setSelectedTransportMode(null);
    setSelectedHotel(null);
    setSelectedActivities([]);
    setBudgetBreakdown({ transport: 0, hotel: 0, activities: 0, food: 0, misc: 0 });
    setCurrentTrip(null);
  };

  const calculateBudget = () => {
    let transport = 0;
    if (selectedFlight) transport += selectedFlight.price * searchParams.passengers;
    if (selectedTrain) transport += selectedTrain.price * searchParams.passengers;
    if (selectedBus) transport += selectedBus.price * searchParams.passengers;
    
    let hotel = 0;
    if (selectedHotel) {
      const start = new Date(searchParams.departureDate);
      const end = searchParams.returnDate ? new Date(searchParams.returnDate) : new Date(start.getTime() + 2 * 24 * 60 * 60 * 1000);
      const nights = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
      hotel += selectedHotel.pricePerNight * nights;
    }

    let activities = selectedActivities.reduce((acc, act) => acc + (act.price * searchParams.passengers), 0);
    
    // Assume trips have some duration
    const start = new Date(searchParams.departureDate || new Date());
    const end = searchParams.returnDate ? new Date(searchParams.returnDate) : new Date(start.getTime() + 2 * 24 * 60 * 60 * 1000);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    
    let food = 500 * searchParams.passengers * days;
    let misc = 300 * searchParams.passengers * days;

    setBudgetBreakdown({ transport, hotel, activities, food, misc });
  };

  return (
    <TripContext.Provider value={{
      searchParams, setSearchParams,
      selectedFlight, setSelectedFlight,
      selectedTrain, setSelectedTrain,
      selectedBus, setSelectedBus,
      selectedTransportMode, setSelectedTransportMode,
      selectedHotel, setSelectedHotel,
      selectedActivities, addActivity, removeActivity,
      budgetBreakdown, calculateBudget,
      currentTrip, setCurrentTrip,
      clearTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => useContext(TripContext);
