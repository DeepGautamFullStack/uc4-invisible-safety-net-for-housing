def explain_risk(sensor_packet: dict, risk: dict, anomaly: dict) -> str:
    reasons = []

    if sensor_packet["co2Ppm"] > 900:
        reasons.append("CO2 is above preferred indoor ventilation thresholds")
    if sensor_packet["pm25"] > 35:
        reasons.append("particulate matter indicates an air quality event")
    if sensor_packet["temperatureC"] > 27 and sensor_packet["humidity"] > 55:
        reasons.append("heat and humidity together may reduce occupant comfort")
    if anomaly["isAnomaly"]:
        reasons.append("the pattern deviates from the recent operating baseline")

    if not reasons:
        reasons.append("sensor values remain within expected operating ranges")

    return f"Risk is {risk['level']} with score {risk['score']}. " + "; ".join(reasons) + "."
