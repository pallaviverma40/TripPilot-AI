export const CITIES = [
  "Lucknow", "Delhi", "Mumbai", "Goa", "Bangalore", "Kolkata", "Chennai",
  "Jaipur", "Hyderabad", "Pune", "Ahmedabad", "Kochi", "Varanasi", "Amritsar",
  "Chandigarh", "Srinagar", "Leh", "Dehradun", "Haridwar", "Rishikesh",
  "Udaipur", "Jodhpur", "Jaisalmer", "Patna", "Bhubaneswar", "Visakhapatnam",
  "Coimbatore", "Madurai", "Thiruvananthapuram", "Indore", "Bhopal", "Nagpur",
  "Raipur", "Ranchi", "Guwahati", "Port Blair", "Agra", "Shimla", "Manali", "Firozabad"
];

// If a city is not listed here, it defaults to ['flight', 'train', 'bus']
export const TRANSPORT_MAP = {
  "Port Blair": ["flight"],
  "Manali": ["bus"],
  "Shimla": ["bus", "train"],
  "Firozabad": ["train", "bus"],
  "Haridwar": ["train", "bus"],
  "Rishikesh": ["train", "bus"]
};

export const getAvailableModes = (city) => {
  if (!city) return ['flight', 'train', 'bus'];
  // Case-insensitive lookup
  const key = Object.keys(TRANSPORT_MAP).find(k => k.toLowerCase() === city.toLowerCase());
  return key ? TRANSPORT_MAP[key] : ['flight', 'train', 'bus'];
};
