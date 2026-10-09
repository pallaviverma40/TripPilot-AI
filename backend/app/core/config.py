import os
from typing import List

try:
    from pydantic_settings import BaseSettings

    class Settings(BaseSettings):
        mongodb_uri: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        db_name: str = os.getenv("DB_NAME", "trippilot_db")
        secret_key: str = os.getenv("SECRET_KEY", "trippilot-super-secret-key-change-in-production-2024")
        algorithm: str = os.getenv("ALGORITHM", "HS256")
        access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
        debug: bool = os.getenv("DEBUG", "True").lower() in ("true", "1")
        backend_host: str = os.getenv("BACKEND_HOST", "0.0.0.0")
        backend_port: int = int(os.getenv("PORT", os.getenv("BACKEND_PORT", "8000")))
        allowed_origins: str = os.getenv("ALLOWED_ORIGINS", "*")

        @property
        def origins_list(self) -> List[str]:
            if not self.allowed_origins or self.allowed_origins.strip() == "*":
                return ["*"]
            return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

        class Config:
            env_file = ".env"
            extra = "ignore"

    settings = Settings()

except Exception:
    class FallbackSettings:
        mongodb_uri: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
        db_name: str = os.getenv("DB_NAME", "trippilot_db")
        secret_key: str = os.getenv("SECRET_KEY", "trippilot-super-secret-key-change-in-production-2024")
        algorithm: str = os.getenv("ALGORITHM", "HS256")
        access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))
        debug: bool = os.getenv("DEBUG", "True").lower() in ("true", "1")
        backend_host: str = os.getenv("BACKEND_HOST", "0.0.0.0")
        backend_port: int = int(os.getenv("PORT", os.getenv("BACKEND_PORT", "8000")))
        allowed_origins: str = os.getenv("ALLOWED_ORIGINS", "*")

        @property
        def origins_list(self) -> List[str]:
            if not self.allowed_origins or self.allowed_origins.strip() == "*":
                return ["*"]
            return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    settings = FallbackSettings()
