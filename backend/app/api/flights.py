from fastapi import APIRouter, HTTPException, Query
from app.services.flight_service import search_flights
from app.models.booking import FlightBookingRequest, BookingResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/flights", tags=["Flights"])


@router.get("/search")
async def search_flights_endpoint(
    source: str = Query(..., description="Origin city"),
    destination: str = Query(..., description="Destination city"),
    date: str = Query(..., description="Travel date YYYY-MM-DD"),
    passengers: int = Query(1, ge=1, le=9, description="Number of passengers"),
):
    if not source.strip() or not destination.strip():
        raise HTTPException(status_code=400, detail="Source and destination are required")
    if source.strip().lower() == destination.strip().lower():
        raise HTTPException(status_code=400, detail="Source and destination cannot be the same")

    flights = search_flights(source, destination, date, passengers)
    return {
        "success": True,
        "count": len(flights),
        "flights": flights,
        "is_demo": True,
        "note": "Demo mode — showing mock flight data",
    }


@router.post("/book", response_model=BookingResponse)
async def book_flight(booking: FlightBookingRequest):
    booking_id = "BK" + uuid.uuid4().hex[:10].upper()
    doc = {
        "_id": booking_id,
        "type": "flight",
        "is_demo": True,
        "status": "confirmed",
        "created_at": datetime.utcnow().isoformat(),
        **booking.model_dump(),
    }
    db = get_db()
    if db is not None:
        try:
            await db.bookings.insert_one(doc)
        except Exception as e:
            print(f"DB write warning: {e}")

    return BookingResponse(
        success=True,
        booking_id=booking_id,
        status="confirmed",
        is_demo=True,
        message=f"Demo flight booking confirmed! Booking ID: {booking_id}",
    )

