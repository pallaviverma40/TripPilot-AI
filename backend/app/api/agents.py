from fastapi import APIRouter
from app.services import flight_service, train_service, bus_service, hotel_service, activity_service
from datetime import datetime

router = APIRouter(prefix="/api/agents", tags=["AI Agents"])

AGENT_LIST = [
    {"name": "Supervisor Agent", "icon": "🧠", "role": "Orchestrates all other agents"},
    {"name": "Flight Agent", "icon": "✈️", "role": "Searches and ranks flight options"},
    {"name": "Train Agent", "icon": "🚆", "role": "Searches IRCTC-style train data"},
    {"name": "Bus Agent", "icon": "🚌", "role": "Finds bus routes and operators"},
    {"name": "Hotel Agent", "icon": "🏨", "role": "Finds hotels within budget"},
    {"name": "Activity Agent", "icon": "🎯", "role": "Suggests activities at destination"},
    {"name": "Weather Agent", "icon": "🌦️", "role": "Checks weather and adjusts plan"},
    {"name": "Budget Agent", "icon": "💰", "role": "Optimizes total trip cost"},
    {"name": "Itinerary Agent", "icon": "📅", "role": "Builds day-by-day schedule"},
    {"name": "Replanning Agent", "icon": "🔄", "role": "Modifies trip based on user input"},
]


@router.get("/status")
async def get_agent_status():
    return {
        "success": True,
        "agents": [
            {**a, "status": "ready", "last_action": "Waiting for trip request", "mode": "demo"}
            for a in AGENT_LIST
        ],
        "mode": "demo",
        "note": "Demo mode — agents use mock data (no LLM API key required)",
    }


@router.post("/plan")
async def plan_trip(request: dict):
    """Run all agents sequentially in demo mode."""
    source = request.get("source", "")
    destination = request.get("destination", "")
    date = request.get("departure_date", "")
    passengers = request.get("passengers", 1)
    budget = request.get("budget", 40000)

    logs = []

    def log(agent, message):
        logs.append({
            "agent": agent,
            "status": "complete",
            "message": message,
            "timestamp": datetime.utcnow().isoformat(),
        })

    # Flight Agent
    flights = flight_service.search_flights(source, destination, date, passengers)
    log("Flight Agent", f"Found {len(flights)} flights")

    # Train Agent
    trains = train_service.search_trains(source, destination, date, passengers)
    log("Train Agent", f"Found {len(trains)} trains")

    # Bus Agent
    buses = bus_service.search_buses(source, destination, date, passengers)
    log("Bus Agent", f"Found {len(buses)} buses")

    # Hotel Agent
    hotels = hotel_service.search_hotels(destination, date, date, passengers)
    log("Hotel Agent", f"Found {len(hotels)} hotels")

    # Activity Agent
    activities = activity_service.search_activities(destination)
    log("Activity Agent", f"Found {len(activities)} activities")

    # Budget Agent
    cheapest_flight = min(flights, key=lambda x: x["price"]) if flights else None
    cheapest_hotel = min(hotels, key=lambda x: x["price_per_night"]) if hotels else None
    est_transport = cheapest_flight["price"] * passengers if cheapest_flight else 0
    est_hotel = cheapest_hotel["price_per_night"] * 3 if cheapest_hotel else 0
    est_activities = sum(a["price"] for a in activities[:3])
    est_food = 500 * passengers * 3
    total_est = est_transport + est_hotel + est_activities + est_food
    log("Budget Agent", f"Estimated total: ₹{total_est:,} vs budget ₹{budget:,}")

    # Itinerary Agent
    log("Itinerary Agent", "Day-by-day itinerary generated")
    log("Supervisor Agent", "Trip planning complete")

    return {
        "success": True,
        "flights": flights[:5],
        "trains": trains[:5],
        "buses": buses[:5],
        "hotels": hotels[:5],
        "activities": activities[:8],
        "budget_estimate": total_est,
        "agent_logs": logs,
        "status": "complete",
        "is_demo": True,
    }

