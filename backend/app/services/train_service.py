"""
Train Service — Mock Data
Realistic IRCTC-style train data for Indian routes in Demo Mode.
"""

MOCK_TRAINS = [
    # ── Lucknow → Delhi ──
    {"id": "TR001", "train_name": "Lucknow Shatabdi", "train_number": "12004", "source": "Lucknow", "destination": "Delhi", "departure": "06:15", "arrival": "12:45", "duration": "6h 30m", "classes": [{"type": "CC", "name": "Chair Car", "price": 790, "available": 200}, {"type": "EC", "name": "Executive Chair", "price": 1510, "available": 40}], "stops": 2, "distance": "512km", "type": "Shatabdi", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
    {"id": "TR002", "train_name": "Lucknow Mail", "train_number": "12230", "source": "Lucknow", "destination": "Delhi", "departure": "22:30", "arrival": "05:50+1", "duration": "7h 20m", "classes": [{"type": "SL", "name": "Sleeper", "price": 340, "available": 320}, {"type": "3A", "name": "AC 3 Tier", "price": 890, "available": 80}, {"type": "2A", "name": "AC 2 Tier", "price": 1290, "available": 30}, {"type": "1A", "name": "AC First Class", "price": 2150, "available": 10}], "stops": 4, "distance": "512km", "type": "Mail", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
    {"id": "TR003", "train_name": "Gomti Express", "train_number": "12420", "source": "Lucknow", "destination": "Delhi", "departure": "17:00", "arrival": "23:15", "duration": "6h 15m", "classes": [{"type": "SL", "name": "Sleeper", "price": 310, "available": 280}, {"type": "3A", "name": "AC 3 Tier", "price": 810, "available": 60}, {"type": "2A", "name": "AC 2 Tier", "price": 1150, "available": 25}], "stops": 3, "distance": "512km", "type": "Express", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},

    # ── Delhi → Goa ──
    {"id": "TR004", "train_name": "Goa Express", "train_number": "12779", "source": "Delhi", "destination": "Goa", "departure": "15:00", "arrival": "11:00+2", "duration": "44h", "classes": [{"type": "SL", "name": "Sleeper", "price": 680, "available": 400}, {"type": "3A", "name": "AC 3 Tier", "price": 1850, "available": 100}, {"type": "2A", "name": "AC 2 Tier", "price": 2650, "available": 40}], "stops": 12, "distance": "1882km", "type": "Superfast", "days": ["Mon","Wed","Fri","Sun"]},
    {"id": "TR005", "train_name": "Mandovi Express", "train_number": "10104", "source": "Delhi", "destination": "Goa", "departure": "07:30", "arrival": "08:15+2", "duration": "48h 45m", "classes": [{"type": "SL", "name": "Sleeper", "price": 620, "available": 360}, {"type": "3A", "name": "AC 3 Tier", "price": 1680, "available": 90}], "stops": 18, "distance": "1882km", "type": "Express", "days": ["Tue","Thu","Sat"]},

    # ── Lucknow → Mumbai ──
    {"id": "TR006", "train_name": "Pushpak Express", "train_number": "12534", "source": "Lucknow", "destination": "Mumbai", "departure": "18:35", "arrival": "14:45+1", "duration": "20h 10m", "classes": [{"type": "SL", "name": "Sleeper", "price": 490, "available": 350}, {"type": "3A", "name": "AC 3 Tier", "price": 1290, "available": 75}, {"type": "2A", "name": "AC 2 Tier", "price": 1850, "available": 30}], "stops": 8, "distance": "1400km", "type": "Superfast", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
    {"id": "TR007", "train_name": "Mumbai LTT Express", "train_number": "12106", "source": "Lucknow", "destination": "Mumbai", "departure": "12:00", "arrival": "08:30+1", "duration": "20h 30m", "classes": [{"type": "SL", "name": "Sleeper", "price": 460, "available": 380}, {"type": "3A", "name": "AC 3 Tier", "price": 1210, "available": 80}], "stops": 9, "distance": "1400km", "type": "Express", "days": ["Mon","Wed","Fri"]},

    # ── Delhi → Mumbai ──
    {"id": "TR008", "train_name": "Rajdhani Express", "train_number": "12952", "source": "Delhi", "destination": "Mumbai", "departure": "16:55", "arrival": "08:35+1", "duration": "15h 40m", "classes": [{"type": "3A", "name": "AC 3 Tier", "price": 2015, "available": 100}, {"type": "2A", "name": "AC 2 Tier", "price": 2855, "available": 40}, {"type": "1A", "name": "AC First Class", "price": 4895, "available": 15}], "stops": 3, "distance": "1384km", "type": "Rajdhani", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
    {"id": "TR009", "train_name": "August Kranti Rajdhani", "train_number": "12954", "source": "Delhi", "destination": "Mumbai", "departure": "17:40", "arrival": "11:05+1", "duration": "17h 25m", "classes": [{"type": "3A", "name": "AC 3 Tier", "price": 1890, "available": 90}, {"type": "2A", "name": "AC 2 Tier", "price": 2650, "available": 35}], "stops": 5, "distance": "1384km", "type": "Rajdhani", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
    {"id": "TR010", "train_name": "Golden Temple Mail", "train_number": "12904", "source": "Delhi", "destination": "Mumbai", "departure": "22:10", "arrival": "18:35+1", "duration": "20h 25m", "classes": [{"type": "SL", "name": "Sleeper", "price": 450, "available": 400}, {"type": "3A", "name": "AC 3 Tier", "price": 1180, "available": 95}], "stops": 12, "distance": "1384km", "type": "Mail", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},

    # ── Bangalore → Delhi ──
    {"id": "TR011", "train_name": "Rajdhani Express", "train_number": "22692", "source": "Bangalore", "destination": "Delhi", "departure": "20:00", "arrival": "05:50+2", "duration": "33h 50m", "classes": [{"type": "3A", "name": "AC 3 Tier", "price": 2510, "available": 80}, {"type": "2A", "name": "AC 2 Tier", "price": 3540, "available": 30}, {"type": "1A", "name": "AC First Class", "price": 5990, "available": 10}], "stops": 6, "distance": "2190km", "type": "Rajdhani", "days": ["Mon","Wed","Fri","Sun"]},

    # ── Kolkata → Delhi ──
    {"id": "TR012", "train_name": "Rajdhani Express", "train_number": "12302", "source": "Kolkata", "destination": "Delhi", "departure": "16:55", "arrival": "10:00+1", "duration": "17h 05m", "classes": [{"type": "3A", "name": "AC 3 Tier", "price": 1890, "available": 100}, {"type": "2A", "name": "AC 2 Tier", "price": 2650, "available": 40}, {"type": "1A", "name": "AC First Class", "price": 4500, "available": 12}], "stops": 4, "distance": "1441km", "type": "Rajdhani", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
    {"id": "TR013", "train_name": "Duronto Express", "train_number": "12260", "source": "Kolkata", "destination": "Delhi", "departure": "20:05", "arrival": "12:25+1", "duration": "16h 20m", "classes": [{"type": "SL", "name": "Sleeper", "price": 680, "available": 300}, {"type": "3A", "name": "AC 3 Tier", "price": 1780, "available": 70}], "stops": 2, "distance": "1441km", "type": "Duronto", "days": ["Mon","Thu"]},

    # ── Mumbai → Goa ──
    {"id": "TR014", "train_name": "Konkan Kanya Express", "train_number": "10112", "source": "Mumbai", "destination": "Goa", "departure": "23:00", "arrival": "11:35+1", "duration": "12h 35m", "classes": [{"type": "SL", "name": "Sleeper", "price": 290, "available": 350}, {"type": "3A", "name": "AC 3 Tier", "price": 760, "available": 80}], "stops": 14, "distance": "590km", "type": "Express", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
    {"id": "TR015", "train_name": "Jan Shatabdi Express", "train_number": "12051", "source": "Mumbai", "destination": "Goa", "departure": "05:20", "arrival": "13:25", "duration": "8h 05m", "classes": [{"type": "CC", "name": "Chair Car", "price": 400, "available": 200}, {"type": "2S", "name": "Second Sitting", "price": 195, "available": 400}], "stops": 8, "distance": "590km", "type": "Jan Shatabdi", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},

    # ── Chennai → Delhi ──
    {"id": "TR016", "train_name": "Tamil Nadu Express", "train_number": "12622", "source": "Chennai", "destination": "Delhi", "departure": "22:00", "arrival": "06:30+2", "duration": "32h 30m", "classes": [{"type": "SL", "name": "Sleeper", "price": 620, "available": 380}, {"type": "3A", "name": "AC 3 Tier", "price": 1650, "available": 90}, {"type": "2A", "name": "AC 2 Tier", "price": 2340, "available": 35}], "stops": 8, "distance": "2175km", "type": "Superfast", "days": ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},
]


def search_trains(source: str, destination: str, date: str, passengers: int) -> list:
    """Search trains with case-insensitive matching."""
    source_lower = source.lower().strip()
    destination_lower = destination.lower().strip()

    results = []
    for train in MOCK_TRAINS:
        src_match = source_lower in train["source"].lower() or train["source"].lower() in source_lower
        dst_match = destination_lower in train["destination"].lower() or train["destination"].lower() in destination_lower
        if src_match and dst_match:
            t = train.copy()
            # Add base price (cheapest class)
            t["base_price"] = min(c["price"] for c in t["classes"])
            t["total_price"] = t["base_price"] * passengers
            t["passengers"] = passengers
            t["travel_date"] = date
            t["is_demo"] = True
            results.append(t)

    return results


def get_train_by_id(train_id: str):
    for train in MOCK_TRAINS:
        if train["id"] == train_id:
            return train
    return None

