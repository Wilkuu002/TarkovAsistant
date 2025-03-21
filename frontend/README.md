# 🎯 Tarkov Assistant – Frontend

**Tarkov Assistant** to aplikacja webowa stworzona z myślą o graczach Escape from Tarkov, umożliwiająca sprawdzanie cen przedmiotów, dodawanie ich do ulubionych oraz korzystanie z unikalnego asystenta głosowego. Frontend został wykonany przy użyciu React + TypeScript i zaprojektowany jako responsywna SPA (Single Page Application).

---

## 🧱 Opis projektu – Frontend

Frontend stanowi warstwę wizualną aplikacji, z której użytkownicy mogą korzystać w przeglądarce. Aplikacja komunikuje się z backendem poprzez REST API, umożliwiając:

- Rejestrację i logowanie użytkowników (z integracją z Firebase)
- Wyszukiwanie przedmiotów manualnie lub głosowo
- Dodawanie i usuwanie przedmiotów z ulubionych
- Przeglądanie cen z Tarkov API
- Stylowanie w oparciu o Material UI (MUI)
- Intuicyjny układ i przejrzysty design

---

## 🚀 Technologie

- **React 18** – biblioteka do budowy interfejsów użytkownika
- **TypeScript** – zapewnia typowanie i lepsze wsparcie dla edytora
- **Vite** – ultraszybki bundler wspierający HMR (Hot Module Replacement)
- **Material UI (MUI)** – biblioteka komponentów UI
- **Axios** – do komunikacji z backendem
- **CSS Modules / SCSS** – do modularnego stylowania
- **Web Speech API** – do obsługi rozpoznawania mowy

---

## ⚙️ Instalacja projektu

1. Przejdź do folderu `frontend`:

```bash```
cd frontend

npm install
npm run dev
Aplikacja będzie dostępna pod adresem:
http://localhost:5173
