import os
import json
import random
import uuid

base_dir = r"C:\\Users\\priyaverma13102000\\.gemini\\antigravity\\scratch\\TripPilot-AI\\backend"

def write_file(rel_path, content):
    full_path = os.path.join(base_dir, rel_path.replace('/', '\\\\'))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

write_file("requirements.txt", '''fastapi==0.115.0
uvicorn[standard]==0.32.0
pymongo==4.10.1
motor==3.6.0
pydantic==2.9.2
pydantic-settings==2.6.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.12
httpx==0.27.2
python-dotenv==1.0.1
langgraph==0.2.38
langchain==0.3.7
langchain-core==0.3.15
''')

write_file(".env", '''MONGODB_URI=mongodb://localhost:27017
DB_NAME=trippilot_db
SECRET_KEY=trippilot-super-secret-key-change-in-production-2024
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
DEBUG=True
BACKEND_HOST=127.0.0.1
BACKEND_PORT=8000
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
''')

write_file("app/__init__.py", "")
write_file("app/core/__init__.py", "")

write_file("app/core/config.py", '''from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_uri: str = "mongodb://localhost:27017"
    db_name: str = "trippilot_db"
    secret_key: str = "changeme"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    debug: bool = True
    backend_host: str = "127.0.0.1"
    backend_port: int = 8000
    allowed_origins: str = "http://localhost:5173"
    
    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(',')]
    
    class Config:
        env_file = ".env"

settings = Settings()
''')

write_file("app/database/__init__.py", "")

write_file("app/database/connection.py", '''from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client: AsyncIOMotorClient = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(settings.mongodb_uri)
    db = client[settings.db_name]
    print(f"Connected to MongoDB: {settings.db_name}")

async def close_db():
    global client
    if client:
        client.close()

def get_db():
    return db
''')

write_file("app/models/__init__.py", "")

write_file("app/models/booking.py", '''from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime
import uuid

class PassengerInfo(BaseModel):
    name: str
    age: int
    gender: str = 'male'

class FlightBookingRequest(BaseModel):
    flight_id: str
    airline: str
    flight_number: str
    source: str
    destination: str
    departure: str
    arrival: str
    duration: str
    price_per_person: float
    passengers: int
    total_price: float
    travel_date: str
    passenger_details: Optional[list[PassengerInfo]] = []

class TrainBookingRequest(BaseModel):
    train_id: str
    train_name: str
    train_number: str
    source: str
    destination: str
    departure: str
    arrival: str
    duration: str
    travel_class: str
    price_per_person: float
    passengers: int
    total_price: float
    travel_date: str

class BusBookingRequest(BaseModel):
    bus_id: str
    operator: str
    bus_type: str
    source: str
    destination: str
    departure: str
    arrival: str
    duration: str
    price_per_person: float
    passengers: int
    total_price: float
    travel_date: str

class HotelBookingRequest(BaseModel):
    hotel_id: str
    hotel_name: str
    destination: str
    checkin: str
    checkout: str
    guests: int
    price_per_night: float
    total_nights: int
    total_price: float

class BookingResponse(BaseModel):
    success: bool
    booking_id: str
    status: str = 'confirmed'
    is_demo: bool = True
    message: str = 'Demo booking created successfully'
''')

write_file("app/models/trip.py", '''from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

class TripCreate(BaseModel):
    source: str
    destination: str
    departure_date: str
    return_date: Optional[str] = None
    passengers: int = 1
    budget: float
    transport_mode: str  # flight | train | bus
    transport_details: Optional[dict] = None
    hotel_details: Optional[dict] = None
    activities: Optional[list] = []
    total_cost: float = 0
    status: str = 'planned'
    is_demo: bool = True
    booking_ids: Optional[list[str]] = []

class TripResponse(BaseModel):
    id: str
    source: str
    destination: str
    departure_date: str
    return_date: Optional[str]
    passengers: int
    budget: float
    transport_mode: str
    transport_details: Optional[dict]
    hotel_details: Optional[dict]
    activities: list
    total_cost: float
    status: str
    is_demo: bool
    booking_ids: list[str]
    created_at: str
''')

write_file("app/models/user.py", '''from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str

class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    user: UserResponse
''')

write_file("app/services/__init__.py", "")

# 13. app/services/flight_service.py
flight_service_content = '''from typing import Optional
import random

MOCK_FLIGHTS = [
'''

