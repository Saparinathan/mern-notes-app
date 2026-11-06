// ---------- 1. Import the tools we need ----------
import express from "express";     // web server framework
import mongoose from "mongoose";   // talks to MongoDB
import cors from "cors";           // lets the React app (different port) call this API
import dotenv from "dotenv";       // reads secrets from the .env file
import noteRoutes from "./routes/notes.js";

// ---------- 2. Load environment variables ----------
// After this line, process.env.MONGO_URI and process.env.PORT are available
dotenv.config();

// ---------- 3. Create the app ----------
const app = express();

// ---------- 4. Middleware (runs on every request, in order) ----------
app.use(cors());          // allow requests from other origins (e.g. localhost:5173)
app.use(express.json());  // turn the JSON body of a request into req.body

// ---------- 5. Routes ----------
// Any URL starting with /api/notes is handled by routes/notes.js
app.use("/api/notes", noteRoutes);

// Simple check route so you can open http://localhost:5000 in a browser
app.get("/", (req, res) => {
  res.send("Notes API is running");
});

// ---------- 6. Connect to the database, THEN start the server ----------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
