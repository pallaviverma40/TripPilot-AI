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
    "3AC":     1.8,
    "2AC":     2.5,
    "1AC":     3.5,
}

def _build_classes(base_price: int, class_types: list, seats: int) -> list:
    """Turn a list of class names + base price into structured class objects."""
    result = []
    total_seats = max(seats, 20)
    seat_dist = {"Sleeper": total_seats, "3AC": max(8, total_seats // 3),
                 "2AC": max(4, total_seats // 5), "1AC": max(2, total_seats // 10)}
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
    {"id": "TRN001", "name": "Taj Express",       "train_number": "19951", "source": "Delhi",     "source_code": "NDLS", "destination": "Hyderabad", "destination_code": "HYB",  "departure": "06:30", "arrival": "22:00", "duration": "15h 30m", "base_price": 600,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 86, "amenities": ["E-Catering","Clean Bedding","Charging Point","Bio-Toilets"]},
    {"id": "TRN002", "name": "Rajdhani Express",  "train_number": "12309", "source": "Lucknow",   "source_code": "LKO",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "10:00", "arrival": "16:30", "duration": "6h 30m",  "base_price": 380,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 92, "amenities": ["Meals Included","Clean Bedding","Charging Point"]},
    {"id": "TRN003", "name": "Gomti Express",     "train_number": "12420", "source": "Mumbai",    "source_code": "BCT",  "destination": "Jaipur",    "destination_code": "JP",   "departure": "19:30", "arrival": "09:00", "duration": "13h 30m", "base_price": 520,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 11, "amenities": ["Charging Point","Clean Bedding"]},
    {"id": "TRN004", "name": "Vande Bharat Exp",  "train_number": "22436", "source": "Lucknow",   "source_code": "LKO",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "06:00", "arrival": "11:45", "duration": "5h 45m",  "base_price": 900,  "class_types": ["CC","EC"],                  "available_seats": 78, "amenities": ["Pantry Car","Bio-Toilets","Charging Point","Onboard WiFi"]},
    {"id": "TRN005", "name": "Karnataka Exp",     "train_number": "12627", "source": "Bangalore", "source_code": "SBC",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "20:15", "arrival": "06:30", "duration": "34h 15m", "base_price": 750,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 23, "amenities": ["E-Catering","Clean Bedding","Bio-Toilets","Pantry Car"]},
    {"id": "TRN006", "name": "Vande Bharat Exp",  "train_number": "20647", "source": "Bangalore", "source_code": "SBC",  "destination": "Hyderabad", "destination_code": "HYB",  "departure": "05:55", "arrival": "11:00", "duration": "5h 05m",  "base_price": 950,  "class_types": ["CC","EC"],                  "available_seats": 83, "amenities": ["Pantry Car","Bio-Toilets","Charging Point"]},
    {"id": "TRN007", "name": "Duronto Express",   "train_number": "12285", "source": "Jaipur",    "source_code": "JP",   "destination": "Delhi",     "destination_code": "NDLS", "departure": "05:45", "arrival": "11:10", "duration": "5h 25m",  "base_price": 290,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 22, "amenities": ["E-Catering","Bio-Toilets"]},
    {"id": "TRN008", "name": "Kashi Vishwanath",  "train_number": "15159", "source": "Varanasi",  "source_code": "BSB",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "21:50", "arrival": "07:10", "duration": "9h 20m",  "base_price": 430,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 33, "amenities": ["E-Catering","Bio-Toilets","Charging Point"]},
    {"id": "TRN009", "name": "Lucknow Mail",      "train_number": "12229", "source": "Lucknow",   "source_code": "LKO",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "22:15", "arrival": "05:30", "duration": "7h 15m",  "base_price": 320,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 47, "amenities": ["Charging Point","Bio-Toilets"]},
    {"id": "TRN010", "name": "Shatabdi Express",  "train_number": "12001", "source": "Lucknow",   "source_code": "LKO",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "06:15", "arrival": "10:35", "duration": "4h 20m",  "base_price": 745,  "class_types": ["CC","EC"],                  "available_seats": 90, "amenities": ["Meals Included","Charging Point","Bio-Toilets"]},
    {"id": "TRN011", "name": "Deccan Queen",      "train_number": "12124", "source": "Pune",      "source_code": "PUNE", "destination": "Mumbai",    "destination_code": "BCT",  "departure": "07:15", "arrival": "10:35", "duration": "3h 20m",  "base_price": 210,  "class_types": ["CC","FC"],                  "available_seats": 93, "amenities": ["Dining Car","Clean Coaches"]},
    {"id": "TRN012", "name": "Rajdhani Express",  "train_number": "12951", "source": "Delhi",     "source_code": "NDLS", "destination": "Mumbai",    "destination_code": "BCT",  "departure": "16:55", "arrival": "08:35", "duration": "15h 40m", "base_price": 650,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 81, "amenities": ["Meals Included","Clean Bedding","Charging Point"]},
    {"id": "TRN013", "name": "Hyderabad Exp",     "train_number": "17031", "source": "Hyderabad", "source_code": "HYB",  "destination": "Mumbai",    "destination_code": "BCT",  "departure": "06:20", "arrival": "22:10", "duration": "15h 50m", "base_price": 480,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 30, "amenities": ["E-Catering","Clean Bedding","Charging Point"]},
    {"id": "TRN014", "name": "Chennai Mail",      "train_number": "12163", "source": "Chennai",   "source_code": "MAS",  "destination": "Mumbai",    "destination_code": "BCT",  "departure": "18:55", "arrival": "14:00", "duration": "19h 05m", "base_price": 680,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 18, "amenities": ["Bio-Toilets","E-Catering","Pantry Car"]},
    {"id": "TRN015", "name": "Humsafar Express",  "train_number": "12283", "source": "Delhi",     "source_code": "NDLS", "destination": "Lucknow",   "destination_code": "LKO",  "departure": "22:40", "arrival": "05:30", "duration": "6h 50m",  "base_price": 900,  "class_types": ["3AC"],                      "available_seats": 21, "amenities": ["3AC Only","Charging Point","Clean Bedding","Bio-Toilets"]},
    {"id": "TRN016", "name": "Jaipur Superfast",  "train_number": "12985", "source": "Jaipur",    "source_code": "JP",   "destination": "Mumbai",    "destination_code": "BCT",  "departure": "09:15", "arrival": "04:50", "duration": "19h 35m", "base_price": 590,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 69, "amenities": ["Bio-Toilets","Pantry Car","Charging Point"]},
    {"id": "TRN017", "name": "Rajdhani Express",  "train_number": "22691", "source": "Bangalore", "source_code": "SBC",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "21:00", "arrival": "06:00", "duration": "33h 00m", "base_price": 820,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 17, "amenities": ["Meals Included","Pantry Car","Clean Bedding"]},
    {"id": "TRN018", "name": "Amritsar Express",  "train_number": "12031", "source": "Delhi",     "source_code": "NDLS", "destination": "Amritsar",  "destination_code": "ASR",  "departure": "07:20", "arrival": "13:10", "duration": "5h 50m",  "base_price": 340,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 50, "amenities": ["E-Catering","Bio-Toilets","Charging Point"]},
    {"id": "TRN019", "name": "Chandigarh Exp",    "train_number": "12245", "source": "Delhi",     "source_code": "NDLS", "destination": "Chandigarh","destination_code": "CDG",  "departure": "08:30", "arrival": "12:00", "duration": "3h 30m",  "base_price": 260,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 17, "amenities": ["Bio-Toilets","Charging Point"]},
    {"id": "TRN020", "name": "Srinagar Exp",      "train_number": "11078", "source": "Delhi",     "source_code": "NDLS", "destination": "Srinagar",  "destination_code": "JAT",  "departure": "17:00", "arrival": "11:00", "duration": "18h 00m", "base_price": 650,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 12, "amenities": ["Clean Bedding","Bio-Toilets","Pantry Car"]},
    {"id": "TRN021", "name": "Kolkata Mail",      "train_number": "12312", "source": "Delhi",     "source_code": "NDLS", "destination": "Kolkata",   "destination_code": "HWH",  "departure": "16:50", "arrival": "10:00", "duration": "17h 10m", "base_price": 570,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 18, "amenities": ["Bio-Toilets","Charging Point","E-Catering","Pantry Car"]},
    {"id": "TRN022", "name": "Durgiana Express",  "train_number": "12627", "source": "Amritsar",  "source_code": "ASR",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "18:40", "arrival": "01:00", "duration": "6h 20m",  "base_price": 340,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 88, "amenities": ["Clean Bedding","Charging Point","Bio-Toilets","Pantry Car"]},
    {"id": "TRN023", "name": "Patna Rajdhani",    "train_number": "12309", "source": "Patna",     "source_code": "PNBE", "destination": "Delhi",     "destination_code": "NDLS", "departure": "18:00", "arrival": "08:50", "duration": "14h 50m", "base_price": 520,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 14, "amenities": ["Meals Included","Pantry Car","Charging Point","Clean Bedding"]},
    {"id": "TRN024", "name": "Puri Express",      "train_number": "12002", "source": "Bhubaneswar","source_code": "BBS", "destination": "Kolkata",   "destination_code": "HWH",  "departure": "04:55", "arrival": "09:50", "duration": "4h 55m",  "base_price": 270,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 100, "amenities": ["Bio-Toilets","E-Catering","Clean Bedding","Charging Point"]},
    {"id": "TRN025", "name": "Guwahati Raj",      "train_number": "12235", "source": "Guwahati",  "source_code": "GHY",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "13:15", "arrival": "11:30", "duration": "46h 15m", "base_price": 850,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 100, "amenities": ["Meals Included","Charging Point","Pantry Car","Clean Bedding"]},
    {"id": "TRN026", "name": "Udaipur Exp",       "train_number": "12963", "source": "Udaipur",   "source_code": "UDR",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "20:10", "arrival": "11:10", "duration": "15h 00m", "base_price": 420,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 41, "amenities": ["Charging Point","E-Catering","Bio-Toilets","Clean Bedding"]},
    {"id": "TRN027", "name": "Howrah Rajdhani",   "train_number": "12301", "source": "Kolkata",   "source_code": "HWH",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "14:05", "arrival": "10:00", "duration": "19h 55m", "base_price": 700,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 45, "amenities": ["Meals Included","Charging Point","Bio-Toilets","Clean Bedding"]},
    {"id": "TRN028", "name": "Coromandel Exp",    "train_number": "12841", "source": "Chennai",   "source_code": "MAS",  "destination": "Kolkata",   "destination_code": "HWH",  "departure": "09:00", "arrival": "04:55", "duration": "19h 55m", "base_price": 610,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 54, "amenities": ["Charging Point","Pantry Car","Bio-Toilets","Clean Bedding"]},
    {"id": "TRN029", "name": "Mumbai Rajdhani",   "train_number": "12951", "source": "Mumbai",    "source_code": "BCT",  "destination": "Ahmedabad", "destination_code": "ADI",  "departure": "06:25", "arrival": "13:10", "duration": "6h 45m",  "base_price": 350,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 10, "amenities": ["Clean Bedding","Pantry Car","E-Catering","Bio-Toilets"]},
    {"id": "TRN030", "name": "Ahmedabad Exp",     "train_number": "12009", "source": "Ahmedabad", "source_code": "ADI",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "11:00", "arrival": "05:30", "duration": "18h 30m", "base_price": 530,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 12, "amenities": ["Clean Bedding","Pantry Car","E-Catering","Bio-Toilets"]},
    {"id": "TRN031", "name": "Intercity Exp",     "train_number": "12170", "source": "Pune",      "source_code": "PUNE", "destination": "Nashik",    "destination_code": "NK",   "departure": "07:00", "arrival": "10:30", "duration": "3h 30m",  "base_price": 185,  "class_types": ["CC","SL"],                  "available_seats": 66, "amenities": ["Clean Coaches","Bio-Toilets"]},
    {"id": "TRN032", "name": "Visakha Express",   "train_number": "18519", "source": "Visakhapatnam","source_code": "VSKP","destination": "Hyderabad","destination_code": "HYB", "departure": "06:30", "arrival": "17:00", "duration": "10h 30m", "base_price": 390,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 99, "amenities": ["Pantry Car","E-Catering","Clean Bedding","Bio-Toilets"]},
    {"id": "TRN033", "name": "Kochi Rajdhani",    "train_number": "12431", "source": "Kochi",     "source_code": "ERS",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "11:00", "arrival": "18:00", "duration": "31h 00m", "base_price": 880,  "class_types": ["3AC","2AC","1AC"],          "available_seats": 62, "amenities": ["Meals Included","Clean Bedding","Pantry Car"]},
    {"id": "TRN034", "name": "Madurai Exp",       "train_number": "16737", "source": "Madurai",   "source_code": "MDU",  "destination": "Chennai",   "destination_code": "MAS",  "departure": "21:00", "arrival": "05:30", "duration": "8h 30m",  "base_price": 280,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 75, "amenities": ["E-Catering","Pantry Car","Bio-Toilets"]},
    {"id": "TRN035", "name": "Coimbatore Exp",    "train_number": "12677", "source": "Coimbatore","source_code": "CBE",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "20:15", "arrival": "23:00", "duration": "26h 45m", "base_price": 750,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 86, "amenities": ["E-Catering","Clean Bedding"]},
    {"id": "TRN036", "name": "Lucknow-Varanasi Intercity","train_number":"14236","source":"Lucknow","source_code":"LKO","destination":"Varanasi","destination_code":"BSB","departure":"06:00","arrival":"10:30","duration":"4h 30m","base_price":195,"class_types":["Sleeper","3AC","2AC"],"available_seats":25,"amenities":["Charging Point","Clean Bedding","Bio-Toilets"]},
    {"id": "TRN037", "name": "Taj Express",       "train_number": "12179", "source": "Delhi",     "source_code": "NDLS", "destination": "Agra",      "destination_code": "AGC",  "departure": "07:15", "arrival": "09:55", "duration": "2h 40m",  "base_price": 165,  "class_types": ["CC","SL","3AC"],            "available_seats": 17, "amenities": ["Charging Point","Bio-Toilets","Clean Bedding","E-Catering"]},
    {"id": "TRN038", "name": "Varanasi-Delhi Exp","train_number": "15707", "source": "Varanasi",  "source_code": "BSB",  "destination": "Delhi",     "destination_code": "NDLS", "departure": "18:00", "arrival": "08:00", "duration": "14h 00m", "base_price": 440,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 98, "amenities": ["Charging Point","E-Catering","Bio-Toilets","Clean Bedding"]},
    {"id": "TRN039", "name": "Patna-Lucknow Exp", "train_number": "15008", "source": "Patna",     "source_code": "PNBE", "destination": "Lucknow",  "destination_code": "LKO",  "departure": "13:00", "arrival": "21:30", "duration": "8h 30m",  "base_price": 260,  "class_types": ["Sleeper","3AC","2AC","1AC"], "available_seats": 73, "amenities": ["E-Catering","Clean Bedding"]},
    {"id": "TRN040", "name": "Guwahati-Kolkata Exp","train_number":"13174","source":"Guwahati","source_code":"GHY","destination":"Kolkata","destination_code":"HWH","departure":"08:00","arrival":"23:00","duration":"15h 00m","base_price":430,"class_types":["Sleeper","3AC","2AC","1AC"],"available_seats":61,"amenities":["Clean Bedding","Bio-Toilets","Charging Point","Pantry Car"]},
]

# Build the final MOCK_TRAINS list with proper class objects
MOCK_TRAINS = []
for _t in _RAW_TRAINS:
    train = {k: v for k, v in _t.items() if k not in ("base_price", "class_types")}
    train["base_price"] = _t["base_price"]
    train["classes"] = _build_classes(_t["base_price"], _t["class_types"], _t["available_seats"])
    train["price"] = _t["base_price"]   # keep for backward compat (lowest class price)
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