cities = ["Delhi", "Mumbai", "Bangalore", "Goa", "Lucknow", "Kolkata", "Chennai", "Hyderabad"]
codes = {"Delhi": "DEL", "Mumbai": "BOM", "Bangalore": "BLR", "Goa": "GOI", "Lucknow": "LKO", "Kolkata": "CCU", "Chennai": "MAA", "Hyderabad": "HYD"}
airlines = ["IndiGo", "Air India", "Vistara", "SpiceJet", "Akasa Air"]

flight_id_counter = 1
for _ in range(25):
    src = random.choice(cities)
    dst = random.choice([c for c in cities if c != src])
    airline = random.choice(airlines)
    fn = f"{airline[:2].upper()}-{random.randint(100, 999)}"
    price = random.randint(3000, 12000)
    hr = random.randint(1, 3)
    mn = random.choice([0, 15, 30, 45])
    duration = f"{hr}h {mn}m" if mn > 0 else f"{hr}h 0m"
    dep_hr = random.randint(0, 23)
    dep_mn = random.choice(["00", "15", "30", "45"])
    flight_service_content += f"""    {{
        'id': 'FL{flight_id_counter:03d}',
        'airline': '{airline}',
        'flight_number': '{fn}',
        'source': '{src}',
        'source_code': '{codes[src]}',
        'destination': '{dst}',
        'destination_code': '{codes[dst]}',
        'departure': '{dep_hr:02d}:{dep_mn}',
        'arrival': '{(dep_hr + hr)%24:02d}:{(int(dep_mn)+mn)%60:02d}',
        'duration': '{duration}',
        'price': {price},
        'stops': 0,
        'aircraft': 'Airbus A320',
        'baggage': '15kg',
        'meal': False,
        'available_seats': {random.randint(5, 60)},
        'class': 'Economy'
    }},\\n"""
    flight_id_counter += 1

flight_service_content += ''']

def search_flights(source: str, destination: str, date: str, passengers: int) -> list[dict]:
    results = []
    for f in MOCK_FLIGHTS:
        if source.lower() in f['source'].lower() and destination.lower() in f['destination'].lower():
            # mock copy to change seats/price
            f_copy = f.copy()
            f_copy['price_per_person'] = f['price']
            f_copy['total_price'] = f['price'] * passengers
            results.append(f_copy)
    return results

def get_flight_by_id(flight_id: str) -> Optional[dict]:
    for f in MOCK_FLIGHTS:
        if f['id'] == flight_id:
            return f
    return None
'''
write_file("app/services/flight_service.py", flight_service_content)

# 14. app/services/train_service.py
train_service_content = '''from typing import Optional
import random

MOCK_TRAINS = [
'''

train_names = ["Rajdhani Express", "Shatabdi Express", "Duronto Express", "Garib Rath", "Vande Bharat", "Sampark Kranti"]
train_id_counter = 1
for _ in range(25):
    src = random.choice(cities)
    dst = random.choice([c for c in cities if c != src])
    tn = random.choice(train_names)
    tnum = str(random.randint(11000, 19999))
    hr = random.randint(6, 30)
    mn = random.choice([0, 15, 30, 45])
    duration = f"{hr}h {mn}m"
    dep_hr = random.randint(0, 23)
    train_service_content += f"""    {{
        'id': 'TR{train_id_counter:03d}',
        'train_name': '{tn}',
        'train_number': '{tnum}',
        'source': '{src}',
        'destination': '{dst}',
        'departure': '{dep_hr:02d}:30',
        'arrival': '{(dep_hr + hr)%24:02d}:{(30+mn)%60:02d}',
        'duration': '{duration}',
        'classes': [
            {{'type': 'SL', 'name': 'Sleeper', 'price': {random.randint(300, 900)}, 'available': {random.randint(10, 200)}}},
            {{'type': '3A', 'name': 'AC 3 Tier', 'price': {random.randint(1000, 2000)}, 'available': {random.randint(5, 100)}}},
            {{'type': '2A', 'name': 'AC 2 Tier', 'price': {random.randint(2000, 3500)}, 'available': {random.randint(2, 50)}}},
            {{'type': '1A', 'name': 'AC First Class', 'price': {random.randint(3500, 6000)}, 'available': {random.randint(0, 15)}}}
        ],
        'stops': {random.randint(2, 15)},
        'distance': '{random.randint(400, 2500)}km',
        'type': 'Superfast',
        'days_of_operation': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }},\\n"""
    train_id_counter += 1

