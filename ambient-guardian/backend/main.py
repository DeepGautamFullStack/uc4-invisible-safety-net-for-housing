import asyncio
import contextlib
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from backend.ai.ai_reasoner import explain_risk
from backend.ai.anomaly_detector import detect_anomaly
from backend.ai.feature_engineering import build_feature_vector
from backend.ai.risk_engine import calculate_risk
from backend.alerts.alert_engine import build_alerts
from backend.config import settings
from backend.simulator.sensor_generator import generate_sensor_packet
from backend.websocket.socket_manager import socket_manager

LATEST_SNAPSHOT: dict = {}


async def simulation_loop() -> None:
    while True:
        sensor_packet = generate_sensor_packet()
        features = build_feature_vector(sensor_packet)
        anomaly = detect_anomaly(features)
        risk = calculate_risk(sensor_packet, anomaly)
        explanation = explain_risk(sensor_packet, risk, anomaly)
        alerts = build_alerts(sensor_packet, risk, anomaly)

        snapshot = {
            "sensorPacket": sensor_packet,
            "features": features,
            "anomaly": anomaly,
            "risk": risk,
            "explanation": explanation,
            "alerts": alerts,
        }

        LATEST_SNAPSHOT.clear()
        LATEST_SNAPSHOT.update(snapshot)
        await socket_manager.broadcast_json(snapshot)
        await asyncio.sleep(settings.simulation_interval_seconds)


@asynccontextmanager
async def lifespan(_: FastAPI):
    task = asyncio.create_task(simulation_loop())
    try:
        yield
    finally:
        task.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await task


app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def healthcheck() -> dict:
    return {"status": "ok", "app": settings.app_name}


@app.get("/api/snapshot")
async def get_snapshot() -> dict:
    if LATEST_SNAPSHOT:
        return LATEST_SNAPSHOT
    return {"message": "Simulation warming up"}


@app.websocket(settings.websocket_path)
async def live_updates(websocket: WebSocket) -> None:
    await socket_manager.connect(websocket)
    try:
        if LATEST_SNAPSHOT:
            await websocket.send_json(LATEST_SNAPSHOT)

        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        socket_manager.disconnect(websocket)
