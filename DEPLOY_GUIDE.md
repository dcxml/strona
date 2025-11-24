# DEPLOYMENT NA NETA - KROK PO KROKU

## 1️⃣ BAZA DANYCH - SUPABASE (Darmowy PostgreSQL)

### Krok 1: Wejdź na Supabase
1. Otwórz: https://supabase.com
2. Kliknij "Sign Up"
3. Zaloguj się przez GitHub

### Krok 2: Stwórz Projekt
1. Kliknij "New Project"
2. Nazwa: `typy-tenisowe`
3. Password: zapamiętaj!
4. Region: Europe (bliżej)
5. Czekaj ~2 minuty

### Krok 3: Pobierz Connection String
1. Kliknij w projekt
2. Settings → Database
3. Szukaj "Connection string" → PostgreSQL
4. Kliknij ikonkę kopiuj
5. Zapisz gdzieś (będzie `postgresql://...`)

### Krok 4: Uruchom SQL
1. Wejdź w projekt
2. SQL Editor (po lewej)
3. Nowy query
4. Otwórz `backend/schema.sql` z komputera
5. Skopiuj całą zawartość
6. Wklej w SQL Editor
7. Kliknij "Run"
8. Czekaj aż będzie: ✓ Success

**✓ Baza gotowa!**

---

## 2️⃣ BACKEND - RAILWAY.APP (Darmowy Node.js Hosting)

### Krok 1: Przygotuj GitHub Repo
```powershell
cd C:\Users\dcxml\Desktop\typy
git init
git add .
git commit -m "Initial commit - Typy Tenisowe app"
```

Potem wrzuć na GitHub (jeśli nie masz, stwórz konto):
1. https://github.com/new
2. Nazwa: `typy-tenisowe`
3. Create repository
4. Następnie:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/typy-tenisowe.git
git branch -M main
git push -u origin main
```

### Krok 2: Wejdź na Railway
1. Otwórz: https://railway.app
2. Zaloguj się przez GitHub
3. Kliknij "Create New Project"
4. "Deploy from GitHub repo"
5. Autoryzuj Railway na GitHubie
6. Wybierz `typy-tenisowe` repo
7. Kliknij "Deploy"

### Krok 3: Ustaw Root Directory
1. W Railway: Settings
2. Root Directory: `backend`
3. Deploy Trigger: Manual (jeśli nie chcesz auto-deploya)

### Krok 4: Zmienne Środowiskowe
W Railway:
1. Variables
2. Dodaj zmienne:

```
DATABASE_URL = [skopiuj z Supabase]
JWT_SECRET = super_tajny_klucz_123456_zmien_mnie
NODE_ENV = production
FRONTEND_URL = https://typy-frontend.vercel.app [zmienisz potem]
```

### Krok 5: Uruchom Deploy
1. Railway powinien automatycznie deployować
2. Czekaj ~3 minuty
3. Powinno być: ✓ Deploy Successful

### Krok 6: Pobierz URL Backendu
1. W Railway: Settings
2. Public Networking
3. Kliknij "Generate Domain"
4. Powinno być coś jak: `typy-api-xyz.railway.app`
5. Zapamiętaj ten URL!

**✓ Backend gotowy!**

---

## 3️⃣ FRONTEND - VERCEL (Darmowy React Hosting)

### Krok 1: Przygotuj .env.local
W `frontend/` stwórz plik `.env.local`:
```
VITE_API_URL=https://typy-api-xyz.railway.app/api
```

Zamień `typy-api-xyz` na URL z Railway!

### Krok 2: Wrzuć na GitHub
```powershell
cd frontend
git add .env.local
git commit -m "Add frontend env"
git push
```

### Krok 3: Wejdź na Vercel
1. Otwórz: https://vercel.com
2. Zaloguj się przez GitHub
3. Kliknij "Add New..."
4. "Project"

### Krok 4: Import Projektu
1. "Import Git Repository"
2. Wklej: `https://github.com/YOUR_USERNAME/typy-tenisowe`
3. Kliknij "Import"

### Krok 5: Konfiguracja Buildu
1. Framework: Vite
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Install Command: `npm install`

### Krok 6: Zmienne Środowiskowe
1. "Environment Variables"
2. Dodaj:

```
Name: VITE_API_URL
Value: https://typy-api-xyz.railway.app/api
```