train_service_content += ''']

def search_trains(source: str, destination: str, date: str, passengers: int) -> list[dict]:
    results = []
    for t in MOCK_TRAINS:
        if source.lower() in t['source'].lower() and destination.lower() in t['destination'].lower():
            results.append(t)
    return results

def get_train_by_id(train_id: str) -> Optional[dict]:
    for t in MOCK_TRAINS:
        if t['id'] == train_id:
            return t
    return None
'''
write_file("app/services/train_service.py", train_service_content)

# 15. app/services/bus_service.py
bus_service_content = '''from typing import Optional
import random

MOCK_BUSES = [
'''

bus_operators = ["RedBus Travels", "Zingbus", "IntrCity SmartBus", "Neeta Travels", "VRL Travels"]
bus_types = ["AC Sleeper (2+1)", "Volvo AC Semi-Sleeper", "Non-AC Seater", "AC Seater"]

bus_id_counter = 1
for _ in range(25):
    src = random.choice(cities)
    dst = random.choice([c for c in cities if c != src])
    op = random.choice(bus_operators)
    bt = random.choice(bus_types)
    price = random.randint(500, 2500)
    hr = random.randint(5, 18)
    dep_hr = random.randint(18, 23)
    bus_service_content += f"""    {{
        'id': 'BU{bus_id_counter:03d}',
        'operator': '{op}',
        'bus_type': '{bt}',
        'source': '{src}',
        'destination': '{dst}',
        'departure': '{dep_hr:02d}:00',
        'arrival': '{(dep_hr + hr)%24:02d}:00',
        'duration': '{hr}h',
        'price': {price},
        'total_seats': 40,
        'available_seats': {random.randint(5, 30)},
        'rating': {round(random.uniform(3.5, 4.8), 1)},
        'review_count': {random.randint(50, 2000)},
        'amenities': ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
        'boarding_point': 'Main Bus Stand',
        'dropping_point': 'ISBT',
        'cancellation_policy': 'Free cancellation 24h before departure'
    }},\\n"""
    bus_id_counter += 1

bus_service_content += ''']

def search_buses(source: str, destination: str, date: str, passengers: int) -> list[dict]:
    results = []
    for b in MOCK_BUSES:
        if source.lower() in b['source'].lower() and destination.lower() in b['destination'].lower():
            b_copy = b.copy()
            b_copy['price_per_person'] = b['price']
            b_copy['total_price'] = b['price'] * passengers
            results.append(b_copy)
    return results

def get_bus_by_id(bus_id: str) -> Optional[dict]:
    for b in MOCK_BUSES:
        if b['id'] == bus_id:
            return b
    return None
'''
write_file("app/services/bus_service.py", bus_service_content)

# 16. app/services/hotel_service.py
hotel_service_content = '''from typing import Optional
import random

MOCK_HOTELS = [
'''

hotel_prefixes = ["The Taj", "ITC", "Radisson Blu", "Holiday Inn", "Novotel", "Lemon Tree", "Hyatt", "Marriott"]
hotel_id_counter = 1
for _ in range(35):
    dst = random.choice(cities)
    hname = f"{random.choice(hotel_prefixes)} {dst}"
    price = random.randint(2000, 15000)
    cat = random.choice(['Budget', 'Standard', 'Premium', 'Luxury'])
    hotel_service_content += f"""    {{
        'id': 'HT{hotel_id_counter:03d}',
        'name': '{hname}',
        'destination': '{dst}',
        'address': 'Central Area, {dst}',
        'rating': {random.randint(3, 5)},
        'review_count': {random.randint(100, 5000)},
        'price_per_night': {price},
        'category': '{cat}',
        'amenities': ['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'WiFi', 'Parking', 'Room Service'],
        'description': 'A beautiful stay in the heart of {dst}',
        'cancellation': 'Free cancellation before 48h',
        'breakfast': {random.choice(['True', 'False'])},
        'room_types': ['Deluxe', 'Suite', 'Presidential Suite']
    }},\\n"""
    hotel_id_counter += 1

