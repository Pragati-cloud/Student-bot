import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface CustomerSupportProps {
  isDarkMode: boolean;
}

const CustomerSupport: React.FC<CustomerSupportProps> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with any questions about Kuberya Bot. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for your message! Our support team will get back to you shortly. In the meantime, you can check our FAQ section for common questions.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-125 hover:rotate-12 transform-gpu z-50 animate-bounce ${
          isDarkMode 
            ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700' 
            : 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600'
        } text-white flex items-center justify-center`}
        title="Customer Support"
      >
        <MessageCircle size={28} className="animate-pulse" />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-ping">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-80 h-96 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transform-gpu transition-all duration-500 hover:scale-105 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    } ${isMinimized ? 'h-14' : 'h-96'} backdrop-blur-xl bg-opacity-95`}>
      {/* Header */}
      <div className={`p-4 border-b flex items-center justify-between bg-gradient-to-r ${
        isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'
      } ${isDarkMode ? 'from-purple-900/50 to-blue-900/50' : 'from-purple-50 to-blue-50'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
            <MessageCircle size={16} className="text-white animate-bounce" />
          </div>
          <div>
            <h3 className={`font-semibold text-sm bg-gradient-to-r ${isDarkMode ? 'from-purple-400 to-blue-400' : 'from-purple-600 to-blue-600'} bg-clip-text text-transparent`}>
              Customer Support
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'} animate-pulse`}>
              Online now
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={`p-1 rounded transition-all duration-300 hover:scale-110 transform-gpu ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
            }`}
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-1 rounded transition-all duration-300 hover:scale-110 hover:rotate-90 transform-gpu ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
            }`}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    msg.isBot
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-purple-700 to-blue-700 text-white'
                        : 'bg-gradient-to-r from-purple-100 to-blue-100 text-gray-900'
                      : 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white shadow-lg'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className={`p-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 px-3 py-2 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 transform-gpu ${
                  message.trim()
                    ? 'bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-500'
                      : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send size={16} className={message.trim() ? 'animate-pulse' : ''} />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CustomerSupport;