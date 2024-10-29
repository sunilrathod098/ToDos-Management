import express from "express";
import {
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controllers/todo.controller.js";
import authMiddleware from "../Middleware/auth.js"; // Import your authentication middleware here

const router = express.Router();

// Protect all routes with auth middleware
router.use(authMiddleware);

router.post("/", createTodo); // POST for creation
router.get("/", getTodos); // GET todos for logged-in user
router.put("/:id", updateTodo); // PUT to update todo
router.delete("/:id", deleteTodo); // DELETE to remove todo

export default router;
