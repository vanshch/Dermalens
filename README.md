# 🔬 Dermalens — AI-Powered Skin Disease Analysis

Dermalens is a full-stack web application that uses AI and machine learning to help users identify potential skin conditions from uploaded images and connect them with dermatologists.

> ⚠️ **Medical Disclaimer**: Dermalens is not a substitute for professional medical advice. Always consult a qualified dermatologist for accurate diagnosis and treatment.

---

## ✨ Features

- **AI-Powered Analysis** — Dual-model skin disease detection using a custom TensorFlow.js CNN model + Google Gemini Vision AI
- **23 Skin Condition Classes** — Covers conditions like Acne, Eczema, Psoriasis, Melanoma, and more
- **User Authentication** — Secure JWT-based registration and login with bcrypt password hashing
- **Appointment Scheduling** — Book appointments with dermatologists, with email confirmation
- **Doctor Directory** — Browse and connect with specialists
- **Security-First Backend** — Rate limiting, XSS protection, CORS, and security headers out of the box

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vue 3 (Composition API) + Vite |
| Styling | Tailwind CSS + PrimeVue |
| State Management | Vuex |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| ML Model | TensorFlow.js (custom-trained CNN) |
| AI Analysis | Google Gemini 1.5 Flash |
| Auth | JWT + bcrypt |
| Email | Gmail OAuth2 / Nodemailer |

---

## 📁 Project Structure

```
Dermalens/
├── src/                    # Vue 3 frontend
│   ├── components/         # Reusable UI components
│   ├── views/              # Page-level components
│   ├── store/              # Vuex state management
│   ├── router/             # Vue Router
│   └── services/           # API interaction layer
├── backend/
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route definitions
│   ├── middlewares/        # Auth, rate limiting
│   ├── uploads/            # Runtime: user-uploaded images
│   └── config.env.example  # Environment variable template
└── Dermalens-model/        # TF.js model files (see Setup)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)
- Gmail account with OAuth2 configured (for email notifications)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Dermalens.git
cd Dermalens
```

### 2. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 3. Configure Environment Variables

```bash
cd backend
cp config.env.example config.env
```

Open `backend/config.env` and fill in all required values (MongoDB URI, JWT secret, API keys, etc.).

### 4. Set Up the ML Model

The model binary files are not included in this repository due to their size (~95MB). Download them separately and place them in the `Dermalens-model/` directory:

- `model.json` — model architecture
- `group1-shard1of24.bin` through `group1-shard24of24.bin` — weight shards

> If hosting yourself, update `MODEL_PATH` in `backend/config.env` to point to your `model.json`.

### 5. Run the Application

```bash
# Terminal 1 — Start backend (from /backend)
node server.js

# Terminal 2 — Start frontend (from project root)
npm run dev
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:5000`.

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `POST` | `/api/post/upload` | Upload skin image for analysis |
| `GET/POST` | `/api/appointment` | Manage appointments |

---

## 🔐 Security

- Passwords hashed with `bcrypt` (salt rounds: 10)
- Sessions managed via signed JWTs (1 hour expiry)
- Global rate limiting: 100 requests / 15 min per IP
- Auth route rate limiting: 50 requests / hour per IP
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`
- All secrets stored in environment variables — never hardcoded

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
