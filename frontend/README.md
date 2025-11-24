# Frontend - Typy Tenisowe

Aplikacja React + Vite do zarabiania na typach tenisowych. Nowoczesny, minimalistyczny design z animacjami.

## 📋 Struktura

```
src/
├── api/
│   └── client.js           # API requests + axios setup
├── components/
│   ├── Button/             # Przycisk z animacjami
│   ├── Input/              # Input field
│   ├── Textarea/           # Textarea component
│   ├── Navigation/         # Top navbar
│   ├── PicksList/          # Lista typów + formularz
│   ├── PricingPlans/       # Plany i cennik
│   └── ProtectedRoute/     # Ruta chroniona logowaniem
├── context/
│   └── AuthContext.jsx     # Stan autentykacji (useAuth)
├── pages/
│   ├── Auth/               # Strona logowania/rejestracji
│   └── Dashboard/          # Strona główna
├── App.jsx                 # Router
├── main.jsx                # Entry point React
└── index.css               # Globalne style + animacje
```

## 🚀 Szybki Start

```bash
npm install
npm run dev
```

Otwórz http://localhost:5173

## 🎨 Design System

### Kolory
- Czarny (primary): `#000000`
- Biały (background): `#ffffff`
- Szary (secondary): `#f5f5f5`
- Zielony (success): `#10b981`
- Czerwony (danger): `#ef4444`
- Niebieski (info): `#3b82f6`

### Komponenty
- **Button** - 3 warianty (primary, secondary, success, danger), 3 rozmiary (sm, md, lg)
- **Input** - TextField z labelą i error message
- **Textarea** - TextArea z labelą
- **Navigation** - Sticky navbar z responsive menu

## 📱 Responsywność

- Desktop (1200px+) - Full layout
- Tablet (768px-1199px) - Adjusted grid
- Mobile (<768px) - Single column, mobile menu

## 🔐 Autentykacja

Używa `AuthContext`:
```jsx
import { useAuth } from './context/AuthContext';

const { user, token, isAuthenticated, login, logout } = useAuth();
```

Token jest przechowywany w `localStorage`.

## 🎬 Animacje

Framer Motion:
- Fade in/out
- Slide up/down/left/right
- Scale on hover
- Stagger (sekwencyjne animacje)

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
/>
```

## 🌐 API Integration

```javascript
import { picksAPI, paymentsAPI, usersAPI } from './api/client';

// Automatycznie dodaje Authorization header
const picks = await picksAPI.getAll();
const payment = await paymentsAPI.testPayment('basic', 29);
```

## 📝 Strony

### `/auth` - Logowanie/Rejestracja
- Toggle między login i register
- Validacja formularza
- Error handling

### `/dashboard` - Główna strona
- Witaj, [imię]!
- Statystyki (total, wins, losses, %)
- Tabs: "Moje Typy" i "Plany"
- Nawigacja top

### Moje Typy
- Lista wszystkich typów
- Formularz dodawania nowego typu
- Akcje: Wygrana/Przegrana/Usuń
- Real-time update statystyk

### Plany i Cennik
- 3 plany (Basic, Pro, Premium)
- Testowe płatności
- Status aktywnego planu

## 📦 Zależności

- **react** - UI framework
- **react-router-dom** - Routing
- **axios** - HTTP requests
- **framer-motion** - Animacje
- **vite** - Build tool

## 🧪 Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

HMR (Hot Module Replacement) - zmiana pliku = auto-reload

## 🔄 Workflow Developerski

1. Edytuj komponenty w `src/`
2. Zapisz (`Ctrl+S`)
3. Przeglądarka się automatycznie odświeża
4. Otwórz F12 DevTools - Console tab aby zobaczyć błędy

## 📝 Edytowanie

### Zmiana Kolorów
Edytuj `src/index.css` - CSS variables w `:root`

### Zmiana Textu
Szukaj po polsku w kodzie JSX

### Dodawanie Strony
1. Utwórz folder w `src/pages/`
2. Zrób `index.jsx` z componentem
3. Dodaj route w `App.jsx`

### Dodawanie Komponentu
1. Utwórz folder w `src/components/`
2. `Component.jsx` + `Component.css`
3. Dodaj export w `index.js` jeśli chcesz reuse

## 🚨 Problemy

| Problem | Przyczyna | Rozwiązanie |
|---------|-----------|------------|
| Biały ekran | JS error | Sprawdź F12 Console |
| API errors | Backend nie działa | Uruchom backend |
| CORS error | URL backendu zły | Sprawdź `.env.local` |
| Token expired | Sesja wygasła | Zaloguj się ponownie |

## 🌍 Deployment

```bash
npm run build
# Wrzuć zawartość `dist/` na Vercel lub hosting
```

Vercel automatycznie deployuje na każdy push do main branch.

## 🔮 Następne Kroki

1. Dark mode toggle
2. Leaderboard strona
3. Udostępnianie typów w społeczności
4. Notifikacje push
5. Progressive Web App (PWA)

---

**Frontend Typy Tenisowe** - Nowoczesny i szybki! 🎾
