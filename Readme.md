# ForgeCareer — AI-Powered Career Growth Platform

An AI-powered full-stack platform that helps job seekers through intelligent job discovery, skill gap analysis, resume optimization, interview preparation, and personalized learning.

---

## Team

| Member | GitHub | OS | Role | Branch |
|---|---|---|---|---|
| Owner | OmegaZeroG | Windows | Frontend | `frontend` |
| Jay | jaytalwar | Mac | Backend | `backend` |
| Arpit | arpit1021-ux | Windows | ML Services | `ml-services` |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Zustand, React Router v6, Axios |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs |
| AI Services | Python, FastAPI, spaCy, pdfplumber, sentence-transformers |
| Database | MongoDB Atlas (shared cloud) |
| Cache/Queue | Upstash Redis, BullMQ |
| Auth | JWT + Refresh Tokens |

---

## Project Structure

```
Career-Forge/
├── frontend/                   # React + Vite (JavaScript)
│   └── src/
│       ├── pages/              # Login, Register, Dashboard
│       ├── components/         # Reusable UI components
│       ├── store/              # Zustand auth state
│       ├── routes/             # Protected route wrapper
│       ├── lib/                # Axios config
│       └── App.jsx             # Router setup
├── backend/                    # Node.js + Express (JavaScript)
│   └── src/
│       ├── models/             # MongoDB schemas
│       ├── controllers/        # Route handlers
│       ├── routes/             # API routes
│       └── middleware/         # Auth middleware
├── services/                   # Python AI microservices
│   ├── resume-parser/
│   ├── skill-gap-analyzer/
│   ├── resume-optimizer/
│   ├── interview-generator/
│   ├── learning-roadmap/
│   └── chatbot/
├── shared/                     # Shared constants
├── scripts/                    # DB seed scripts
└── .env.example                # Environment variables template
```

---

## Getting Started

### Prerequisites
- Node.js v20+
- Python 3.12+
- Git
- MongoDB Compass (for DB visualization)

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/OmegaZeroG/Career-Forge.git
cd Career-Forge
```

**2. Create .env file**
```bash
# Copy example and fill in your values
cp .env.example .env
```

**3. Install backend dependencies**
```bash
cd backend
npm install
```

**4. Install frontend dependencies**
```bash
cd frontend
npm install
```

**5. Run backend**
```bash
cd backend
npm run dev
```

**6. Run frontend**
```bash
cd frontend
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root folder:

```env
APP_NAME=ForgeCareer
NODE_ENV=development
PORT=5000

# MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/CareerForge

# Upstash Redis
REDIS_URL=rediss://default:password@xxxx.upstash.io:6379

# Auth
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=ForgeCareer
```

> Note: Never commit your `.env` file. It is listed in `.gitignore`.

---

## API Endpoints (Current)

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/health` | Health check | No |

---

## Git Branching Strategy

```
main              ← stable, working code only
  ├── frontend    ← OmegaZeroG (UI/frontend work)
  ├── backend     ← jaytalwar (API/backend work)
  └── ml-services ← arpit1021-ux (Python AI services)
```

### Daily workflow
```bash
# Start of day — get latest code
git checkout main
git pull origin main
git checkout your-branch
git merge main

# End of day — push your work
git add .
git commit -m "feat: description of what you built"
git push origin your-branch
```

### Merging to main
1. Go to GitHub → Pull Requests → New Pull Request
2. Base: `main` ← Compare: `your-branch`
3. Add description → Create Pull Request
4. Teammate reviews and merges

---

## Current Progress

### ✅ Phase 1 — Project Setup (Complete)
- [x] GitHub repo created — OmegaZeroG/Career-Forge
- [x] Monorepo folder structure
- [x] React + Vite + Tailwind frontend
- [x] Node.js + Express backend
- [x] MongoDB Atlas connected (shared team database)
- [x] Upstash Redis configured
- [x] Git branching strategy (frontend/backend/ml-services)
- [x] Converted fully to JavaScript (no TypeScript)
- [x] Team collaborators added (jaytalwar, arpit1021-ux)

### ✅ Phase 2 — Authentication (Complete)
- [x] User model (MongoDB schema with bcrypt password hashing)
- [x] Register API — POST /api/auth/register
- [x] Login API — POST /api/auth/login
- [x] Get current user — GET /api/auth/me
- [x] JWT token generation
- [x] Protected route middleware
- [x] Login page (React)
- [x] Register page (React)
- [x] Auth state management (Zustand)
- [x] Axios interceptor (auto-attach JWT token)
- [x] Protected route wrapper
- [x] Dashboard placeholder page

### 🔜 Phase 3 — Resume Upload & Parsing (Next)
- [ ] File upload API (PDF, DOCX)
- [ ] Python resume parser service (FastAPI)
- [ ] Skill extraction (spaCy NER)
- [ ] Resume storage in MongoDB
- [ ] Resume upload UI
- [ ] Parsed resume viewer

### 🔜 Phase 4 — Job Discovery
- [ ] Adzuna API integration
- [ ] JSearch API integration
- [ ] Job listing storage
- [ ] Daily job fetch (cron job)
- [ ] Job recommendations UI

### 🔜 Phase 5 — Skill Gap Engine
- [ ] Compare resume skills vs job skills
- [ ] Skill gap scoring
- [ ] Missing skills visualization

### 🔜 Phase 6 — Learning Roadmap
- [ ] AI-generated learning paths
- [ ] Course recommendations
- [ ] Progress tracking

### 🔜 Phase 7 — Resume Optimizer
- [ ] ATS keyword analysis
- [ ] Resume improvement suggestions
- [ ] ATS score card

### 🔜 Phase 8 — Interview Preparation
- [ ] Role-based question generation
- [ ] STAR method tips
- [ ] Mock interview mode

### 🔜 Phase 9 — Application Tracker
- [ ] Kanban board (Applied/Interview/Offer/Rejected)
- [ ] Application notes and reminders
- [ ] Analytics

### 🔜 Phase 10 — AI Chatbot
- [ ] Claude API integration
- [ ] Resume-aware context
- [ ] Chat history

### 🔜 Phase 11 — Dashboard & Reports
- [ ] Profile score
- [ ] Weekly career report
- [ ] Job match panel

### 🔜 Phase 12 — Testing
- [ ] Unit tests (Jest/Pytest)
- [ ] API integration tests
- [ ] E2E tests (Playwright)

### 🔜 Phase 13 — Deployment
- [ ] Docker containers
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Cloud deployment (Railway/Render)

---

## License

MIT License