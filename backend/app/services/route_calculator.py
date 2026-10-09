"""
Route Calculator & Distance Engine for Indian Cities
Calculates realistic aerial, rail, and road distances, mode-specific durations,
and dynamic tiered pricing according to Indian transport standards.
"""

import math
from typing import Tuple, Dict, Any, List

# Approximate GPS Coordinates for Indian Cities & Destinations
CITY_COORDINATES = {
    "delhi": (28.6139, 77.2090),
    "lucknow": (26.8467, 80.9462),
    "mumbai": (19.0760, 72.8777),
    "goa": (15.2993, 74.1240),
    "bangalore": (12.9716, 77.5946),
    "karnataka": (12.9716, 77.5946),
    "mysore": (12.2958, 76.6394),
    "coorg": (12.3375, 75.8069),
    "hampi": (15.3350, 76.4600),
    "kolkata": (22.5726, 88.3639),
    "chennai": (13.0827, 80.2707),
    "jaipur": (26.9124, 75.7873),
    "hyderabad": (17.3850, 78.4867),
    "pune": (18.5204, 73.8567),
    "ahmedabad": (23.0225, 72.5714),
    "kochi": (9.9312, 76.2673),
    "varanasi": (25.3176, 82.9739),
    "amritsar": (31.6340, 74.8723),
    "chandigarh": (30.7333, 76.7794),
    "srinagar": (34.0837, 74.7973),
    "jammu": (32.7266, 74.8570),
    "jammu and kashmir": (34.0837, 74.7973),
    "leh": (34.1526, 77.5771),
    "dehradun": (30.3165, 78.0322),
    "haridwar": (29.9457, 78.1642),
    "rishikesh": (30.0869, 78.2676),
    "nainital": (29.3919, 79.4542),
    "ayodhya": (26.7922, 82.1998),
    "raipur": (21.2514, 81.6296),
    "ranchi": (23.3441, 85.3096),
    "udaipur": (24.5854, 73.7125),
    "jodhpur": (26.2389, 73.0243),
    "jaisalmer": (26.9157, 70.9083),
    "patna": (25.5941, 85.1376),
    "bhubaneswar": (20.2961, 85.8245),
    "visakhapatnam": (17.6868, 83.2185),
    "coimbatore": (11.0168, 76.9558),
    "madurai": (9.9252, 78.1198),
    "thiruvananthapuram": (8.5241, 76.9366),
    "indore": (22.7196, 75.8577),
    "bhopal": (23.2599, 77.4126),
    "nagpur": (21.1458, 79.0882),
    "guwahati": (26.1445, 91.7362),
    "port blair": (11.6234, 92.7265),
    "agra": (27.1767, 78.0081),
    "shimla": (31.1048, 77.1734),
    "manali": (32.2432, 77.1892),
    "firozabad": (27.1590, 78.3957),
}

# Mountain / Hilly terrain destinations (affects road speeds)
HILL_DESTINATIONS = {"nainital", "shimla", "manali", "leh", "srinagar", "coorg", "rishikesh", "dehradun"}


def get_city_coords(city_name: str) -> Tuple[float, float]:
    """Look up coordinates for a city with fuzzy matching."""
    if not city_name:
        return (28.6139, 77.2090)  # Default Delhi
    c = city_name.lower().strip()
    if c in CITY_COORDINATES:
        return CITY_COORDINATES[c]
    for k, v in CITY_COORDINATES.items():
        if k in c or c in k:
            return v
    # Fallback to Delhi
    return (28.6139, 77.2090)


def haversine_distance(coord1: Tuple[float, float], coord2: Tuple[float, float]) -> float:
    """Calculate Great-Circle distance in kilometers."""
    lat1, lon1 = math.radians(coord1[0]), math.radians(coord1[1])
    lat2, lon2 = math.radians(coord2[0]), math.radians(coord2[1])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return 6371.0 * c


