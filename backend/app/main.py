from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.database.connection import connect_db, close_db
from app.api import flights, trains, buses, hotels, activities, trips, bookings, auth, agents


@asynccontextmanager
async def lifespan(app: FastAPI):
    # ── Startup ──
    try:
        await connect_db()
    except Exception as e:
        print(f"⚠️  MongoDB unavailable: {e}")
        print("   Running in limited demo mode (bookings won't persist).")
    yield
    # ── Shutdown ──
    await close_db()


app = FastAPI(
    title="TripPilot AI API",
    description="Multi-Agent AI Travel Planner — Demo Mode",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS — allow React frontend ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ──
app.include_router(flights.router)
app.include_router(trains.router)
app.include_router(buses.router)
app.include_router(hotels.router)
app.include_router(activities.router)
app.include_router(trips.router)
app.include_router(bookings.router)
app.include_router(auth.router)
app.include_router(agents.router)


@app.get("/")
async def root():
    return {
        "message": "TripPilot AI API",
        "version": "1.0.0",
        "status": "running",
        "demo_mode": True,
        "docs": "http://127.0.0.1:8000/docs",
        "endpoints": {
            "flights": "/api/flights/search",
            "trains": "/api/trains/search",
            "buses": "/api/buses/search",
            "hotels": "/api/hotels/search",
            "activities": "/api/activities/search",
            "trips": "/api/trips",
            "agents": "/api/agents/status",
        },
    }


@app.get("/health")
async def health():
    return {"status": "healthy", "demo_mode": True}

