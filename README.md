TARKOV ASSISTANT — INSTRUKCJA URUCHOMIENIA PROJEKTU

Opis projektu:
Aplikacja Tarkov Assistant umożliwia użytkownikowi wyszukiwanie przedmiotów z gry Escape from Tarkov, śledzenie ich cen, dodawanie ich do ulubionych oraz korzystanie z asystenta głosowego do interakcji z systemem. Projekt został podzielony na dwie części: frontend i backend.

WYMAGANIA:
- Node.js (zalecana wersja: >=16)
- npm (Node Package Manager)
- Dostęp do internetu
- Konto w Google Firebase (wraz z plikiem serwisowym)

STRUKTURA PROJEKTU:
TarkovAsistant/
├── backend/
└── frontend/

===================================================
1. URUCHOMIENIE BACKENDU
===================================================

1. Wejdź do katalogu backend:
   cd backend

2. Zainstaluj zależności:
   npm install

3. Skonfiguruj zmienne środowiskowe (plik .env):

Na potrzeby pracy Inżynierskiej do projektu są już dodane p[liki .env. W tym przypadku należy pominąć ten krok

   - Utwórz plik `.env` w katalogu `backend`
   - Przykład zawartości:
     FIREBASE_API_KEY=twoj_klucz
     GOOGLE_APPLICATION_CREDENTIALS=./firebaseServiceAccount.json



4. Zbuduj aplikację:
   npm run build

5. Uruchom aplikację produkcyjnie:
   npm run start:prod

6. Swagger wraz z dokumentacją będzie dostępny pod adresem:
   http://localhost:3000/api

===================================================
2. URUCHOMIENIE FRONTENDU
===================================================

1. Wejdź do katalogu frontend:
   cd frontend

2. Zainstaluj zależności:
   npm install

3. Uruchom aplikację developerską (z live reload):
   npm run dev

4. Aplikacja będzie dostępna pod adresem:
   http://localhost:5173

===================================================
DODATKOWE INFORMACJE:
===================================================

- Do działania niektórych funkcji potrzebny jest ważny token JWT, otrzymywany po logowaniu.

- Projekt korzysta z Firebase Authentication do logowania i rejestracji użytkowników oraz Firestore Database do przechowywania ulubionych przedmiotów.

