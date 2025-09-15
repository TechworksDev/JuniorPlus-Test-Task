import { useEffect } from "react";
import { loadNotes, removeNote } from "../features/notesSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import type { Note } from "../types/types";
import "./NoteList.css";

export default function NoteList() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.notes);

  useEffect(() => {
    void dispatch(loadNotes());
  }, [dispatch]);

  if (loading) return <p>Загрузка…</p>;
  if (error) return <p className="error">Ошибка: {error}</p>;
  if (items.length === 0) return <p>Пока нет заметок.</p>;

  return (
    <ul className="note_list">
      {items.map((note: Note) => (
        <li key={note.id} className="note_card">
          <div>
            <div className="note_title">{note.title}</div>
            <div className="note_text">{note.text}</div>
            <div className="note_date">
              {new Date(note.created).toLocaleString()}
            </div>
          </div>
          <button
            onClick={() => void dispatch(removeNote(note.id))}
            className="note_delete"
            title="Удалить"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
