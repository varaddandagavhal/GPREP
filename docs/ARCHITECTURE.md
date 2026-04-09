# GPrep – Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT (React.js)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Pages   │  │ Context  │  │   API Services   │  │
│  │ 9 pages  │  │ AuthCtx  │  │ Axios + JWT      │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└──────────────────────┬──────────────────────────────┘
                       │  HTTP/REST (JSON)
                       ▼
┌─────────────────────────────────────────────────────┐
│               SERVER (Node.js + Express)             │
│  ┌──────────────────────────────────────────────┐   │
│  │  Routes Layer                                 │   │
│  │  /api/auth  /api/questions  /api/attempts     │   │
│  │  /api/analytics  /api/admin                   │   │
│  └─────────────────┬────────────────────────────┘   │
│                    │                               │   │
│  ┌─────────────────▼────────────────────────────┐   │
│  │  Middleware Layer                             │   │
│  │  authMiddleware → roleMiddleware → Controller │   │
│  └─────────────────┬────────────────────────────┘   │
│                    │                               │   │
│  ┌─────────────────▼────────────────────────────┐   │
│  │  Controller Layer (Business Logic)            │   │
│  │  authController  questionController           │   │
│  │  attemptController  analyticsController        │   │
│  │  adminController                              │   │
│  └─────────────────┬────────────────────────────┘   │
│                    │                               │   │
│  ┌─────────────────▼────────────────────────────┐   │
│  │  Model Layer (Mongoose ODM)                   │   │
│  │  User  Question  Attempt                      │   │
│  └─────────────────┬────────────────────────────┘   │
└────────────────────┼────────────────────────────────┘
                     │  Mongoose
                     ▼
┌─────────────────────────────────────────────────────┐
│                      MongoDB                         │
│  Collections: users  questions  attempts             │
└─────────────────────────────────────────────────────┘
```

## Authentication Flow

```
User → POST /api/auth/login
         ↓
    Validate email + password
         ↓
    bcrypt.compare(password, hash)
         ↓
    jwt.sign({ id, role }, SECRET, { expiresIn: '7d' })
         ↓
    Return { token, user }
         ↓
    Client stores token in localStorage
         ↓
    Subsequent requests → Authorization: Bearer <token>
         ↓
    authMiddleware → jwt.verify(token) → req.user
         ↓
    roleMiddleware → check req.user.role if admin route
```

## Quiz Submission Flow

```
Client sends: { subject, questionIds[], selectedAnswers[], timeTaken }
         ↓
    Fetch questions from DB by IDs
         ↓
    Compare each selectedAnswer with question.correctAnswer
         ↓
    Calculate: correctCount, incorrectCount, skippedCount
         ↓
    score = Math.round((correct/total) * 100)
    accuracy = parseFloat((correct/total * 100).toFixed(2))
         ↓
    Save Attempt document (snapshot of questions embedded)
         ↓
    Return complete Attempt → client navigates to /results/:id
```

## Analytics Aggregation Query

```javascript
// Subject-wise aggregation:
Attempt.aggregate([
  { $match: { user: userId, completed: true } },
  { $group: {
      _id: '$subject',
      attempts: { $sum: 1 },
      totalCorrect: { $sum: '$correctCount' },
      avgAccuracy: { $avg: '$accuracy' },
      bestScore: { $max: '$score' }
  }},
  { $sort: { avgAccuracy: -1 } }
])
```

## Security Decisions

| Concern | Solution |
|---------|----------|
| Password storage | bcryptjs (12 salt rounds) |
| API auth | JWT (stateless, 7-day expiry) |
| Admin endpoints | role-based middleware (403 for non-admin) |
| HTTP headers | Helmet.js (XSS, HSTS, CSP) |
| CORS | Restricted to frontend origin |
| Input validation | Mongoose schema validators |
| Sensitive data | `select: false` on password field |
| Soft delete | `isActive: false` (data preserved) |

## Design Patterns Used

1. **MVC**: Models ↔ Controllers ↔ Routes (clean separation)
2. **Middleware Factory**: `authorize(...roles)` generates role-specific middleware
3. **Repository Pattern**: API service layer in frontend (`src/api/`)
4. **Context Pattern**: `AuthContext` for global auth state with React Context API
5. **Snapshot Pattern**: Quiz attempt embeds question text/options/answer (prevents data loss if question is edited)
6. **Interceptor Pattern**: Axios interceptors auto-attach JWT tokens
