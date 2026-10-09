"""
Flight Service — Dynamic & Tiered Flight Pricing
Calculates realistic aerial distances, flight durations (~50m - 2h 45m),
and realistic economy fares starting around ₹3,500–₹5,500 based on Indian route metrics.
"""

from typing import Optional, List, Dict, Any
from app.services.route_calculator import get_route_metrics, calculate_flight_base_fare

_RAW_FLIGHTS = [
    # ── Lucknow ↔ Delhi ──
    {"id": "FL001", "airline": "IndiGo", "flight_number": "6E-234", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "06:30", "price_offset": 0, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 45, "class": "Economy"},
    {"id": "FL002", "airline": "Air India", "flight_number": "AI-401", "source": "Lucknow", "source_code": "LKO", "destination": "Delhi", "destination_code": "DEL", "departure": "09:15", "price_offset": 600, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "25kg", "meal": True, "available_seats": 32, "class": "Economy"},
    {"id": "FL003", "airline": "SpiceJet", "flight_number": "SG-112", "source": "Delhi", "source_code": "DEL", "destination": "Lucknow", "destination_code": "LKO", "departure": "14:20", "price_offset": -200, "stops": 0, "aircraft": "Boeing 737 MAX", "baggage": "15kg", "meal": False, "available_seats": 58, "class": "Economy"},

    # ── Delhi ↔ Goa ──
    {"id": "FL005", "airline": "IndiGo", "flight_number": "6E-711", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "07:00", "price_offset": 0, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 60, "class": "Economy"},
    {"id": "FL006", "airline": "Air India", "flight_number": "AI-661", "source": "Delhi", "source_code": "DEL", "destination": "Goa", "destination_code": "GOI", "departure": "11:30", "price_offset": 800, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "25kg", "meal": True, "available_seats": 28, "class": "Economy"},

    # ── Delhi ↔ Mumbai ──
    {"id": "FL013", "airline": "Air India", "flight_number": "AI-101", "source": "Delhi", "source_code": "DEL", "destination": "Mumbai", "destination_code": "BOM", "departure": "06:00", "price_offset": 700, "stops": 0, "aircraft": "Boeing 787 Dreamliner", "baggage": "25kg", "meal": True, "available_seats": 22, "class": "Economy"},
    {"id": "FL014", "airline": "IndiGo", "flight_number": "6E-601", "source": "Delhi", "source_code": "DEL", "destination": "Mumbai", "destination_code": "BOM", "departure": "10:00", "price_offset": 0, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 48, "class": "Economy"},

    # ── Ayodhya (Heritage & Spiritual) ──
    {"id": "FL030", "airline": "IndiGo", "flight_number": "6E-2412", "source": "Delhi", "source_code": "DEL", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "07:15", "price_offset": 0, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "15kg", "meal": False, "available_seats": 52, "class": "Economy"},
    {"id": "FL031", "airline": "Air India Express", "flight_number": "IX-1590", "source": "Delhi", "source_code": "DEL", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "11:45", "price_offset": 300, "stops": 0, "aircraft": "Boeing 737-800", "baggage": "20kg", "meal": True, "available_seats": 38, "class": "Economy"},
    {"id": "FL032", "airline": "SpiceJet", "flight_number": "SG-3421", "source": "Mumbai", "source_code": "BOM", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "08:30", "price_offset": 0, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 44, "class": "Economy"},
    {"id": "FL033", "airline": "Akasa Air", "flight_number": "QP-1618", "source": "Bangalore", "source_code": "BLR", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "06:10", "price_offset": 200, "stops": 0, "aircraft": "Boeing 737 MAX", "baggage": "15kg", "meal": True, "available_seats": 60, "class": "Economy"},

    # ── Varanasi (Kashi & Banaras Ghats) ──
    {"id": "FL036", "airline": "IndiGo", "flight_number": "6E-481", "source": "Delhi", "source_code": "DEL", "destination": "Varanasi", "destination_code": "VNS", "departure": "08:15", "price_offset": 0, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 42, "class": "Economy"},
    {"id": "FL037", "airline": "Air India", "flight_number": "AI-406", "source": "Delhi", "source_code": "DEL", "destination": "Varanasi", "destination_code": "VNS", "departure": "15:30", "price_offset": 600, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "25kg", "meal": True, "available_seats": 28, "class": "Economy"},
    {"id": "FL038", "airline": "Vistara", "flight_number": "UK-631", "source": "Mumbai", "source_code": "BOM", "destination": "Varanasi", "destination_code": "VNS", "departure": "07:45", "price_offset": 800, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 20, "class": "Economy"},
    {"id": "FL039", "airline": "IndiGo", "flight_number": "6E-892", "source": "Bangalore", "source_code": "BLR", "destination": "Varanasi", "destination_code": "VNS", "departure": "10:15", "price_offset": 0, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 48, "class": "Economy"},

    # ── Jammu & Kashmir (Srinagar SXR / Jammu IXJ) ──
    {"id": "FL042", "airline": "IndiGo", "flight_number": "6E-2015", "source": "Delhi", "source_code": "DEL", "destination": "Jammu and Kashmir", "destination_code": "SXR", "departure": "06:00", "price_offset": 0, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "15kg", "meal": False, "available_seats": 55, "class": "Economy"},
    {"id": "FL043", "airline": "Vistara", "flight_number": "UK-611", "source": "Delhi", "source_code": "DEL", "destination": "Jammu and Kashmir", "destination_code": "SXR", "departure": "09:30", "price_offset": 900, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 22, "class": "Economy"},
    {"id": "FL045", "airline": "SpiceJet", "flight_number": "SG-1044", "source": "Mumbai", "source_code": "BOM", "destination": "Jammu and Kashmir", "destination_code": "SXR", "departure": "07:10", "price_offset": 0, "stops": 0, "aircraft": "Boeing 737", "baggage": "15kg", "meal": False, "available_seats": 35, "class": "Economy"},

    # ── Raipur (Tribal Culture & Nature) ──
    {"id": "FL047", "airline": "IndiGo", "flight_number": "6E-728", "source": "Delhi", "source_code": "DEL", "destination": "Raipur", "destination_code": "RPR", "departure": "07:05", "price_offset": 0, "stops": 0, "aircraft": "Airbus A320", "baggage": "15kg", "meal": False, "available_seats": 44, "class": "Economy"},
    {"id": "FL048", "airline": "Air India", "flight_number": "AI-477", "source": "Mumbai", "source_code": "BOM", "destination": "Raipur", "destination_code": "RPR", "departure": "10:30", "price_offset": 500, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "25kg", "meal": True, "available_seats": 32, "class": "Economy"},

    # ── Karnataka (Bangalore BLR) ──
    {"id": "FL051", "airline": "Vistara", "flight_number": "UK-811", "source": "Delhi", "source_code": "DEL", "destination": "Karnataka", "destination_code": "BLR", "departure": "06:00", "price_offset": 800, "stops": 0, "aircraft": "Airbus A320neo", "baggage": "20kg", "meal": True, "available_seats": 15, "class": "Economy"},
    {"id": "FL052", "airline": "IndiGo", "flight_number": "6E-211", "source": "Delhi", "source_code": "DEL", "destination": "Karnataka", "destination_code": "BLR", "departure": "12:30", "price_offset": 0, "stops": 0, "aircraft": "Airbus A321", "baggage": "15kg", "meal": False, "available_seats": 40, "class": "Economy"},
    {"id": "FL053", "airline": "Akasa Air", "flight_number": "QP-1314", "source": "Mumbai", "source_code": "BOM", "destination": "Karnataka", "destination_code": "BLR", "departure": "14:15", "price_offset": -200, "stops": 0, "aircraft": "Boeing 737 MAX", "baggage": "15kg", "meal": True, "available_seats": 70, "class": "Economy"},

    # ── Nainital & Haridwar (via DED / PGH) ──
    {"id": "FL055", "airline": "IndiGo", "flight_number": "6E-7201", "source": "Delhi", "source_code": "DEL", "destination": "Haridwar", "destination_code": "DED", "departure": "07:20", "price_offset": 0, "stops": 0, "aircraft": "ATR 72", "baggage": "15kg", "meal": False, "available_seats": 38, "class": "Economy"},
    {"id": "FL057", "airline": "Alliance Air", "flight_number": "9I-812", "source": "Delhi", "source_code": "DEL", "destination": "Nainital", "destination_code": "PGH", "departure": "08:00", "price_offset": 200, "stops": 0, "aircraft": "ATR 72", "baggage": "15kg", "meal": False, "available_seats": 28, "class": "Economy"},
    {"id": "FL058", "airline": "IndiGo", "flight_number": "6E-804", "source": "Lucknow", "source_code": "LKO", "destination": "Nainital", "destination_code": "PGH", "departure": "11:20", "price_offset": 0, "stops": 0, "aircraft": "ATR 72", "baggage": "15kg", "meal": False, "available_seats": 30, "class": "Economy"},
]