def get_route_metrics(source: str, destination: str) -> Dict[str, Any]:
    """
    Returns realistic distance (km) and mode-specific realistic durations.
    """
    c1 = get_city_coords(source)
    c2 = get_city_coords(destination)
    direct_km = haversine_distance(c1, c2)

    # Minimum floor for same city or zero coords
    if direct_km < 30:
        direct_km = 450.0

    # Distances by mode
    air_km = max(180, round(direct_km))
    rail_km = max(200, round(direct_km * 1.16))
    road_km = max(210, round(direct_km * 1.22))

    # Determine if route involves hilly terrain
    s_low = source.lower()
    d_low = destination.lower()
    is_hill = any(h in s_low or h in d_low for h in HILL_DESTINATIONS)

    # 1. Flight Duration
    # Flight time = air cruise at ~650 km/h + 30 min taxi/climb/approach
    flight_mins = max(50, round((air_km / 650.0) * 60) + 30)
    flight_h = flight_mins // 60
    flight_m = flight_mins % 60
    flight_duration_str = f"{flight_h}h {flight_m:02d}m" if flight_h > 0 else f"{flight_m}m"

    # 2. Train Durations
    # Vande Bharat / Shatabdi avg 78 km/h; Superfast/Rajdhani avg 68 km/h; Express avg 52 km/h
    vande_mins = max(180, round((rail_km / 78.0) * 60))
    rajdhani_mins = max(210, round((rail_km / 68.0) * 60))
    express_mins = max(240, round((rail_km / 52.0) * 60))

    def fmt_dur(m: int) -> str:
        h = m // 60
        mins = m % 60
        return f"{h}h {mins:02d}m"

    # 3. Bus Duration
    # Plains avg 58 km/h + 30 min breaks; Hills avg 38 km/h + 40 min breaks
    bus_speed = 38.0 if is_hill else 58.0
    bus_breaks = 45 if is_hill else 30
    bus_mins = max(120, round((road_km / bus_speed) * 60) + bus_breaks)
    bus_duration_str = fmt_dur(bus_mins)

    return {
        "air_km": air_km,
        "rail_km": rail_km,
        "road_km": road_km,
        "flight_duration": flight_duration_str,
        "flight_mins": flight_mins,
        "train_durations": {
            "vande_bharat": fmt_dur(vande_mins),
            "rajdhani": fmt_dur(rajdhani_mins),
            "express": fmt_dur(express_mins),
        },
        "bus_duration": bus_duration_str,
        "bus_mins": bus_mins,
    }


def calculate_train_tier_prices(rail_km: int, train_type: str = "express") -> Dict[str, int]:
    """
    Tiered and realistic pricing for Indian trains:
    - Sleeper: ₹300–₹500 (distance scaled)
    - 3AC: ₹800–₹1,200
    - 2AC: ₹1,200–₹1,800
    - 1AC: ₹1,900–₹2,500
    - CC: ₹650–₹1,100
    - EC: ₹1,350–₹2,200
    """
    # Base Sleeper standard fare formula
    base_sl = max(180, min(850, round((130 + rail_km * 0.42) / 10) * 10))

    if "vande" in train_type.lower() or "shatabdi" in train_type.lower():
        cc_price = max(650, min(1450, round((base_sl * 2.2) / 10) * 10))
        ec_price = max(1350, min(2450, round((cc_price * 1.85) / 10) * 10))
        return {
            "CC": cc_price,
            "EC": ec_price,
            "base": cc_price,
        }

    # Standard Rajdhani / Superfast / Express classes
    sl_price = base_sl
    ac3_price = max(780, min(1450, round((base_sl * 2.75) / 10) * 10))
    ac2_price = max(1180, min(2100, round((base_sl * 3.95) / 10) * 10))
    ac1_price = max(1880, min(3200, round((base_sl * 6.20) / 10) * 10))

    return {
        "Sleeper": sl_price,
        "SL": sl_price,
        "3AC": ac3_price,
        "2AC": ac2_price,
        "1AC": ac1_price,
        "base": sl_price,
    }


def calculate_flight_base_fare(air_km: int) -> int:
    """
    Flights Economy base fares starting around ₹3,500–₹5,500.
    """
    # Base formula: ₹3,500 + scaled km
    fare = 3500 + round((air_km * 1.55) / 100) * 100
    return max(3500, min(8500, fare))


def calculate_bus_seat_prices(road_km: int, bus_type: str = "volvo") -> Dict[str, int]:
    """
    Buses: Seater/Sleeper options ranging from ₹500–₹1,200.
    """
    base_fare = max(380, min(1100, round((160 + road_km * 1.28) / 10) * 10))
    
    return {
        "Aisle Seat": max(450, round((base_fare * 0.90) / 10) * 10),
        "Window Seat": max(520, round((base_fare * 1.05) / 10) * 10),
        "Lower Berth": max(750, min(1450, round((base_fare * 1.25) / 10) * 10)),
        "Upper Berth": max(680, min(1300, round((base_fare * 1.15) / 10) * 10)),
        "Single Sleeper": max(890, min(1650, round((base_fare * 1.45) / 10) * 10)),
        "Seater": max(480, round((base_fare * 0.90) / 10) * 10),
        "Semi-Sleeper": max(620, round((base_fare * 1.10) / 10) * 10),
        "Full Sleeper": max(850, min(1500, round((base_fare * 1.35) / 10) * 10)),
        "base": base_fare,
    }

