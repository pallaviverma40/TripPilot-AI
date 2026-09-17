from fastapi import APIRouter
from app.database.connection import get_db

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


@router.get("")
async def get_bookings():
    """Get all bookings (demo: no auth required)."""
    db = get_db()
    if db is None:
        return {"success": True, "bookings": [], "is_demo": True}
    try:
        cursor = db.bookings.find({}).sort("created_at", -1).limit(50)
        bookings = []
        async for doc in cursor:
            doc["id"] = str(doc["_id"])
            doc.pop("_id", None)
            bookings.append(doc)
        return {"success": True, "bookings": bookings, "count": len(bookings)}
    except Exception as e:
        return {"success": True, "bookings": [], "error": str(e)}


@router.get("/{booking_id}")
async def get_booking(booking_id: str):
    db = get_db()
    if db is None:
        return {"success": False, "message": "Database unavailable"}
    try:
        doc = await db.bookings.find_one({"_id": booking_id})
        if not doc:
            return {"success": False, "message": "Booking not found"}
        doc["id"] = str(doc["_id"])
        doc.pop("_id", None)
        return {"success": True, "booking": doc}
    except Exception as e:
        return {"success": False, "message": str(e)}

