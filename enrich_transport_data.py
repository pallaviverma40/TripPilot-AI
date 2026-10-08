import json
import random

cities = ['Delhi', 'Mumbai', 'Bangalore', 'Lucknow', 'Jaipur', 'Hyderabad', 'Kochi', 'Firozabad', 'Agra', 'Kanpur', 'Pune', 'Varanasi']
city_codes = {'Delhi': 'NDLS', 'Mumbai': 'BCT', 'Bangalore': 'SBC', 'Lucknow': 'LKO', 'Jaipur': 'JP', 'Hyderabad': 'HYB', 'Kochi': 'ERS', 'Firozabad': 'FZD', 'Agra': 'AGC', 'Kanpur': 'CNB', 'Pune': 'PUNE', 'Varanasi': 'BSB'}

bus_operators = [
    ("Zingbus", "Volvo A/C Sleeper"), 
    ("NueGo Electric", "A/C Seater (Electric)"),
    ("UPSRTC Janrath", "A/C Seater (2+2)"),
    ("UPSRTC Volvo", "Volvo A/C Seater/Sleeper"),
    ("IntrCity SmartBus", "A/C Sleeper"),
    ("Orange Tours", "Volvo Multi-Axle Sleeper")
]

bus_amenities = ['WiFi', 'Charging Point', 'Water Bottle', 'Blanket', 'Reading Light', 'CCTV', 'Track My Bus', 'Snacks']

train_names = ["Shatabdi Express", "Vande Bharat Exp", "Rajdhani Express", "Gomti Express", "Taj Express", "Kalindi Express", "Intercity Exp", "Duronto Express"]
train_amenities = ['Pantry Car', 'Clean Bedding', 'Bio-Toilets', 'Charging Point', 'E-Catering']

trains_py, trains_js = [], []
buses_py, buses_js = [], []

tid, bid = 1, 1

# Generate 50 routes to ensure rich coverage
for i in range(50):
    src = random.choice(cities)
    dst = random.choice([c for c in cities if c != src])
    
    # --- Train ---
    train_num = str(random.randint(11000, 19999))
    t_name = random.choice(train_names)
    t_price = random.randint(300, 2500)
    t_amenities = random.sample(train_amenities, random.randint(2, 4))
    
    t_py = f'''    {{"id": "TRN{tid:03d}", "name": "{t_name}", "train_number": "{train_num}", "source": "{src}", "source_code": "{city_codes[src]}", "destination": "{dst}", "destination_code": "{city_codes[dst]}", "departure": "08:00", "arrival": "18:00", "duration": "10h 00m", "price": {t_price}, "classes": ["1AC", "2AC", "3AC", "Sleeper"], "available_seats": {random.randint(10, 100)}, "amenities": {json.dumps(t_amenities)}}}'''
    t_js = f'''  {{ id: 'TRN{tid:03d}', name: '{t_name}', trainNumber: '{train_num}', source: '{src}', destination: '{dst}', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: {t_price}, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: {random.randint(10, 100)}, amenities: {json.dumps(t_amenities)} }}'''
    trains_py.append(t_py)
    trains_js.append(t_js)
    tid += 1

    # --- Bus ---
    b_op, b_type = random.choice(bus_operators)
    b_price = random.randint(400, 1800)
    b_amenities = random.sample(bus_amenities, random.randint(3, 5))
    
    b_py = f'''    {{"id": "BUS{bid:03d}", "operator": "{b_op}", "bus_type": "{b_type}", "source": "{src}", "destination": "{dst}", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": {b_price}, "available_seats": {random.randint(5, 40)}, "amenities": {json.dumps(b_amenities)}, "rating": {round(random.uniform(3.8, 4.9), 1)}}}'''
    b_js = f'''  {{ id: 'BUS{bid:03d}', operator: '{b_op}', busType: '{b_type}', source: '{src}', destination: '{dst}', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: {b_price}, availableSeats: {random.randint(5, 40)}, amenities: {json.dumps(b_amenities)}, rating: {round(random.uniform(3.8, 4.9), 1)} }}'''
    buses_py.append(b_py)
    buses_js.append(b_js)
    bid += 1

