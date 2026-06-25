import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from '../../components/layouts/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 1. Fetch the user we saved during Sign Up
    const savedData = localStorage.getItem('taskManagerUser');
    let user = savedData ? JSON.parse(savedData) : null;

    // 2. If they are logging in with a brand new email, mock a profile for them
    if (!user || user.email !== email) {
      const isAdmin = email.toLowerCase().includes('admin');
      
      // Auto-generate a name from their email (e.g., sandeep@gmail.com -> Sandeep)
      const generatedName = email.split('@')[0];
      const capitalizedName = generatedName.charAt(0).toUpperCase() + generatedName.slice(1);

      user = {
        name: capitalizedName,
        email: email,
        role: isAdmin ? 'admin' : 'user'
      };
      // Save this new profile to memory
      localStorage.setItem('taskManagerUser', JSON.stringify(user));
    }

    // 3. Route them exactly where they belong based on their role
    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] w-full mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Please enter your details to log in</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-800 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="sandeep@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 mb-1">Password</label>
            <div className="relative flex items-center w-full px-4 py-3 border border-gray-200 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50/50">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Min 8 Characters"
                className="w-full bg-transparent outline-none"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition-colors mt-2"
          >
            LOGIN
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold hover:underline">SignUp</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;