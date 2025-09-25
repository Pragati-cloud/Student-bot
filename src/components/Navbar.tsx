import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Sun, Moon, Bot, Zap, Brain, Sparkles, Mic, MessageCircle, Plus } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  onVoiceToggle?: () => void;
  onSupportToggle?: () => void;
  onLogout?: () => void;
  onNewChat?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, selectedModel, setSelectedModel, onVoiceToggle, onSupportToggle, onLogout, onNewChat }) => {
  const getModelDescription = (model: string) => {
    const descriptions: { [key: string]: string } = {
      'Mentify 1': 'General purpose AI assistant',
      'Mentify 2': 'Fast and efficient responses',
      'Mentify 3': 'Advanced reasoning and analysis',
      'Mentify 4': 'Creative and innovative solutions'
    };
    return descriptions[model] || 'AI Assistant';
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'} border-b backdrop-blur-xl transition-all duration-300 sticky top-0 z-50 safe-area-inset-top`}>
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 transform-gpu">
                <img 
                  src="/kuberya-logo.jpg" 
                  alt="Kuberya Logo" 
                  className="w-full h-full object-contain rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
                />
              </div>
            </div>
            <div className="hidden xs:block sm:block">
              <h1 className={`text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r ${isDarkMode ? 'from-purple-400 via-blue-400 to-indigo-400' : 'from-purple-600 via-blue-600 to-indigo-600'} bg-clip-text text-transparent animate-pulse`}>
                Kuberya Bot
              </h1>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="block md:hidden">
              <button 
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 min-h-[40px] min-w-[40px] flex items-center justify-center ${
                  isDarkMode 
                    ? 'text-purple-400 hover:text-white hover:bg-purple-600/20' 
                    : 'text-purple-600 hover:text-white hover:bg-purple-500/20'
                }`}
                title="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Current Model Display */}
          <div className="flex-1"></div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* New Chat */}
            <button 
              onClick={onNewChat}
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:scale-110 min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center ${
                isDarkMode 
                  ? 'text-purple-400 hover:text-white hover:bg-purple-600/20' 
                  : 'text-purple-600 hover:text-white hover:bg-purple-500/20'
              }`}
              title="New Chat"
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
            </button>

            {/* Voice Agent - Floating */}
            <button 
              onClick={onVoiceToggle}
              className={`relative p-1 sm:p-1.5 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6 transform-gpu min-h-[32px] min-w-[32px] sm:min-h-[36px] sm:min-w-[36px] flex items-center justify-center ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 text-white shadow-lg'
              }`}
              title="Voice Agent"
            >
              <Mic size={10} className="sm:w-3 sm:h-3 animate-pulse" />
              {/* Floating indicator */}
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-ping">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
              </div>
            </button>

            {/* Profile */}
            <button className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6 transform-gpu min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center ${
              isDarkMode 
                ? 'text-purple-400 hover:text-white hover:bg-purple-600/20' 
                : 'text-purple-600 hover:text-white hover:bg-purple-500/20'
            }`}>
              <User size={14} className="sm:w-4 sm:h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-12 transform-gpu min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center ${
                isDarkMode 
                  ? 'text-purple-400 hover:text-white hover:bg-purple-600/20' 
                  : 'text-purple-600 hover:text-white hover:bg-purple-500/20'
              }`}
            >
              {isDarkMode ? <Sun size={14} className="sm:w-4 sm:h-4 animate-spin" /> : <Moon size={14} className="sm:w-4 sm:h-4 animate-bounce" />}
            </button>

            {/* Logout */}
            <button 
              onClick={onLogout}
              className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-6 transform-gpu min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center ${
              isDarkMode 
                ? 'text-purple-400 hover:text-white hover:bg-red-600/20' 
                : 'text-purple-600 hover:text-white hover:bg-red-500/20'
            }`}
              title="Logout"
            >
              <LogOut size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;