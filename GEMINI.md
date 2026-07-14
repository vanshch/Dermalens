# Dermalens Project Documentation

Dermalens is a full-stack application designed for skin disease analysis, combining a modern web interface with machine learning capabilities.

## Project Overview

- **Purpose:** Skin disease analysis and medical appointment management.
- **Frontend:** Vue 3 (Composition API) with Vite, Tailwind CSS, and PrimeVue.
- **Backend:** Node.js with Express, using MongoDB (via Mongoose) for data storage.
- **Machine Learning:** TensorFlow.js integration for running predictions using a pre-trained Keras model.
- **Key Features:** User authentication, image uploads, AI-powered analysis, appointment scheduling, and email notifications.

## Architecture

### Frontend (`/`)
The root directory contains the Vue 3 application.
- `src/main.js`: Entry point.
- `src/components/`: Reusable UI components.
- `src/views/`: Page-level components (Home, Login, Dashboard, etc.).
- `src/store/`: Vuex state management.
- `src/router/`: Vue Router configuration.
- `src/services/`: API interaction logic.

### Backend (`/backend`)
The backend is a Node.js/Express server.
- `backend/server.js`: Server entry point.
- `backend/config/`: Configuration files (DB connection, Multer).
- `backend/controllers/`: Business logic for handling requests.
- `backend/models/`: Mongoose schemas (User, Doctor, Appointment, etc.).
- `backend/routes/`: API route definitions.
- `backend/middlewares/`: Express middlewares (Auth, Rate limiting).
- `backend/uploads/`: Directory for storing uploaded images.

### Machine Learning (`/Dermalens-model`)
Contains the model assets and testing scripts.
- `model.json`: The TensorFlow.js model configuration.
- `*.bin`: Weight shards for the model.
- `test.js`: Script for testing model predictions locally.

## Building and Running

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or Atlas)

### Environment Setup
1. **Backend:** Create a `backend/config.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   # Add other necessary variables like email config
   ```
2. **Frontend:** Configuration is primarily handled via Vite.

### Commands

#### Frontend (Root)
- `npm install`: Install dependencies.
- `npm run dev`: Start Vite development server.
- `npm run build`: Build for production.
- `npm run preview`: Preview the production build.

#### Backend (`/backend`)
- `npm install`: Install dependencies.
- `node server.js`: Start the server.
- `npm run dev` (if nodemon is configured): Start server in watch mode.

## Development Conventions

- **Language:** JavaScript (ES Modules).
- **Backend Pattern:** Follows a standard Controller-Route-Model pattern.
- **Frontend Pattern:** Vue 3 SFCs with `<script setup>`. State management via Vuex.
- **Security:**
    - JWT used for session management.
    - Rate limiting implemented on sensitive routes (login, register).
    - Security headers (XSS protection, Frame options) enabled in `server.js`.
- **API Prefix:** All backend API routes are prefixed with `/api`.
- **Formatting:** Adhere to existing Tailwind CSS and PrimeVue styling patterns.