# Base content structures
trains_py_content = 'MOCK_TRAINS = [\n' + ',\n'.join(trains_py) + '\n]\n\ndef search_trains(source: str, destination: str, date: str, passengers: int):\n    results = []\n    for t in MOCK_TRAINS:\n        if source.lower() in t["source"].lower() and destination.lower() in t["destination"].lower():\n            results.append(t)\n    if not results and source and destination:\n        results.append({"id": "TRN-FALLBACK", "name": "TripPilot Express", "train_number": "19900", "source": source, "source_code": source[:3].upper(), "destination": destination, "destination_code": destination[:3].upper(), "departure": "08:00", "arrival": "18:00", "duration": "10h 00m", "price": 1200, "classes": ["1AC", "2AC", "3AC", "Sleeper"], "available_seats": 100, "amenities": ["Clean Bedding", "Pantry Car"], "is_demo": True})\n    return results\n'
trains_js_content = 'export const trains = [\n' + ',\n'.join(trains_js) + '\n];\n\nexport const searchTrains = (source, destination, date, passengers) => {\n  const res = trains.filter(t => (!source || t.source.toLowerCase() === source.toLowerCase()) && (!destination || t.destination.toLowerCase() === destination.toLowerCase()));\n  if (res.length === 0 && source && destination) {\n    res.push({ id: "TRN-FALLBACK", name: "TripPilot Express", trainNumber: "19900", source, destination, departure: "08:00", arrival: "18:00", duration: "10h 00m", price: 1200, classes: ["1AC", "2AC", "3AC", "Sleeper"], availableSeats: 100, amenities: ["Clean Bedding", "Pantry Car"] });\n  }\n  return res;\n};\n'

buses_py_content = 'MOCK_BUSES = [\n' + ',\n'.join(buses_py) + '\n]\n\ndef search_buses(source: str, destination: str, date: str, passengers: int):\n    results = []\n    for b in MOCK_BUSES:\n        if source.lower() in b["source"].lower() and destination.lower() in b["destination"].lower():\n            results.append(b)\n    if not results and source and destination:\n        results.append({"id": "BUS-FALLBACK", "operator": "TripPilot Connect", "bus_type": "Volvo A/C Semi Sleeper", "source": source, "destination": destination, "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 800, "available_seats": 40, "amenities": ["WiFi", "Water Bottle"], "rating": 4.5, "is_demo": True})\n    return results\n'
buses_js_content = 'export const buses = [\n' + ',\n'.join(buses_js) + '\n];\n\nexport const searchBuses = (source, destination, date, passengers) => {\n  const res = buses.filter(b => (!source || b.source.toLowerCase() === source.toLowerCase()) && (!destination || b.destination.toLowerCase() === destination.toLowerCase()));\n  if (res.length === 0 && source && destination) {\n    res.push({ id: "BUS-FALLBACK", operator: "TripPilot Connect", busType: "Volvo A/C Semi Sleeper", source, destination, departure: "22:00", arrival: "06:00", duration: "8h 00m", price: 800, availableSeats: 40, amenities: ["WiFi", "Water Bottle"], rating: 4.5 });\n  }\n  return res;\n};\n'

with open('backend/app/services/train_service.py', 'w', encoding='utf-8') as f: f.write(trains_py_content)
with open('frontend/src/data/trains.js', 'w', encoding='utf-8') as f: f.write(trains_js_content)
with open('backend/app/services/bus_service.py', 'w', encoding='utf-8') as f: f.write(buses_py_content)
with open('frontend/src/data/buses.js', 'w', encoding='utf-8') as f: f.write(buses_js_content)

print("Enriched transport data applied successfully.")

