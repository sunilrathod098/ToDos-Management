import crypto from "crypto";

// Generate a random secret key
const secretKey = process.env.JWT_SECRET || crypto.randomBytes(64).toString("hex");

console.log("Generated Secret Key:", secretKey);