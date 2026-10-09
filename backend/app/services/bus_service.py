"""
Bus Service — Mock Data with Seat-Type Pricing
"""

MOCK_BUSES = [
    # ── Ayodhya (Heritage & Spiritual) ──
    {"id": "BUS051", "operator": "UPSRTC Janrath",    "bus_type": "A/C Seater (2+2)",          "source": "Lucknow", "destination": "Ayodhya", "departure": "06:00", "arrival": "08:45", "duration": "2h 45m", "price": 280,  "available_seats": 32, "amenities": ["CCTV", "Track My Bus", "Charging Point"], "rating": 4.5},
    {"id": "BUS052", "operator": "IntrCity SmartBus", "bus_type": "Volvo A/C Sleeper",         "source": "Delhi",   "destination": "Ayodhya", "departure": "21:30", "arrival": "06:30", "duration": "9h 00m", "price": 850,  "available_seats": 24, "amenities": ["WiFi", "Blanket", "Water Bottle", "Charging Point"], "rating": 4.7},
    {"id": "BUS053", "operator": "NueGo Electric",    "bus_type": "A/C Seater (Electric)",     "source": "Lucknow", "destination": "Ayodhya", "departure": "09:30", "arrival": "12:00", "duration": "2h 30m", "price": 320,  "available_seats": 20, "amenities": ["CCTV", "Clean Air", "Live Tracking"], "rating": 4.8},
    {"id": "BUS054", "operator": "Zingbus",           "bus_type": "Volvo Multi-Axle Sleeper",  "source": "Varanasi","destination": "Ayodhya", "departure": "07:00", "arrival": "11:00", "duration": "4h 00m", "price": 450,  "available_seats": 18, "amenities": ["Reading Light", "Blanket", "Snacks"], "rating": 4.6},

    # ── Haridwar (Spiritual Ghats & Ashrams) ──
    {"id": "BUS055", "operator": "Zingbus",           "bus_type": "Volvo A/C Sleeper",         "source": "Delhi",   "destination": "Haridwar", "departure": "22:00", "arrival": "04:30", "duration": "6h 30m", "price": 620,  "available_seats": 28, "amenities": ["Blanket", "Charging Point", "WiFi", "Water Bottle"], "rating": 4.7},
    {"id": "BUS056", "operator": "NueGo Electric",    "bus_type": "A/C Seater (Electric)",     "source": "Delhi",   "destination": "Haridwar", "departure": "07:00", "arrival": "12:30", "duration": "5h 30m", "price": 540,  "available_seats": 35, "amenities": ["CCTV", "Live Tracking", "USB Charging"], "rating": 4.8},
    {"id": "BUS057", "operator": "UTC Volvo",         "bus_type": "Volvo A/C Seater/Sleeper",  "source": "Chandigarh","destination": "Haridwar", "departure": "06:30", "arrival": "11:30", "duration": "5h 00m", "price": 480,  "available_seats": 22, "amenities": ["Water Bottle", "Clean Interior"], "rating": 4.4},

    # ── Nainital (Nature & Lakes) ──
    {"id": "BUS058", "operator": "UTC Royal Cruiser", "bus_type": "Volvo A/C Seater",         "source": "Delhi",   "destination": "Nainital", "departure": "21:00", "arrival": "05:30", "duration": "8h 30m", "price": 780,  "available_seats": 26, "amenities": ["Mountain Certified", "Blanket", "Charging Point"], "rating": 4.6},
    {"id": "BUS059", "operator": "Zingbus",           "bus_type": "Volvo A/C Sleeper",         "source": "Delhi",   "destination": "Nainital", "departure": "22:30", "arrival": "06:45", "duration": "8h 15m", "price": 890,  "available_seats": 16, "amenities": ["WiFi", "Blanket", "Live Tracking", "Snacks"], "rating": 4.7},
    {"id": "BUS060", "operator": "City Land Travels", "bus_type": "A/C Seater (2+2)",          "source": "Lucknow", "destination": "Nainital", "departure": "20:00", "arrival": "06:00", "duration": "10h 00m", "price": 650, "available_seats": 30, "amenities": ["Track My Bus", "Charging Point"], "rating": 4.3},

    # ── Varanasi (Banaras Ghats & Culture) ──
    {"id": "BUS061", "operator": "UPSRTC Volvo",      "bus_type": "Volvo A/C Seater/Sleeper",  "source": "Lucknow", "destination": "Varanasi", "departure": "06:00", "arrival": "11:30", "duration": "5h 30m", "price": 580,  "available_seats": 28, "amenities": ["Clean Bedding", "Charging Point"], "rating": 4.5},
    {"id": "BUS062", "operator": "IntrCity SmartBus", "bus_type": "Volvo A/C Sleeper",         "source": "Delhi",   "destination": "Varanasi", "departure": "19:00", "arrival": "08:30", "duration": "13h 30m", "price": 1150, "available_seats": 19, "amenities": ["WiFi", "Clean Bedding", "Live Tracking"], "rating": 4.8},
    {"id": "BUS063", "operator": "NueGo Electric",    "bus_type": "A/C Seater (Electric)",     "source": "Patna",   "destination": "Varanasi", "departure": "07:30", "arrival": "12:30", "duration": "5h 00m", "price": 490,  "available_seats": 30, "amenities": ["USB Charging", "CCTV"], "rating": 4.6},

    # ── Jammu and Kashmir ──
    {"id": "BUS064", "operator": "JKSRTC Volvo",      "bus_type": "Volvo A/C Sleeper",         "source": "Delhi",   "destination": "Jammu and Kashmir", "departure": "18:00", "arrival": "07:00", "duration": "13h 00m", "price": 1250, "available_seats": 20, "amenities": ["Blanket", "Water Bottle", "Heater"], "rating": 4.6},
    {"id": "BUS065", "operator": "Zingbus",           "bus_type": "Volvo Multi-Axle Sleeper",  "source": "Chandigarh","destination": "Jammu and Kashmir", "departure": "21:00", "arrival": "06:00", "duration": "9h 00m", "price": 980, "available_seats": 24, "amenities": ["WiFi", "Blanket", "Charging Point"], "rating": 4.7},

    # ── Raipur (Tribal Culture & Nature) ──
    {"id": "BUS066", "operator": "Mahendra Travels",  "bus_type": "Volvo A/C Sleeper",         "source": "Nagpur",  "destination": "Raipur", "departure": "23:00", "arrival": "05:00", "duration": "6h 00m", "price": 550,  "available_seats": 32, "amenities": ["Clean Bedding", "CCTV", "Track My Bus"], "rating": 4.5},
    {"id": "BUS067", "operator": "Royal Travels",     "bus_type": "A/C Sleeper",               "source": "Bhubaneswar","destination": "Raipur", "departure": "19:30", "arrival": "07:30", "duration": "12h 00m", "price": 820, "available_seats": 18, "amenities": ["Blanket", "Charging Point"], "rating": 4.3},

    # ── Karnataka (Bangalore, Mysore, Coorg, Hampi) ──
    {"id": "BUS068", "operator": "KSRTC Airavat",     "bus_type": "Volvo Multi-Axle Club Class","source": "Chennai", "destination": "Karnataka", "departure": "23:00", "arrival": "05:30", "duration": "6h 30m", "price": 750,  "available_seats": 34, "amenities": ["WiFi", "Water Bottle", "Blanket"], "rating": 4.8},
    {"id": "BUS069", "operator": "Greenline Travels", "bus_type": "Volvo A/C Sleeper",         "source": "Hyderabad","destination": "Karnataka", "departure": "21:30", "arrival": "06:30", "duration": "9h 00m", "price": 950,  "available_seats": 20, "amenities": ["Track My Bus", "Clean Bedding"], "rating": 4.6},
    {"id": "BUS070", "operator": "Orange Tours",      "bus_type": "Volvo Multi-Axle Sleeper",  "source": "Goa",     "destination": "Karnataka", "departure": "20:00", "arrival": "07:00", "duration": "11h 00m", "price": 1100, "available_seats": 18, "amenities": ["WiFi", "Blanket", "Snacks"], "rating": 4.7},

    # ── Standard Trunk Routes ──
    {"id": "BUS001", "operator": "UPSRTC Janrath",    "bus_type": "A/C Seater (2+2)",          "source": "Delhi",   "destination": "Hyderabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 512,  "available_seats": 30, "amenities": ["CCTV", "Track My Bus", "Reading Light"], "rating": 3.8},
    {"id": "BUS002", "operator": "NueGo Electric",    "bus_type": "A/C Seater (Electric)",     "source": "Lucknow", "destination": "Delhi", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1344, "available_seats": 9, "amenities": ["Charging Point", "Blanket", "CCTV", "Water Bottle"], "rating": 4.8},
    {"id": "BUS004", "operator": "Orange Tours",      "bus_type": "Volvo Multi-Axle Sleeper",  "source": "Lucknow", "destination": "Jaipur", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1478, "available_seats": 23, "amenities": ["WiFi", "Reading Light", "Track My Bus", "Snacks", "Blanket"], "rating": 4.7},
]

_BUS_SEAT_TYPES = {
    "sleeper": [
        {"type": "Lower Berth", "price_factor": 1.15, "available": 12},
        {"type": "Upper Berth", "price_factor": 1.00, "available": 18},
        {"type": "Single Sleeper", "price_factor": 1.35, "available": 4},
    ],
    "seater": [
        {"type": "Window Seat",  "price_factor": 1.10, "available": 10},
        {"type": "Aisle Seat",   "price_factor": 1.00, "available": 20},
        {"type": "Front Row",    "price_factor": 1.20, "available": 4},
    ],
    "mixed": [
        {"type": "Seater",       "price_factor": 0.85, "available": 14},
        {"type": "Semi-Sleeper", "price_factor": 1.00, "available": 12},
        {"type": "Full Sleeper", "price_factor": 1.30, "available": 6},
    ],
}

def _get_seat_category(bus_type: str) -> str:
    bt = bus_type.lower()
    if "seater/sleeper" in bt or "semi" in bt or "multi-axle" in bt:
        return "mixed"
    if "sleeper" in bt:
        return "sleeper"
    return "seater"

def _build_seat_types(bus: dict) -> list:
    category = _get_seat_category(bus.get("bus_type", ""))
    base = bus.get("price", 600)
    result = []
    for st in _BUS_SEAT_TYPES[category]:
        result.append({
            "type": st["type"],
            "price": round(base * st["price_factor"]),
            "available": min(st["available"], bus.get("available_seats", 20)),
        })
    return result


def search_buses(source: str, destination: str, date: str, passengers: int) -> list:
    """Search buses with case-insensitive partial matching. Returns seat-type pricing."""
    src = source.lower().strip()
    dst = destination.lower().strip()
    results = []
    for b in MOCK_BUSES:
        src_match = src in b["source"].lower() or b["source"].lower() in src
        dst_match = dst in b["destination"].lower() or b["destination"].lower() in dst
        if src_match and dst_match:
            record = dict(b)
            record["seat_types"] = _build_seat_types(b)
            record["passengers"] = passengers
            record["travel_date"] = date
            record["is_demo"] = True
            results.append(record)

    if not results and source and destination:
        fallback_price = 800
        results.append({
            "id": "BUS-FALLBACK",
            "operator": "TripPilot Connect",
            "bus_type": "Volvo A/C Semi Sleeper",
            "source": source,
            "destination": destination,
            "departure": "22:00",
            "arrival": "06:00",
            "duration": "8h 00m",
            "price": fallback_price,
            "available_seats": 40,
            "amenities": ["WiFi", "Charging Point", "Water Bottle"],
            "rating": 4.5,
            "seat_types": [
                {"type": "Seater",       "price": round(fallback_price * 0.85), "available": 20},
                {"type": "Semi-Sleeper", "price": fallback_price,               "available": 15},
                {"type": "Full Sleeper", "price": round(fallback_price * 1.30), "available": 5},
            ],
            "passengers": passengers,
            "travel_date": date,
            "is_demo": True,
        })
    return results
