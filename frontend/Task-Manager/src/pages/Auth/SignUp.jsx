import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FiEye, FiEyeOff, FiUpload } from 'react-icons/fi';
import AuthLayout from "../../components/layouts/AuthLayout";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // --- NEW: State to capture the user's input ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adminToken, setAdminToken] = useState('');

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // 1. Check if they typed anything into the Admin Token field
    const role = adminToken.trim() !== '' ? 'admin' : 'user';

    // 2. Create a user object with the data they typed
    const userData = {
      name: name,
      email: email,
      role: role
    };

    // 3. Save this user globally in the browser's local storage
    localStorage.setItem('taskManagerUser', JSON.stringify(userData));

    // 4. Route them based on the token
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
      <p className="text-gray-500 mb-8">Join us today by entering your details below.</p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Avatar Upload UI */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div 
              onClick={handleAvatarClick}
              className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border-2 border-transparent hover:border-blue-200 transition-colors cursor-pointer overflow-hidden"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
            
            <button 
              type="button" 
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-blue-700"
            >
              <FiUpload size={14} />
            </button>

            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
          </div>
        </div>

        {/* 2-Column Grid for Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-800 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
              required
              value={name}
              onChange={(e) => setName(e.target.value)} // Bind state
            />
          </div>

          <div>
            <label className="block text-sm text-gray-800 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Bind state
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

          <div>
            <label className="block text-sm text-gray-800 mb-1">Admin Invite Token</label>
            <input 
              type="text" 
              placeholder="Leave blank for regular user"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)} // Bind state
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-50 text-blue-600 font-semibold py-3 rounded-md hover:bg-blue-100 transition-colors mt-2"
        >
          SIGN UP
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;