<div align="center">

# My Notes

Небольшое full‑stack приложение для заметок: REST API на Express + PostgreSQL и интерфейс на Vue 3 + PrimeVue + Tailwind CSS.

</div>

## Содержание
- Общая информация
- Быстрый старт
- Структура проекта
- Переменные окружения
- Сервисы в Docker
- Документация

## Общая информация
Приложение позволяет создавать, редактировать, удалять и просматривать заметки. Есть поиск, сортировка и фильтр по цвету маркера. На фронтенде используются PrimeVue компоненты и дизайн‑токены (Aura preset). Бэкенд предоставляет REST API и Swagger UI.

## Быстрый старт

1) Установите зависимости фронтенда и бэкенда:
```bash
cd backend && npm i
cd ../frontend && npm i
```

2) Поднимите PostgreSQL через docker‑compose:
```bash
docker compose up -d postgres
```

3) Запустите бэкенд (http://localhost:4000):
```bash
cd backend
npm run dev
```

4) Запустите фронтенд (http://localhost:5173):
```bash
cd frontend
npm run dev
```

## Структура проекта
```
my-notes/
  backend/           # Express + TS + PostgreSQL
    src/
      controllers/
      routes/
      middlewares/
      config/
      types/
    migrations/
    README.md
  frontend/          # Vue 3 + TS + PrimeVue + Tailwind CSS
    src/
      components/
      services/
      stores/
      types/
    README.md
  docker-compose.yml
  README.md          # Этот файл
```

## Переменные окружения
Пример для `backend/.env`:
```
PORT=4000
DATABASE_URL=postgres://notesuser:notespass123@localhost:5432/notes_db
NODE_ENV=development
```

Фронтенд читает `VITE_API_URL` (по умолчанию `http://localhost:4000`).

## Сервисы в Docker
В `docker-compose.yml` настроен сервис `postgres` с volume и инициализацией схемы из `backend/migrations`.

## Документация
- Swagger UI: `http://localhost:3000/api/docs`
- Healthcheck: `http://localhost:4000/health`

