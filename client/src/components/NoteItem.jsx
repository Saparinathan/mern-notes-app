import { useState } from "react";

function NoteItem({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  async function handleSave() {
    if (!title.trim()) return;
    const ok = await onUpdate(note._id, { title, content });
    if (ok) setIsEditing(false); // close edit mode only if it worked
  }

  function handleCancel() {
    // put the original values back
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  }

  // ----- Edit mode -----
  if (isEditing) {
    return (
      <div className="note-card">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="actions">
          <button onClick={handleSave}>Save</button>
          <button className="secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ----- Normal (view) mode -----
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{new Date(note.createdAt).toLocaleDateString()}</small>
      <div className="actions">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button className="danger" onClick={() => onDelete(note._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