hotel_service_content += ''']

def search_hotels(destination: str, checkin: str, checkout: str, guests: int) -> list[dict]:
    results = []
    # simple mock duration calculation
    try:
        from datetime import datetime
        cin = datetime.strptime(checkin, "%Y-%m-%d")
        cout = datetime.strptime(checkout, "%Y-%m-%d")
        nights = max(1, (cout - cin).days)
    except:
        nights = 1

    for h in MOCK_HOTELS:
        if destination.lower() in h['destination'].lower():
            h_copy = h.copy()
            h_copy['total_nights'] = nights
            h_copy['total_price'] = h['price_per_night'] * nights
            results.append(h_copy)
    return results

def get_hotel_by_id(hotel_id: str) -> Optional[dict]:
    for h in MOCK_HOTELS:
        if h['id'] == hotel_id:
            return h
    return None
'''
write_file("app/services/hotel_service.py", hotel_service_content)

# 17. app/services/activity_service.py
activity_service_content = '''from typing import Optional
import random

MOCK_ACTIVITIES = [
'''

activity_types = ["City Tour", "Museum Visit", "Food Walk", "Adventure Sports", "Cultural Show", "Sunset Cruise"]
act_id_counter = 1
for _ in range(65):
    dst = random.choice(cities)
    atype = random.choice(activity_types)
    price = random.choice([0, 500, 1000, 2000, 5000])
    activity_service_content += f"""    {{
        'id': 'AC{act_id_counter:03d}',
        'title': '{dst} {atype}',
        'destination': '{dst}',
        'price': {price},
        'duration': '{random.randint(1, 8)} hours',
        'rating': {round(random.uniform(4.0, 5.0), 1)},
        'review_count': {random.randint(10, 500)},
        'description': 'Enjoy a wonderful {atype.lower()} in {dst}.',
        'includes': ['Guide', 'Entry Tickets'] if price > 0 else []
    }},\\n"""
    act_id_counter += 1

activity_service_content += ''']

def search_activities(destination: str) -> list[dict]:
    results = []
    for a in MOCK_ACTIVITIES:
        if destination.lower() in a['destination'].lower():
            results.append(a)
    return results
'''
write_file("app/services/activity_service.py", activity_service_content)

write_file("app/api/__init__.py", "")

# 19. app/api/flights.py
write_file("app/api/flights.py", '''from fastapi import APIRouter, HTTPException, Query
from app.services.flight_service import search_flights, get_flight_by_id
from app.models.booking import FlightBookingRequest, BookingResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix='/api/flights', tags=['Flights'])

@router.get('/search')
async def search_flights_endpoint(
    source: str = Query(..., description='Origin city'),
    destination: str = Query(..., description='Destination city'),
    date: str = Query(..., description='Travel date YYYY-MM-DD'),
    passengers: int = Query(1, ge=1, le=9)
):
    if source.lower() == destination.lower():
        raise HTTPException(400, 'Source and destination cannot be the same')
    
    flights = search_flights(source, destination, date, passengers)
    return {
        'success': True,
        'count': len(flights),
        'flights': flights,
        'is_demo': True,
        'note': 'Demo mode: showing mock flight data'
    }

@router.post('/book', response_model=BookingResponse)
async def book_flight(booking: FlightBookingRequest):
    db = get_db()
    booking_id = 'BK' + str(uuid.uuid4().hex[:10].upper())
    
    doc = {
        '_id': booking_id,
        'type': 'flight',
        'is_demo': True,
        'status': 'confirmed',
        'created_at': datetime.utcnow().isoformat(),
        **booking.model_dump()
    }
    
    if db is not None:
        try:
            await db.bookings.insert_one(doc)
        except Exception:
            pass  # Demo mode fallback
    
    return BookingResponse(
        success=True,
        booking_id=booking_id,
        status='confirmed',
        is_demo=True,
        message=f'Demo flight booking confirmed! Booking ID: {booking_id}'
    )
''')

