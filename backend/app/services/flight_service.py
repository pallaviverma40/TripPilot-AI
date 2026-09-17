"""
Flight Service — Mock Data
Provides realistic flight data for Indian routes in Demo Mode.
"""

MOCK_FLIGHTS = [
    # ── Lucknow → Delhi ──
    {"id": "FL001", "airline": "IndiGo", "flight_number": "6E-234", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "06:30", "arrival": "07:55", "duration": "1h 25m", "price": 4200, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 45, "class": "Economy"},
    {"id": "FL002", "airline": "Air India", "flight_number": "AI-401", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "09:15", "arrival": "10:40", "duration": "1h 25m", "price": 5100, "stops": 0, "aircraft": "Boeing 737", "baggage": "25kg", "meal": True, "available_seats": 32, "class": "Economy"},
    {"id": "FL003", "airline": "SpiceJet", "flight_number": "SG-112", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "14:20", "arrival": "15:45", "duration": "1h 25m", "price": 3800, "stops": 0, "aircraft": "Boeing 737 MAX", "baggage": "15kg", "meal": False, "available_seats": 58, "class": "Economy"},
    {"id": "FL004", "airline": "Vistara", "flight_number": "UK-827", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "18:00", "arrival": "19:20", "duration": "1h 20m", "price": 6200, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 20, "class": "Economy"},

    # ── Delhi → Goa ──
    {"id": "FL005", "airline": "IndiGo", "flight_number": "6E-711", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "07:00", "arrival": "09:40", "duration": "2h 40m", "price": 6500, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 60, "class": "Economy"},
    {"id": "FL006", "airline": "Air India", "flight_number": "AI-661", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "11:30", "arrival": "14:15", "duration": "2h 45m", "price": 7800, "stops": 0, "aircraft": "Airbus A319", "baggage": "25kg", "meal": True, "available_seats": 28, "class": "Economy"},
    {"id": "FL007", "airline": "SpiceJet", "flight_number": "SG-901", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "16:45", "arrival": "19:30", "duration": "2h 45m", "price": 5900, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 42, "class": "Economy"},
    {"id": "FL008", "airline": "Akasa Air", "flight_number": "QP-1401", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "20:10", "arrival": "22:55", "duration": "2h 45m", "price": 5200, "stops": 0, "aircraft": "Boeing 737 MAX 8", "baggage": "15kg", "meal": False, "available_seats": 75, "class": "Economy"},

    # ── Lucknow → Mumbai ──
    {"id": "FL009", "airline": "IndiGo", "flight_number": "6E-455", "source": "Lucknow", "source_code": "LKO", "destination": "Mumbai", "destination_code": "BOM", "departure": "07:30", "arrival": "09:40", "duration": "2h 10m", "price": 5500, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 50, "class": "Economy"},
    {"id": "FL010", "airline": "Vistara", "flight_number": "UK-951", "source": "Lucknow", "source_code": "LKO", "destination": "Mumbai", "destination_code": "BOM", "departure": "13:00", "arrival": "15:05", "duration": "2h 05m", "price": 7200, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 18, "class": "Economy"},

    # ── Mumbai → Goa ──
    {"id": "FL011", "airline": "IndiGo", "flight_number": "6E-181", "source": "Mumbai", "source_code": "BOM", "destination": "Goa", "destination_code": "GOI", "departure": "08:20", "arrival": "09:30", "duration": "1h 10m", "price": 3200, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 65, "class": "Economy"},
    {"id": "FL012", "airline": "Go First", "flight_number": "G8-301", "source": "Mumbai", "source_code": "BOM", "destination": "Goa", "destination_code": "GOI", "departure": "15:30", "arrival": "16:40", "duration": "1h 10m", "price": 2800, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 80, "class": "Economy"},

    # ── Delhi → Mumbai ──
    {"id": "FL013", "airline": "Air India", "flight_number": "AI-101", "source": "Delhi", "source_code": "DEL", "destination": "Mumbai", "destination_code": "BOM", "departure": "06:00", "arrival": "08:10", "duration": "2h 10m", "price": 6800, "stops": 0, "aircraft": "Boeing 787", "baggage": "25kg", "meal": True, "available_seats": 22, "class": "Economy"},
    {"id": "FL014", "airline": "IndiGo", "flight_number": "6E-601", "source": "Delhi", "source_code": "DEL", "destination": "Mumbai", "destination_code": "BOM", "departure": "10:00", "arrival": "12:10", "duration": "2h 10m", "price": 5600, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 48, "class": "Economy"},
    {"id": "FL015", "airline": "SpiceJet", "flight_number": "SG-201", "source": "Delhi", "source_code": "DEL", "destination": "Mumbai", "destination_code": "BOM", "departure": "22:00", "arrival": "00:15+1", "duration": "2h 15m", "price": 4900, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 55, "class": "Economy"},

    # ── Bangalore → Delhi ──
    {"id": "FL016", "airline": "Vistara", "flight_number": "UK-811", "source": "Bangalore", "source_code": "BLR", "destination": "Delhi", "destination_code": "DEL", "departure": "06:00", "arrival": "08:55", "duration": "2h 55m", "price": 7500, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 15, "class": "Economy"},
    {"id": "FL017", "airline": "IndiGo", "flight_number": "6E-211", "source": "Bangalore", "source_code": "BLR", "destination": "Delhi", "destination_code": "DEL", "departure": "12:30", "arrival": "15:20", "duration": "2h 50m", "price": 6100, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 40, "class": "Economy"},

    # ── Kolkata → Delhi ──
    {"id": "FL018", "airline": "Air India", "flight_number": "AI-751", "source": "Kolkata", "source_code": "CCU", "destination": "Delhi", "destination_code": "DEL", "departure": "07:15", "arrival": "09:35", "duration": "2h 20m", "price": 5800, "stops": 0, "aircraft": "Boeing 737", "baggage": "25kg", "meal": True, "available_seats": 30, "class": "Economy"},
    {"id": "FL019", "airline": "IndiGo", "flight_number": "6E-501", "source": "Kolkata", "source_code": "CCU", "destination": "Delhi", "destination_code": "DEL", "departure": "14:00", "arrival": "16:15", "duration": "2h 15m", "price": 4900, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 52, "class": "Economy"},

    # ── Chennai → Delhi ──
    {"id": "FL020", "airline": "SpiceJet", "flight_number": "SG-701", "source": "Chennai", "source_code": "MAA", "destination": "Delhi", "destination_code": "DEL", "departure": "08:45", "arrival": "11:30", "duration": "2h 45m", "price": 5300, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 38, "class": "Economy"},
    {"id": "FL021", "airline": "Akasa Air", "flight_number": "QP-901", "source": "Chennai", "source_code": "MAA", "destination": "Delhi", "destination_code": "DEL", "departure": "19:30", "arrival": "22:15", "duration": "2h 45m", "price": 4700, "stops": 0, "aircraft": "Boeing 737 MAX 8", "baggage": "15kg", "meal": False, "available_seats": 70, "class": "Economy"},

    # ── Lucknow → Goa (via Delhi — 1 stop) ──
    {"id": "FL022", "airline": "IndiGo", "flight_number": "6E-234/711", "source": "Lucknow", "source_code": "LKO", "destination": "Goa", "destination_code": "GOI", "departure": "06:30", "arrival": "12:00", "duration": "5h 30m", "price": 8900, "stops": 1, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 35, "class": "Economy"},
    {"id": "FL023", "airline": "Air India", "flight_number": "AI-401/661", "source": "Lucknow", "source_code": "LKO", "destination": "Goa", "destination_code": "GOI", "departure": "09:15", "arrival": "16:30", "duration": "7h 15m", "price": 10200, "stops": 1, "aircraft": "Boeing 737", "baggage": "25kg", "meal": True, "available_seats": 20, "class": "Economy"},
]


def search_flights(source: str, destination: str, date: str, passengers: int) -> list:
    """Search flights with case-insensitive partial matching."""
    source_lower = source.lower().strip()
    destination_lower = destination.lower().strip()

    results = []
    for flight in MOCK_FLIGHTS:
        src_match = (
            source_lower in flight["source"].lower()
            or flight["source"].lower() in source_lower
            or flight["source_code"].lower() == source_lower
        )
        dst_match = (
            destination_lower in flight["destination"].lower()
            or flight["destination"].lower() in destination_lower
            or flight["destination_code"].lower() == destination_lower
        )
        if src_match and dst_match:
            f = flight.copy()
            f["total_price"] = f["price"] * passengers
            f["passengers"] = passengers
            f["travel_date"] = date
            f["is_demo"] = True
            results.append(f)

    return results


def get_flight_by_id(flight_id: str):
    for flight in MOCK_FLIGHTS:
        if flight["id"] == flight_id:
            return flight
    return None

