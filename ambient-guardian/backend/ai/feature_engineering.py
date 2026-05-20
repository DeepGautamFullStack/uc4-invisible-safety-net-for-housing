def build_feature_vector(sensor_packet: dict) -> dict:
    return {
        "airQualityIndexHint": round((sensor_packet["pm25"] * 2.2) + (sensor_packet["co2Ppm"] / 100), 2),
        "heatStressHint": round(sensor_packet["temperatureC"] * (sensor_packet["humidity"] / 100), 2),
        "comfortVariance": round(
            abs(sensor_packet["temperatureC"] - 24.0)
            + abs(sensor_packet["humidity"] - 45.0) / 4
            + abs(sensor_packet["noiseDb"] - 37.0) / 6,
            2,
        ),
    }
