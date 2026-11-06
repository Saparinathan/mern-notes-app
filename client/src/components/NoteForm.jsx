import { useState } from "react";

// Props: onAdd is a function given to us by App
function NoteForm({ onAdd }) {
  // "Controlled inputs": the input's value lives in state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page
    if (!title.trim()) return; // title is required

    await onAdd({ title, content });

    // clear the form
    setTitle("");
    setContent("");
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your note..."
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
