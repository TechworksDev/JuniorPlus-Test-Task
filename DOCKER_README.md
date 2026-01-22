# Notes Platform - Запуск в Docker

## Быстрый запуск

1. Убедитесь, что у вас установлен Docker и Docker Compose
2. Клонируйте репозиторий
3. Перейдите в корневую директорию проекта
4. Выполните команду:

```bash
docker-compose up --build
```

5. Откройте браузер и перейдите по адресу:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api-docs

## Разработка

Для разработки вы можете запускать сервисы отдельно:

### Только база данных:
```bash
docker-compose up postgres
```

### Backend в режиме разработки:
```bash
cd backend
npm install
npm run dev
```

### Frontend в режиме разработки:
```bash
cd frontend
npm install
npm run dev
```

## Структура проекта

```
├── docker-compose.yml          # Конфигурация Docker Compose
├── docker/
│   ├── Dockerfile.backend      # Dockerfile для backend
│   └── Dockerfile.frontend     # Dockerfile для frontend
├── database/
│   └── init.sql               # Инициализация базы данных
├── backend/                   # Backend приложение (Express + TypeScript)
└── frontend/                  # Frontend приложение (Vue 3 + TypeScript)
```

## API Endpoints

- `GET /api/notes` - Получить все заметки
- `GET /api/notes/:id` - Получить заметку по ID
- `POST /api/notes` - Создать новую заметку
- `PUT /api/notes/:id` - Обновить заметку
- `DELETE /api/notes/:id` - Удалить заметку

## Переменные окружения

### Backend
- `DB_HOST` - Хост базы данных (по умолчанию: localhost)
- `DB_PORT` - Порт базы данных (по умолчанию: 5432)
- `DB_NAME` - Имя базы данных (по умолчанию: notes_db)
- `DB_USER` - Пользователь базы данных (по умолчанию: notes_user)
- `DB_PASSWORD` - Пароль базы данных (по умолчанию: notes_password)
- `PORT` - Порт сервера (по умолчанию: 3000)

## Остановка сервисов

```bash
docker-compose down
```

## Очистка данных

Для полной очистки (включая базу данных):

```bash
docker-compose down -v
```