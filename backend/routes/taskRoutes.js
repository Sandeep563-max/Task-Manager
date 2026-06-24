import express from 'express';
import { protect, adminOnly } from '../middlewares/authMiddleware.js';
import {
    getTasks,
    getTaskById,    
createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskCheckList,
    getDashboardData,
    getUserDashboardData
} from '../controllers/taskController.js';

const router = express.Router();

//Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //Get all tasks (Admin: all , User: assigned to them)
router.get("/:id", protect, getTaskById); //Get task by ID (Admin: all , User: assigned to them)
router.post("/", protect, adminOnly,createTask); //Create a new task (Admin only)
router.put("/:id", protect, updateTask); //Update a task (Admin only)
router.delete("/:id", protect, adminOnly, deleteTask); //Delete a task (Admin only)
router.put("/:id/status", protect, updateTaskStatus); //update task status
router.put("/:id/todo", protect, updateTaskCheckList); //update task checklist

export default router;