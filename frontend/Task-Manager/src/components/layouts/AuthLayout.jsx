import React from 'react';
import authImg from '../../assets/images/auth-img.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-full h-screen font-sans">
      {/* Left Side: Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col relative justify-center items-center p-8 bg-white overflow-y-auto">
        {/* Persistent Brand Header */}
        <div className="absolute top-8 left-8 lg:left-16">
          <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
        </div>
        
        {/* Form Content Injected Here */}
        <div className="w-full max-w-md mt-16 lg:mt-0">
          {children}
        </div>
      </div>

      {/* Right Side: Graphic Container */}
      <div 
        className="hidden lg:flex w-1/2 justify-center items-center bg-cover bg-center"
        /* Loading the image from the public folder */
        style={{ backgroundImage: `url('/bg-img.jpg')` }}
      >
        <img 
          src={authImg} 
          alt="Dashboard Graphic" 
          className="w-3/4 max-w-lg object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;