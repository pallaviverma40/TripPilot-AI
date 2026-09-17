from fastapi import APIRouter, HTTPException, Query
from app.services.train_service import search_trains
from app.models.booking import TrainBookingRequest, BookingResponse
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/trains", tags=["Trains"])


@router.get("/search")
async def search_trains_endpoint(
    source: str = Query(...),
    destination: str = Query(...),
    date: str = Query(...),
    passengers: int = Query(1, ge=1, le=9),
):
    if source.strip().lower() == destination.strip().lower():
        raise HTTPException(status_code=400, detail="Source and destination cannot be the same")

    trains = search_trains(source, destination, date, passengers)
    return {
        "success": True,
        "count": len(trains),
        "trains": trains,
        "is_demo": True,
        "note": "Demo mode — showing mock train data",
    }


@router.post("/book", response_model=BookingResponse)
async def book_train(booking: TrainBookingRequest):
    booking_id = "BK" + uuid.uuid4().hex[:10].upper()
    doc = {
        "_id": booking_id,
        "type": "train",
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
        message=f"Demo train booking confirmed! Booking ID: {booking_id}",
    )

