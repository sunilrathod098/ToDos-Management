import express from "express";
import {
  addSubTodo,
  deleteSubTodo,
  updateSubTodo,
} from "../controllers/sub_todo.controller.js";
import { SubTodo } from "../models/sub_todo.models.js";

const router = express.Router();

// Get all subtodos for a specific todo
router.get("/:todoId", async (req, res) => {
  const { todoId } = req.params;

  try {
    const subtodos = await SubTodo.find({ todo: todoId });
    res.status(200).json(subtodos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new subtodo
router.post("/", addSubTodo);
router.put("/:id", updateSubTodo);
router.delete("/:id", deleteSubTodo);

export default router;
