import { useState, type FormEvent } from "react";
import { addNote } from "../../features/notesSlice";
import { useAppDispatch } from "../../store/hook";
import "./NoteForm.css";

export default function NoteForm() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle || !trimmedContent) return;

    void dispatch(addNote({ title: trimmedTitle, text: trimmedContent }))
      .unwrap()
      .then(() => {
        setTitle("");
        setContent("");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        className="input"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={200}
      />
      <textarea
        className="input textarea"
        placeholder="Текст заметки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="button" type="submit">Создать</button>
    </form>
  );
}
