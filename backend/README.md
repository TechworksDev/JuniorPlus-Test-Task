# Backend (Express + TypeScript + PostgreSQL)

## Возможности
- REST API для заметок: CRUD, поиск, сортировка
- Валидация входных данных (zod)
- Логирование и обработка ошибок (middlewares)
- Swagger UI документация

## Требования
- Node.js 18+
- PostgreSQL 15+ (или docker-compose)

## Установка и запуск
```bash
npm i
npm run dev        # http://localhost:4000
# продакшен
npm run build
npm start
```

## Переменные окружения (.env)
```
PORT=4000
DATABASE_URL=postgres://notesuser:notespass123@localhost:5432/notes_db
NODE_ENV=development
```

## Структура
```
backend/
  src/
    config/
      database.ts
    controllers/
      notesController.ts
    middlewares/
      errorHandler.ts
      logger.ts
    routes/
      notesRoutes.ts
    types/
      index.ts
    index.ts
    swagger.ts
  migrations/
    001_create_notes_table.sql
```

## Основные эндпоинты
- GET    /health — проверка состояния
- GET    /api/notes — список заметок (параметры: search, sort_by, order)
- GET    /api/notes/:id — заметка по id
- POST   /api/notes — создание
- PUT    /api/notes/:id — обновление
- DELETE /api/notes/:id — удаление

Swagger UI: http://localhost:3000/api/docs

## Notes
┌────────────────────────────────────────────┐
│               notes                        │
├────────────────────────────────────────────┤
│ id          SERIAL          PK             │
│ title       VARCHAR(255)    NOT NULL       │
│ content     TEXT            NOT NULL       │
│ marker      color           DEFAULT 'gray' │
│ created_at  TIMESTAMP       DEFAULT now()  │
│ updated_at  TIMESTAMP       DEFAULT now()  │
└────────────────────────────────────────────┘

## Тест соединения с БД
В src/config/database.ts реализована функция testConnection(); при старте сервера соединение проверяется и логируется.
