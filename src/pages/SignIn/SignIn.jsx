"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct hook for React Router

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Use navigate instead of router.push

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    navigate('/'); // ✅ Use navigate in React projects
    setIsLoading(false);
  };

  return (
    <div className="mt-25 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8  text-center">
        <h1 className="text-white text-4xl font-bold tracking-widest mb-6">
          <img
            src="/INSPHEX.png"
            alt="INSPHEX Logo"
            width={200}
            height={60}
            className="mx-auto"
          />
        </h1>
        <p className="text-white text-lg mb-8">
          Please Sign In
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="admin@admin.test"
              className="w-full px-4 py-3 text-white rounded-md border border-[#546A89] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="**********"
              className="w-full px-4 py-3 text-white rounded-md border border-[#546A89] focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white font-semibold text-lg
              bg-gradient-to-r from-[#FF6B8B] to-[#4ECDC4]
              hover:from-[#FF4C68] hover:to-[#3BB0B0]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-all duration-200 ease-in-out
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
