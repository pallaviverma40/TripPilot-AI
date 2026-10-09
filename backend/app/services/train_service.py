"""
Train Service — Dynamic & Tiered Indian Railway Pricing
Calculates realistic rail distances, durations by train category (Vande Bharat, Rajdhani, Express),
and structured class pricing (Sleeper ₹300–₹500, 3AC ₹800–₹1200, 2AC ₹1200–₹1800, 1AC ₹1900–₹2500).
"""

from typing import Optional, List, Dict, Any
from app.services.route_calculator import get_route_metrics, calculate_train_tier_prices

# Raw Curated Train Schedules
_RAW_TRAINS = [
    # ── Ayodhya (Heritage & Spiritual) ──
    {"id": "TRN051", "name": "Ayodhya Vande Bharat", "train_number": "22425", "source": "Delhi", "source_code": "NDLS", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "06:10", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 85, "amenities": ["Onboard WiFi", "Pantry Car", "Charging Point", "Bio-Toilets"]},
    {"id": "TRN052", "name": "Ayodhya Express", "train_number": "14206", "source": "Delhi", "source_code": "NDLS", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "18:20", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 64, "amenities": ["E-Catering", "Bio-Toilets", "Clean Bedding"]},
    {"id": "TRN053", "name": "Saryu Yamuna Exp", "train_number": "14650", "source": "Lucknow", "source_code": "LKO", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "06:40", "type": "express", "class_types": ["Sleeper", "3AC", "2AC"], "available_seats": 90, "amenities": ["Bio-Toilets", "Charging Point"]},
    {"id": "TRN054", "name": "Ayodhya Cantt SF Exp", "train_number": "22183", "source": "Mumbai", "source_code": "BCT", "destination": "Ayodhya", "destination_code": "AYJ", "departure": "06:00", "type": "rajdhani", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 34, "amenities": ["Pantry Car", "Clean Bedding", "Charging Point"]},

    # ── Haridwar (Ghats & Ashrams) ──
    {"id": "TRN055", "name": "Haridwar Vande Bharat", "train_number": "22457", "source": "Delhi", "source_code": "NDLS", "destination": "Haridwar", "destination_code": "HW", "departure": "17:50", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 80, "amenities": ["Onboard WiFi", "Meals Included", "Clean Coaches"]},
    {"id": "TRN056", "name": "Jan Shatabdi Exp", "train_number": "12055", "source": "Delhi", "source_code": "NDLS", "destination": "Haridwar", "destination_code": "HW", "departure": "15:20", "type": "express", "class_types": ["CC", "Sleeper"], "available_seats": 95, "amenities": ["Bio-Toilets", "Charging Point"]},
    {"id": "TRN057", "name": "Haridwar Mail", "train_number": "19031", "source": "Mumbai", "source_code": "BCT", "destination": "Haridwar", "destination_code": "HW", "departure": "11:25", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 40, "amenities": ["Pantry Car", "Clean Bedding"]},
    {"id": "TRN058", "name": "Kumbh Express", "train_number": "12369", "source": "Lucknow", "source_code": "LKO", "destination": "Haridwar", "destination_code": "HW", "departure": "08:15", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 55, "amenities": ["E-Catering", "Bio-Toilets"]},

    # ── Nainital (via Kathgodam KGM) ──
    {"id": "TRN059", "name": "Kathgodam Shatabdi", "train_number": "12040", "source": "Delhi", "source_code": "NDLS", "destination": "Nainital", "destination_code": "KGM", "departure": "06:20", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 70, "amenities": ["Meals Included", "Pantry Car", "Clean Coaches"]},
    {"id": "TRN060", "name": "Ranikhet Express", "train_number": "15013", "source": "Delhi", "source_code": "NDLS", "destination": "Nainital", "destination_code": "KGM", "departure": "22:00", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 60, "amenities": ["Clean Bedding", "Charging Point"]},
    {"id": "TRN061", "name": "Bagh Express", "train_number": "13019", "source": "Lucknow", "source_code": "LKO", "destination": "Nainital", "destination_code": "KGM", "departure": "00:30", "type": "express", "class_types": ["Sleeper", "3AC", "2AC"], "available_seats": 50, "amenities": ["Bio-Toilets", "E-Catering"]},

    # ── Varanasi (Kashi Vishwanath & Banaras) ──
    {"id": "TRN062", "name": "Varanasi Vande Bharat", "train_number": "22436", "source": "Delhi", "source_code": "NDLS", "destination": "Varanasi", "destination_code": "BSB", "departure": "06:00", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 85, "amenities": ["Pantry Car", "Onboard WiFi", "Meals Included"]},
    {"id": "TRN063", "name": "Shiv Ganga Superfast", "train_number": "12560", "source": "Delhi", "source_code": "NDLS", "destination": "Varanasi", "destination_code": "BSB", "departure": "20:05", "type": "rajdhani", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 70, "amenities": ["Clean Bedding", "Bio-Toilets"]},
    {"id": "TRN064", "name": "Kashi Vishwanath Exp", "train_number": "15128", "source": "Lucknow", "source_code": "LKO", "destination": "Varanasi", "destination_code": "BSB", "departure": "21:15", "type": "express", "class_types": ["Sleeper", "3AC", "2AC"], "available_seats": 80, "amenities": ["Charging Point", "Clean Coaches"]},

    # ── Jammu & Kashmir (Jammu Tawi JAT) ──
    {"id": "TRN065", "name": "Vande Bharat Express", "train_number": "22439", "source": "Delhi", "source_code": "NDLS", "destination": "Jammu and Kashmir", "destination_code": "JAT", "departure": "06:00", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 90, "amenities": ["Meals Included", "Pantry Car", "High Speed"]},
    {"id": "TRN066", "name": "Jammu Rajdhani", "train_number": "12425", "source": "Delhi", "source_code": "NDLS", "destination": "Jammu and Kashmir", "destination_code": "JAT", "departure": "20:40", "type": "rajdhani", "class_types": ["3AC", "2AC", "1AC"], "available_seats": 60, "amenities": ["Meals Included", "Clean Bedding"]},
    {"id": "TRN067", "name": "Malwa Express", "train_number": "12919", "source": "Mumbai", "source_code": "BCT", "destination": "Jammu and Kashmir", "destination_code": "JAT", "departure": "09:15", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 35, "amenities": ["Pantry Car", "Clean Bedding"]},

    # ── Raipur (Tribal Culture & Nature) ──
    {"id": "TRN068", "name": "Bilaspur Rajdhani", "train_number": "12442", "source": "Delhi", "source_code": "NDLS", "destination": "Raipur", "destination_code": "R", "departure": "15:25", "type": "rajdhani", "class_types": ["3AC", "2AC", "1AC"], "available_seats": 45, "amenities": ["Meals Included", "Clean Bedding"]},
    {"id": "TRN069", "name": "Chhattisgarh Express", "train_number": "18238", "source": "Mumbai", "source_code": "BCT", "destination": "Raipur", "destination_code": "R", "departure": "00:30", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 50, "amenities": ["Pantry Car", "Charging Point"]},
    {"id": "TRN070", "name": "Howrah Mail", "train_number": "12809", "source": "Kolkata", "source_code": "HWH", "destination": "Raipur", "destination_code": "R", "departure": "20:05", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 60, "amenities": ["Clean Bedding", "Bio-Toilets"]},

    # ── Karnataka (Bangalore, Mysore, Hampi) ──
    {"id": "TRN071", "name": "Karnataka Express", "train_number": "12627", "source": "Delhi", "source_code": "NDLS", "destination": "Karnataka", "destination_code": "SBC", "departure": "20:15", "type": "rajdhani", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 50, "amenities": ["E-Catering", "Clean Bedding", "Pantry Car"]},
    {"id": "TRN072", "name": "Mysore Vande Bharat", "train_number": "20607", "source": "Chennai", "source_code": "MAS", "destination": "Karnataka", "destination_code": "MYS", "departure": "05:50", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 85, "amenities": ["Meals Included", "Pantry Car", "Clean Coaches"]},
    {"id": "TRN073", "name": "Hampi Express", "train_number": "16591", "source": "Bangalore", "source_code": "SBC", "destination": "Karnataka", "destination_code": "HPT", "departure": "21:50", "type": "express", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 65, "amenities": ["Clean Bedding", "Bio-Toilets"]},

    # ── Delhi ↔ Lucknow / Mumbai / Jaipur / Hyderabad ──
    {"id": "TRN001", "name": "Lucknow Shatabdi", "train_number": "12004", "source": "Delhi", "source_code": "NDLS", "destination": "Lucknow", "destination_code": "LKO", "departure": "06:10", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 75, "amenities": ["Meals Included", "WiFi", "Charging Point"]},
    {"id": "TRN002", "name": "Lucknow Mail", "train_number": "12230", "source": "Delhi", "source_code": "NDLS", "destination": "Lucknow", "destination_code": "LKO", "departure": "22:00", "type": "rajdhani", "class_types": ["Sleeper", "3AC", "2AC", "1AC"], "available_seats": 85, "amenities": ["Clean Bedding", "E-Catering"]},
    {"id": "TRN003", "name": "Tejas Express", "train_number": "82502", "source": "Delhi", "source_code": "NDLS", "destination": "Lucknow", "destination_code": "LKO", "departure": "15:40", "type": "vande_bharat", "class_types": ["CC", "EC"], "available_seats": 60, "amenities": ["Infotainment", "Meals Included"]},
    {"id": "TRN012", "name": "Mumbai Rajdhani", "train_number": "12951", "source": "Delhi", "source_code": "NDLS", "destination": "Mumbai", "destination_code": "MMCT", "departure": "16:55", "type": "rajdhani", "class_types": ["3AC", "2AC", "1AC"], "available_seats": 81, "amenities": ["Meals Included", "Clean Bedding", "Charging Point"]},
    {"id": "TRN013", "name": "August Kranti Rajdhani", "train_number": "12954", "source": "Delhi", "source_code": "NDLS", "destination": "Mumbai", "destination_code": "MMCT", "departure": "17:15", "type": "rajdhani", "class_types": ["3AC", "2AC", "1AC"], "available_seats": 65, "amenities": ["Meals Included", "Pantry Car"]},
]


