from fastapi import APIRouter, HTTPException, Query
from app.services.hotel_service import search_hotels
from app.models.booking import HotelBookingRequest, BookingResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/hotels", tags=["Hotels"])


@router.get("/search")
async def search_hotels_endpoint(
    destination: str = Query(...),
    checkin: str = Query(..., description="Check-in date YYYY-MM-DD"),
    checkout: str = Query(..., description="Check-out date YYYY-MM-DD"),
    guests: int = Query(1, ge=1, le=10),
):
    hotels = search_hotels(destination, checkin, checkout, guests)
    return {
        "success": True,
        "count": len(hotels),
        "hotels": hotels,
        "is_demo": True,
        "note": "Demo mode — showing mock hotel data",
    }


@router.post("/book", response_model=BookingResponse)
async def book_hotel(booking: HotelBookingRequest):
    booking_id = "BK" + uuid.uuid4().hex[:10].upper()
    doc = {
        "_id": booking_id,
        "type": "hotel",
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
        message=f"Demo hotel booking confirmed! Booking ID: {booking_id}",
    )

