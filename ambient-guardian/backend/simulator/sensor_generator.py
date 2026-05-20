import random
from datetime import datetime, timezone

from backend.simulator.mock_data import BASELINE_SENSOR_VALUES, ROOMS
from backend.simulator.scenarios import pick_scenario


def _jitter(value: float, spread: float) -> float:
    return round(value + random.uniform(-spread, spread), 2)


def generate_sensor_packet() -> dict:
    scenario = pick_scenario()
    base = BASELINE_SENSOR_VALUES
    weights = scenario["weights"]

    return {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "zone": random.choice(ROOMS),
        "scenario": scenario["name"],
        "temperatureC": _jitter(base["temperatureC"] + weights["temperatureC"], 1.1),
        "humidity": _jitter(base["humidity"] + weights["humidity"], 3.5),
        "co2Ppm": _jitter(base["co2Ppm"] + weights["co2Ppm"], 45),
        "pm25": _jitter(base["pm25"] + weights["pm25"], 4),
        "noiseDb": _jitter(base["noiseDb"] + weights["noiseDb"], 5),
    }
