# Backend - Typy Tenisowe

Serwer API dla aplikacji typów tenisowych. Zbudowany w Node.js + Express z PostgreSQL.

## 📋 Struktura

```
src/
├── index.js              # Punkt wejścia, konfiguracja Express
├── db.js                 # Połączenie do bazy danych
├── middleware/
│   └── auth.js           # Middleware JWT i weryfikacji subskrypcji
└── routes/
    ├── auth.js           # Rejestracja, logowanie
    ├── picks.js          # CRUD typów tenisowych
    ├── users.js          # Profil, statystyki
    ├── subscriptions.js  # Historia subskrypcji
    └── payments.js       # Płatności i testowe transakcje
```

## 🚀 Szybki Start

```bash
npm install
npm run dev
```

## 📝 API Endpoints

### Autentykacja
- `POST /api/auth/register` - Rejestracja
- `POST /api/auth/login` - Logowanie

### Typy Tenisowe (wymaga subskrypcji)
- `GET /api/picks` - Lista typów użytkownika
- `POST /api/picks` - Dodaj nowy typ
- `PUT /api/picks/:id` - Zaktualizuj wynik typu
- `DELETE /api/picks/:id` - Usuń typ

### Użytkownik
- `GET /api/users/profile` - Pobierz profil
- `PUT /api/users/profile` - Zaktualizuj profil
- `GET /api/users/notifications` - Powiadomienia

### Subskrypcje
- `GET /api/subscriptions/active` - Aktywna subskrypcja
- `GET /api/subscriptions/history` - Historia

### Płatności
- `POST /api/payments/test-payment` - Testowa płatność
- `GET /api/payments/history` - Historia płatności

## 🔐 Autentykacja

Endpoint wymaga JWT w headerze:
```
Authorization: Bearer <token>
```

## 🗄️ Baza Danych

Plik `schema.sql` zawiera wszystkie tabele i indeksy.

Tabele:
- `users` - Użytkownicy
- `subscriptions` - Plany subskrypcji
- `tennis_picks` - Typy tenisowe
- `user_stats` - Statystyki
- `payments` - Historia płatności
- `notifications` - Powiadomienia

## ⚙️ Zmienne Środowiskowe

```
DATABASE_URL          # PostgreSQL connection string
JWT_SECRET           # Klucz do podpisywania tokenów
NODE_ENV             # development/production
PORT                 # Port serwera (default: 5000)
FRONTEND_URL         # URL frontendu (dla CORS)
```

## 🧪 Testowanie

```bash
# Rejestracja
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Logowanie
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Pobierz typy
curl -X GET http://localhost:5000/api/picks \
  -H "Authorization: Bearer <token>"
```

## 📦 Zależności

- **express** - Framework HTTP
- **pg** - Driver PostgreSQL
- **jsonwebtoken** - Autentykacja JWT
- **bcryptjs** - Haszowanie haseł
- **dotenv** - Zmienne środowiskowe
- **cors** - Cross-origin requests
- **nodemon** (dev) - Auto-restart

## 🔄 Workflow Developerski

1. Backend jest w trybie `watch` - zmiana pliku = auto-restart
2. Wszystkie błędy są logowane w terminalu
3. Sprawdź połączenie do bazy w logach

## 🚨 Błędy

| Błąd | Przyczyna | Rozwiązanie |
|------|-----------|------------|
| ECONNREFUSED 5432 | PostgreSQL nie działa | Uruchom PostgreSQL |
| Nieważny token | Token wygasł | Zaloguj się ponownie |
| Brak subskrypcji | Użytkownik bez planu | Kup subskrypcję |

## 🔮 Następne Kroki

1. Integracja Stripe do rzeczywistych płatności
2. Email sending (SendGrid)
3. SMS notyfikacje (Twilio)
4. Live tennis data API
5. Leaderboard

---

**Backend Typy Tenisowe** - Gotowy do produkcji! 🎾