def _format_flight_arrival(dep_time: str, dur_mins: int) -> str:
    h, m = [int(x) for x in dep_time.split(":")]
    arr_mins = h * 60 + m + dur_mins
    arr_h = (arr_mins // 60) % 24
    arr_m = arr_mins % 60
    return f"{arr_h:02d}:{arr_m:02d}"


def _build_flight_object(f: dict, source: str, destination: str, date: str, passengers: int) -> dict:
    metrics = get_route_metrics(source, destination)
    air_km = metrics["air_km"]
    dur_mins = metrics["flight_mins"]
    duration = metrics["flight_duration"]

    base_fare = calculate_flight_base_fare(air_km)
    final_price = max(3500, base_fare + f.get("price_offset", 0))

    dep = f.get("departure", "09:00")
    arr = _format_flight_arrival(dep, dur_mins)

    return {
        "id": f["id"],
        "airline": f["airline"],
        "flight_number": f.get("flight_number", "6E-100"),
        "source": source.title() if "source" not in f else f["source"],
        "source_code": f.get("source_code", source[:3].upper()),
        "destination": destination.title() if "destination" not in f else f["destination"],
        "destination_code": f.get("destination_code", destination[:3].upper()),
        "departure": dep,
        "arrival": arr,
        "duration": duration,
        "distance": f"{air_km} km",
        "price": final_price,
        "stops": f.get("stops", 0),
        "aircraft": f.get("aircraft", "Airbus A320neo"),
        "baggage": f.get("baggage", "15kg"),
        "meal": f.get("meal", False),
        "available_seats": f.get("available_seats", 40),
        "class": f.get("class", "Economy"),
        "total_price": final_price * passengers,
        "passengers": passengers,
        "travel_date": date,
        "is_demo": True,
    }


def search_flights(source: str, destination: str, date: str, passengers: int) -> List[dict]:
    """Search flights with realistic air distances, realistic durations (~1h 10m), and dynamic tiered base pricing."""
    src = source.lower().strip() if source else ""
    dst = destination.lower().strip() if destination else ""

    matched = []
    for f in _RAW_FLIGHTS:
        f_src = f["source"].lower()
        f_dst = f["destination"].lower()
        if (src in f_src or f_src in src) and (dst in f_dst or f_dst in dst):
            matched.append(_build_flight_object(f, f["source"], f["destination"], date, passengers))

    # If no pre-mapped flights exist, dynamically generate realistic flight options!
    if not matched and source and destination:
        dynamic_options = [
            {
                "id": f"FL-{source[:3].upper()}1",
                "airline": "IndiGo",
                "flight_number": f"6E-{abs(hash(source+destination)) % 900 + 100}",
                "departure": "07:30",
                "price_offset": 0,
                "stops": 0,
                "aircraft": "Airbus A320neo",
                "baggage": "15kg",
                "meal": False,
                "available_seats": 48,
                "class": "Economy"
            },
            {
                "id": f"FL-{source[:3].upper()}2",
                "airline": "Air India",
                "flight_number": f"AI-{abs(hash(destination+source)) % 800 + 100}",
                "departure": "13:45",
                "price_offset": 600,
                "stops": 0,
                "aircraft": "Boeing 737 MAX",
                "baggage": "25kg",
                "meal": True,
                "available_seats": 32,
                "class": "Economy"
            },
            {
                "id": f"FL-{source[:3].upper()}3",
                "airline": "Vistara",
                "flight_number": f"UK-{abs(hash(source)) % 700 + 200}",
                "departure": "18:20",
                "price_offset": 900,
                "stops": 0,
                "aircraft": "Airbus A321",
                "baggage": "20kg",
                "meal": True,
                "available_seats": 24,
                "class": "Economy"
            }
        ]

        for opt in dynamic_options:
            matched.append(_build_flight_object(opt, source, destination, date, passengers))

    return matched


def get_flight_by_id(flight_id: str) -> Optional[dict]:
    for f in _RAW_FLIGHTS:
        if f["id"] == flight_id:
            return f
    return None
