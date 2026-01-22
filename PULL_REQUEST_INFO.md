# Pull Request Information


**Описание полей:**
- `id`: Уникальный идентификатор заметки (первичный ключ, автоинкремент)
- `title`: Заголовок заметки (обязательное поле, максимум 255 символов)
- `content`: Содержимое заметки (текстовое поле)
- `created_at`: Дата и время создания заметки (автоматически устанавливается)
- `updated_at`: Дата и время последнего обновления (автоматически обновляется)

1. **База данных**:
   - Спроектирована модель данных
   - PostgreSQL в Docker
   - Создана схема БД

2. **Backend**:
   - TypeScript + Express
   - Полный REST API для заметок
   - Middleware (логирование, обработка ошибок)
   - Валидация данных (Joi)
   - Swagger документация

3. **Frontend**:
   - Vue 3 + TypeScript
   - Полнофункциональный интерфейс
   - Интеграция с backend API

### Запуск проекта

```bash
# Быстрый запуск всех сервисов
docker-compose up --build

# Приложения будут доступны:
# Frontend: http://localhost:8080
# Backend API: http://localhost:3000
# Swagger Docs: http://localhost:3000/api-docs
```

### API Endpoints

- `GET /api/notes` - Все заметки
- `GET /api/notes/:id` - Заметка по ID
- `POST /api/notes` - Создать заметку
- `PUT /api/notes/:id` - Обновить заметку
- `DELETE /api/notes/:id` - Удалить заметку

### Архитектура

Проект включает:
- **PostgreSQL** база данных
- **Express.js** backend с TypeScript
- **Vue 3** frontend с TypeScript
- **Docker Compose** для оркестрации
- **Swagger** документация API

Все сервисы контейнеризованы и могут быть запущены одной командой.