"""
Hotel Service — Mock Data
Realistic hotel data across Indian destinations in Demo Mode.
"""
from datetime import datetime


MOCK_HOTELS = [
    # ── Delhi ──
    {"id": "HT001", "name": "The Leela Palace New Delhi", "destination": "Delhi", "address": "Diplomatic Enclave, Chanakyapuri, New Delhi", "rating": 5, "review_count": 3240, "price_per_night": 12000, "category": "Luxury", "amenities": ["Pool", "Gym", "Spa", "Restaurant", "Bar", "WiFi", "Parking", "Room Service", "Concierge"], "description": "Iconic 5-star palace hotel offering regal splendor in the heart of Delhi.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Suite", "Presidential Suite"]},
    {"id": "HT002", "name": "The Taj Mahal Hotel", "destination": "Delhi", "address": "1 Mansingh Road, New Delhi", "rating": 5, "review_count": 4120, "price_per_night": 14500, "category": "Luxury", "amenities": ["Pool", "Gym", "Spa", "Multiple Restaurants", "Bar", "WiFi", "Valet Parking", "Butler Service"], "description": "An iconic address in the diplomatic enclave of New Delhi.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Superior", "Luxury", "Grand Luxury Suite"]},
    {"id": "HT003", "name": "Ibis New Delhi Aerocity", "destination": "Delhi", "address": "Aerocity, IGI Airport, New Delhi", "rating": 3, "review_count": 8900, "price_per_night": 2800, "category": "Budget", "amenities": ["WiFi", "Restaurant", "Gym", "Business Center"], "description": "Smart, modern hotel located right at the airport for easy connections.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard", "Superior"]},
    {"id": "HT004", "name": "Lemon Tree Hotel Janakpuri", "destination": "Delhi", "address": "Janakpuri District Centre, New Delhi", "rating": 4, "review_count": 2100, "price_per_night": 4500, "category": "Standard", "amenities": ["WiFi", "Restaurant", "Bar", "Gym", "Parking"], "description": "A fresh, vibrant hotel in the business district of West Delhi.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Standard", "Deluxe"]},
    {"id": "HT005", "name": "OYO Flagship Connaught Place", "destination": "Delhi", "address": "Connaught Place, Central Delhi", "rating": 3, "review_count": 5600, "price_per_night": 1800, "category": "Budget", "amenities": ["WiFi", "AC", "Hot Water", "Housekeeping"], "description": "Affordable and centrally located near shopping and business hubs.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard Room"]},

    # ── Goa ──
    {"id": "HT006", "name": "W Goa", "destination": "Goa", "address": "Vagator Beach, North Goa", "rating": 5, "review_count": 2890, "price_per_night": 15000, "category": "Luxury", "amenities": ["Infinity Pool", "Spa", "Multiple Restaurants", "Bar", "WiFi", "Beach Access", "Gym", "DJ Nights"], "description": "A stunning beachfront luxury resort with spectacular views of the Arabian Sea.", "cancellation": "Free cancellation before 72h", "breakfast": True, "room_types": ["Wonderful Room", "Fabulous Suite", "Wow Suite"]},
    {"id": "HT007", "name": "Taj Fort Aguada Resort", "destination": "Goa", "address": "Sinquerim, Bardez, North Goa", "rating": 5, "review_count": 3450, "price_per_night": 11000, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Restaurants", "Beach Access", "WiFi", "Water Sports"], "description": "A heritage resort built around a 17th century Portuguese fortress.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Premium", "Suite"]},
    {"id": "HT008", "name": "The Zuri White Sands", "destination": "Goa", "address": "Varca Beach, South Goa", "rating": 4, "review_count": 1780, "price_per_night": 6500, "category": "Premium", "amenities": ["Pool", "Spa", "Restaurant", "Bar", "WiFi", "Beach Access", "Gym"], "description": "A tranquil beachfront retreat in pristine South Goa.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Superior", "Deluxe", "Villa"]},
    {"id": "HT009", "name": "Zostel Goa", "destination": "Goa", "address": "Anjuna Beach Road, North Goa", "rating": 4, "review_count": 6700, "price_per_night": 800, "category": "Budget", "amenities": ["WiFi", "Common Room", "Travel Desk", "Lockers", "Tours"], "description": "Vibrant backpacker hostel steps from Anjuna Beach.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Dorm Bed", "Private Room"]},
    {"id": "HT010", "name": "Ginger Hotel Goa", "destination": "Goa", "address": "Porvorim, NH-17, Goa", "rating": 3, "review_count": 3200, "price_per_night": 2200, "category": "Budget", "amenities": ["WiFi", "Restaurant", "Gym", "Parking"], "description": "Smart and convenient hotel for the budget-conscious traveler.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard", "Deluxe"]},

    # ── Mumbai ──
    {"id": "HT011", "name": "The Oberoi Mumbai", "destination": "Mumbai", "address": "Nariman Point, Mumbai", "rating": 5, "review_count": 2650, "price_per_night": 16000, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Multiple Restaurants", "Bar", "WiFi", "Sea View", "Butler Service"], "description": "Magnificent hotel overlooking the Arabian Sea with legendary hospitality.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Luxury Suite", "Kohinoor Suite"]},
    {"id": "HT012", "name": "Trident Nariman Point", "destination": "Mumbai", "address": "Nariman Point, Mumbai", "rating": 5, "review_count": 1980, "price_per_night": 9500, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Restaurant", "WiFi", "Sea View"], "description": "Elegant waterfront hotel at the business heart of Mumbai.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Premier Sea View", "Suite"]},
    {"id": "HT013", "name": "Zostel Mumbai", "destination": "Mumbai", "address": "Colaba, Mumbai", "rating": 4, "review_count": 5400, "price_per_night": 700, "category": "Budget", "amenities": ["WiFi", "Common Kitchen", "Tours", "Lockers"], "description": "Popular hostel in the heart of Colaba, walking distance from Gateway of India.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Dorm", "Private Room"]},
    {"id": "HT014", "name": "Juhu Residency", "destination": "Mumbai", "address": "Juhu Beach, Mumbai", "rating": 3, "review_count": 1200, "price_per_night": 3500, "category": "Standard", "amenities": ["WiFi", "Restaurant", "Parking", "Beach Access"], "description": "Comfortable hotel near Juhu Beach with sea breeze and local character.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard", "Deluxe Sea Facing"]},

    # ── Jaipur ──
    {"id": "HT015", "name": "Rambagh Palace", "destination": "Jaipur", "address": "Bhawani Singh Road, Jaipur", "rating": 5, "review_count": 4200, "price_per_night": 25000, "category": "Luxury", "amenities": ["Pool", "Spa", "Polo Ground", "Multiple Restaurants", "Bar", "WiFi", "Heritage Rooms", "Butler Service"], "description": "Former royal residence of the Maharaja of Jaipur — a palace hotel like no other.", "cancellation": "Free cancellation before 72h", "breakfast": True, "room_types": ["Luxury Room", "Suite", "Royal Suite", "Grand Royal Suite"]},
    {"id": "HT016", "name": "Jai Mahal Palace", "destination": "Jaipur", "address": "Jacob Road, Civil Lines, Jaipur", "rating": 5, "review_count": 2100, "price_per_night": 9000, "category": "Luxury", "amenities": ["Pool", "Spa", "Restaurant", "Bar", "WiFi", "Heritage Garden"], "description": "A grand 18th-century heritage hotel set in 18 acres of Mughal gardens.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Grand Deluxe", "Suite"]},
    {"id": "HT017", "name": "OYO Rooms Pink City", "destination": "Jaipur", "address": "MI Road, Jaipur", "rating": 3, "review_count": 3800, "price_per_night": 1200, "category": "Budget", "amenities": ["WiFi", "AC", "Hot Water"], "description": "Budget-friendly accommodation in central Jaipur.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard Room"]},

    # ── Lucknow ──
    {"id": "HT018", "name": "Taj Mahal Lucknow", "destination": "Lucknow", "address": "Vipin Khand, Gomti Nagar, Lucknow", "rating": 5, "review_count": 1890, "price_per_night": 8500, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Restaurant", "Bar", "WiFi", "Business Center"], "description": "Luxury hotel in Gomti Nagar offering world-class amenities.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Suite", "Presidential Suite"]},
    {"id": "HT019", "name": "Piccadily Hotel", "destination": "Lucknow", "address": "Kanpur Road, Lucknow", "rating": 4, "review_count": 1200, "price_per_night": 4200, "category": "Standard", "amenities": ["Pool", "Restaurant", "WiFi", "Parking", "Banquet"], "description": "Well-equipped hotel with good connectivity to Charbagh railway station.", "cancellation": "Free cancellation before 24h", "breakfast": True, "room_types": ["Standard", "Deluxe", "Suite"]},
    {"id": "HT020", "name": "Hotel Clarks Awadh", "destination": "Lucknow", "address": "8 Mahatma Gandhi Marg, Lucknow", "rating": 4, "review_count": 980, "price_per_night": 3800, "category": "Standard", "amenities": ["Pool", "Restaurant", "WiFi", "Gym"], "description": "Heritage property in the cultural heart of Lucknow.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Superior", "Deluxe"]},

    # ── Bangalore ──
    {"id": "HT021", "name": "The Ritz-Carlton Bangalore", "destination": "Bangalore", "address": "99 Residency Road, Bangalore", "rating": 5, "review_count": 3100, "price_per_night": 13000, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Multiple Restaurants", "Bar", "WiFi", "Concierge"], "description": "Timeless elegance in the heart of Bangalore's business district.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Deluxe", "Club", "Suite"]},
    {"id": "HT022", "name": "Zostel Bangalore", "destination": "Bangalore", "address": "Koramangala, Bangalore", "rating": 4, "review_count": 4200, "price_per_night": 600, "category": "Budget", "amenities": ["WiFi", "Common Room", "Tours", "Lockers"], "description": "Social hostel in the vibrant Koramangala neighborhood.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Dorm", "Private Room"]},

    # ── Kolkata ──
    {"id": "HT023", "name": "ITC Royal Bengal", "destination": "Kolkata", "address": "1 J.B.S. Haldane Avenue, Kolkata", "rating": 5, "review_count": 2400, "price_per_night": 11000, "category": "Luxury", "amenities": ["Pool", "Spa", "Gym", "Multiple Restaurants", "Bar", "WiFi"], "description": "Grandeur and luxury in the cultural capital of India.", "cancellation": "Free cancellation before 48h", "breakfast": True, "room_types": ["Classic", "Club", "Suite"]},
    {"id": "HT024", "name": "Peerless Inn", "destination": "Kolkata", "address": "12 J.L. Nehru Road, Kolkata", "rating": 4, "review_count": 1600, "price_per_night": 3200, "category": "Standard", "amenities": ["Restaurant", "WiFi", "AC", "Parking"], "description": "Centrally located hotel near Park Street and Esplanade.", "cancellation": "Free cancellation before 24h", "breakfast": False, "room_types": ["Standard", "Deluxe"]},
]


def search_hotels(destination: str, checkin: str, checkout: str, guests: int) -> list:
    """Search hotels by destination and calculate total price."""
    dest_lower = destination.lower().strip()

    # Calculate number of nights
    try:
        d1 = datetime.strptime(checkin, "%Y-%m-%d")
        d2 = datetime.strptime(checkout, "%Y-%m-%d")
        nights = max((d2 - d1).days, 1)
    except Exception:
        nights = 1

    results = []
    for hotel in MOCK_HOTELS:
        if dest_lower in hotel["destination"].lower() or hotel["destination"].lower() in dest_lower:
            h = hotel.copy()
            h["total_price"] = h["price_per_night"] * nights
            h["nights"] = nights
            h["guests"] = guests
            h["checkin"] = checkin
            h["checkout"] = checkout
            h["is_demo"] = True
            results.append(h)

    return results


def get_hotel_by_id(hotel_id: str):
    for hotel in MOCK_HOTELS:
        if hotel["id"] == hotel_id:
            return hotel
    return None

