import os

# --- JS Files ---
flights_js_path = 'frontend/src/data/flights.js'
with open(flights_js_path, 'r', encoding='utf-8') as f:
    f_content = f.read()

new_f_content = f_content.replace(
'''export const searchFlights = (source, destination, date, passengers) => {
  return flights.filter(f => 
    (!source || f.source.toLowerCase() === source.toLowerCase()) && 
    (!destination || f.destination.toLowerCase() === destination.toLowerCase()) &&
    f.availableSeats >= passengers
  );
};''',
'''export const searchFlights = (source, destination, date, passengers) => {
  const res = flights.filter(f => 
    (!source || f.source.toLowerCase() === source.toLowerCase()) && 
    (!destination || f.destination.toLowerCase() === destination.toLowerCase()) &&
    f.availableSeats >= passengers
  );
  if (res.length === 0 && source && destination) {
    res.push({
      id: 'FL-FALLBACK', airline: 'TripPilot Regional', flightNumber: 'TP-101',
      source, destination, departure: '10:00', arrival: '12:00', duration: '2h 00m',
      price: 4500, stops: 0, class: 'Economy', availableSeats: 50,
      aircraft: 'Airbus A320', baggage: '15kg', meal: false
    });
  }
  return res;
};'''
)
with open(flights_js_path, 'w', encoding='utf-8') as f:
    f.write(new_f_content)

trains_js_path = 'frontend/src/data/trains.js'
with open(trains_js_path, 'r', encoding='utf-8') as f:
    t_content = f.read()
new_t_content = t_content.replace(
'''export const searchTrains = (source, destination, date, passengers) => {
  return trains.filter(t => (!source || t.source.toLowerCase() === source.toLowerCase()) && (!destination || t.destination.toLowerCase() === destination.toLowerCase()));
};''',
'''export const searchTrains = (source, destination, date, passengers) => {
  const res = trains.filter(t => (!source || t.source.toLowerCase() === source.toLowerCase()) && (!destination || t.destination.toLowerCase() === destination.toLowerCase()));
  if (res.length === 0 && source && destination) {
    res.push({
      id: 'TRN-FALLBACK', name: 'TripPilot Express', trainNumber: '19900',
      source, destination, departure: '08:00', arrival: '18:00', duration: '10h 00m',
      price: 1200, classes: ['1AC', '2AC', '3AC', 'Sleeper'], availableSeats: 100
    });
  }
  return res;
};'''
)
with open(trains_js_path, 'w', encoding='utf-8') as f:
    f.write(new_t_content)

buses_js_path = 'frontend/src/data/buses.js'
with open(buses_js_path, 'r', encoding='utf-8') as f:
    b_content = f.read()
new_b_content = b_content.replace(
'''export const searchBuses = (source, destination, date, passengers) => {
  return buses.filter(b => (!source || b.source.toLowerCase() === source.toLowerCase()) && (!destination || b.destination.toLowerCase() === destination.toLowerCase()));
};''',
'''export const searchBuses = (source, destination, date, passengers) => {
  const res = buses.filter(b => (!source || b.source.toLowerCase() === source.toLowerCase()) && (!destination || b.destination.toLowerCase() === destination.toLowerCase()));
  if (res.length === 0 && source && destination) {
    res.push({
      id: 'BUS-FALLBACK', operator: 'TripPilot Connect', busType: 'Volvo A/C Semi Sleeper',
      source, destination, departure: '22:00', arrival: '06:00', duration: '8h 00m',
      price: 800, availableSeats: 40
    });
  }
  return res;
};'''
)
with open(buses_js_path, 'w', encoding='utf-8') as f:
    f.write(new_b_content)

# --- PY Files ---
f_py_path = 'backend/app/services/flight_service.py'
with open(f_py_path, 'r', encoding='utf-8') as f:
    f_py_content = f.read()
if "FL-FALLBACK" not in f_py_content:
    new_f_py = f_py_content.replace(
'''    return results''',
'''    if not results and source and destination:
        results.append({
            "id": "FL-FALLBACK", "airline": "TripPilot Regional", "flight_number": "TP-101",
            "source": source, "source_code": source[:3].upper(), "destination": destination, "destination_code": destination[:3].upper(),
            "departure": "10:00", "arrival": "12:00", "duration": "2h 00m", "price": 4500, "stops": 0,
            "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 50, "class": "Economy",
            "total_price": 4500 * passengers, "passengers": passengers, "travel_date": date, "is_demo": True
        })
    return results'''
    )
    with open(f_py_path, 'w', encoding='utf-8') as f:
        f.write(new_f_py)

t_py_path = 'backend/app/services/train_service.py'
with open(t_py_path, 'r', encoding='utf-8') as f:
    t_py_content = f.read()
if "TRN-FALLBACK" not in t_py_content:
    new_t_py = t_py_content.replace(
'''    return results''',
'''    if not results and source and destination:
        results.append({
            "id": "TRN-FALLBACK", "name": "TripPilot Express", "train_number": "19900",
            "source": source, "source_code": source[:3].upper(), "destination": destination, "destination_code": destination[:3].upper(),
            "departure": "08:00", "arrival": "18:00", "duration": "10h 00m", "price": 1200,
            "classes": ["1AC", "2AC", "3AC", "Sleeper"], "available_seats": 100, "is_demo": True
        })
    return results'''
    )
    with open(t_py_path, 'w', encoding='utf-8') as f:
        f.write(new_t_py)

b_py_path = 'backend/app/services/bus_service.py'
with open(b_py_path, 'r', encoding='utf-8') as f:
    b_py_content = f.read()
if "BUS-FALLBACK" not in b_py_content:
    new_b_py = b_py_content.replace(
'''    return results''',
'''    if not results and source and destination:
        results.append({
            "id": "BUS-FALLBACK", "operator": "TripPilot Connect", "bus_type": "Volvo A/C Semi Sleeper",
            "source": source, "destination": destination, "departure": "22:00", "arrival": "06:00",
            "duration": "8h 00m", "price": 800, "available_seats": 40, "is_demo": True
        })
    return results'''
    )
    with open(b_py_path, 'w', encoding='utf-8') as f:
        f.write(new_b_py)
