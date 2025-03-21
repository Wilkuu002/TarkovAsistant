# 🎯 Tarkov Assistant – Backend

**Tarkov Assistant** to aplikacja wspomagająca graczy Escape from Tarkov w śledzeniu cen przedmiotów oraz zarządzaniu ulubionymi. Ten projekt stanowi część pracy inżynierskiej i składa się z dwóch głównych części: frontend (React) i backend (NestJS + Firebase).

## 🧱 Opis projektu – Backend

Backend jest odpowiedzialny za logikę aplikacji, uwierzytelnianie użytkowników, integrację z Firebase oraz pobieranie danych o przedmiotach z zewnętrznego Tarkov API. Dodatkowo, generuje dokumentację REST API za pomocą Swaggera.

---

## 🚀 Technologie

- **NestJS** – modularny framework do aplikacji serwerowych
- **TypeScript** – statycznie typowany język nad JavaScript
- **Firebase Admin SDK** – uwierzytelnianie użytkowników i dostęp do Firestore
- **Axios** – komunikacja z zewnętrznym Tarkov API
- **Swagger (OpenAPI)** – automatyczna dokumentacja API
- **GraphQL** – dodatkowa możliwość pobierania danych
- **dotenv** – zarządzanie zmiennymi środowiskowymi


---

## ⚙️ Konfiguracja środowiska

W katalogu głównym utwórz plik `.env` i uzupełnij:


Upewnij się, że masz plik `firebaseServiceAccount.json` z poświadczeniami do Twojego projektu Firebase.

---

## 📦 Instalacja

Zainstaluj zależności projektu:

```bash```
npm install

---

## Budowa backendu projektu

npm run build
npm run start:prod

Aplikacja domyślnie uruchamia się na porcie 3000
http://localhost:3000