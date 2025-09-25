import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

interface VoiceAgentProps {
  isDarkMode: boolean;
  isActive: boolean;
  onToggle: () => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ isDarkMode, isActive, onToggle }) => {
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (isActive) {
      // Simulate audio level animation
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    onToggle();
  };

  if (!isActive) {
    return (
      <button
        onClick={handleVoiceToggle}
        className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
          isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        } shadow-lg hover:shadow-xl`}
        title="Activate Voice Agent"
      >
        <Mic size={24} />
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      {/* Voice Agent Avatar */}
      <div className="relative">
        {/* Outer pulse rings */}
        <div className={`absolute inset-0 rounded-full ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        } opacity-20 animate-ping`} style={{ animationDuration: '2s' }}></div>
        <div className={`absolute inset-0 rounded-full ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        } opacity-30 animate-ping`} style={{ animationDuration: '1.5s', animationDelay: '0.5s' }}></div>
        
        {/* Main avatar */}
        <div className={`relative w-32 h-32 rounded-full ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
            : 'bg-gradient-to-br from-blue-400 to-indigo-500'
        } flex items-center justify-center shadow-2xl`}>
          {/* Audio visualization bars */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-white rounded-full transition-all duration-150"
                style={{
                  height: `${Math.max(8, (audioLevel + i * 10) % 40)}px`,
                  opacity: isListening ? 1 : 0.3
                }}
              ></div>
            ))}
          </div>
          
          {/* Voice icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Volume2 className="text-white opacity-20" size={48} />
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center">
        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {isListening ? 'Listening...' : 'Voice Agent Active'}
        </h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {isListening ? 'Speak now, I\'m listening' : 'Click the microphone to start speaking'}
        </p>
      </div>

      {/* Control buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleVoiceToggle}
          className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${
            isListening
              ? isDarkMode 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
              : isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
          } shadow-lg hover:shadow-xl`}
          title={isListening ? 'Stop Listening' : 'Start Listening'}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        
        <button
          onClick={() => onToggle()}
          className={`px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
          } shadow-lg hover:shadow-xl`}
        >
          Exit Voice Mode
        </button>
      </div>
    </div>
  );
};

export default VoiceAgent;