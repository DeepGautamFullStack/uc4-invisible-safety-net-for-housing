from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "Ambient Guardian API"
    websocket_path: str = "/ws/live"
    simulation_interval_seconds: float = 1.5
    building_name: str = "Tower A"


settings = Settings()
