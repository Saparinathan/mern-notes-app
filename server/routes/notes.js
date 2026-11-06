import express from "express";
import mongoose from "mongoose";
import Note from "../models/Note.js";

const router = express.Router();

// Helper: checks that an id looks like a real MongoDB id
const isValidId = (id) => mongoose.isValidObjectId(id);

// ---------- READ ALL: GET /api/notes ----------
router.get("/", async (req, res) => {
  try {
    // find() with no filter returns every note; sort newest first
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching notes" });
  }
});

// ---------- CREATE: POST /api/notes ----------
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body; // data sent from React
    const note = await Note.create({ title, content });
    res.status(201).json(note); // 201 = Created
  } catch (error) {
    // ValidationError means the user sent bad data (e.g. missing title)
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error while creating note" });
  }
});

// ---------- UPDATE: PUT /api/notes/:id ----------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // the :id part of the URL
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const { title, content } = req.body;
    const updated = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true } // new: return updated note, runValidators: re-check rules
    );

    if (!updated) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error while updating note" });
  }
});

// ---------- DELETE: DELETE /api/notes/:id ----------
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: "Invalid note id" });
    }

    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting note" });
  }
});

export default router;
