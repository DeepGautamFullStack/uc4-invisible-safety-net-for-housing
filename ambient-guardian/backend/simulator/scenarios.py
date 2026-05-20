import random


SCENARIOS = [
    {
        "name": "normal",
        "weights": {"temperatureC": 0.4, "humidity": 1.2, "co2Ppm": 25, "pm25": 3, "noiseDb": 4},
    },
    {
        "name": "overcrowded_meeting",
        "weights": {"temperatureC": 1.2, "humidity": 3.0, "co2Ppm": 320, "pm25": 8, "noiseDb": 14},
    },
    {
        "name": "ventilation_issue",
        "weights": {"temperatureC": 1.8, "humidity": 5.0, "co2Ppm": 620, "pm25": 12, "noiseDb": 2},
    },
    {
        "name": "dust_event",
        "weights": {"temperatureC": 0.8, "humidity": 1.8, "co2Ppm": 120, "pm25": 38, "noiseDb": 6},
    },
]


def pick_scenario() -> dict:
    return random.choices(SCENARIOS, weights=[60, 15, 15, 10], k=1)[0]
