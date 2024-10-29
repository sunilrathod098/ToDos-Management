import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config(); // Load environment variables from .env file

// Server setup
const app = express();
const PORT = process.env.PORT || 5500;

// Convert __dirname/__filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Allowed origins for CORS
const allowedOrigins = ["http://localhost:5500", "http://127.0.0.1:5500", "http://127.0.0.1:5501"];

// CORS middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
})); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Connect routes
app.use("/api/users", userRouter);
app.use("/api/todos", todoRouter);

// Serve frontend pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/todos", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "todos.html"));
});

// Fallback error handler
app.use((err, req, res, next) => {
  console.error("Error details:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
