// // import jwt from "jsonwebtoken";

// // // Middleware to protect routes
// // const authenticateToken = (req, res, next) => {
// //   // Extract the token from the Authorization header
// //   const authHeader = req.headers.authorization;
// //   const token = authHeader && authHeader.split(" ")[1]; // Extract token after 'Bearer'

// //   // Check if the token is present
// //   if (!token) {
// //     return res.status(401).json({ message: "Authorization token required" }); // Unauthorized if no token
// //   }

// //   // Verify the token
// //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
// //     if (err) {
// //       return res.status(403).json({ message: "Invalid or expired token" }); // Forbidden if token is invalid
// //     }

// //     // If token is valid, attach user information to the request object
// //     req.user = decoded.user; // `decoded.user` comes from the payload of the token (e.g., { user: { id: userId } })

// //     // Proceed to the next middleware or route handler
// //     next();
// //   });
// // };

// // export default authenticateToken;






// import jwt from "jsonwebtoken";

// // Middleware to protect routes
// const authenticateToken = (req, res, next) => {
//   // Extract the token from the Authorization header
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(" ")[1]; // Extract token after 'Bearer'

//   // Check if the token is present
//   if (!token) {
//     return res.status(401).json({ message: "Authorization token required" }); // Unauthorized if no token
//   }

//   // Check if JWT_SECRET is defined
//   if (!process.env.JWT_SECRET) {
//     return res.status(500).json({ message: "Server configuration error" });
//   }

//   // Verify the token
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       // Differentiating between invalid and expired tokens
//       const errorMessage =
//         err.name === "TokenExpiredError"
//           ? "Token has expired"
//           : "Invalid token";
//       return res.status(403).json({ message: errorMessage }); // Forbidden if token is invalid
//     }

//     // If token is valid, attach user information to the request object
//     req.user = decoded.user; // `decoded.user` comes from the payload of the token (e.g., { user: { id: userId } })

//     // Proceed to the next middleware or route handler
//     next();
//   });
// };

// export default authenticateToken;
