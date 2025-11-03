# Notes Platform - Документация проекта

## 📋 Обзор проекта

Notes Platform — это full-stack веб-приложение для создания, редактирования и управления заметками.

**Технологический стек:**

- **Backend**: Express.js + TypeScript + Sequelize ORM
- **Frontend**: Vue 3 + TypeScript + Vite
- **База данных**: PostgreSQL 15
- **Развертывание**: Docker + Docker Compose

---

## 🏗️ Архитектура

### Системная архитектура

```
┌─────────────────┐
│   Браузер       │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│   Frontend      │ Vue 3 + Nginx
│   Порт: 80      │ (Раздача статики)
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────┐
│   Backend       │ Express.js + TypeScript
│   Порт: 3000    │ (Бизнес-логика + API)
└────────┬────────┘
         │ SQL
         ▼
┌─────────────────┐
│   PostgreSQL    │ База данных
│   Порт: 5432    │ (Хранение данных)
└─────────────────┘
```

### Схема базы данных

**Таблица: `notes`**

| Колонка     | Тип                      | Ограничения                 |
| ----------- | ------------------------ | --------------------------- |
| `id`        | INTEGER                  | PRIMARY KEY, AUTO_INCREMENT |
| `title`     | VARCHAR(255)             | NOT NULL                    |
| `content`   | TEXT                     | NOT NULL                    |
| `createdAt` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW       |
| `updatedAt` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW       |

**Определение модели**: [backend/src/models.ts](backend/src/models.ts)

---

## 📁 Структура проекта

```
notes/
├── backend/                    # API сервер на Express.js
│   ├── src/
│   │   ├── app.ts             # Главная точка входа приложения
│   │   ├── db.ts              # Подключение к БД (Sequelize)
│   │   ├── models.ts          # Определение модели Note
│   │   ├── routes.ts          # API маршруты (CRUD эндпоинты)
│   │   └── validation.ts      # Схемы валидации Zod
│   ├── Dockerfile             # Multi-stage сборка для backend
│   ├── .dockerignore          # Исключения для Docker build
│   ├── package.json           # Зависимости и скрипты
│   └── tsconfig.json          # Конфигурация TypeScript
│
├── frontend/                   # Приложение на Vue 3
│   ├── src/
│   │   ├── main.ts            # Точка входа приложения
│   │   ├── App.vue            # Корневой компонент
│   │   ├── components/
│   │   │   ├── NoteForm.vue   # Форма создания/редактирования
│   │   │   └── NotesList.vue  # Отображение заметок в виде сетки
│   │   ├── features/          # Модули функционала
│   │   └── shared/            # Общие утилиты
│   │       ├── api/           # API клиент
│   │       ├── composables/   # Vue composables
│   │       └── types/         # TypeScript типы
│   ├── Dockerfile             # Multi-stage сборка для frontend
│   ├── nginx.conf             # Конфигурация Nginx для SPA
│   ├── .dockerignore          # Исключения для Docker build
│   ├── package.json           # Зависимости и скрипты
│   └── vite.config.ts         # Конфигурация сборки Vite
│
├── docker-compose.yml          # Оркестрация нескольких сервисов
├── .env.example               # Шаблон переменных окружения
├── CLAUDE.md                  # Инструкции для Claude Code
├── DOCKER_DEPLOYMENT.md       # Руководство по развертыванию Docker
├── PROJECT_DOCUMENTATION.md   # Документация (English)
├── PROJECT_DOCUMENTATION_RU.md # Этот файл
└── task.md                    # Требования проекта
```

---

## 🔌 API Endpoints

**Базовый URL**: `http://localhost:3000/api`

### Эндпоинты для заметок

| Метод    | Эндпоинт     | Описание               | Тело запроса                         | Ответ                 |
| -------- | ------------ | ---------------------- | ------------------------------------ | --------------------- |
| `GET`    | `/notes`     | Получить все заметки   | -                                    | `Note[]`              |
| `GET`    | `/notes/:id` | Получить заметку по ID | -                                    | `Note`                |
| `POST`   | `/notes`     | Создать новую заметку  | `{ title: string, content: string }` | `Note`                |
| `PUT`    | `/notes/:id` | Обновить заметку       | `{ title: string, content: string }` | `Note`                |
| `DELETE` | `/notes/:id` | Удалить заметку        | -                                    | `{ message: string }` |

### Системные эндпоинты

