import { check, validationResult } from "express-validator";
import Todo from "../models/todo.models.js"; // Adjust the path as necessary

// Create a new todo
export const createTodo = [
  check("title", "Title is required").notEmpty(),
  check("description", "Description is required").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const userId = req.user._id;

    console.log("User ID:", userId);

    try {
      // Create new todo item
      const newTodo = new Todo({
        title,
        description,
        // checkbox: checkbox || false,
        user: userId,
      });

      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error); // Log the error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];


// Get all Todos
export const getTodos = async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await Todo.find({ user: userId }); // Filtering by default user
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todos", error: error.message });
  }
};

// Update a Todo by ID
export const updateTodo = [
  check("title", "Title cannot be empty").optional().notEmpty(),
  check("description", "Description cannot be empty").optional().notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params; // Get the ID from the request parameters
      const userId = req.user._id;

      // Check if the todo exists before attempting to update
      const existingTodo = await Todo.findOne({ _id: id, user: userId });
      if (!existingTodo) {
        console.error(`Todo not found for ID: ${id}`); // Log error
        return res.status(404).json({ message: "Todo not found and not permission to edit any todos." });
      }

      // Update the todo
      const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedTodo); // Send back the updated Todo
    } catch (error) {
      console.error("Error updating todo:", error); // Log error for debugging
      res.status(500).json({ message: "Error updating todo", error: error.message });
    }
  },
];


// Delete a Todo by ID
export const deleteTodo = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  // console.log("Deleting todo with ID:", id); // Log the ID

  try {
    const userId = req.user._id;

    // Check if the todo exists before attempting to delete
    const existingTodo = await Todo.findOne({ _id: id, user: userId });
    if (!existingTodo) {
      console.error(`Todo not found for ID: ${id}`); // Log error
      return res.status(404).json({ message: "Todo not found" });
    }
    
    await Todo.findByIdAndDelete(id); // Use findByIdAndDelete
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    console.error("Error deleting todo:", error); // Log error for debugging
    res.status(500).json({ message: "Error deleting todo", error: error.message });
  }
};
