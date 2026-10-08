import re
import json
import random

# Data Definitions
city_codes = {'Jaipur': 'JAI', 'Hyderabad': 'HYD', 'Pune': 'PNQ', 'Ahmedabad': 'AMD', 'Kochi': 'COK', 'Varanasi': 'VNS', 'Amritsar': 'ATQ', 'Chandigarh': 'IXC', 'Srinagar': 'SXR', 'Leh': 'IXL', 'Dehradun': 'DED', 'Patna': 'PAT', 'Bhubaneswar': 'BBI', 'Visakhapatnam': 'VTZ', 'Coimbatore': 'CJB', 'Guwahati': 'GAU', 'Port Blair': 'IXZ', 'Udaipur': 'UDR', 'Indore': 'IDR', 'Nagpur': 'NAG', 'Lucknow': 'LKO', 'Delhi': 'DEL', 'Mumbai': 'BOM', 'Bangalore': 'BLR', 'Kolkata': 'CCU', 'Chennai': 'MAA', 'Goa': 'GOI'}

flight_routes = [
    ('Jaipur', 'Delhi'), ('Jaipur', 'Mumbai'),
    ('Hyderabad', 'Delhi'), ('Hyderabad', 'Mumbai'), ('Hyderabad', 'Bangalore'), ('Hyderabad', 'Lucknow'),
    ('Pune', 'Delhi'), ('Pune', 'Bangalore'), ('Pune', 'Mumbai'),
    ('Ahmedabad', 'Delhi'), ('Ahmedabad', 'Mumbai'),
    ('Kochi', 'Delhi'), ('Kochi', 'Mumbai'), ('Kochi', 'Bangalore'),
    ('Varanasi', 'Delhi'), ('Varanasi', 'Mumbai'),
    ('Amritsar', 'Delhi'), ('Amritsar', 'Mumbai'),
    ('Chandigarh', 'Delhi'), ('Chandigarh', 'Mumbai'),
    ('Srinagar', 'Delhi'),
    ('Leh', 'Delhi'),
    ('Dehradun', 'Delhi'),
    ('Patna', 'Delhi'), ('Patna', 'Kolkata'),
    ('Bhubaneswar', 'Delhi'), ('Bhubaneswar', 'Kolkata'),
    ('Visakhapatnam', 'Delhi'), ('Visakhapatnam', 'Mumbai'),
    ('Coimbatore', 'Delhi'), ('Coimbatore', 'Mumbai'),
    ('Guwahati', 'Delhi'), ('Guwahati', 'Kolkata'),
    ('Port Blair', 'Chennai'), ('Port Blair', 'Kolkata'),
    ('Udaipur', 'Delhi'), ('Udaipur', 'Mumbai'),
    ('Indore', 'Delhi'), ('Indore', 'Mumbai'),
    ('Nagpur', 'Delhi'), ('Nagpur', 'Mumbai'),
    ('Lucknow', 'Hyderabad'), ('Lucknow', 'Bangalore'), ('Lucknow', 'Chennai')
]

hotel_cities = ['Jaipur', 'Hyderabad', 'Pune', 'Ahmedabad', 'Kochi', 'Varanasi', 'Amritsar', 'Srinagar', 'Leh', 'Dehradun', 'Udaipur', 'Visakhapatnam', 'Guwahati', 'Port Blair', 'Indore', 'Nagpur']
activity_cities = ['Jaipur', 'Hyderabad', 'Varanasi', 'Kochi', 'Amritsar', 'Srinagar', 'Leh', 'Udaipur', 'Port Blair', 'Guwahati', 'Visakhapatnam']

airlines = ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'Akasa Air']

flights_py = []
flights_js = []
fid = 24
for src, dst in flight_routes:
    airline = random.choice(airlines)
    price = random.randint(2500, 12000)
    dur = f"{random.randint(1,3)}h {random.randint(0,5)*10}m"
    
    f_py = f'    {{"id": "FL{fid:03d}", "airline": "{airline}", "flight_number": "{airline[:2].upper()}-{random.randint(100,999)}", "source": "{src}", "source_code": "{city_codes[src]}", "destination": "{dst}", "destination_code": "{city_codes[dst]}", "departure": "10:00", "arrival": "12:00", "duration": "{dur}", "price": {price}, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 45, "class": "Economy"}},'
    f_js = f"  {{ id: 'FL{fid:03d}', airline: '{airline}', flightNumber: '{airline[:2].upper()}-{random.randint(100,999)}', source: '{src}', destination: '{dst}', departure: '10:00', arrival: '12:00', duration: '{dur}', price: {price}, stops: 0, class: 'Economy', availableSeats: 45, aircraft: 'Airbus A320', baggage: '15kg', meal: false }},"
    
    flights_py.append(f_py)
    flights_js.append(f_js)
    fid += 1

hotels_py = []
hotels_js = []
hid = 25
categories = [('Budget', 2000), ('Standard', 4500), ('Premium', 8000), ('Luxury', 15000)]
for city in hotel_cities:
    for cat, base_price in categories[:3]:
        price = base_price + random.randint(-500, 500)
        h_py = f'    {{"id": "HT{hid:03d}", "name": "{cat} Hotel {city}", "destination": "{city}", "address": "Central {city}", "rating": 4, "review_count": 1000, "price_per_night": {price}, "category": "{cat}", "amenities": ["WiFi", "Restaurant"], "description": "Great {cat} hotel in {city}.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Standard"]}},'
        h_js = f"  {{ id: 'HT{hid:03d}', name: '{cat} Hotel {city}', destination: '{city}', address: 'Central {city}', rating: 4, reviewCount: 1000, pricePerNight: {price}, totalPrice: 0, category: '{cat}', amenities: ['WiFi', 'Restaurant'], images: [], description: 'Great {cat} hotel in {city}.', cancellation: 'Free cancellation before 24h', breakfast: true }},"
        hotels_py.append(h_py)
        hotels_js.append(h_js)
        hid += 1

activities_py = []
activities_js = []
aid = 29
for city in activity_cities:
    for i in range(5):
        price = random.randint(0, 2000)
        a_py = f'    {{"id": "AC{aid:03d}", "name": "Activity {i+1} in {city}", "destination": "{city}", "category": "sightseeing", "duration": "2 hours", "price": {price}, "rating": 4.5, "review_count": 500, "description": "Enjoy this great activity in {city}.", "tags": ["Fun"], "time_of_day": "any", "difficulty": "Easy", "best_for": "Everyone"}},'
        a_js = f"  {{ id: 'AC{aid:03d}', name: 'Activity {i+1} in {city}', destination: '{city}', category: 'sightseeing', duration: '2 hours', price: {price}, rating: 4.5, description: 'Enjoy this great activity in {city}.', tags: ['Fun'], timeOfDay: 'any', difficulty: 'Easy' }},"
        activities_py.append(a_py)
        activities_js.append(a_js)
        aid += 1

def inject(filepath, items, closing_bracket):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    idx = content.find(closing_bracket)
    if idx != -1:
        new_content = content[:idx] + '\\n'.join(items) + '\\n' + content[idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

inject('backend/app/services/flight_service.py', flights_py, '\\n]')
inject('frontend/src/data/flights.js', flights_js, '\\n];')
inject('backend/app/services/hotel_service.py', hotels_py, '\\n]')
inject('frontend/src/data/hotels.js', hotels_js, '\\n];')
inject('backend/app/services/activity_service.py', activities_py, '\\n]')
inject('frontend/src/data/activities.js', activities_js, '\\n];')

