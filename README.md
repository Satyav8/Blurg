# Mini Trident — Maritime Vessel Surveillance Dashboard

A full-stack demo inspired by BlurgsAI's Trident platform.
React frontend + FastAPI backend serving live simulated AIS vessel data.

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
API docs at http://localhost:8000/docs

### 3. Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Runs at http://localhost:5173

Open http://localhost:5173 in your browser.
