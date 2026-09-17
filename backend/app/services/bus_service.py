"""
Bus Service — Mock Data
Realistic bus operator data for Indian routes in Demo Mode.
"""

MOCK_BUSES = [
    # ── Lucknow → Delhi ──
    {"id": "BU001", "operator": "RedBus Travels", "bus_type": "AC Sleeper (2+1)", "source": "Lucknow", "destination": "Delhi", "departure": "21:00", "arrival": "07:00+1", "duration": "10h", "price": 950, "total_seats": 40, "available_seats": 22, "rating": 4.2, "review_count": 1240, "amenities": ["WiFi", "Charging Point", "Blanket", "Water Bottle"], "boarding_point": "Amausi Bus Stand", "dropping_point": "Kashmere Gate ISBT", "cancellation": "Free cancellation 24h before", "is_ac": True},
    {"id": "BU002", "operator": "Shrinath Travels", "bus_type": "Volvo Multi-Axle AC", "source": "Lucknow", "destination": "Delhi", "departure": "22:30", "arrival": "08:30+1", "duration": "10h", "price": 1200, "total_seats": 45, "available_seats": 15, "rating": 4.5, "review_count": 2180, "amenities": ["WiFi", "Charging Point", "Blanket", "Pillow", "Movie Screen"], "boarding_point": "Charbagh", "dropping_point": "Anand Vihar ISBT", "cancellation": "Free cancellation 24h before", "is_ac": True},
    {"id": "BU003", "operator": "Prayag Raj Express", "bus_type": "Non-AC Seater", "source": "Lucknow", "destination": "Delhi", "departure": "20:00", "arrival": "07:30+1", "duration": "11h 30m", "price": 450, "total_seats": 55, "available_seats": 38, "rating": 3.8, "review_count": 540, "amenities": ["Charging Point"], "boarding_point": "Kaiserbagh Bus Stand", "dropping_point": "Kashmere Gate ISBT", "cancellation": "No cancellation", "is_ac": False},
    {"id": "BU004", "operator": "Zingbus", "bus_type": "AC Sleeper Premium", "source": "Lucknow", "destination": "Delhi", "departure": "23:00", "arrival": "08:00+1", "duration": "9h", "price": 1100, "total_seats": 36, "available_seats": 8, "rating": 4.6, "review_count": 3420, "amenities": ["WiFi", "Charging Point", "Blanket", "Pillow", "Water Bottle", "Snacks"], "boarding_point": "Hazratganj", "dropping_point": "Majnu Ka Tila", "cancellation": "Free cancellation 48h before", "is_ac": True},

    # ── Delhi → Goa ──
    {"id": "BU005", "operator": "SRS Travels", "bus_type": "Volvo AC Sleeper", "source": "Delhi", "destination": "Goa", "departure": "16:00", "arrival": "06:00+2", "duration": "38h", "price": 2200, "total_seats": 40, "available_seats": 18, "rating": 3.9, "review_count": 820, "amenities": ["Charging Point", "Blanket"], "boarding_point": "Dhaula Kuan", "dropping_point": "Panaji Bus Stand", "cancellation": "Free cancellation 24h before", "is_ac": True},
    {"id": "BU006", "operator": "Orange Travels", "bus_type": "AC Sleeper (2+1)", "source": "Delhi", "destination": "Goa", "departure": "14:30", "arrival": "05:00+2", "duration": "38h 30m", "price": 1950, "total_seats": 40, "available_seats": 25, "rating": 4.0, "review_count": 1100, "amenities": ["Charging Point", "Blanket", "Water Bottle"], "boarding_point": "Kashmere Gate", "dropping_point": "Madgaon", "cancellation": "Free cancellation 24h before", "is_ac": True},

    # ── Lucknow → Mumbai ──
    {"id": "BU007", "operator": "Neeta Tours", "bus_type": "Volvo AC Sleeper", "source": "Lucknow", "destination": "Mumbai", "departure": "17:00", "arrival": "21:00+1", "duration": "28h", "price": 1800, "total_seats": 40, "available_seats": 20, "rating": 4.1, "review_count": 680, "amenities": ["WiFi", "Charging Point", "Blanket"], "boarding_point": "Alambagh Bus Stand", "dropping_point": "Dadar Bus Depot", "cancellation": "Free cancellation 24h before", "is_ac": True},
    {"id": "BU008", "operator": "VRL Travels", "bus_type": "AC Multi-Axle Sleeper", "source": "Lucknow", "destination": "Mumbai", "departure": "15:30", "arrival": "20:00+1", "duration": "28h 30m", "price": 2100, "total_seats": 36, "available_seats": 12, "rating": 4.4, "review_count": 1560, "amenities": ["WiFi", "Charging Point", "Blanket", "Pillow", "Snacks"], "boarding_point": "Charbagh", "dropping_point": "Borivali", "cancellation": "Free cancellation 48h before", "is_ac": True},

    # ── Delhi → Mumbai ──
    {"id": "BU009", "operator": "Sharma Transports", "bus_type": "Volvo AC Sleeper", "source": "Delhi", "destination": "Mumbai", "departure": "18:00", "arrival": "20:00+1", "duration": "26h", "price": 1700, "total_seats": 40, "available_seats": 30, "rating": 3.7, "review_count": 450, "amenities": ["Charging Point", "Blanket"], "boarding_point": "Kashmere Gate ISBT", "dropping_point": "Dadar", "cancellation": "No cancellation", "is_ac": True},
    {"id": "BU010", "operator": "Hans Travels", "bus_type": "AC Seater/Sleeper", "source": "Delhi", "destination": "Mumbai", "departure": "20:00", "arrival": "22:00+1", "duration": "26h", "price": 1600, "total_seats": 42, "available_seats": 28, "rating": 4.0, "review_count": 720, "amenities": ["Charging Point", "Blanket", "Water Bottle"], "boarding_point": "Sarai Kale Khan", "dropping_point": "Pune", "cancellation": "Free cancellation 24h before", "is_ac": True},

    # ── Bangalore → Goa ──
    {"id": "BU011", "operator": "Paulo Travels", "bus_type": "Volvo Multi-Axle AC", "source": "Bangalore", "destination": "Goa", "departure": "21:00", "arrival": "08:00+1", "duration": "11h", "price": 1100, "total_seats": 40, "available_seats": 16, "rating": 4.5, "review_count": 3200, "amenities": ["WiFi", "Charging Point", "Blanket", "Pillow"], "boarding_point": "Majestic", "dropping_point": "Panaji", "cancellation": "Free cancellation 24h before", "is_ac": True},
    {"id": "BU012", "operator": "SRS Travels", "bus_type": "AC Sleeper (2+1)", "source": "Bangalore", "destination": "Goa", "departure": "22:00", "arrival": "09:00+1", "duration": "11h", "price": 900, "total_seats": 40, "available_seats": 24, "rating": 4.1, "review_count": 1800, "amenities": ["Charging Point", "Blanket"], "boarding_point": "Shivajinagar", "dropping_point": "Madgaon", "cancellation": "Free cancellation 24h before", "is_ac": True},

    # ── Mumbai → Goa ──
    {"id": "BU013", "operator": "Kadamba Transport", "bus_type": "AC Sleeper", "source": "Mumbai", "destination": "Goa", "departure": "23:30", "arrival": "11:30+1", "duration": "12h", "price": 850, "total_seats": 36, "available_seats": 20, "rating": 4.3, "review_count": 2100, "amenities": ["Charging Point", "Blanket", "Water Bottle"], "boarding_point": "Borivali", "dropping_point": "Panaji", "cancellation": "Free cancellation 24h before", "is_ac": True},
    {"id": "BU014", "operator": "Navneet Travels", "bus_type": "Non-AC Seater", "source": "Mumbai", "destination": "Goa", "departure": "22:00", "arrival": "10:00+1", "duration": "12h", "price": 400, "total_seats": 55, "available_seats": 40, "rating": 3.5, "review_count": 380, "amenities": [], "boarding_point": "Dadar", "dropping_point": "Mapusa", "cancellation": "No cancellation", "is_ac": False},

    # ── Jaipur → Delhi ──
    {"id": "BU015", "operator": "RSRTC Volvo", "bus_type": "Volvo AC Semi-Sleeper", "source": "Jaipur", "destination": "Delhi", "departure": "07:00", "arrival": "12:30", "duration": "5h 30m", "price": 550, "total_seats": 40, "available_seats": 35, "rating": 4.2, "review_count": 5600, "amenities": ["Charging Point", "WiFi"], "boarding_point": "Sindhi Camp", "dropping_point": "Dhaula Kuan", "cancellation": "Free cancellation 24h before", "is_ac": True},
    {"id": "BU016", "operator": "Intercity Smart Bus", "bus_type": "AC Seater", "source": "Jaipur", "destination": "Delhi", "departure": "12:00", "arrival": "17:00", "duration": "5h", "price": 650, "total_seats": 40, "available_seats": 22, "rating": 4.4, "review_count": 1200, "amenities": ["WiFi", "Charging Point", "Snacks"], "boarding_point": "Ajmeri Gate", "dropping_point": "Aerocity", "cancellation": "Free cancellation 24h before", "is_ac": True},

    # ── Hyderabad → Bangalore ──
    {"id": "BU017", "operator": "KSRTC Airavat", "bus_type": "Volvo Multi-Axle AC", "source": "Hyderabad", "destination": "Bangalore", "departure": "21:30", "arrival": "07:30+1", "duration": "10h", "price": 900, "total_seats": 40, "available_seats": 18, "rating": 4.6, "review_count": 8900, "amenities": ["WiFi", "Charging Point", "Blanket", "Pillow"], "boarding_point": "MGBS", "dropping_point": "Majestic", "cancellation": "Free cancellation 24h before", "is_ac": True},
]


def search_buses(source: str, destination: str, date: str, passengers: int) -> list:
    """Search buses with case-insensitive matching."""
    source_lower = source.lower().strip()
    destination_lower = destination.lower().strip()

    results = []
    for bus in MOCK_BUSES:
        src_match = source_lower in bus["source"].lower() or bus["source"].lower() in source_lower
        dst_match = destination_lower in bus["destination"].lower() or bus["destination"].lower() in destination_lower
        if src_match and dst_match:
            b = bus.copy()
            b["total_price"] = b["price"] * passengers
            b["passengers"] = passengers
            b["travel_date"] = date
            b["is_demo"] = True
            results.append(b)

    return results


def get_bus_by_id(bus_id: str):
    for bus in MOCK_BUSES:
        if bus["id"] == bus_id:
            return bus
    return None

