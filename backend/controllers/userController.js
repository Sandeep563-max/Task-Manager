import Task from '../models/Task.js';
import User from '../models/User.js';

//@desc Get all users(admin only)
//@route GET /api/users
//@access Private/Admin
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({role: 'member'}).select('-password'); // Exclude password field from the response

        //Add task count for each user
        const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Pending' });
        const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: 'In-Progress' });
        const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Completed' });
        return {
            ...user._doc,
            pendingTasks,
            inProgressTasks,
            completedTasks,
        };
        })
    );
        res.json(usersWithTaskCounts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

    // @desc Get user by ID
    // @route GET /api/users/:id
    // @access Private  
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password field from the response
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



