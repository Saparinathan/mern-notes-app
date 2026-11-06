import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "./api/notes.js";
import NoteForm from "./components/NoteForm.jsx";
import NoteList from "./components/NoteList.jsx";

function App() {
  // STATE: data that, when changed, makes React redraw the screen
  const [notes, setNotes] = useState([]);       // the list of notes
  const [loading, setLoading] = useState(true); // are we waiting for the API?
  const [error, setError] = useState("");       // error message to show

  // useEffect with [] runs ONCE, when the page first loads
  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // runs whether it worked or failed
      }
    }
    loadNotes();
  }, []);

  // CREATE: call API, then add the new note to the TOP of our list
  async function handleAdd(note) {
    try {
      setError("");
      const created = await createNote(note);
      setNotes([created, ...notes]); // spread: new array = new note + old notes
    } catch (err) {
      setError(err.message);
    }
  }

  // UPDATE: call API, then swap the old note for the updated one
  async function handleUpdate(id, note) {
    try {
      setError("");
      const updated = await updateNote(id, note);
      setNotes(notes.map((n) => (n._id === id ? updated : n)));
      return true; // tells NoteItem it can close edit mode
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // DELETE: call API, then remove that note from our list
  async function handleDelete(id) {
    try {
      setError("");
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container">
      <h1>My Notes</h1>

      <NoteForm onAdd={handleAdd} />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="info">Loading...</p>
      ) : (
        <NoteList
          notes={notes}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
