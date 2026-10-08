import json
import random
import os

cities = ['Delhi', 'Mumbai', 'Bangalore', 'Lucknow', 'Jaipur', 'Hyderabad', 'Kochi', 'Firozabad', 'Agra', 'Kanpur']
city_codes = {'Delhi': 'NDLS', 'Mumbai': 'BCT', 'Bangalore': 'SBC', 'Lucknow': 'LKO', 'Jaipur': 'JP', 'Hyderabad': 'HYB', 'Kochi': 'ERS', 'Firozabad': 'FZD', 'Agra': 'AGC', 'Kanpur': 'CNB'}

trains_py = []
trains_js = []
tid = 1

for i in range(20):
    src = random.choice(cities)
    dst = random.choice([c for c in cities if c != src])
    train_num = str(random.randint(11000, 19999))
    
    t_py = f'''    {{"id": "TRN{tid:03d}", "name": "Express {train_num}", "train_number": "{train_num}", "source": "{src}", "source_code": "{city_codes[src]}", "destination": "{dst}", "destination_code": "{city_codes[dst]}", "departure": "08:00", "arrival": "18:00", "duration": "10h 00m", "price": {random.randint(500, 2000)}, "classes": ["1AC", "2AC", "3AC", "Sleeper"], "available_seats": {random.randint(10, 100)}}}'''
    t_js = f'''  {{ id: 'TRN{tid:03d}', name: 'Express {train_num}', trainNumber: '{train_num}', source: '{src}', destination: '{dst}', departure: '08:00', arrival: '18:00', duration: '10h 00m', price: {random.randint(500, 2000)}, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: {random.randint(10, 100)} }}'''
    
    trains_py.append(t_py)
    trains_js.append(t_js)
    tid += 1

trains_py_content = 'MOCK_TRAINS = [\n' + ',\n'.join(trains_py) + '\n]\n\ndef search_trains(source: str, destination: str, date: str, passengers: int):\n    # Basic mock search\n    results = []\n    for t in MOCK_TRAINS:\n        if source.lower() in t["source"].lower() and destination.lower() in t["destination"].lower():\n            results.append(t)\n    return results\n'
trains_js_content = 'export const trains = [\n' + ',\n'.join(trains_js) + '\n];\n\nexport const searchTrains = (source, destination, date, passengers) => {\n  return trains.filter(t => (!source || t.source.toLowerCase() === source.toLowerCase()) && (!destination || t.destination.toLowerCase() === destination.toLowerCase()));\n};\n'

buses_py = []
buses_js = []
bid = 1

for i in range(20):
    src = random.choice(cities)
    dst = random.choice([c for c in cities if c != src])
    
    b_py = f'''    {{"id": "BUS{bid:03d}", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "{src}", "destination": "{dst}", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": {random.randint(600, 1500)}, "available_seats": {random.randint(5, 40)}}}'''
    b_js = f'''  {{ id: 'BUS{bid:03d}', operator: 'SmartBus', busType: 'Volvo A/C Semi Sleeper', source: '{src}', destination: '{dst}', departure: '22:00', arrival: '06:00', duration: '8h 00m', price: {random.randint(600, 1500)}, availableSeats: {random.randint(5, 40)} }}'''
    
    buses_py.append(b_py)
    buses_js.append(b_js)
    bid += 1

buses_py_content = 'MOCK_BUSES = [\n' + ',\n'.join(buses_py) + '\n]\n\ndef search_buses(source: str, destination: str, date: str, passengers: int):\n    # Basic mock search\n    results = []\n    for b in MOCK_BUSES:\n        if source.lower() in b["source"].lower() and destination.lower() in b["destination"].lower():\n            results.append(b)\n    return results\n'
buses_js_content = 'export const buses = [\n' + ',\n'.join(buses_js) + '\n];\n\nexport const searchBuses = (source, destination, date, passengers) => {\n  return buses.filter(b => (!source || b.source.toLowerCase() === source.toLowerCase()) && (!destination || b.destination.toLowerCase() === destination.toLowerCase()));\n};\n'


os.makedirs('backend/app/services', exist_ok=True)
os.makedirs('frontend/src/data', exist_ok=True)

with open('backend/app/services/train_service.py', 'w', encoding='utf-8') as f:
    f.write(trains_py_content)
with open('frontend/src/data/trains.js', 'w', encoding='utf-8') as f:
    f.write(trains_js_content)

with open('backend/app/services/bus_service.py', 'w', encoding='utf-8') as f:
    f.write(buses_py_content)
with open('frontend/src/data/buses.js', 'w', encoding='utf-8') as f:
    f.write(buses_js_content)

print("Generated new train and bus mock data.")

