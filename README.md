# ✈️ TripPilot AI — Multi-Agent Multimodal Travel Planner

> An AI-powered travel planning system that uses multiple intelligent agents to find the best flights, trains, buses, hotels, and activities — then builds a complete day-by-day itinerary automatically.

---

## 🌟 What Is TripPilot AI?

Planning a trip involves many decisions:
- Which mode of transport is cheapest?
- Which hotel fits my budget?
- What activities are available?
- Will the weather be good?
- How do I fit everything in one day?

**TripPilot AI** handles all of this automatically using a team of AI agents.

---

## 🚀 Key Features

- 🧠 **Multi-Agent Architecture** — Specialized AI agents for each task
- ✈️ **Multimodal Transport** — Compares flights, trains, and buses
- 🏨 **Hotel Search** — Finds options within your budget
- 🎯 **Activity Planning** — Suggests activities at your destination
- 🌦️ **Weather-Aware** — Adjusts plans based on weather forecasts
- 💰 **Budget Optimizer** — Keeps total cost within your budget
- 📅 **Auto Itinerary** — Builds a complete day-by-day schedule
- 🗺️ **Map View** — Shows all locations on an interactive map
- 💬 **AI Replanning** — Modify your trip with natural language

---

## 🏗️ Architecture

```
User Input (React Frontend)
        ↓
   FastAPI Backend
        ↓
   Supervisor Agent
        ↓
┌──────────────────────────────┐
│  Flight Agent                │
│  Train Agent                 │
│  Bus Agent                   │
│  Transportation Agent        │
│  Hotel Agent                 │
│  Activity Agent              │
│  Weather Agent               │
│  Budget Agent                │
│  Itinerary Agent             │
│  Replanning Agent            │
└──────────────────────────────┘
        ↓
  Complete Trip Plan
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | FastAPI (Python) |
| AI Agents | LangGraph + LangChain |
| LLM | OpenAI GPT / Google Gemini |
| Database | PostgreSQL |
| Auth | JWT |
| Maps | Google Maps API |

---

## 📁 Project Structure

```
TripPilot-AI/
├── frontend/          # React application
├── backend/           # FastAPI application
├── docs/              # Documentation
├── tests/             # Tests
├── .env.example       # Environment variable template
└── README.md
```

---

## ⚙️ Installation

> Detailed setup instructions are in [docs/setup.md](docs/setup.md)

### Quick Start

```powershell
# Clone the repository
git clone https://github.com/yourusername/TripPilot-AI.git
cd TripPilot-AI

# Setup environment variables
copy .env.example .env
# Edit .env with your API keys

# Frontend
cd frontend
npm install
npm run dev

# Backend (new terminal)
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in:

- `OPENAI_API_KEY` — OpenAI API key for AI agents
- `DATABASE_URL` — PostgreSQL connection string
- `SECRET_KEY` — JWT secret for authentication
- `AMADEUS_CLIENT_ID` / `AMADEUS_CLIENT_SECRET` — For real flight data

---

## 📖 Documentation

- [Architecture](docs/architecture.md)
- [Agent Workflow](docs/agent-workflow.md)
- [API Documentation](docs/api-documentation.md)
- [Database Schema](docs/database.md)
- [Setup Guide](docs/setup.md)

---

## 🧪 Demo Mode

All transport and hotel data works without any API keys in **Demo Mode** using realistic mock data.

To use real data, add API keys to your `.env` file.

---

## 📸 Screenshots

*(Screenshots will be added as phases are completed)*

---

## 🔮 Future Improvements

- Mobile app (React Native)
- PDF itinerary export
- Group trip collaboration
- Price alerts
- Booking integration
- Voice input

---

## 👩‍💻 Built With

Built as a demonstration of multi-agent AI systems in a real-world travel application.

---

*Phase 0 of 21 — Project Setup*

