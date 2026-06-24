import jwt from "jsonwebtoken";
import User from "../models/User.js";

//Middleware to protect routes and ensure user is authenticated
const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if(token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; // Extract the token from the "Bearer <token>" format
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
            req.user = await User.findById(decoded.id).select("-password");
            next(); // Proceed to the next middleware or route handler
        } else {
            res.status(401).json({ message: "Not authorized, no token" });
        }
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

//Middleware to check if the user has admin privileges
const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
};

export { protect, adminOnly };