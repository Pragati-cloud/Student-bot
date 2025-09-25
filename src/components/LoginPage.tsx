import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  isDarkMode: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, isDarkMode }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    onLogin();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen flex relative overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden z-10">
        {/* Bubble Background Elements - Only behind Kuberya Bot section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-10 animate-float ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-300'
          }`} style={{ animationDelay: '0s' }}></div>
          <div className={`absolute top-1/3 right-1/4 w-24 h-24 rounded-full opacity-15 animate-float ${
            isDarkMode ? 'bg-purple-400' : 'bg-purple-300'
          }`} style={{ animationDelay: '2s' }}></div>
          <div className={`absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full opacity-12 animate-float ${
            isDarkMode ? 'bg-indigo-400' : 'bg-indigo-300'
          }`} style={{ animationDelay: '4s' }}></div>
          <div className={`absolute top-2/3 right-1/3 w-16 h-16 rounded-full opacity-8 animate-float ${
            isDarkMode ? 'bg-cyan-400' : 'bg-cyan-300'
          }`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute bottom-1/4 right-1/2 w-28 h-28 rounded-full opacity-10 animate-float ${
            isDarkMode ? 'bg-pink-400' : 'bg-pink-300'
          }`} style={{ animationDelay: '3s' }}></div>
          <div className={`absolute top-1/2 left-1/5 w-12 h-12 rounded-full opacity-15 animate-float ${
            isDarkMode ? 'bg-green-400' : 'bg-green-300'
          }`} style={{ animationDelay: '5s' }}></div>
          <div className={`absolute bottom-1/2 right-1/5 w-18 h-18 rounded-full opacity-12 animate-float ${
            isDarkMode ? 'bg-yellow-400' : 'bg-yellow-300'
          }`} style={{ animationDelay: '2.5s' }}></div>
        </div>
        
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}></div>
        <div className="relative z-20 flex flex-col justify-center items-center p-12">
          <div className="mb-8">
            <div className="w-24 h-24 flex items-center justify-center mb-6">
              <img 
                src="/WhatsApp_Image_2025-09-25_at_12.21.37_b3f295e8-removebg-preview (1).png" 
                alt="Kuberya Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kuberya Bot</h1>
            <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your AI-Powered Learning Assistant</p>
          </div>
          <div className="text-center max-w-md">
            <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Experience personalized learning with our advanced AI chatbot designed specifically for students.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img 
                src="/WhatsApp_Image_2025-09-25_at_12.21.37_b3f295e8-removebg-preview (1).png" 
                alt="Kuberya Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Kuberya Bot</h1>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} rounded-2xl shadow-2xl p-8 backdrop-blur-sm border ${isDarkMode ? 'border-purple-700/30' : 'border-purple-200/30'} hover:shadow-3xl transition-all duration-500`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 animate-fade-in`}>
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} animate-fade-in-delay`}>
                {isSignUp ? 'Sign up to get started with Kuberya Bot' : 'Sign in to continue your learning journey'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg animate-pulse"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <div className="relative">
                <div className={`absolute inset-0 flex items-center`}>
                  <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={`w-full ${
                  isDarkMode 
                    ? 'bg-gray-700/80 hover:bg-gray-600 text-white border-gray-600' 
                    : 'bg-white/80 hover:bg-gray-50 text-gray-900 border-gray-300'
                } border py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm hover:scale-[1.02]`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign {isSignUp ? 'up' : 'in'} with Google</span>
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-500 hover:text-purple-600 font-semibold transition-colors duration-300 hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;