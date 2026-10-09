"""
Flight Service — Mock Data
Provides realistic flight data for Indian routes in Demo Mode.
"""

MOCK_FLIGHTS = [
    # ── Lucknow ↔ Delhi ──
    {"id": "FL001", "airline": "IndiGo", "flight_number": "6E-234", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "06:30", "arrival": "07:55", "duration": "1h 25m", "price": 4200, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 45, "class": "Economy"},
    {"id": "FL002", "airline": "Air India", "flight_number": "AI-401", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "09:15", "arrival": "10:40", "duration": "1h 25m", "price": 5100, "stops": 0, "aircraft": "Boeing 737", "baggage": "25kg", "meal": True, "available_seats": 32, "class": "Economy"},
    {"id": "FL003", "airline": "SpiceJet", "flight_number": "SG-112", "source": "Delhi", "source_code": "DEL", "destination": "Lucknow", "destination_code": "LKO", "departure": "14:20", "arrival": "15:45", "duration": "1h 25m", "price": 3800, "stops": 0, "aircraft": "Boeing 737 MAX", "baggage": "15kg", "meal": False, "available_seats": 58, "class": "Economy"},

    # ── Delhi ↔ Goa ──
    {"id": "FL005", "airline": "IndiGo", "flight_number": "6E-711", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "07:00", "arrival": "09:40", "duration": "2h 40m", "price": 6500, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 60, "class": "Economy"},
    {"id": "FL006", "airline": "Air India", "flight_number": "AI-661", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "11:30", "arrival": "14:15", "duration": "2h 45m", "price": 7800, "stops": 0, "aircraft": "Airbus A319", "baggage": "25kg", "meal": True, "available_seats": 28, "class": "Economy"},

    # ── Delhi ↔ Mumbai ──
    {"id": "FL013", "airline": "Air India", "flight_number": "AI-101", "source": "Delhi", "source_code": "DEL", "destination": "Mumbai", "destination_code": "BOM", "departure": "06:00", "arrival": "08:10", "duration": "2h 10m", "price": 6800, "stops": 0, "aircraft": "Boeing 787", "baggage": "25kg", "meal": True, "available_seats": 22, "class": "Economy"},
    {"id": "FL014", "airline": "IndiGo", "flight_number": "6E-601", "source": "Delhi", "source_code": "DEL", "destination": "Mumbai", "destination_code": "BOM", "departure": "10:00", "arrival": "12:10", "duration": "2h 10m", "price": 5600, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 48, "class": "Economy"},

    # ── Ayodhya (Heritage & Spiritual) ──
    {"id": "FL030", "airline": "IndiGo", "flight_number": "6E-2412", "source": "Delhi", "source_code": "DEL", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "07:15", "arrival": "08:35", "duration": "1h 20m", "price": 3850, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "15kg", "meal": False, "available_seats": 52, "class": "Economy"},
    {"id": "FL031", "airline": "Air India Express", "flight_number": "IX-1590", "source": "Delhi", "source_code": "DEL", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "11:45", "arrival": "13:10", "duration": "1h 25m", "price": 4200, "stops": 0, "aircraft": "Boeing 737-800", "baggage": "20kg", "meal": True, "available_seats": 38, "class": "Economy"},
    {"id": "FL032", "airline": "SpiceJet", "flight_number": "SG-3421", "source": "Mumbai", "source_code": "BOM", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "08:30", "arrival": "10:45", "duration": "2h 15m", "price": 5400, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 44, "class": "Economy"},
    {"id": "FL033", "airline": "Akasa Air", "flight_number": "QP-1618", "source": "Bangalore", "source_code": "BLR", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "06:10", "arrival": "08:50", "duration": "2h 40m", "price": 6100, "stops": 0, "aircraft": "Boeing 737 MAX", "baggage": "15kg", "meal": True, "available_seats": 60, "class": "Economy"},
    {"id": "FL034", "airline": "IndiGo", "flight_number": "6E-2413", "source": "Ayodhya", "source_code": "AYJ", "destination": "Delhi", "destination_code": "DEL", "departure": "14:15", "arrival": "15:35", "duration": "1h 20m", "price": 3850, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "15kg", "meal": False, "available_seats": 55, "class": "Economy"},
    {"id": "FL035", "airline": "IndiGo", "flight_number": "6E-2415", "source": "Ahmedabad", "source_code": "AMD", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "09:00", "arrival": "10:55", "duration": "1h 55m", "price": 4900, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 34, "class": "Economy"},

    # ── Varanasi (Kashi & Banaras Ghats) ──
    {"id": "FL036", "airline": "IndiGo", "flight_number": "6E-481", "source": "Delhi", "source_code": "DEL", "destination": "Varanasi", "destination_code": "VNS", "departure": "08:15", "arrival": "09:40", "duration": "1h 25m", "price": 4100, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 42, "class": "Economy"},
    {"id": "FL037", "airline": "Air India", "flight_number": "AI-406", "source": "Delhi", "source_code": "DEL", "destination": "Varanasi", "destination_code": "VNS", "departure": "15:30", "arrival": "16:55", "duration": "1h 25m", "price": 4800, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "25kg", "meal": True, "available_seats": 28, "class": "Economy"},
    {"id": "FL038", "airline": "Vistara", "flight_number": "UK-631", "source": "Mumbai", "source_code": "BOM", "destination": "Varanasi", "destination_code": "VNS", "departure": "07:45", "arrival": "10:00", "duration": "2h 15m", "price": 6200, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 20, "class": "Economy"},
    {"id": "FL039", "airline": "IndiGo", "flight_number": "6E-892", "source": "Bangalore", "source_code": "BLR", "destination": "Varanasi", "destination_code": "VNS", "departure": "10:15", "arrival": "12:50", "duration": "2h 35m", "price": 5900, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 48, "class": "Economy"},
    {"id": "FL040", "airline": "SpiceJet", "flight_number": "SG-704", "source": "Kolkata", "source_code": "CCU", "destination": "Varanasi", "destination_code": "VNS", "departure": "13:20", "arrival": "14:45", "duration": "1h 25m", "price": 3700, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 50, "class": "Economy"},
    {"id": "FL041", "airline": "IndiGo", "flight_number": "6E-482", "source": "Varanasi", "source_code": "VNS", "destination": "Delhi", "destination_code": "DEL", "departure": "17:45", "arrival": "19:10", "duration": "1h 25m", "price": 4100, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 40, "class": "Economy"},

    # ── Jammu & Kashmir (Srinagar SXR / Jammu IXJ) ──
    {"id": "FL042", "airline": "IndiGo", "flight_number": "6E-2015", "source": "Delhi", "source_code": "DEL", "destination": "Jammu and Kashmir", "destination_code": "SXR", "departure": "06:00", "arrival": "07:35", "duration": "1h 35m", "price": 5800, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "15kg", "meal": False, "available_seats": 55, "class": "Economy"},
    {"id": "FL043", "airline": "Vistara", "flight_number": "UK-611", "source": "Delhi", "source_code": "DEL", "destination": "Srinagar", "destination_code": "SXR", "departure": "09:30", "arrival": "11:05", "duration": "1h 35m", "price": 7200, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 22, "class": "Economy"},
    {"id": "FL044", "airline": "Air India", "flight_number": "AI-825", "source": "Delhi", "source_code": "DEL", "destination": "Jammu", "destination_code": "IXJ", "departure": "11:15", "arrival": "12:35", "duration": "1h 20m", "price": 4900, "stops": 0, "aircraft": "Airbus A319", "baggage": "25kg", "meal": True, "available_seats": 30, "class": "Economy"},
    {"id": "FL045", "airline": "SpiceJet", "flight_number": "SG-1044", "source": "Mumbai", "source_code": "BOM", "destination": "Jammu and Kashmir", "destination_code": "SXR", "departure": "07:10", "arrival": "10:10", "duration": "3h 00m", "price": 8600, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 35, "class": "Economy"},
    {"id": "FL046", "airline": "IndiGo", "flight_number": "6E-512", "source": "Lucknow", "source_code": "LKO", "destination": "Jammu and Kashmir", "destination_code": "SXR", "departure": "08:40", "arrival": "12:15", "duration": "3h 35m", "price": 6900, "stops": 1, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 26, "class": "Economy"},

    # ── Raipur (Tribal Culture & Nature) ──
    {"id": "FL047", "airline": "IndiGo", "flight_number": "6E-728", "source": "Delhi", "source_code": "DEL", "destination": "Raipur", "destination_code": "RPR", "departure": "07:05", "arrival": "08:50", "duration": "1h 45m", "price": 4600, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 44, "class": "Economy"},
    {"id": "FL048", "airline": "Air India", "flight_number": "AI-477", "source": "Mumbai", "source_code": "BOM", "destination": "Raipur", "destination_code": "RPR", "departure": "10:30", "arrival": "12:15", "duration": "1h 45m", "price": 5200, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "25kg", "meal": True, "available_seats": 32, "class": "Economy"},
    {"id": "FL049", "airline": "IndiGo", "flight_number": "6E-348", "source": "Kolkata", "source_code": "CCU", "destination": "Raipur", "destination_code": "RPR", "departure": "14:50", "arrival": "16:20", "duration": "1h 30m", "price": 3800, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 50, "class": "Economy"},
    {"id": "FL050", "airline": "IndiGo", "flight_number": "6E-904", "source": "Bangalore", "source_code": "BLR", "destination": "Raipur", "destination_code": "RPR", "departure": "17:15", "arrival": "19:10", "duration": "1h 55m", "price": 5400, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 36, "class": "Economy"},

    # ── Karnataka (Bangalore, Mysore, Coorg, Hampi) ──
    {"id": "FL051", "airline": "Vistara", "flight_number": "UK-811", "source": "Delhi", "source_code": "DEL", "destination": "Karnataka", "destination_code": "BLR", "departure": "06:00", "arrival": "08:55", "duration": "2h 55m", "price": 7500, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 15, "class": "Economy"},
    {"id": "FL052", "airline": "IndiGo", "flight_number": "6E-211", "source": "Delhi", "source_code": "DEL", "destination": "Karnataka", "destination_code": "BLR", "departure": "12:30", "arrival": "15:20", "duration": "2h 50m", "price": 6100, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 40, "class": "Economy"},
    {"id": "FL053", "airline": "Akasa Air", "flight_number": "QP-1314", "source": "Mumbai", "source_code": "BOM", "destination": "Karnataka", "destination_code": "BLR", "departure": "14:15", "arrival": "16:00", "duration": "1h 45m", "price": 3800, "stops": 0, "aircraft": "Boeing 737 MAX", "baggage": "15kg", "meal": True, "available_seats": 70, "class": "Economy"},
    {"id": "FL054", "airline": "IndiGo", "flight_number": "6E-543", "source": "Kolkata", "source_code": "CCU", "destination": "Karnataka", "destination_code": "BLR", "departure": "09:00", "arrival": "11:45", "duration": "2h 45m", "price": 5600, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 45, "class": "Economy"},

    # ── Nainital & Haridwar (via Dehradun DED / Pantnagar PGH) ──
    {"id": "FL055", "airline": "IndiGo", "flight_number": "6E-7201", "source": "Delhi", "source_code": "DEL", "destination": "Haridwar", "destination_code": "DED", "departure": "07:20", "arrival": "08:15", "duration": "0h 55m", "price": 3200, "stops": 0, "aircraft": "ATR 72", "baggage": "15kg", "meal": False, "available_seats": 38, "class": "Economy"},
    {"id": "FL056", "airline": "Air India", "flight_number": "AI-9614", "source": "Delhi", "source_code": "DEL", "destination": "Haridwar", "destination_code": "DED", "departure": "13:45", "arrival": "14:40", "duration": "0h 55m", "price": 3600, "stops": 0, "aircraft": "ATR 72-600", "baggage": "15kg", "meal": False, "available_seats": 25, "class": "Economy"},
    {"id": "FL057", "airline": "Alliance Air", "flight_number": "9I-812", "source": "Delhi", "source_code": "DEL", "destination": "Nainital", "destination_code": "PGH", "departure": "08:00", "arrival": "09:05", "duration": "1h 05m", "price": 3900, "stops": 0, "aircraft": "ATR 72", "baggage": "15kg", "meal": False, "available_seats": 28, "class": "Economy"},
    {"id": "FL058", "airline": "IndiGo", "flight_number": "6E-804", "source": "Lucknow", "source_code": "LKO", "destination": "Nainital", "destination_code": "PGH", "departure": "11:20", "arrival": "12:35", "duration": "1h 15m", "price": 3400, "stops": 0, "aircraft": "ATR 72", "baggage": "15kg", "meal": False, "available_seats": 30, "class": "Economy"},
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

    if not results and source and destination:
        results.append({
            "id": "FL-FALLBACK", "airline": "TripPilot Regional", "flight_number": "TP-101",
            "source": source, "source_code": source[:3].upper(), "destination": destination, "destination_code": destination[:3].upper(),
            "departure": "10:00", "arrival": "12:00", "duration": "2h 00m", "price": 4500, "stops": 0,
            "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 50, "class": "Economy",
            "total_price": 4500 * passengers, "passengers": passengers, "travel_date": date, "is_demo": True
        })
    return results


def get_flight_by_id(flight_id: str):
    for flight in MOCK_FLIGHTS:
        if flight["id"] == flight_id:
            return flight
    return None
