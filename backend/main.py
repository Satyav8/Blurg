from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from vessels import get_vessels, get_stats

app = FastAPI(title="Mini Trident API", description="Maritime vessel surveillance — BlurgsAI demo")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/vessels")
def vessels(status: Optional[str] = Query(None, description="Filter: normal | suspicious | dark")):
    data = get_vessels()
    if status:
        data = [v for v in data if v["status"] == status]
    data.sort(key=lambda v: v["risk_score"], reverse=True)
    return {"vessels": data, "count": len(data)}


@app.get("/stats")
def stats():
    return get_stats()


@app.get("/vessels/{vessel_id}")
def vessel_detail(vessel_id: int):
    data = get_vessels()
    match = next((v for v in data if v["id"] == vessel_id), None)
    if not match:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Vessel not found")
    return match