# 20. app/api/trains.py
write_file("app/api/trains.py", '''from fastapi import APIRouter, HTTPException, Query
from app.services.train_service import search_trains, get_train_by_id
from app.models.booking import TrainBookingRequest, BookingResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix='/api/trains', tags=['Trains'])

@router.get('/search')
async def search_trains_endpoint(
    source: str = Query(..., description='Origin city'),
    destination: str = Query(..., description='Destination city'),
    date: str = Query(..., description='Travel date YYYY-MM-DD'),
    passengers: int = Query(1, ge=1, le=9)
):
    if source.lower() == destination.lower():
        raise HTTPException(400, 'Source and destination cannot be the same')
    
    trains = search_trains(source, destination, date, passengers)
    return {
        'success': True,
        'count': len(trains),
        'trains': trains,
        'is_demo': True,
        'note': 'Demo mode: showing mock train data'
    }

@router.post('/book', response_model=BookingResponse)
async def book_train(booking: TrainBookingRequest):
    db = get_db()
    booking_id = 'BK' + str(uuid.uuid4().hex[:10].upper())
    
    doc = {
        '_id': booking_id,
        'type': 'train',
        'is_demo': True,
        'status': 'confirmed',
        'created_at': datetime.utcnow().isoformat(),
        **booking.model_dump()
    }
    
    if db is not None:
        try:
            await db.bookings.insert_one(doc)
        except Exception:
            pass
    
    return BookingResponse(
        success=True,
        booking_id=booking_id,
        status='confirmed',
        is_demo=True,
        message=f'Demo train booking confirmed! Booking ID: {booking_id}'
    )
''')

# 21. app/api/buses.py
write_file("app/api/buses.py", '''from fastapi import APIRouter, HTTPException, Query
from app.services.bus_service import search_buses, get_bus_by_id
from app.models.booking import BusBookingRequest, BookingResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix='/api/buses', tags=['Buses'])

@router.get('/search')
async def search_buses_endpoint(
    source: str = Query(..., description='Origin city'),
    destination: str = Query(..., description='Destination city'),
    date: str = Query(..., description='Travel date YYYY-MM-DD'),
    passengers: int = Query(1, ge=1, le=9)
):
    if source.lower() == destination.lower():
        raise HTTPException(400, 'Source and destination cannot be the same')
    
    buses = search_buses(source, destination, date, passengers)
    return {
        'success': True,
        'count': len(buses),
        'buses': buses,
        'is_demo': True,
        'note': 'Demo mode: showing mock bus data'
    }

@router.post('/book', response_model=BookingResponse)
async def book_bus(booking: BusBookingRequest):
    db = get_db()
    booking_id = 'BK' + str(uuid.uuid4().hex[:10].upper())
    
    doc = {
        '_id': booking_id,
        'type': 'bus',
        'is_demo': True,
        'status': 'confirmed',
        'created_at': datetime.utcnow().isoformat(),
        **booking.model_dump()
    }
    
    if db is not None:
        try:
            await db.bookings.insert_one(doc)
        except Exception:
            pass
    
    return BookingResponse(
        success=True,
        booking_id=booking_id,
        status='confirmed',
        is_demo=True,
        message=f'Demo bus booking confirmed! Booking ID: {booking_id}'
    )
''')

# 22. app/api/hotels.py
write_file("app/api/hotels.py", '''from fastapi import APIRouter, HTTPException, Query
from app.services.hotel_service import search_hotels, get_hotel_by_id
from app.models.booking import HotelBookingRequest, BookingResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix='/api/hotels', tags=['Hotels'])

@router.get('/search')
async def search_hotels_endpoint(
    destination: str = Query(..., description='Destination city'),
    checkin: str = Query(..., description='Check-in date YYYY-MM-DD'),
    checkout: str = Query(..., description='Check-out date YYYY-MM-DD'),
    guests: int = Query(1, ge=1, le=9)
):
    hotels = search_hotels(destination, checkin, checkout, guests)
    return {
        'success': True,
        'count': len(hotels),
        'hotels': hotels,
        'is_demo': True,
        'note': 'Demo mode: showing mock hotel data'
    }

@router.post('/book', response_model=BookingResponse)
async def book_hotel(booking: HotelBookingRequest):
    db = get_db()
    booking_id = 'BK' + str(uuid.uuid4().hex[:10].upper())
    
    doc = {
        '_id': booking_id,
        'type': 'hotel',
        'is_demo': True,
        'status': 'confirmed',
        'created_at': datetime.utcnow().isoformat(),
        **booking.model_dump()
    }
    
    if db is not None:
        try:
            await db.bookings.insert_one(doc)
        except Exception:
            pass
    
    return BookingResponse(
        success=True,
        booking_id=booking_id,
        status='confirmed',
        is_demo=True,
        message=f'Demo hotel booking confirmed! Booking ID: {booking_id}'
    )
''')

