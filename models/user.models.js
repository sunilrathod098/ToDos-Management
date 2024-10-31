import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // Use plain password
  },
}, {timestamps: true});

// Use default export
const User = mongoose.model("User", userSchema);
export default User; // Default export
