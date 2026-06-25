import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import your Auth pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/SignUp';

// Import your Admin pages
import Dashboard from './pages/Admin/Dashboard';

// Import your User pages
import UserDashboard from './pages/User/UserDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route: Automatically send users to the login page */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* --- AUTHENTICATION ROUTES --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* --- ADMIN ROUTES --- */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        
        {/* --- USER ROUTES --- */}
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* ========================================= */}
        {/* FUTURE ROUTES (Uncomment as we build them) */}
        {/* ========================================= */}
        
        {/* Admin Future Routes */}
        {/* <Route path="/admin/tasks" element={<ManageTasks />} /> */}
        {/* <Route path="/admin/create-task" element={<CreateTask />} /> */}
        {/* <Route path="/admin/team" element={<ManageUsers />} /> */}

        {/* User Future Routes */}
        {/* <Route path="/user/tasks" element={<MyTasks />} /> */}
        {/* <Route path="/user/task-details/:id" element={<ViewTaskDetails />} /> */}

      </Routes>
    </BrowserRouter>
  );
};

export default App;