def _format_arrival(dep_time: str, dur_mins: int) -> str:
    h, m = [int(x) for x in dep_time.split(":")]
    arr_mins = (h * 60 + m + dur_mins)
    arr_h = (arr_mins // 60) % 24
    arr_m = arr_mins % 60
    days = arr_mins // (24 * 60)
    day_suffix = f"+{days}" if days > 0 else ""
    return f"{arr_h:02d}:{arr_m:02d}{day_suffix}"


def _build_train_object(t: dict, source: str, destination: str, date: str, passengers: int) -> dict:
    metrics = get_route_metrics(source, destination)
    rail_km = metrics["rail_km"]
    t_type = t.get("type", "express")

    if t_type == "vande_bharat":
        duration = metrics["train_durations"]["vande_bharat"]
        dur_mins = round((rail_km / 78.0) * 60)
    elif t_type == "rajdhani":
        duration = metrics["train_durations"]["rajdhani"]
        dur_mins = round((rail_km / 68.0) * 60)
    else:
        duration = metrics["train_durations"]["express"]
        dur_mins = round((rail_km / 52.0) * 60)

    price_map = calculate_train_tier_prices(rail_km, t.get("name", ""))
    class_types = t.get("class_types", ["Sleeper", "3AC", "2AC", "1AC"])
    
    classes = []
    seats = t.get("available_seats", 60)
    for c in class_types:
        p = price_map.get(c, price_map.get("base", 350))
        classes.append({
            "type": c,
            "name": c,
            "price": p,
            "available": max(4, seats if c in ("Sleeper", "CC") else seats // 2),
        })

    dep = t.get("departure", "08:00")
    arr = _format_arrival(dep, dur_mins)

    return {
        "id": t["id"],
        "name": t["name"],
        "train_number": t.get("train_number", "12000"),
        "source": source.title() if "source" not in t else t["source"],
        "source_code": t.get("source_code", source[:3].upper()),
        "destination": destination.title() if "destination" not in t else t["destination"],
        "destination_code": t.get("destination_code", destination[:3].upper()),
        "departure": dep,
        "arrival": arr,
        "duration": duration,
        "distance": f"{rail_km} km",
        "price": classes[0]["price"] if classes else price_map.get("base", 350),
        "base_price": price_map.get("base", 350),
        "classes": classes,
        "available_seats": seats,
        "amenities": t.get("amenities", ["Clean Bedding", "Bio-Toilets", "Charging Point"]),
        "passengers": passengers,
        "travel_date": date,
        "is_demo": True,
    }


def search_trains(source: str, destination: str, date: str, passengers: int) -> List[dict]:
    """Search trains with realistic Indian distances, durations, and tiered pricing."""
    src = source.lower().strip() if source else ""
    dst = destination.lower().strip() if destination else ""

    matched = []
    for t in _RAW_TRAINS:
        t_src = t["source"].lower()
        t_dst = t["destination"].lower()
        if (src in t_src or t_src in src) and (dst in t_dst or t_dst in dst):
            matched.append(_build_train_object(t, t["source"], t["destination"], date, passengers))

    # If no pre-mapped curated train, dynamically generate realistic train options!
    if not matched and source and destination:
        metrics = get_route_metrics(source, destination)
        rail_km = metrics["rail_km"]
        
        dynamic_options = [
            {
                "id": f"TRN-{source[:3].upper()}1",
                "name": f"{destination.title()} Superfast Express",
                "train_number": "12901",
                "departure": "06:30",
                "type": "rajdhani",
                "class_types": ["Sleeper", "3AC", "2AC", "1AC"],
                "available_seats": 80,
                "amenities": ["Pantry Car", "Clean Bedding", "Charging Point", "Bio-Toilets"]
            },
            {
                "id": f"TRN-{source[:3].upper()}2",
                "name": f"{destination.title()} Vande Bharat Exp",
                "train_number": "20801",
                "departure": "14:15",
                "type": "vande_bharat",
                "class_types": ["CC", "EC"],
                "available_seats": 75,
                "amenities": ["Onboard WiFi", "Meals Included", "Bio-Toilets", "Infotainment"]
            },
            {
                "id": f"TRN-{source[:3].upper()}3",
                "name": f"{source.title()}-{destination.title()} Overnight Mail",
                "train_number": "14055",
                "departure": "21:45",
                "type": "express",
                "class_types": ["Sleeper", "3AC", "2AC"],
                "available_seats": 95,
                "amenities": ["E-Catering", "Clean Bedding", "Bio-Toilets"]
            }
        ]

        for opt in dynamic_options:
            matched.append(_build_train_object(opt, source, destination, date, passengers))

    return matched


def get_train_by_id(train_id: str) -> Optional[dict]:
    for t in _RAW_TRAINS:
        if t["id"] == train_id:
            return t
    return None
