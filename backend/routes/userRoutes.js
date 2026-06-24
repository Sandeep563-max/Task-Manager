import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getUsers, getUserById, deleteUser } from "../controllers/userController.js";
import { adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

//User Routes
router.get("/", protect,adminOnly,getUsers); //get all users (Admin Only)
router.get("/:id", protect,getUserById); //get a specific user
router.delete("/:id", protect,adminOnly,deleteUser); //delete a user (Admin Only)

export default router;