# Frontend (Vue 3 + TypeScript + PrimeVue + Tailwind)

## Возможности
- UI для заметок: список, создание, редактирование, удаление
- Поиск, сортировка, фильтр по цвету маркера
- Валидация форм через @primevue/forms resolver
- Темизация через PrimeVue Aura preset и дизайн‑токены

## Требования
- Node.js 18+

## Установка и запуск
```bash
npm i
npm run dev       # http://localhost:5173

# продакшен
npm run build
npm run preview   # локальный предпросмотр
```

## Переменные окружения
Фронтенд использует Vite переменные:
```
VITE_API_URL=http://localhost:4000
```

## Структура
```
frontend/
  src/
    components/
      NoteCard.vue
      NoteForm.vue
      NotesFilter.vue
    services/
      api.ts      # axios инстанс с логированием
      notes.ts    # обертка над API заметок
    stores/
      useNotesStore.ts (опционально)
    types/
      index.ts    # общие типы, палитры, сортировки
    utils/
      toParagraph.ts
    main.ts       # PrimeVue, темы, сервисы
```

## Темизация (PrimeVue Styled)
Тема настраивается в `src/main.ts` через `definePreset(Aura, { ... })`. Чтобы сменить основной цвет (primary), используйте предопределенные палитры, например `'{purple.500}'`.

Документация: https://primevue.org/theming/styled/

## Компоненты
- `NoteForm.vue` — форма создания/редактирования с валидацией, эмитит `submit` и `cancel`.
- `NoteCard.vue` — карточка заметки с действиями `edit` и `delete`.
- `NotesFilter.vue` — фильтрация: поиск, цвет, сортировка, порядок.

## Трюблшутинг
- Если TypeScript не видит алиас `@/`, убедитесь, что в `tsconfig.app.json` задан `paths` → `"@/*": ["./src/*"]`.
- Если стили PrimeVue не применяются, проверьте импорт темы и `primeicons` в `main.ts`.
