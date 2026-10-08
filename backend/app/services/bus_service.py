MOCK_BUSES = [
    {"id": "BUS001", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Delhi", "destination": "Hyderabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 931, "available_seats": 34},
    {"id": "BUS002", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Hyderabad", "destination": "Bangalore", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1417, "available_seats": 22},
    {"id": "BUS003", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Hyderabad", "destination": "Delhi", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 607, "available_seats": 25},
    {"id": "BUS004", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Bangalore", "destination": "Jaipur", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 619, "available_seats": 40},
    {"id": "BUS005", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Firozabad", "destination": "Bangalore", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1253, "available_seats": 24},
    {"id": "BUS006", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Mumbai", "destination": "Firozabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 904, "available_seats": 8},
    {"id": "BUS007", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Mumbai", "destination": "Hyderabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1100, "available_seats": 12},
    {"id": "BUS008", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Firozabad", "destination": "Bangalore", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1109, "available_seats": 12},
    {"id": "BUS009", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Bangalore", "destination": "Delhi", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 868, "available_seats": 12},
    {"id": "BUS010", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Lucknow", "destination": "Firozabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1326, "available_seats": 27},
    {"id": "BUS011", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Hyderabad", "destination": "Jaipur", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1213, "available_seats": 35},
    {"id": "BUS012", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Bangalore", "destination": "Mumbai", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 847, "available_seats": 10},
    {"id": "BUS013", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Hyderabad", "destination": "Bangalore", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1286, "available_seats": 37},
    {"id": "BUS014", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Hyderabad", "destination": "Kanpur", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 719, "available_seats": 27},
    {"id": "BUS015", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Kochi", "destination": "Firozabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1179, "available_seats": 13},
    {"id": "BUS016", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Jaipur", "destination": "Hyderabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1164, "available_seats": 38},
    {"id": "BUS017", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Bangalore", "destination": "Jaipur", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 930, "available_seats": 18},
    {"id": "BUS018", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Jaipur", "destination": "Firozabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 634, "available_seats": 8},
    {"id": "BUS019", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Kanpur", "destination": "Hyderabad", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1266, "available_seats": 22},
    {"id": "BUS020", "operator": "SmartBus", "bus_type": "Volvo A/C Semi Sleeper", "source": "Agra", "destination": "Kanpur", "departure": "22:00", "arrival": "06:00", "duration": "8h 00m", "price": 1185, "available_seats": 17}
]

def search_buses(source: str, destination: str, date: str, passengers: int):
    # Basic mock search
    results = []
    for b in MOCK_BUSES:
        if source.lower() in b["source"].lower() and destination.lower() in b["destination"].lower():
            results.append(b)
    if not results and source and destination:
        results.append({
            "id": "BUS-FALLBACK", "operator": "TripPilot Connect", "bus_type": "Volvo A/C Semi Sleeper",
            "source": source, "destination": destination, "departure": "22:00", "arrival": "06:00",
            "duration": "8h 00m", "price": 800, "available_seats": 40, "is_demo": True
        })
    return results
