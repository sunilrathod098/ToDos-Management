import { check, validationResult } from "express-validator";
// import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

// // Generate Access Token
// const generateAccessToken = (userId) => {
//   return jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET, {
//     expiresIn: "30d", // Access token expiration time
//   });
// };

// Register a new user
export const registerUser = [
  check("username", "Username is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password must be at least 8 characters long").isLength({
    min: 8,
  }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Normalize email (trim and lowercase)
      const normalizedEmail = email.trim().toLowerCase();

      // Check if the user already exists
      let user = await User.findOne({ email: normalizedEmail });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      user = new User({
        username,
        email: normalizedEmail, // Save normalized email
        password,
      });
      await user.save();

      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Error during registration:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];

// Login user
export const loginUser = [
  check("email", "Valid email is required").isEmail(),
  check("password", "Password is required").exists(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    try {
      // Fetch the user by normalized email
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      if (user.password !== password) { // Update this with proper password hashing in production
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Login successful
      res.status(200).json({
        message: "Login successful",
        user: { username: user.username, email: user.email }, // Return user info if needed
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
];



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
export const updateUserById = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
};

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
