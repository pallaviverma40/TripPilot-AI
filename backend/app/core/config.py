from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str = "mongodb://localhost:27017"
    db_name: str = "trippilot_db"
    secret_key: str = "changeme"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    debug: bool = True
    backend_host: str = "127.0.0.1"
    backend_port: int = 8000
    allowed_origins: str = "http://localhost:5173"

    @property
    def origins_list(self) -> list:
        return [o.strip() for o in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

