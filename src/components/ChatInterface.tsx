import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2, Upload, Image, Mic, MicOff, X } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: { type: 'image' | 'file'; url: string; name: string }[];
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
  const [isRecording, setIsRecording] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [attachments, setAttachments] = useState<{ type: 'image' | 'file'; url: string; name: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if ((!inputText.trim() && attachments.length === 0) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim() || 'Sent attachments',
      isUser: true,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setAttachments([]);
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

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image/') ? 'image' : 'file';
      setAttachments(prev => [...prev, { type, url, name: file.name }]);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording logic
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
    <div className={`flex flex-col h-full ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center space-y-4">
              <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                How can I help you today?
              </h2>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-md mx-auto`}>
                "I'm Mentify 1, trained to assist, designed to impress."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full px-4">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(question)}
                  className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-md text-left min-h-[120px] flex flex-col justify-center ${
                    isDarkMode 
                      ? 'border-gray-700 bg-gray-800 hover:bg-gray-750 text-gray-300' 
                      : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-5 h-5 rounded ${isDarkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
                    <span className="font-medium">{question}</span>
                  </div>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Click to get started
                  </span>
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
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110 transform-gpu ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 shadow-lg' 
                      : isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg' : 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg'
                  }`}>
                    {message.isUser ? (
                      <User size={18} className="text-white" />
                    ) : (
                      <Bot size={18} className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} animate-pulse`} />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`max-w-fit ${message.isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 transform-gpu ${
                      message.isUser 
                        ? 'bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-purple-500/25' 
                        : isDarkMode 
                          ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 border border-purple-700/30 shadow-lg hover:shadow-purple-500/25' 
                          : 'bg-gradient-to-br from-white to-gray-50 text-gray-900 border border-purple-200/50 shadow-lg hover:shadow-purple-500/25'
                    } backdrop-blur-sm`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      
                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-black/10">
                              {attachment.type === 'image' ? <Image size={16} /> : <Upload size={16} />}
                              <span className="text-xs">{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Message Actions */}
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className={`p-1.5 rounded-md transition-all duration-300 hover:scale-110 transform-gpu ${isDarkMode ? 'hover:bg-purple-700/50 text-purple-400' : 'hover:bg-purple-200/50 text-purple-600'}`} title="Copy">
                          <Copy size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-all duration-300 hover:scale-110 transform-gpu ${isDarkMode ? 'hover:bg-purple-700/50 text-purple-400' : 'hover:bg-purple-200/50 text-purple-600'}`} title="Read aloud">
                          <Volume2 size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-all duration-300 hover:scale-110 transform-gpu ${isDarkMode ? 'hover:bg-green-700/50 text-green-400' : 'hover:bg-green-200/50 text-green-600'}`} title="Good response">
                          <ThumbsUp size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-all duration-300 hover:scale-110 transform-gpu ${isDarkMode ? 'hover:bg-red-700/50 text-red-400' : 'hover:bg-red-200/50 text-red-600'}`} title="Poor response">
                          <ThumbsDown size={14} />
                        </button>
                        <button className={`p-1.5 rounded-md transition-all duration-300 hover:scale-110 hover:rotate-180 transform-gpu ${isDarkMode ? 'hover:bg-blue-700/50 text-blue-400' : 'hover:bg-blue-200/50 text-blue-600'}`} title="Regenerate">
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
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                    isDarkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-200 to-gray-300'
                  } shadow-lg`}>
                    <Bot size={18} className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} animate-spin`} />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-700/30' 
                      : 'bg-gradient-to-br from-white to-gray-50 border border-purple-200/50'
                  } shadow-lg backdrop-blur-sm`}>
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'}`}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'}`} style={{ animationDelay: '0.2s' }}></div>
                      <div className={`w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-purple-400' : 'bg-purple-600'}`} style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div className={`p-6 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-800 border border-purple-700/30' : 'bg-white border border-purple-200/50'
              } shadow-lg backdrop-blur-sm`}>
                {attachment.type === 'image' ? <Image size={16} /> : <Upload size={16} />}
                <span className="text-sm truncate max-w-32">{attachment.name}</span>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Drag and Drop Overlay */}
        {isDragging && (
          <div className={`absolute inset-0 ${
            isDarkMode ? 'bg-purple-900/50' : 'bg-purple-100/50'
          } backdrop-blur-sm flex items-center justify-center z-20 rounded-lg border-2 border-dashed ${
            isDarkMode ? 'border-purple-400' : 'border-purple-600'
          }`}>
            <div className="text-center">
              <Upload size={48} className={`mx-auto mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} animate-bounce`} />
              <p className={`text-lg font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Drop files here to upload
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="space-y-3">
          <div className={`relative flex items-center rounded-full border-2 px-4 py-3 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700' 
              : 'border-gray-300 bg-gray-50'
          } focus-within:border-blue-500 transition-colors`}>
            {/* Left side - File Upload Icon */}
            <div className="flex items-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-1 rounded transition-colors ${
                  isDarkMode
                    ? 'text-purple-400 hover:bg-purple-800/50 hover:text-white'
                    : 'text-purple-600 hover:bg-purple-100 hover:text-purple-700'
                } shadow-lg hover:shadow-xl`}
                title="Upload image/video"
              >
                <img src="/gallery.png" alt="Upload" className="w-5 h-5" />
              </button>
            </div>

            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="Type your message..."
              className={`flex-1 px-4 py-0 bg-transparent border-none resize-none ${
                isDarkMode 
                  ? 'text-white placeholder-gray-400' 
                  : 'text-gray-900 placeholder-gray-500'
              } focus:outline-none`}
              rows={1}
              style={{ minHeight: '24px', maxHeight: '120px' }}
              disabled={isLoading}
            />
            
            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {/* Voice Recording */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-1 rounded transition-colors ${
                  isRecording
                    ? 'text-red-500'
                    : isDarkMode
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
                title={isRecording ? 'Stop recording' : 'Start voice recording'}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={(!inputText.trim() && attachments.length === 0) || isLoading}
                className={`p-1 rounded transition-colors ${
                  (inputText.trim() || attachments.length > 0) && !isLoading
                    ? isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'
                    : isDarkMode
                      ? 'bg-gray-600 text-gray-400'
                      : 'bg-gray-300 text-gray-500'
                }`}
                title="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;