import NoteItem from "./NoteItem.jsx";

function NoteList({ notes, onUpdate, onDelete }) {
  // Empty state
  if (notes.length === 0) {
    return <p className="info">No notes yet. Add your first one above!</p>;
  }

  return (
    <div className="note-grid">
      {/* map turns each note object into a <NoteItem>.
          "key" helps React track which item is which. */}
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NoteList;
