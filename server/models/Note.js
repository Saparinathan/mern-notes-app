import mongoose from "mongoose";

// A SCHEMA describes the shape of one note document in MongoDB.
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // validation: can't be empty
      trim: true,                            // removes spaces at start/end
      maxlength: [100, "Title must be 100 characters or less"],
    },
    content: {
      type: String,
      default: "",                           // optional field
      trim: true,
    },
  },
  {
    timestamps: true, // MongoDB automatically adds createdAt and updatedAt
  }
);

// A MODEL is the tool we use in code to read/write notes (Note.find(), Note.create(), ...)
// Mongoose will store these in a collection called "notes".
const Note = mongoose.model("Note", noteSchema);

export default Note;
