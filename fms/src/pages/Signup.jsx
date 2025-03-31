import React from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/"); // Redirect after signup
  };

  return (
    <div className="min-h-screen bg-blue-300 absolute top-0 left-0 w-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Back Button inside the white card */}
        <div className="bg-white rounded-lg shadow-xl p-4 border border-gray-200 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-2xl p-2 hover:bg-gray-100 rounded-lg"
          >
            &lt;
          </button>

          {/* Signup Header */}
          <div className="text-center mt-8">
            <div className="flex justify-center mb-4">
              <FaUser className="text-blue-500 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">
              Sign up to get started
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
                <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
                <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  required
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium shadow-sm transition-colors"
            >
              Sign Up
            </button>

            {/* Sign In Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:text-blue-600 hover:underline">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
