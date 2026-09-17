from pydantic import BaseModel
from typing import Optional


class TripCreate(BaseModel):
    source: str
    destination: str
    departure_date: str
    return_date: Optional[str] = None
    passengers: int = 1
    budget: float = 0
    transport_mode: str = "flight"
    transport_details: Optional[dict] = None
    hotel_details: Optional[dict] = None
    activities: Optional[list] = []
    total_cost: float = 0
    status: str = "planned"
    is_demo: bool = True
    booking_ids: Optional[list] = []


class TripResponse(BaseModel):
    id: str
    source: str
    destination: str
    departure_date: str
    return_date: Optional[str] = None
    passengers: int
    budget: float
    transport_mode: str
    transport_details: Optional[dict] = None
    hotel_details: Optional[dict] = None
    activities: list = []
    total_cost: float
    status: str
    is_demo: bool
    booking_ids: list = []
    created_at: str

