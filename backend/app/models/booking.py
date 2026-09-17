from pydantic import BaseModel
from typing import Optional


class PassengerInfo(BaseModel):
    name: str = "Traveler"
    age: int = 25
    gender: str = "male"


class FlightBookingRequest(BaseModel):
    flight_id: str
    airline: str
    flight_number: str
    source: str
    destination: str
    departure: str
    arrival: str
    duration: str
    price_per_person: float
    passengers: int
    total_price: float
    travel_date: str
    passenger_details: Optional[list] = []


class TrainBookingRequest(BaseModel):
    train_id: str
    train_name: str
    train_number: str
    source: str
    destination: str
    departure: str
    arrival: str
    duration: str
    travel_class: str
    price_per_person: float
    passengers: int
    total_price: float
    travel_date: str


class BusBookingRequest(BaseModel):
    bus_id: str
    operator: str
    bus_type: str
    source: str
    destination: str
    departure: str
    arrival: str
    duration: str
    price_per_person: float
    passengers: int
    total_price: float
    travel_date: str


class HotelBookingRequest(BaseModel):
    hotel_id: str
    hotel_name: str
    destination: str
    checkin: str
    checkout: str
    guests: int
    price_per_night: float
    total_nights: int
    total_price: float


class BookingResponse(BaseModel):
    success: bool
    booking_id: str
    status: str = "confirmed"
    is_demo: bool = True
    message: str = "Demo booking created successfully"

