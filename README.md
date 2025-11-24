# Typy Tenisowe - Aplikacja Subskrypcyjna

Nowoczesna, minimalistyczna aplikacja do zarabiania na typach tenisowych. Biały i czarny design z płynnymi animacjami.

## 📋 25 Zaimplementowanych Funkcji

### Autentykacja & Użytkownik (5)
1. **Rejestracja nowego użytkownika** - Email, hasło, imię, nazwisko
2. **Logowanie** - Bezpieczne logowanie z JWT
3. **Wylogowanie** - Czyszczenie sesji i lokalnego storage
4. **Pobieranie profilu** - Dane użytkownika i statystyki
5. **Aktualizacja profilu** - Zmiana danych użytkownika

### Subskrypcje & Płatności (6)
6. **Trzy plany subskrypcji** - Basic (30 dni), Pro (90 dni), Premium (365 dni)
7. **Testowe płatności** - System płatności testowych (gotowy na Stripe)
8. **Aktywacja subskrypcji** - Automatyczne przyznawanie dostępu
9. **Historia płatności** - Przegląd poprzednich transakcji
10. **Historia subskrypcji** - Śledzenie ważności planów
11. **Weryfikacja dostępu** - Middleware sprawdzający subskrypcję

### Typy Tenisowe (5)
12. **Dodawanie typów** - Formularz z opisem, graczami, kursami
13. **Lista typów** - Przegląd wszystkich typów użytkownika
14. **Edycja wyniku typu** - Wygrana/Przegrana/Push
15. **Usuwanie typów** - Moderacja typów
16. **Filtrowanie typów** - Po dacie, turniejowi, wyniku

### Statystyki (4)
17. **Liczba wszystkich typów** - Całkowita liczba typów
18. **Liczba wygranych** - Typy które wygrały
19. **Liczba przegranych** - Typy które przegrały
20. **Procent wygranych** - Automatycznie wyliczany ROI

### Notyfikacje & UI (5)
21. **Powiadomienia email** - Przy zakupie subskrypcji
22. **Animacje wchodzenia** - FadeIn, SlideIn na elementach
23. **Responsywny design** - Mobile, tablet, desktop
24. **Dark/Light theme** - Przygotowany system kolorów
25. **Błędy i validacja** - Komunikaty błędów dla użytkownika

## 🚀 Stack Technologiczny

- **Frontend:** React 18 + Vite + Framer Motion (animacje)
- **Backend:** Node.js + Express
- **Baza danych:** PostgreSQL
- **Hosting:** 
  - Frontend: Vercel (darmowy)
  - Backend: Railway / Render (darmowy plan)
  - Baza: Supabase / Railway PostgreSQL (darmowy)
- **Autentykacja:** JWT
- **Płatności:** Testowe (gotowe na Stripe)

## 📦 Instalacja Lokalna

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edytuj .env z twoimi danymi bazy
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🗄️ Konfiguracja Bazy Danych

### PostgreSQL (lokalnie)

```bash
createdb typy_tenisowe
psql typy_tenisowe < backend/schema.sql
```

### Online (Supabase / Railway)

1. Utwórz konto na [Supabase](https://supabase.com) lub [Railway](https://railway.app)
2. Skopiuj CONNECTION STRING do `.env`
3. Uruchom SQL z `schema.sql`

## 🌐 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
# Zaloguj się w Vercel CLI i deploy
vercel deploy
```

### Backend (Railway / Render)

1. Push kodu do GitHub
2. Połącz repozytorium w Railway/Render
3. Ustaw zmienne środowiskowe
4. Auto-deploy

## 🔒 Zmienne Środowiskowe

### Backend `.env`

```
DATABASE_URL=postgresql://user:pass@host:5432/typy_tenisowe
JWT_SECRET=your_secure_secret_key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com
```

### Frontend `.env.local`

```
VITE_API_URL=https://your-api.com/api
```

## 💡 Kolejne Kroki

1. **Integracja Stripe** - Zamień testowe płatności na rzeczywiste
2. **Email sending** - Dodaj SendGrid lub Mailgun
3. **SMS notyfikacje** - Twilio dla powiadomień
4. **Live data** - Integracja z tennisowymi API (Tennis Explorer)
5. **Leaderboard** - Ranking użytkowników
6. **Społeczność** - Udostępnianie typów
7. **Mobile app** - React Native

## 📝 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Picks
- `GET /api/picks` - Lista typów (wymaga subskrypcji)
- `POST /api/picks` - Nowy typ (wymaga subskrypcji)
- `PUT /api/picks/:id` - Aktualizacja wyniku
- `DELETE /api/picks/:id` - Usunięcie typu

### Payments
- `POST /api/payments/test-payment` - Testowa płatność
- `GET /api/payments/history` - Historia płatności

### Users
- `GET /api/users/profile` - Profil użytkownika
- `PUT /api/users/profile` - Aktualizacja profilu
- `GET /api/users/notifications` - Notyfikacje

## ⚙️ Troubleshooting

**CORS Error?**
- Sprawdź `FRONTEND_URL` w `.env` backendu

**Brak dostępu do typów?**
- Sprawdź czy subskrypcja jest aktywna w bazie
- Zerknij na token JWT

**Błędy bazy?**
- Upewnij się że schema.sql został uruchomiony
- Sprawdź `DATABASE_URL`

---

**Aplikacja gotowa do wdrożenia! Powodzenia! 🎾**
