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

    const { title, description, complete } = req.body;

    try {
      // Create new todo item
      const newTodo = new Todo({
        title,
        description,
        complete: complete || false,
      });

      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error); // Log the error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];



// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

// Update user by ID
export const updateUserById = [
  check("email", "Please include a valid email").optional().isEmail(),
  check("password", "Password must be at least 8 characters long")
    .optional()
    .isLength({ min: 8 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Find user by ID
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user fields
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;

      await user.save();
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  },
];

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
