from pydantic import BaseModel
from typing import Optional


class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