# 23. app/api/activities.py
write_file("app/api/activities.py", '''from fastapi import APIRouter, Query
from app.services.activity_service import search_activities

router = APIRouter(prefix='/api/activities', tags=['Activities'])

@router.get('/search')
async def search_activities_endpoint(
    destination: str = Query(..., description='Destination city')
):
    activities = search_activities(destination)
    return {
        'success': True,
        'count': len(activities),
        'activities': activities,
        'is_demo': True
    }
''')

# 24. app/api/trips.py
write_file("app/api/trips.py", '''from fastapi import APIRouter, HTTPException
from app.models.trip import TripCreate, TripResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix='/api/trips', tags=['Trips'])

@router.get('/')
async def list_trips():
    db = get_db()
    if db is not None:
        try:
            cursor = db.trips.find()
            trips = await cursor.to_list(length=100)
            return {'success': True, 'trips': trips}
        except Exception:
            pass
    return {'success': True, 'trips': [], 'note': 'Database not available'}

@router.post('/')
async def create_trip(trip: TripCreate):
    db = get_db()
    trip_id = str(uuid.uuid4())
    doc = {
        '_id': trip_id,
        'id': trip_id,
        'created_at': datetime.utcnow().isoformat(),
        **trip.model_dump()
    }
    if db is not None:
        try:
            await db.trips.insert_one(doc)
        except Exception:
            pass
    return {'success': True, 'trip_id': trip_id, 'trip': doc}

@router.get('/{trip_id}')
async def get_trip(trip_id: str):
    db = get_db()
    if db is not None:
        try:
            trip = await db.trips.find_one({'_id': trip_id})
            if trip:
                return {'success': True, 'trip': trip}
        except Exception:
            pass
    raise HTTPException(404, 'Trip not found or DB unavailable')

@router.delete('/{trip_id}')
async def delete_trip(trip_id: str):
    db = get_db()
    if db is not None:
        try:
            await db.trips.delete_one({'_id': trip_id})
            return {'success': True}
        except Exception:
            pass
    return {'success': False, 'message': 'Could not delete'}
''')

# 25. app/api/bookings.py
write_file("app/api/bookings.py", '''from fastapi import APIRouter, HTTPException
from app.database.connection import get_db

router = APIRouter(prefix='/api/bookings', tags=['Bookings'])

@router.get('/')
async def list_bookings():
    db = get_db()
    if db is not None:
        try:
            cursor = db.bookings.find()
            bookings = await cursor.to_list(length=100)
            return {'success': True, 'bookings': bookings}
        except Exception:
            pass
    return {'success': True, 'bookings': [], 'note': 'DB not available'}

@router.get('/{booking_id}')
async def get_booking(booking_id: str):
    db = get_db()
    if db is not None:
        try:
            booking = await db.bookings.find_one({'_id': booking_id})
            if booking:
                return {'success': True, 'booking': booking}
        except Exception:
            pass
    raise HTTPException(404, 'Booking not found')
''')

# 26. app/api/auth.py
write_file("app/api/auth.py", '''from fastapi import APIRouter, HTTPException
from app.models.user import UserRegister, UserLogin, Token, UserResponse
from app.database.connection import get_db
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.core.config import settings
import uuid

router = APIRouter(prefix='/api/auth', tags=['Auth'])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt

@router.post('/register')
async def register(user: UserRegister):
    db = get_db()
    hashed_password = pwd_context.hash(user.password)
    user_id = str(uuid.uuid4())
    doc = {
        '_id': user_id,
        'id': user_id,
        'name': user.name,
        'email': user.email,
        'password': hashed_password
    }
    if db is not None:
        try:
            existing = await db.users.find_one({'email': user.email})
            if existing:
                raise HTTPException(400, 'Email already registered')
            await db.users.insert_one(doc)
        except Exception as e:
            if isinstance(e, HTTPException): raise e
            pass
    
    return {'success': True, 'user_id': user_id}

@router.post('/login', response_model=Token)
async def login(user: UserLogin):
    db = get_db()
    user_doc = None
    if db is not None:
        try:
            user_doc = await db.users.find_one({'email': user.email})
        except Exception:
            pass
            
    if not user_doc or not pwd_context.verify(user.password, user_doc['password']):
        # allow demo fallback if DB not available
        if db is None:
            user_doc = {'id': 'demo123', 'name': 'Demo User', 'email': user.email}
        else:
            raise HTTPException(400, 'Incorrect email or password')
            
    access_token = create_access_token(data={"sub": user_doc['email']})
    return Token(
        access_token=access_token,
        user=UserResponse(id=user_doc['id'], name=user_doc['name'], email=user_doc['email'])
    )
''')

