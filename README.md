# GPrep – GATE Preparation Platform

> A production-grade full-stack web application for GATE exam preparation, featuring 100+ MCQs across 8 engineering subjects, JWT authentication, role-based access control, a performance analytics dashboard, and a comprehensive admin panel.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS v3, Vite, Recharts, React Router v6 |
| **Backend** | Node.js, Express.js v5, MVC Architecture |
| **Database** | MongoDB, Mongoose ODM |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |
| **Security** | Helmet, CORS, Role-based Authorization |
| **Dev Tools** | nodemon, dotenv, morgan |

---

## 📁 Project Structure (MVC)

```
GPrep/
├── server/                    # Backend (Node.js + Express - MVC)
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema (role: user/admin)
│   │   ├── Question.js        # Question schema (8 subjects)
│   │   └── Attempt.js         # Quiz attempt schema
│   ├── controllers/
│   │   ├── authController.js       # register, login, getMe
│   │   ├── questionController.js   # CRUD + random quiz fetch
│   │   ├── attemptController.js    # submit + history
│   │   ├── analyticsController.js  # aggregated stats
│   │   └── adminController.js      # admin CRUD + stats
│   ├── routes/
│   │   ├── auth.js, questions.js, attempts.js
│   │   ├── analytics.js, admin.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── roleMiddleware.js   # RBAC (admin/user)
│   │   └── errorHandler.js    # Global error handling
│   ├── seeders/
│   │   └── questionSeeder.js  # 100+ GATE MCQs + admin user
│   ├── .env
│   └── server.js              # App entry point
│
└── client/                    # Frontend (React.js + Tailwind)
    ├── src/
    │   ├── api/               # Axios service layer (6 files)
    │   ├── context/
    │   │   └── AuthContext.jsx # Global auth state
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── SubjectCard.jsx
    │   │   └── ProtectedRoute.jsx (+ AdminRoute, PublicRoute)
    │   └── pages/
    │       ├── LandingPage.jsx, LoginPage.jsx, RegisterPage.jsx
    │       ├── DashboardPage.jsx, QuizPage.jsx, ResultsPage.jsx
    │       ├── AnalyticsPage.jsx, HistoryPage.jsx, AdminPage.jsx
    └── tailwind.config.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js >= 18
- MongoDB (running locally on port 27017)
- npm >= 9

### 1. Clone / Navigate to Project
```bash
cd GPrep
```

### 2. Backend Setup
```bash
cd server
npm install
# Copy .env (already created)
```

Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gprep
JWT_SECRET=gprep_super_secret_key_2024_royal_platform
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. Seed the Database (100+ MCQs + Admin User)
```bash
npm run seed
```
This creates:
- ✅ 100+ GATE-style MCQs across 8 subjects
- ✅ Admin account: `admin@gprep.com` / `Admin@123`

### 4. Start Backend
```bash
npm run dev     # Development (nodemon auto-reload)
npm start       # Production
```
API runs on: `http://localhost:5000`

### 5. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Create user account |
| POST | `/api/auth/login` | Public | Login → returns JWT |
| GET | `/api/auth/me` | Protected | Get current user |

### Questions
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/questions` | Protected | List with filters |
| GET | `/api/questions/subjects` | Protected | Subject stats |
| GET | `/api/questions/quiz` | Protected | Random quiz batch |
| GET | `/api/questions/:id` | Protected | Single question |

### Attempts
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/attempts` | Protected | Submit quiz |
| GET | `/api/attempts` | Protected | Attempt history |
| GET | `/api/attempts/:id` | Protected | Single attempt with review |

### Analytics
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/analytics/summary` | Protected | Overall stats |
| GET | `/api/analytics/subjectwise` | Protected | Per-subject breakdown |

### Admin (role=admin required)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/stats` | Admin | Platform overview |
| GET | `/api/admin/users` | Admin | List all users |
| POST | `/api/admin/questions` | Admin | Add question |
| PUT | `/api/admin/questions/:id` | Admin | Edit question |
| DELETE | `/api/admin/questions/:id` | Admin | Soft delete |

---

## 🎨 Design System

- **Background**: `#0A0A0A` — Royal Black
- **Primary Accent**: `#00C853` — Premium Green
- **Surface Cards**: `#111112` with glassmorphism (backdrop-blur)
- **Typography**: Inter (Google Fonts)
- **UI Effects**: Subtle gradients, hover animations, color-coded difficulty badges

---

## 🗄️ MongoDB Collections

### `users`
```json
{ "name": "string", "email": "string (unique)", "password": "bcrypt hash", "role": "user|admin" }
```

### `questions`
```json
{ "subject": "enum (8 subjects)", "topic": "string", "question": "string", "options": "[4 strings]", "correctAnswer": "0-3", "explanation": "string", "difficulty": "Easy|Medium|Hard", "year": "number", "isActive": "boolean" }
```

### `attempts`
```json
{ "user": "ObjectId ref", "subject": "string", "questions": "[snapshot]", "selectedAnswers": "[number]", "score": "0-100", "accuracy": "float", "correctCount": "number", "timeTaken": "seconds" }
```

---

## 🏆 Resume Talking Points

1. **MVC Architecture**: Clean separation of Models, Controllers, Routes, and Middleware for maintainability
2. **JWT + RBAC**: Stateless authentication with role-based access, protecting admin endpoints
3. **MongoDB Aggregation**: Complex analytics queries computing accuracy, subject-wise scores using `$group`, `$avg`, `$max`
4. **Performance Analytics**: Real-time dashboard with Recharts bar/line charts for visual insights
5. **Admin Panel**: Full CRUD interface for content management with soft-delete pattern
6. **100+ Structured MCQs**: Across 8 subjects with topics, difficulty levels, and detailed explanations
7. **Responsive Design**: Mobile-first approach with Tailwind CSS and glassmorphism
8. **Production Patterns**: Global error handling, HTTP security headers (Helmet), CORS policy, Morgan logging

---

## 👤 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gprep.com | Admin@123 |
| User | Register at /register | — |
