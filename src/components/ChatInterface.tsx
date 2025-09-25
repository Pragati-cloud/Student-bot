import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2 } from 'lucide-react';

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
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  }, [inputText]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${userMessage.text}". As Kuberya Bot, I'm here to help you learn and understand various topics. Let me provide you with a comprehensive response that addresses your question while helping you learn more about the subject.`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);

      // Add to history
      onNewInteraction(
        userMessage.text.length > 50 ? userMessage.text.substring(0, 50) + '...' : userMessage.text,
        aiResponse.text.length > 100 ? aiResponse.text.substring(0, 100) + '...' : aiResponse.text
      );
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const exampleQuestions = [
    "Help me write an email",
    "Explain quantum physics",
    "Create a study plan",
    "Solve math problems"
  ];

  const handleExampleClick = (question: string) => {
    setInputText(question);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center mb-6`}>
                <Bot className="text-white" size={32} />
              </div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                How can I help you today?
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mx-auto`}>
                I'm Kuberya Bot, your AI learning assistant. Ask me anything or try one of these examples:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(question)}
                  className={`p-4 rounded-xl border-2 border-dashed transition-all duration-200 hover:scale-105 text-left ${
                    isDarkMode 
                      ? 'border-gray-600 hover:border-blue-500 bg-gray-800/50 hover:bg-gray-800 text-gray-300 hover:text-white' 
                      : 'border-gray-300 hover:border-blue-400 bg-gray-50/50 hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <span className="text-sm font-medium">{question}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} group`}>
                <div className={`flex items-start space-x-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {message.isUser ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`max-w-fit ${message.isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.isUser 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                        : isDarkMode 
                          ? 'bg-gray-800 text-gray-100 border border-gray-700' 
                          : 'bg-gray-100 text-gray-900 border border-gray-200'
                    } shadow-sm`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    </div>

                    {/* Message Actions */}
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`} title="Copy">
                          <Copy size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`} title="Read aloud">
                          <Volume2 size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`} title="Good response">
                          <ThumbsUp size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`} title="Poor response">
                          <ThumbsDown size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`} title="Regenerate">
                          <RotateCcw size={14} />
                        </button>
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start group">
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <Bot size={16} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-200'} shadow-sm`}>
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`}></div>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0.2s' }}></div>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}`} style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} p-4`}>
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={`w-full px-4 py-3 pr-12 rounded-2xl border resize-none transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`absolute right-2 bottom-2 p-2 rounded-xl transition-all duration-200 ${
                inputText.trim() && !isLoading
                  ? isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-500'
                    : 'bg-gray-200 text-gray-400'
              } hover:scale-105`}
            >
              <img 
                src="/music.png" 
                alt="Voice" 
                className="w-5 h-5"
                style={{ filter: inputText.trim() && !isLoading ? 'none' : 'grayscale(1) opacity(0.5)' }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;