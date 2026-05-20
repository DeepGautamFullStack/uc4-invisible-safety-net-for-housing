from backend.alerts.alert_rules import ALERT_THRESHOLDS


def build_alerts(sensor_packet: dict, risk: dict, anomaly: dict) -> list[dict]:
    alerts: list[dict] = []

    for metric, threshold in ALERT_THRESHOLDS.items():
        if sensor_packet[metric] > threshold:
            alerts.append(
                {
                    "metric": metric,
                    "value": sensor_packet[metric],
                    "threshold": threshold,
                    "severity": risk["level"],
                    "message": f"{metric} exceeded threshold in {sensor_packet['zone']}",
                }
            )

    if anomaly["isAnomaly"]:
        alerts.append(
            {
                "metric": "anomaly",
                "value": anomaly["confidence"],
                "threshold": 0.6,
                "severity": risk["level"],
                "message": "AI detector identified unusual environmental behavior",
            }
        )

    return alerts
