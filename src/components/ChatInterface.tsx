import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, MoreHorizontal, Bot, User } from 'lucide-react';
import VoiceAgent from './VoiceAgent';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isDarkMode: boolean;
  selectedModel: string;
  onNewInteraction: (title: string, summary: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isDarkMode, selectedModel, onNewInteraction }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your question. Let me help you with that. As Kuberya Bot, I'm designed to assist students with their learning needs. Could you provide more specific details about what you'd like to learn or discuss?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Add to history
      onNewInteraction(
        inputValue.length > 50 ? inputValue.substring(0, 50) + '...' : inputValue,
        botMessage.text.length > 100 ? botMessage.text.substring(0, 100) + '...' : botMessage.text
      );
    }, 1000);

    setInputValue('');
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const examplePrompts = [
    {
      title: "Help me write an email",
      description: "Draft a professional email for any purpose"
    },
    {
      title: "Explain a concept",
      description: "Get clear explanations on any topic"
    },
    {
      title: "Study assistance",
      description: "Help with homework and assignments"
    },
    {
      title: "Practice problems",
      description: "Generate practice questions and solutions"
    }
  ];

  if (isVoiceActive) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <VoiceAgent 
          isDarkMode={isDarkMode}
          isActive={isVoiceActive}
          onToggle={handleVoiceToggle}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">K</span>
              </div>
              <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                How can I help you today?
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
                I'm Kuberya Bot, your AI-powered learning assistant. Ask me anything about your studies, homework, or any topic you'd like to explore.
              </p>
            </div>

            {/* Example Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(prompt.title)}
                  className={`p-6 rounded-2xl text-left transition-all duration-200 hover:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {prompt.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {prompt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                      : isDarkMode 
                        ? 'bg-gray-700' 
                        : 'bg-gray-200'
                  }`}>
                    {message.isUser ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-white border border-gray-700'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.isUser ? 'text-blue-100' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className={`w-full px-4 py-3 pr-12 rounded-2xl resize-none focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500' 
                    : 'bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 focus:border-blue-500'
                }`}
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              
              {/* Voice Agent Button */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                    : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'
                }`}
                title="Activate Voice Agent"
              >
                <Mic size={20} />
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`p-3 rounded-2xl transition-all duration-200 hover:scale-105 ${
                inputValue.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-500'
                    : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;