### Krok 7: Deploy
1. Kliknij "Deploy"
2. Czekaj ~2-3 minuty
3. Powinno być: ✓ Ready!

### Krok 8: Pobierz URL Frontendu
1. Po deploymencie, powinno być coś jak: `typy-tenisowe.vercel.app`
2. Zapamiętaj ten URL!

**✓ Frontend gotowy!**

---

## 4️⃣ FINALIZACJA - Połącz Wszystko

### Krok 1: Aktualizuj Railway
Wróć do Railway i zmień:
```
FRONTEND_URL = https://typy-frontend.vercel.app
```
Na Twoją rzeczywistą domenę z Vercel!

### Krok 2: Testuj Aplikację
1. Otwórz: `https://typy-tenisowe.vercel.app` (Twoja domena)
2. Powinna się załadować strona logowania
3. Zarejestruj się
4. Zaloguj się
5. Kup testowy plan
6. Dodaj typ

### Krok 3: Jeśli Nie Działa
**CORS Error?**
- Upewnij się że `FRONTEND_URL` w Railway jest dokładnie jak u Ciebie w Vercel

**API Error?**
- Sprawdź czy `VITE_API_URL` w Vercel jest dokładnie jak URL z Railway

**Baza nie łączy?**
- W Supabase → Settings → Database
- Scroll do "Connection Pooling"
- Zapamiętaj IP (powinno być automatycznie allowed)

---

## 5️⃣ DODATKOWE KROKI

### Dodaj Domenę Niestandardową (opcjonalnie)
**Vercel (Frontend):**
1. Project Settings
2. Domains
3. Add Custom Domain
4. Wpisz swoją domenę (np. typy.com)
5. Postępuj według instrukcji DNS

**Railway (Backend):**
- Railway daje darmową subdomenę, ale możesz zmienić na własną w Settings

### Monitoring
**Railway:**
- Deployments → kliknij wdrożenie
- Logs → zobacz co się dzieje

**Vercel:**
- Settings → Monitoring
- Deployments → Logs

---

## 6️⃣ PODSUMOWANIE LINKÓW

Po deployment powinieneś mieć:

| Komponenta | URL | Typ |
|-----------|-----|-----|
| Frontend | https://typy-tenisowe.vercel.app | Vercel |
| Backend API | https://typy-api-xyz.railway.app | Railway |
| Baza danych | PostgreSQL na Supabase | Supabase |

---

## ⚠️ TROUBLESHOOTING

### Problem: Vercel build fails
```
Przyczyna: node_modules cache
Rozwiązanie: Vercel Settings → Git → "Clear Cache"
```

### Problem: Railway deployment stuck
```
Przyczyna: Czeka na endpoint
Rozwiązanie: Railway → Rerun Last Deploy
```

### Problem: Baza ma błąd
```
Przyczyna: SQL błąd
Rozwiązanie: Supabase → SQL Editor → sprawdź error message
```

### Problem: Timeout na API
```
Przyczyna: Wolna baza
Rozwiązanie: Supabase to darmowy plan, normalnie
```

---

## ✅ CHECKLIST

- [ ] Supabase projekt utworzony i baza loaded
- [ ] GitHub repo stworzony i push
- [ ] Railway projekt created i zmienna DATABASE_URL dodana
- [ ] Backend URL wygenerowany (typy-api-xyz.railway.app)
- [ ] Vercel projekt imported z Frontend folder
- [ ] VITE_API_URL w Vercel settings dodany
- [ ] Frontend URL wygenerowany (typy-tenisowe.vercel.app)
- [ ] FRONTEND_URL w Railway updated
- [ ] Aplikacja załadowuje się na Vercel linku
- [ ] Mogę się zalogować
- [ ] Mogę kupić plan
- [ ] Mogę dodać typ

---

## 🎉 GOTOWE!

Teraz Twoja aplikacja żyje na NECIE! 🚀

Każdy może się zalogować na: `https://typy-tenisowe.vercel.app`

---

## 💡 CO DALEJ?

1. **Dodaj Stripe** - Dla prawdziwych pieniędzy
2. **Custom domena** - Zamiast vercel.app
3. **Email sending** - SendGrid (rejestracja, resetowanie hasła)
4. **SMS** - Twilio (notyfikacje)
5. **Live data** - Rzeczywiste mecze tenisowe

---

**Gratulacje! Aplikacja jest live! 🎾**