| Метод | Эндпоинт    | Описание                   | Ответ              |
| ----- | ----------- | -------------------------- | ------------------ |
| `GET` | `/health`   | Проверка работоспособности | `{ status: "ok" }` |
| `GET` | `/api-docs` | Swagger документация       | HTML страница      |

---

## 🚀 Быстрый старт

### Требования

- **Docker Desktop** установлен и запущен
- **Node.js 20+** (только для локальной разработки)
- **Git** для контроля версий

### Установка и запуск

#### Вариант 1: Docker (Рекомендуется)

```bash
# 1. Клонируйте или скопируйте проект
cd notes

# 2. Запустите все сервисы
docker-compose up -d

# 3. Откройте приложение
# Frontend: http://localhost
# Backend API: http://localhost:3000/api/notes
# Health check: http://localhost:3000/health

---

## 🛠️ Разработка

### Разработка Backend

**Ключевые файлы:**

- [app.ts](backend/src/app.ts) - Настройка Express, middleware, запуск сервера
- [routes.ts](backend/src/routes.ts) - Определение API эндпоинтов
- [models.ts](backend/src/models.ts) - Модели Sequelize
- [validation.ts](backend/src/validation.ts) - Схемы валидации Zod


### Разработка Frontend

**Ключевые файлы:**

- [App.vue](frontend/src/App.vue) - Корневой компонент, управление состоянием
- [NoteForm.vue](frontend/src/components/NoteForm.vue) - Компонент формы
- [NotesList.vue](frontend/src/components/NotesList.vue) - Компонент списка
- [useNotes.ts](frontend/src/shared/composables/useNotes.ts) - Composable для заметок
- [client.ts](frontend/src/shared/api/client.ts) - API клиент

**Технологии:**

- Vue 3 - UI фреймворк (Composition API)
- TypeScript - Типизация
- Vite - Инструмент сборки и dev сервер
- Fetch API - HTTP запросы

---

## 🐳 Детали Docker

### Образы

| Сервис     | Базовый образ      | Размер  | Назначение                   |
|------------|--------------------|---------|------------------------------|
| Frontend   | nginx:alpine       | ~80MB   | Раздача статического Vue app |
| Backend    | node:20-alpine     | ~274MB  | Запуск Express.js API        |
| PostgreSQL | postgres:15-alpine | ~240MB  | Сервер базы данных           |

### Multi-stage сборки

Multi-stage сборки:

1. **Builder stage**: Установка зависимостей + компиляция/сборка
2. **Runtime stage**: Копирование только необходимых файлов для production

### Сеть

Все сервисы общаются через мост `notes-network`:

- **Контейнер-контейнер**: Используются имена сервисов (например, `postgres:5432`)
- **Хост-контейнер**: Используется localhost + открытые порты

### Volumes

- `postgres_data` - Постоянное хранилище данных PostgreSQL
- `./backend/logs` - Файлы логов backend (монтируются с хоста)

---

## 🔄 Миграции базы данных

Проект использует **Sequelize CLI** для управления схемой базы данных через миграции.

### Структура миграций

```

backend/
├── .sequelizerc # Конфигурация путей для Sequelize CLI
├── src/
│ ├── config/
│ │ └── database.js # Конфигурация подключения к БД
│ └── migrations/ # Файлы миграций
│ └── 20250103000000-create-notes-table.js

````

### Доступные команды

```bash
cd backend

# Применить все миграции
npm run migrate

# Откатить последнюю миграцию
npm run migrate:undo

# Откатить все миграции
npm run migrate:undo:all

# Создать новую миграцию
npm run migration:create -- my-migration-name
````

### Автоматический запуск миграций

При запуске через Docker миграции **применяются автоматически** перед стартом приложения:

```bash
docker-compose up -d  # Миграции запустятся автоматически
```

Это реализовано через скрипт [migrate-and-start.sh](backend/migrate-and-start.sh) в Dockerfile.

### Откат миграций

```bash
# Откатить последнюю миграцию
npm run migrate:undo

# Откатить до конкретной миграции
npx sequelize-cli db:migrate:undo:all --to 20250103000000-create-notes-table.js
```

⚠️ **Внимание**: Откат удалит данные, если миграция включает `DROP TABLE` или `DROP COLUMN`!

---

## 📈 Мониторинг и логи

### Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

### Логи Backend

Находятся в `backend/logs/` (монтированный volume):

---

### Стиль кода

- **TypeScript strict mode** включен
- **ESLint** для качества кода (если настроен)
- **Prettier** для форматирования (если настроен)

---
```
