from __future__ import annotations

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_env: str = Field(default="development", alias="APP_ENV")
    frontend_origin: str = Field(default="http://localhost:4200", alias="FRONTEND_ORIGIN")
    openai_api_key: str | None = Field(default=None, alias="OPENAI_API_KEY")
    jwt_secret: str = Field(default="replace-with-a-long-random-secret", alias="JWT_SECRET")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    database_url: str = Field(default="postgresql+psycopg://portfolio:portfolio@localhost:5432/portfolio", alias="DATABASE_URL")
    redis_url: str = Field(default="redis://localhost:6379/0", alias="REDIS_URL")
    chroma_persist_directory: str = Field(default="./data/chroma", alias="CHROMA_PERSIST_DIRECTORY")
    contact_to_email: str = Field(default="krmrityunjay13@gmail.com", alias="CONTACT_TO_EMAIL")

    @property
    def cors_origins(self) -> list[str]:
        return [self.frontend_origin, "http://localhost:4200", "http://127.0.0.1:4200"]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

