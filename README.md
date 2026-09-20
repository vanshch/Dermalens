# Dermalens — Educational Skin-Image Analysis Demo

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

> A full-stack portfolio prototype combining skin-image classification, an AI-assisted comparison, authentication, and appointment requests.

> **Important:** Dermalens is an educational demonstration, not a medical device. Its output must not be used as a diagnosis or as a substitute for a qualified dermatologist.

## ✨ Features
- 🛡️ **User Authentication:** Secure JWT-based registration and login system.
- 🖼️ **Image Analysis:** Upload skin images and compare experimental model outputs.
- 📅 **Appointment Scheduling:** Connect with specialists and book consultations seamlessly.
- 📧 **Email Notifications:** Automated alerts and confirmations.
- 📱 **Responsive Design:** Optimized for both desktop and mobile platforms.

## 🏗️ Architecture
```mermaid
graph LR
    A[Frontend: Vue 3] <-->|REST API| B(Backend: Node.js/Express)
    B <-->|Mongoose| C[(MongoDB)]
    B <-->|Predictions| D[TensorFlow.js Model]
```

## 🛠️ Tech Stack
| Component | Technology |
|---|---|
| **Frontend** | Vue 3 (Composition API), Vite, Tailwind CSS, PrimeVue |
| **Backend** | Node.js, Express, JWT |
| **Database** | MongoDB, Mongoose |
| **Machine Learning**| TensorFlow.js, Keras (Pre-trained) |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB instance (local or Atlas)

### Clone & Install
```bash
git clone https://github.com/vanshch/Dermalens.git
cd Dermalens

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### Environment Setup
1. Create a `config.env` in the `backend/` directory (see `backend/config.env.example` for reference).
2. Create a `.env` in the root directory (see `.env.example` for reference).

### Run Dev Servers

#### Backend (runs on port 3000 by default)
```bash
cd backend
npm run dev
```

#### Frontend (runs on port 5173 by default)
```bash
# In the project root directory
npm run dev
```

## 📡 API Reference

| Endpoint | Method | Auth Required | Description |
|---|---|---|---|
| `/api/auth/register` | POST | No | Register a new user |
| `/api/auth/login` | POST | No | Authenticate user & get token |
| `/api/post/image` | POST | Yes | Upload an image for experimental analysis |
| `/api/post/feedback` | POST | Yes | Submit analysis feedback |
| `/api/appointment/create` | POST | Yes | Create an appointment request |

Protected endpoints require an `Authorization: Bearer <token>` header. The image endpoint accepts multipart form data using the field name `file`.

## 📁 Project Structure

```
dermalens/
├── backend/               # Express server and business logic
│   ├── config/            # Server configuration
│   ├── controllers/       # Route handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── uploads/           # Image storage
├── Dermalens-model/       # TF.js machine learning assets
├── src/                   # Vue 3 frontend source code
│   ├── components/        # Reusable UI elements
│   ├── views/             # Page components
│   ├── store/             # Vuex state
│   └── router/            # Vue router setup
└── public/                # Static assets
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
