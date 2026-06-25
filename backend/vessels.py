import random
import math
from datetime import datetime, timedelta

VESSEL_NAMES = [
    "INS Vikrant", "INS Chennai", "MV Sea Eagle", "BW Diamond", "Pacific Voyager",
    "Arabian Star", "Bay Guardian", "Coast Watcher", "Deep Horizon", "MV Kestrel",
    "INS Shivalik", "Sagar Mala", "MV Trident", "Gulf Runner", "Ocean Sentinel",
    "Delta Force", "MV Orion", "Bharat Pride", "Sea Hawk", "INS Surat",
    "MV Phantom", "Coastal Rover", "Deep Blue", "Storm Chaser", "Iron Sea",
    "MV Neptune", "Horizon Breaker", "Bay Watch", "Coral Queen", "Sun Dancer",
]

VESSEL_TYPES = ["Naval Vessel", "Cargo Ship", "Tanker", "Fishing Vessel", "Coast Guard", "Submarine"]

INDIAN_OCEAN_BOUNDS = {
    "lat": (5.0, 22.0),
    "lon": (68.0, 88.0),
}

_vessels_state: dict = {}


def _init_vessels():
    global _vessels_state
    random.seed(42)
    for i, name in enumerate(VESSEL_NAMES):
        status = random.choices(
            ["normal", "suspicious", "dark"],
            weights=[0.65, 0.20, 0.15],
        )[0]
        _vessels_state[i] = {
            "id": i,
            "name": name,
            "mmsi": f"4{random.randint(10000000, 99999999)}",
            "type": random.choice(VESSEL_TYPES),
            "lat": round(random.uniform(*INDIAN_OCEAN_BOUNDS["lat"]), 4),
            "lon": round(random.uniform(*INDIAN_OCEAN_BOUNDS["lon"]), 4),
            "speed": round(random.uniform(0, 22), 1),
            "heading": random.randint(0, 359),
            "status": status,
            "risk_score": _calc_risk(status),
            "last_seen": (datetime.utcnow() - timedelta(minutes=random.randint(0, 120))).isoformat() + "Z",
            "ais_active": status != "dark",
            "flag": random.choice(["IN", "SG", "CN", "PK", "AE", "IR", "MY", "ID"]),
        }


def _calc_risk(status: str) -> int:
    if status == "dark":
        return random.randint(72, 98)
    if status == "suspicious":
        return random.randint(40, 71)
    return random.randint(2, 35)


def tick_vessels():
    """Slightly move vessels and randomly flip statuses to simulate live data."""
    for v in _vessels_state.values():
        # drift position
        heading_rad = math.radians(v["heading"])
        speed_deg = v["speed"] * 0.00005
        v["lat"] = round(v["lat"] + speed_deg * math.cos(heading_rad), 4)
        v["lon"] = round(v["lon"] + speed_deg * math.sin(heading_rad), 4)
        # clamp to bounds
        v["lat"] = max(INDIAN_OCEAN_BOUNDS["lat"][0], min(INDIAN_OCEAN_BOUNDS["lat"][1], v["lat"]))
        v["lon"] = max(INDIAN_OCEAN_BOUNDS["lon"][0], min(INDIAN_OCEAN_BOUNDS["lon"][1], v["lon"]))
        # small chance of status change (simulates ship going dark or reappearing)
        if random.random() < 0.03:
            v["status"] = random.choices(["normal", "suspicious", "dark"], weights=[0.65, 0.20, 0.15])[0]
            v["risk_score"] = _calc_risk(v["status"])
            v["ais_active"] = v["status"] != "dark"
        v["heading"] = (v["heading"] + random.randint(-5, 5)) % 360
        v["last_seen"] = datetime.utcnow().isoformat() + "Z"


def get_vessels() -> list:
    tick_vessels()
    return list(_vessels_state.values())


def get_stats() -> dict:
    vessels = list(_vessels_state.values())
    return {
        "total": len(vessels),
        "normal": sum(1 for v in vessels if v["status"] == "normal"),
        "suspicious": sum(1 for v in vessels if v["status"] == "suspicious"),
        "dark": sum(1 for v in vessels if v["status"] == "dark"),
        "ais_active": sum(1 for v in vessels if v["ais_active"]),
        "avg_risk": round(sum(v["risk_score"] for v in vessels) / len(vessels), 1),
    }


_init_vessels()
