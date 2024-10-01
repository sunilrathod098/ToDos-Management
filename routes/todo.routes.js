import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller.js";
// Import your authentication middleware here
// import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// router.use(authMiddleware); // Protect all routes with auth middleware
router.post("/", createTodo); // POST for creation
router.get("/", getTodos); // GET todos for logged-in user
router.put("/:id", updateTodo); // PUT to update todo
router.delete("/:id", deleteTodo); // DELETE to remove todo

export default router;
