import { check, validationResult } from "express-validator";
import { SubTodo } from "../models/sub_todo.models.js";

// Add a new SubTodo with validation
export const addSubTodo = [
  check("title", "Title is required").notEmpty(),
  check(
    "createdBy",
    "Creator is required and must be a valid ObjectId"
  ).isMongoId(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, createdBy } = req.body;

    try {
      const newSubTodo = new SubTodo({ title, createdBy });
      await newSubTodo.save();
      res
        .status(201)
        .json({ message: "SubTodo added successfully", newSubTodo });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding SubTodo", error: error.message });
    }
  },
];

// Get all SubTodos
export const getSubTodos = async (req, res) => {
  try {
    const subTodos = await SubTodo.find().populate("createdBy");
    res.status(200).json(subTodos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving SubTodos", error: error.message });
  }
};

// Update a SubTodo by its ID with validation
export const updateSubTodo = [
  check("title", "Title is required").optional().notEmpty(),
  check("createdBy", "Creator must be a valid ObjectId").optional().isMongoId(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      const updatedSubTodo = await SubTodo.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true, // Ensure validation on update
      });

      if (!updatedSubTodo) {
        return res.status(404).json({ message: "SubTodo not found" });
      }

      res
        .status(200)
        .json({ message: "SubTodo updated successfully", updatedSubTodo });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating SubTodo", error: error.message });
    }
  },
];

// Delete a SubTodo by its ID
export const deleteSubTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubTodo = await SubTodo.findByIdAndDelete(id);
    if (!deletedSubTodo) {
      return res.status(404).json({ message: "SubTodo not found" });
    }

    res.status(200).json({ message: "SubTodo deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting SubTodo", error: error.message });
  }
};
