# Mini Trident — Maritime Vessel Surveillance Dashboard

A full-stack project built to demonstrate the kind of work BlurgsAI does with their Trident platform.
Tracks 30 simulated vessels in the Indian Ocean, fusing AIS status, risk scoring, and dark ship detection — updating live every 5 seconds.

---

## What's Inside

### Backend — FastAPI (`/backend`)
- `main.py` — Three REST endpoints:
  - `GET /vessels` — returns all vessels sorted by risk score, supports `?status=normal|suspicious|dark` filter
  - `GET /vessels/{id}` — single vessel detail
  - `GET /stats` — aggregate counts and average risk score
- `vessels.py` — Simulates 30 vessels with realistic AIS data (MMSI, position, speed, heading, flag). Every request ticks the simulation: vessels drift position, randomly go dark or reappear, risk scores update.
- Pydantic validation, CORS middleware, auto-generated Swagger docs at `/docs`

### Frontend — React + Vite + Tailwind (`/frontend`)
- `hooks/useVessels.js` — Custom hook that polls the API every 5 seconds using `useEffect` + `useCallback`, tracks `loading / data / error` states, cleans up the interval on unmount
- `components/StatsPanel.jsx` — Live summary bar: Total / Normal / Suspicious / Dark Ships / AIS Active / Avg Risk
- `components/FilterBar.jsx` — Status filter buttons + client-side search input
- `components/VesselCard.jsx` — Per-vessel card with animated risk score bar, AIS on/off indicator, position, speed, heading, last-seen time
- `components/VesselList.jsx` — `useMemo` filtered list (search across name, MMSI, flag, type)
- Dark ship alert banner when AIS-off vessels are detected
- Dark navy glassmorphism UI with monospace font and animated scan line

---

## Prerequisites

- Python 3.10+
- Node.js 18+

## Setup & Run

### 1. Clone

```bash
git clone <your-repo-url>
cd Blurg
```

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at http://localhost:8000  
Swagger UI at http://localhost:8000/docs

### 3. Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Runs at http://localhost:5173

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| State / Data | useState, useEffect, useCallback, useMemo, custom hook |
| Backend | FastAPI, Pydantic, Uvicorn |
| Styling | Tailwind CSS, glassmorphism, JetBrains Mono |
