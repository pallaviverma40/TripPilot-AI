from fastapi import APIRouter, Query
from app.services.activity_service import search_activities

router = APIRouter(prefix="/api/activities", tags=["Activities"])


@router.get("/search")
async def search_activities_endpoint(destination: str = Query(...)):
    activities = search_activities(destination)
    return {
        "success": True,
        "count": len(activities),
        "activities": activities,
        "is_demo": True,
    }