# 27. app/agents/__init__.py
write_file("app/agents/__init__.py", "")

# 28. app/agents/state.py
write_file("app/agents/state.py", '''from typing import TypedDict, Optional, List, Any

class TripRequest(TypedDict):
    source: str
    destination: str
    departure_date: str
    return_date: Optional[str]
    passengers: int
    budget: float
    transport_modes: List[str]  # ['flight', 'train', 'bus']

class TripState(TypedDict):
    request: TripRequest
    flights: List[dict]
    trains: List[dict]
    buses: List[dict]
    selected_transport: Optional[dict]
    hotels: List[dict]
    selected_hotel: Optional[dict]
    activities: List[dict]
    weather: Optional[dict]
    budget_breakdown: Optional[dict]
    itinerary: Optional[dict]
    errors: List[str]
    agent_logs: List[dict]  # {agent, status, message, timestamp}
    status: str  # 'planning' | 'complete' | 'error'
''')

# 29. app/agents/supervisor_agent.py
write_file("app/agents/supervisor_agent.py", '''from langgraph.graph import StateGraph, END
from app.agents.state import TripState
from app.services import flight_service, train_service, bus_service, hotel_service, activity_service
from datetime import datetime

def flight_node(state: TripState) -> TripState:
    req = state['request']
    try:
        flights = flight_service.search_flights(
            req['source'], req['destination'], req['departure_date'], req['passengers']
        )
        return {**state, 'flights': flights, 'agent_logs': state['agent_logs'] + [
            {'agent': 'Flight Agent', 'status': 'complete', 'message': f'Found {len(flights)} flights', 'timestamp': datetime.utcnow().isoformat()}
        ]}
    except Exception as e:
        return {**state, 'errors': state['errors'] + [str(e)]}

def train_node(state: TripState) -> TripState:
    req = state['request']
    try:
        trains = train_service.search_trains(
            req['source'], req['destination'], req['departure_date'], req['passengers']
        )
        return {**state, 'trains': trains, 'agent_logs': state['agent_logs'] + [
            {'agent': 'Train Agent', 'status': 'complete', 'message': f'Found {len(trains)} trains', 'timestamp': datetime.utcnow().isoformat()}
        ]}
    except Exception as e:
        return {**state, 'errors': state['errors'] + [str(e)]}

def bus_node(state: TripState) -> TripState:
    req = state['request']
    try:
        buses = bus_service.search_buses(
            req['source'], req['destination'], req['departure_date'], req['passengers']
        )
        return {**state, 'buses': buses, 'agent_logs': state['agent_logs'] + [
            {'agent': 'Bus Agent', 'status': 'complete', 'message': f'Found {len(buses)} buses', 'timestamp': datetime.utcnow().isoformat()}
        ]}
    except Exception as e:
        return {**state, 'errors': state['errors'] + [str(e)]}

def hotel_node(state: TripState) -> TripState:
    req = state['request']
    try:
        hotels = hotel_service.search_hotels(
            req['destination'], req['departure_date'], req.get('return_date', req['departure_date']), req['passengers']
        )
        return {**state, 'hotels': hotels, 'agent_logs': state['agent_logs'] + [
            {'agent': 'Hotel Agent', 'status': 'complete', 'message': f'Found {len(hotels)} hotels', 'timestamp': datetime.utcnow().isoformat()}
        ]}
    except Exception as e:
        return {**state, 'errors': state['errors'] + [str(e)]}

def activity_node(state: TripState) -> TripState:
    req = state['request']
    try:
        activities = activity_service.search_activities(req['destination'])
        return {**state, 'activities': activities, 'agent_logs': state['agent_logs'] + [
            {'agent': 'Activity Agent', 'status': 'complete', 'message': f'Found {len(activities)} activities', 'timestamp': datetime.utcnow().isoformat()}
        ]}
    except Exception as e:
        return {**state, 'errors': state['errors'] + [str(e)]}

def budget_node(state: TripState) -> TripState:
    return {**state, 'budget_breakdown': {'status': 'calculated'}, 'agent_logs': state['agent_logs'] + [
            {'agent': 'Budget Agent', 'status': 'complete', 'message': 'Budget compiled', 'timestamp': datetime.utcnow().isoformat()}
        ]}

def itinerary_node(state: TripState) -> TripState:
    return {**state, 'itinerary': {'status': 'generated'}, 'status': 'complete', 'agent_logs': state['agent_logs'] + [
            {'agent': 'Itinerary Agent', 'status': 'complete', 'message': 'Itinerary generated', 'timestamp': datetime.utcnow().isoformat()}
        ]}


def build_supervisor_graph():
    graph = StateGraph(TripState)
    graph.add_node('flight_agent', flight_node)
    graph.add_node('train_agent', train_node)
    graph.add_node('bus_agent', bus_node)
    graph.add_node('hotel_agent', hotel_node)
    graph.add_node('activity_agent', activity_node)
    graph.add_node('budget_agent', budget_node)
    graph.add_node('itinerary_agent', itinerary_node)
    
    graph.set_entry_point('flight_agent')
    graph.add_edge('flight_agent', 'train_agent')
    graph.add_edge('train_agent', 'bus_agent')
    graph.add_edge('bus_agent', 'hotel_agent')
    graph.add_edge('hotel_agent', 'activity_agent')
    graph.add_edge('activity_agent', 'budget_agent')
    graph.add_edge('budget_agent', 'itinerary_agent')
    graph.add_edge('itinerary_agent', END)
    
    return graph.compile()

supervisor_graph = build_supervisor_graph()
''')

