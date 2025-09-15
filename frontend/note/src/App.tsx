import NoteForm from './components/Form/NoteForm';
import NoteList from './components/NoteList';

export default function App() {
  return (
    <div>
      <h1>Notes</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
}
