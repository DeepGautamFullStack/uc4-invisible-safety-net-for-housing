def calculate_risk(sensor_packet: dict, anomaly: dict) -> dict:
    score = 0

    if sensor_packet["temperatureC"] > 27:
        score += 15
    if sensor_packet["humidity"] > 55:
        score += 10
    if sensor_packet["co2Ppm"] > 900:
        score += 30
    if sensor_packet["pm25"] > 35:
        score += 25
    if sensor_packet["noiseDb"] > 65:
        score += 10
    if anomaly["isAnomaly"]:
        score += 20

    score = min(score, 100)

    if score >= 70:
        level = "critical"
    elif score >= 40:
        level = "elevated"
    else:
        level = "normal"

    return {"score": score, "level": level}
