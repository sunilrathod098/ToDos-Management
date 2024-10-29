import jwt from "jsonwebtoken";

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: "Authorization token required" }); // Unauthorized if no token
    }

    // Check if JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "Server configuration error" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            const errorMessage =
                err.name === "TokenExpiredError"
                    ? "Token has expired"
                    : "Invalid token";
            return res.status(403).json({ message: errorMessage }); // Forbidden if token is invalid
        }
        req.user = decoded.user;

        //debugging
        console.log("Authenticated User:", req.user);
        
        next();
    });
};

export default authenticateToken;
