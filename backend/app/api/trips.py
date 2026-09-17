from fastapi import APIRouter, HTTPException
from app.models.trip import TripCreate
from app.database.connection import get_db
from datetime import datetime
import uuid

router = APIRouter(prefix="/api/trips", tags=["Trips"])


@router.get("")
async def get_trips():
    """Get all saved trips (demo: no auth required)."""
    db = get_db()
    if db is None:
        return {"success": True, "trips": [], "is_demo": True}
    try:
        cursor = db.trips.find({}).sort("created_at", -1).limit(50)
        trips = []
        async for doc in cursor:
            doc["id"] = str(doc["_id"])
            doc.pop("_id", None)
            trips.append(doc)
        return {"success": True, "trips": trips, "count": len(trips)}
    except Exception as e:
        return {"success": True, "trips": [], "is_demo": True, "error": str(e)}


@router.post("")
async def create_trip(trip: TripCreate):
    """Save a new trip."""
    trip_id = str(uuid.uuid4())
    doc = {
        "_id": trip_id,
        "created_at": datetime.utcnow().isoformat(),
        **trip.model_dump(),
    }
    db = get_db()
    if db is not None:
        try:
            await db.trips.insert_one(doc)
        except Exception as e:
            print(f"DB write warning: {e}")

    return {"success": True, "trip_id": trip_id, "message": "Trip saved successfully"}


@router.get("/{trip_id}")
async def get_trip(trip_id: str):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=404, detail="Trip not found")
    try:
        doc = await db.trips.find_one({"_id": trip_id})
        if not doc:
            raise HTTPException(status_code=404, detail="Trip not found")
        doc["id"] = str(doc["_id"])
        doc.pop("_id", None)
        return {"success": True, "trip": doc}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{trip_id}")
async def delete_trip(trip_id: str):
    db = get_db()
    if db is not None:
        try:
            result = await db.trips.delete_one({"_id": trip_id})
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Trip not found")
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return {"success": True, "message": "Trip deleted"}

