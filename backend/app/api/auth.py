from fastapi import APIRouter, HTTPException
from app.models.user import UserRegister, UserLogin, Token, UserResponse
from app.database.connection import get_db
from app.core.config import settings
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import uuid

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode["exp"] = expire
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)


@router.post("/register", response_model=Token)
async def register(user: UserRegister):
    db = get_db()
    user_id = str(uuid.uuid4())

    if db is not None:
        existing = await db.users.find_one({"email": user.email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        await db.users.insert_one({
            "_id": user_id,
            "name": user.name,
            "email": user.email,
            "password": hash_password(user.password),
            "created_at": datetime.utcnow().isoformat(),
        })

    user_resp = UserResponse(id=user_id, name=user.name, email=user.email)
    token = create_token({"sub": user_id, "email": user.email})
    return Token(access_token=token, token_type="bearer", user=user_resp)


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    db = get_db()

    if db is None:
        # Demo mode — allow any login
        user_id = str(uuid.uuid4())
        user_resp = UserResponse(id=user_id, name="Demo User", email=credentials.email)
        token = create_token({"sub": user_id, "email": credentials.email})
        return Token(access_token=token, token_type="bearer", user=user_resp)

    user = await db.users.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user_resp = UserResponse(id=str(user["_id"]), name=user["name"], email=user["email"])
    token = create_token({"sub": str(user["_id"]), "email": user["email"]})
    return Token(access_token=token, token_type="bearer", user=user_resp)

