import random
import json

city = "Firozabad"

hotels_py = []
hotels_js = []
hid = 250  # Using higher IDs to avoid collisions
categories = [('Budget', 1500), ('Standard', 3500), ('Premium', 6000)]
for cat, base_price in categories:
    price = base_price + random.randint(-500, 500)
    h_py = f'    {{"id": "HT{hid:03d}", "name": "{cat} Hotel {city}", "destination": "{city}", "address": "Central {city}", "rating": 4, "review_count": 800, "price_per_night": {price}, "category": "{cat}", "amenities": ["WiFi", "Restaurant"], "description": "Great {cat} hotel in the glass city of {city}.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Standard"]}},'
    h_js = f"  {{ id: 'HT{hid:03d}', name: '{cat} Hotel {city}', destination: '{city}', address: 'Central {city}', rating: 4, reviewCount: 800, pricePerNight: {price}, totalPrice: 0, category: '{cat}', amenities: ['WiFi', 'Restaurant'], images: [], description: 'Great {cat} hotel in the glass city of {city}.', cancellation: 'Free cancellation before 24h', breakfast: true }},"
    hotels_py.append(h_py)
    hotels_js.append(h_js)
    hid += 1

activities_py = []
activities_js = []
aid = 300
for i in range(5):
    price = random.randint(0, 1000)
    a_py = f'    {{"id": "AC{aid:03d}", "name": "Glass Bangle Workshop {i+1}", "destination": "{city}", "category": "culture", "duration": "2 hours", "price": {price}, "rating": 4.5, "review_count": 300, "description": "Explore the famous glass making industry in {city}.", "tags": ["Cultural", "Handicraft"], "time_of_day": "any", "difficulty": "Easy", "best_for": "Everyone"}},'
    a_js = f"  {{ id: 'AC{aid:03d}', name: 'Glass Bangle Workshop {i+1}', destination: '{city}', category: 'culture', duration: '2 hours', price: {price}, rating: 4.5, description: 'Explore the famous glass making industry in {city}.', tags: ['Cultural', 'Handicraft'], timeOfDay: 'any', difficulty: 'Easy' }},"
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

inject('backend/app/services/hotel_service.py', hotels_py, '\\n]')
inject('frontend/src/data/hotels.js', hotels_js, '\\n];')
inject('backend/app/services/activity_service.py', activities_py, '\\n]')
inject('frontend/src/data/activities.js', activities_js, '\\n];')

