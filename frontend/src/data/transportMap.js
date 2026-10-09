export const CITIES = [
  "Lucknow", "Delhi", "Mumbai", "Goa", "Bangalore", "Kolkata", "Chennai",
  "Jaipur", "Hyderabad", "Pune", "Ahmedabad", "Kochi", "Varanasi", "Amritsar",
  "Chandigarh", "Srinagar", "Jammu", "Jammu and Kashmir", "Leh", "Dehradun", 
  "Haridwar", "Rishikesh", "Nainital", "Ayodhya", "Raipur", "Ranchi", "Udaipur", 
  "Jodhpur", "Jaisalmer", "Patna", "Bhubaneswar", "Visakhapatnam",
  "Coimbatore", "Madurai", "Thiruvananthapuram", "Indore", "Bhopal", "Nagpur",
  "Guwahati", "Port Blair", "Agra", "Shimla", "Manali", "Firozabad",
  "Karnataka", "Mysore", "Coorg", "Hampi"
];

// If a city is not listed here, it defaults to ['flight', 'train', 'bus']
export const TRANSPORT_MAP = {
  "Port Blair": ["flight"],
  "Manali": ["bus"],
  "Shimla": ["bus", "train"],
  "Firozabad": ["train", "bus"],
  "Nainital": ["bus", "train", "flight"],
  "Haridwar": ["train", "bus", "flight"],
  "Rishikesh": ["train", "bus", "flight"],
  "Ayodhya": ["flight", "train", "bus"],
  "Raipur": ["flight", "train", "bus"],
  "Jammu and Kashmir": ["flight", "train", "bus"],
  "Karnataka": ["flight", "train", "bus"],
  "Varanasi": ["flight", "train", "bus"]
};

export const getAvailableModes = (city) => {
  if (!city) return ['flight', 'train', 'bus'];
  // Case-insensitive lookup
  const key = Object.keys(TRANSPORT_MAP).find(k => k.toLowerCase() === city.toLowerCase());
  return key ? TRANSPORT_MAP[key] : ['flight', 'train', 'bus'];
};
