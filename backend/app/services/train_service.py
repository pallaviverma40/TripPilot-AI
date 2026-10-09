"""
Train Service — Mock Data
Pricing model:
  base_price = Sleeper (2S/SL) price
  3AC  = base × 1.8
  2AC  = base × 2.5
  1AC  = base × 3.5
  CC/EC (chair-car trains like Vande Bharat / Shatabdi) = base × 1.2 / 1.6
"""

CLASS_MULTIPLIERS = {
    "Sleeper": 1.0,
    "SL":      1.0,
    "3AC":     1.8,
    "2AC":     2.5,
    "1AC":     3.5,
    "CC":      1.2,
    "EC":      1.6,
    "FC":      2.0,
}

def _build_classes(base_price: int, class_types: list, seats: int) -> list:
    """Turn a list of class names + base price into structured class objects."""
    result = []
    total_seats = max(seats, 20)
    seat_dist = {
        "Sleeper": total_seats, "SL": total_seats,
        "3AC": max(8, total_seats // 3),
        "2AC": max(4, total_seats // 5),
        "1AC": max(2, total_seats // 10),
        "CC": total_seats,
        "EC": max(4, total_seats // 2),
        "FC": max(2, total_seats // 4)
    }
    for c in class_types:
        multiplier = CLASS_MULTIPLIERS.get(c, 1.0)
        result.append({
            "type": c,
            "name": c,
            "price": round(base_price * multiplier),
            "available": seat_dist.get(c, max(4, total_seats // 4)),
        })
    return result


# Raw data — base_price is the SLEEPER price (lowest tier)
_RAW_TRAINS = [
    # ── Ayodhya (Heritage & Spiritual) ──
    {"id": "TRN051", "name": "Vande Bharat Exp",  "train_number": "22425", "source": "Delhi",     "source_code": "NDLS", "destination": "Ayodhya",   "destination_code": "AY",   "departure": "06:10", "arrival": "14:30", "duration": "8h 20m",  "base_price": 950,  "class_types": ["CC","EC"],                  "available_seats": 85, "amenities": ["Onboard WiFi","Pantry Car","Charging Point","Bio-Toilets"]},
    {"id": "TRN052", "name": "Ayodhya Express",   "train_number": "14206", "source": "Delhi",     "source_code": "NDLS", "destination": "Ayodhya",   "destination_code": "AY",   "departure": "18:20", "arrival": "07:15", "duration": "12h 55m", "base_price": 380,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 64, "amenities": ["E-Catering","Bio-Toilets","Clean Bedding"]},
    {"id": "TRN053", "name": "Saryu Yamuna Exp",  "train_number": "14650", "source": "Lucknow",   "source_code": "LKO",  "destination": "Ayodhya",   "destination_code": "AY",   "departure": "06:40", "arrival": "09:10", "duration": "2h 30m",  "base_price": 140,  "class_types": ["Sleeper","3AC","2AC"],       "available_seats": 90, "amenities": ["Bio-Toilets","Charging Point"]},
    {"id": "TRN054", "name": "Ayodhya Cantt Exp", "train_number": "22183", "source": "Mumbai",    "source_code": "BCT",  "destination": "Ayodhya",   "destination_code": "AY",   "departure": "06:00", "arrival": "07:30", "duration": "25h 30m", "base_price": 680,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 34, "amenities": ["Pantry Car","Clean Bedding","Charging Point"]},

    # ── Haridwar (Ghats & Ashrams) ──
    {"id": "TRN055", "name": "Vande Bharat Exp",  "train_number": "22457", "source": "Delhi",     "source_code": "NDLS", "destination": "Haridwar",  "destination_code": "HW",   "departure": "17:50", "arrival": "21:35", "duration": "3h 45m",  "base_price": 750,  "class_types": ["CC","EC"],                  "available_seats": 80, "amenities": ["Onboard WiFi","Meals Included","Clean Coaches"]},
    {"id": "TRN056", "name": "Jan Shatabdi Exp",  "train_number": "12055", "source": "Delhi",     "source_code": "NDLS", "destination": "Haridwar",  "destination_code": "HW",   "departure": "15:20", "arrival": "19:35", "duration": "4h 15m",  "base_price": 220,  "class_types": ["CC","2S"],                  "available_seats": 95, "amenities": ["Bio-Toilets","Charging Point"]},
    {"id": "TRN057", "name": "Haridwar Mail",     "train_number": "19031", "source": "Mumbai",    "source_code": "BCT",  "destination": "Haridwar",  "destination_code": "HW",   "departure": "11:25", "arrival": "12:30", "duration": "25h 05m", "base_price": 650,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 40, "amenities": ["Pantry Car","Clean Bedding"]},
    {"id": "TRN058", "name": "Kumbh Express",      "train_number": "12369", "source": "Lucknow",   "source_code": "LKO",  "destination": "Haridwar",  "destination_code": "HW",   "departure": "08:15", "arrival": "15:55", "duration": "7h 40m",  "base_price": 310,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 55, "amenities": ["E-Catering","Bio-Toilets"]},

    # ── Nainital (Nature & Lakes — via Kathgodam KGM) ──
    {"id": "TRN059", "name": "Kathgodam Shatabdi","train_number": "12040", "source": "Delhi",     "source_code": "NDLS", "destination": "Nainital",   "destination_code": "KGM",  "departure": "06:20", "arrival": "11:40", "duration": "5h 20m",  "base_price": 680,  "class_types": ["CC","EC"],                  "available_seats": 70, "amenities": ["Meals Included","Pantry Car","Clean Coaches"]},
    {"id": "TRN060", "name": "Ranikhet Express",  "train_number": "15013", "source": "Delhi",     "source_code": "NDLS", "destination": "Nainital",   "destination_code": "KGM",  "departure": "22:00", "arrival": "05:05", "duration": "7h 05m",  "base_price": 280,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 60, "amenities": ["Clean Bedding","Charging Point"]},
    {"id": "TRN061", "name": "Bagh Express",      "train_number": "13019", "source": "Lucknow",   "source_code": "LKO",  "destination": "Nainital",   "destination_code": "KGM",  "departure": "00:30", "arrival": "09:25", "duration": "8h 55m",  "base_price": 260,  "class_types": ["Sleeper","3AC","2AC"],       "available_seats": 50, "amenities": ["Bio-Toilets","E-Catering"]},

    # ── Varanasi (Kashi Vishwanath & Banaras) ──
    {"id": "TRN062", "name": "Vande Bharat Exp",  "train_number": "22436", "source": "Delhi",     "source_code": "NDLS", "destination": "Varanasi",   "destination_code": "BSB",  "departure": "06:00", "arrival": "14:00", "duration": "8h 00m",  "base_price": 1050, "class_types": ["CC","EC"],                  "available_seats": 85, "amenities": ["Pantry Car","Onboard WiFi","Meals Included"]},
    {"id": "TRN063", "name": "Shiv Ganga Exp",    "train_number": "12560", "source": "Delhi",     "source_code": "NDLS", "destination": "Varanasi",   "destination_code": "BSB",  "departure": "20:05", "arrival": "06:10", "duration": "10h 05m", "base_price": 420,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 70, "amenities": ["Clean Bedding","Bio-Toilets"]},
    {"id": "TRN064", "name": "Kashi Vishwanath",  "train_number": "15128", "source": "Lucknow",   "source_code": "LKO",  "destination": "Varanasi",   "destination_code": "BSB",  "departure": "21:15", "arrival": "04:40", "duration": "7h 25m",  "base_price": 210,  "class_types": ["Sleeper","3AC","2AC"],       "available_seats": 80, "amenities": ["Charging Point","Clean Coaches"]},

    # ── Jammu & Kashmir (Jammu Tawi JAT) ──
    {"id": "TRN065", "name": "Vande Bharat Exp",  "train_number": "22439", "source": "Delhi",     "source_code": "NDLS", "destination": "Jammu and Kashmir","destination_code": "JAT", "departure": "06:00", "arrival": "14:00", "duration": "8h 00m",  "base_price": 1100, "class_types": ["CC","EC"],                  "available_seats": 90, "amenities": ["Meals Included","Pantry Car","High Speed"]},
    {"id": "TRN066", "name": "Jammu Rajdhani",    "train_number": "12425", "source": "Delhi",     "source_code": "NDLS", "destination": "Jammu and Kashmir","destination_code": "JAT", "departure": "20:40", "arrival": "05:00", "duration": "8h 20m",  "base_price": 750,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 60, "amenities": ["Meals Included","Clean Bedding"]},
    {"id": "TRN067", "name": "Malwa Express",     "train_number": "12919", "source": "Mumbai",    "source_code": "BCT",  "destination": "Jammu and Kashmir","destination_code": "JAT", "departure": "09:15", "arrival": "16:05", "duration": "30h 50m", "base_price": 820,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 35, "amenities": ["Pantry Car","Clean Bedding"]},

    # ── Raipur (Tribal Culture & Nature) ──
    {"id": "TRN068", "name": "Bilaspur Rajdhani", "train_number": "12442", "source": "Delhi",     "source_code": "NDLS", "destination": "Raipur",     "destination_code": "R",    "departure": "15:25", "arrival": "08:15", "duration": "16h 50m", "base_price": 680,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 45, "amenities": ["Meals Included","Clean Bedding"]},
    {"id": "TRN069", "name": "Chhattisgarh Exp",  "train_number": "18238", "source": "Mumbai",    "source_code": "BCT",  "destination": "Raipur",     "destination_code": "R",    "departure": "00:30", "arrival": "19:00", "duration": "18h 30m", "base_price": 530,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 50, "amenities": ["Pantry Car","Charging Point"]},
    {"id": "TRN070", "name": "Howrah Mail",       "train_number": "12809", "source": "Kolkata",   "source_code": "HWH",  "destination": "Raipur",     "destination_code": "R",    "departure": "20:05", "arrival": "08:50", "duration": "12h 45m", "base_price": 460,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 60, "amenities": ["Clean Bedding","Bio-Toilets"]},

    # ── Karnataka (Bangalore, Mysore, Hampi) ──
    {"id": "TRN071", "name": "Karnataka Exp",     "train_number": "12627", "source": "Delhi",     "source_code": "NDLS", "destination": "Karnataka",  "destination_code": "SBC",  "departure": "20:15", "arrival": "06:30", "duration": "34h 15m", "base_price": 750,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 50, "amenities": ["E-Catering","Clean Bedding","Pantry Car"]},
    {"id": "TRN072", "name": "Mysore Vande Bharat","train_number":"20607", "source": "Chennai",   "source_code": "MAS",  "destination": "Karnataka",  "destination_code": "MYS",  "departure": "05:50", "arrival": "12:20", "duration": "6h 30m",  "base_price": 780,  "class_types": ["CC","EC"],                  "available_seats": 85, "amenities": ["Meals Included","Pantry Car","Clean Coaches"]},
    {"id": "TRN073", "name": "Hampi Express",     "train_number": "16591", "source": "Bangalore", "source_code": "SBC",  "destination": "Karnataka",  "destination_code": "HPT",  "departure": "21:50", "arrival": "07:10", "duration": "9h 20m",  "base_price": 320,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 65, "amenities": ["Clean Bedding","Bio-Toilets"]},

    # ── Standard Trunk Routes ──
    {"id": "TRN001", "name": "Taj Express",       "train_number": "19951", "source": "Delhi",     "source_code": "NDLS", "destination": "Hyderabad", "destination_code": "HYB",  "departure": "06:30", "arrival": "22:00", "duration": "15h 30m", "base_price": 600,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 86, "amenities": ["E-Catering","Clean Bedding","Charging Point","Bio-Toilets"]},
    {"id": "TRN002", "name": "Rajdhani Express",  "train_number": "12309", "source": "Lucknow",   "source_code": "LKO",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "10:00", "arrival": "16:30", "duration": "6h 30m",  "base_price": 380,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 92, "amenities": ["Meals Included","Clean Bedding","Charging Point"]},
    {"id": "TRN012", "name": "Rajdhani Express",  "train_number": "12951", "source": "Delhi",     "source_code": "NDLS", "destination": "Mumbai",    "destination_code": "BCT",  "departure": "16:55", "arrival": "08:35", "duration": "15h 40m", "base_price": 650,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 81, "amenities": ["Meals Included","Clean Bedding","Charging Point"]},
]

# Build final MOCK_TRAINS list with proper class objects
MOCK_TRAINS = []
for _t in _RAW_TRAINS:
    train = {k: v for k, v in _t.items() if k not in ("base_price", "class_types")}
    train["base_price"] = _t["base_price"]
    train["classes"] = _build_classes(_t["base_price"], _t["class_types"], _t["available_seats"])
    train["price"] = _t["base_price"]
    MOCK_TRAINS.append(train)


def search_trains(source: str, destination: str, date: str, passengers: int) -> list:
    """Search trains with case-insensitive partial matching. Returns per-class pricing."""
    src = source.lower().strip()
    dst = destination.lower().strip()
    results = []
    for t in MOCK_TRAINS:
        src_match = src in t["source"].lower() or t["source"].lower() in src
        dst_match = dst in t["destination"].lower() or t["destination"].lower() in dst
        if src_match and dst_match:
            record = dict(t)
            record["passengers"] = passengers
            record["travel_date"] = date
            record["is_demo"] = True
            results.append(record)

    if not results and source and destination:
        base = 450
        results.append({
            "id": "TRN-FALLBACK",
            "name": "TripPilot Express",
            "train_number": "19900",
            "source": source,
            "source_code": source[:3].upper(),
            "destination": destination,
            "destination_code": destination[:3].upper(),
            "departure": "08:00",
            "arrival": "20:00",
            "duration": "12h 00m",
            "base_price": base,
            "price": base,
            "classes": _build_classes(base, ["Sleeper","3AC","2AC","1AC"], 100),
            "available_seats": 100,
            "amenities": ["Clean Bedding","Pantry Car"],
            "passengers": passengers,
            "travel_date": date,
            "is_demo": True,
        })
    return results


def get_train_by_id(train_id: str):
    for t in MOCK_TRAINS:
        if t["id"] == train_id:
            return t
    return None
