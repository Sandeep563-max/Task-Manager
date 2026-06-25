import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MdOutlineDashboard, 
  MdOutlineTaskAlt, 
  MdLogout 
} from 'react-icons/md';

const UserLayout = ({ children }) => {
  const location = useLocation();

  // 1. Fetch the saved user from local storage (or fallback to 'User' if null)
  const savedData = localStorage.getItem('taskManagerUser');
  const user = savedData ? JSON.parse(savedData) : { name: 'User', email: 'user@example.com' };

  const navLinks = [
    { name: 'Dashboard', path: '/user/dashboard', icon: <MdOutlineDashboard size={22} /> },
    { name: 'My Tasks', path: '/user/tasks', icon: <MdOutlineTaskAlt size={22} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        
        <div className="h-16 flex items-center px-6">
          <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
        </div>

        {/* User Profile Section (Now Dynamic!) */}
        <div className="flex flex-col items-center py-8">
          <img 
            src="https://i.pravatar.cc/150?img=12" 
            alt="User Profile" 
            className="w-20 h-20 rounded-full object-cover mb-3 shadow-sm border-2 border-white"
          />
          {/* Insert the dynamic name and email here */}
          <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-4 px-8 py-3 text-sm font-medium transition-colors border-r-4 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 border-transparent hover:text-gray-900'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6">
          <button className="flex items-center gap-4 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors w-full">
            <MdLogout size={22} />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

    </div>
  );
};

export default UserLayout;