# 30. app/api/agents.py
write_file("app/api/agents.py", '''from fastapi import APIRouter
from app.agents.supervisor_agent import supervisor_graph
from app.agents.state import TripState, TripRequest

router = APIRouter(prefix='/api/agents', tags=['AI Agents'])

@router.post('/plan')
async def plan_trip(request: dict):
    initial_state: TripState = {
        'request': request,
        'flights': [],
        'trains': [],
        'buses': [],
        'selected_transport': None,
        'hotels': [],
        'selected_hotel': None,
        'activities': [],
        'weather': None,
        'budget_breakdown': None,
        'itinerary': None,
        'errors': [],
        'agent_logs': [],
        'status': 'planning'
    }
    result = supervisor_graph.invoke(initial_state)
    return {'success': True, 'result': result}

@router.get('/status')
async def get_agent_status():
    agents = [
        {'name': 'Supervisor Agent', 'icon': '🧠', 'status': 'ready'},
        {'name': 'Flight Agent', 'icon': '✈️', 'status': 'ready'},
        {'name': 'Train Agent', 'icon': '🚆', 'status': 'ready'},
        {'name': 'Bus Agent', 'icon': '🚌', 'status': 'ready'},
        {'name': 'Hotel Agent', 'icon': '🏨', 'status': 'ready'},
        {'name': 'Activity Agent', 'icon': '🎯', 'status': 'ready'},
        {'name': 'Weather Agent', 'icon': '🌦️', 'status': 'ready'},
        {'name': 'Budget Agent', 'icon': '💰', 'status': 'ready'},
        {'name': 'Itinerary Agent', 'icon': '📅', 'status': 'ready'},
        {'name': 'Replanning Agent', 'icon': '🔄', 'status': 'ready'},
    ]
    return {'success': True, 'agents': agents}
''')

# 31. app/main.py
write_file("app/main.py", '''from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.database.connection import connect_db, close_db
from app.api import flights, trains, buses, hotels, activities, trips, bookings, auth, agents

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        await connect_db()
    except Exception as e:
        print(f"⚠️ MongoDB connection failed: {e}. Running in limited demo mode.")
    yield
    # Shutdown
    await close_db()

app = FastAPI(
    title='TripPilot AI API',
    description='Multi-Agent AI Travel Planner Backend',
    version='1.0.0',
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Routers
app.include_router(flights.router)
app.include_router(trains.router)
app.include_router(buses.router)
app.include_router(hotels.router)
app.include_router(activities.router)
app.include_router(trips.router)
app.include_router(bookings.router)
app.include_router(auth.router)
app.include_router(agents.router)

@app.get('/')
async def root():
    return {
        'message': 'TripPilot AI API',
        'version': '1.0.0',
        'status': 'running',
        'demo_mode': True,
        'docs': '/docs'
    }

@app.get('/health')
async def health():
    return {'status': 'healthy', 'demo_mode': True}
''')
