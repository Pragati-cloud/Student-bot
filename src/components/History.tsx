import React from 'react';
import { useState } from 'react';
import { Clock, Trash2, Download, X } from 'lucide-react';

interface HistoryItem {
  id: string;
  timestamp: string;
  model: string;
  title: string;
  summary: string;
}

const formatTimestamp = (timestamp: string): string => {
  // Convert relative timestamps to actual dates for demo
  const now = new Date();
  let date: Date;
  
  if (timestamp.includes('hours ago')) {
    const hours = parseInt(timestamp.split(' ')[0]);
    date = new Date(now.getTime() - hours * 60 * 60 * 1000);
  } else if (timestamp.includes('day ago')) {
    const days = parseInt(timestamp.split(' ')[0]);
    date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  } else if (timestamp.includes('days ago')) {
    const days = parseInt(timestamp.split(' ')[0]);
    date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  } else if (timestamp.includes('week ago')) {
    date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else {
    date = now;
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

interface HistoryProps {
  isDarkMode: boolean;
  history: HistoryItem[];
  activeChat?: string;
  onClearHistory: () => void;
  onDeleteChat?: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ isDarkMode, history, activeChat, onClearHistory, onDeleteChat }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile History Overlay */}
      <div className={`lg:hidden fixed inset-0 z-50 ${isMobileOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)}></div>
        <div className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r transition-colors duration-300 flex flex-col`}>
          <div className={`p-3 sm:p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} h-[60px] flex items-center`}>
            <div className="flex items-center justify-between w-full">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                History
              </h2>
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`p-2 rounded-md transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {history.length === 0 ? (
              <div className="p-6 text-center">
                <Clock className={`mx-auto mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} size={24} />
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No history yet
                </p>
              </div>
            ) : (
              <div className="p-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 mb-3 rounded-lg cursor-pointer transition-colors duration-200 relative group ${
                      activeChat === item.id
                        ? isDarkMode 
                          ? 'bg-blue-600/20 border-l-4 border-l-blue-500 border border-gray-600' 
                          : 'bg-blue-50/80 border-l-4 border-l-blue-500 border border-gray-300'
                        : isDarkMode 
                          ? 'hover:bg-gray-800 border border-gray-700' 
                          : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {/* Delete button - only visible on hover */}
                    <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                      {onDeleteChat && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(item.id);
                          }}
                          className={`p-1.5 rounded-md transition-all duration-200 min-h-[32px] min-w-[32px] flex items-center justify-center ${
                            isDarkMode ? 'hover:text-red-400 text-gray-400 hover:bg-gray-700' : 'hover:text-red-500 text-gray-500 hover:bg-gray-100'
                          }`}
                          title="Delete chat"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle download functionality
                        }}
                        className={`p-1.5 rounded-md transition-all duration-200 min-h-[32px] min-w-[32px] flex items-center justify-center ${
                          isDarkMode ? 'hover:text-blue-400 text-gray-400 hover:bg-gray-700' : 'hover:text-blue-500 text-gray-500 hover:bg-gray-100'
                        }`}
                        title="Download chat"
                      >
                        <Download size={12} />
                      </button>
                    </div>
                    
                    <h3 className={`text-sm font-medium mb-1 pr-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 pr-12 ${
                      activeChat === item.id
                        ? isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {item.summary}
                    </p>
                    <p className={`text-xs mt-2 pr-12 ${
                      activeChat === item.id
                        ? isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        : isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {formatTimestamp(item.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop History Sidebar */}
      <div className={`w-80 h-full ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-r transition-colors duration-300 flex-col lg:flex`}>
        <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} h-[73px] flex items-center`}>
          <div className="flex items-center justify-between w-full">
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              History
            </h2>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {history.length === 0 ? (
            <div className="p-4 text-center">
              <Clock className={`mx-auto mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} size={24} />
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No history yet
              </p>
            </div>
          ) : (
            <div className="p-2">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors duration-200 relative group ${
                    activeChat === item.id
                      ? isDarkMode 
                        ? 'bg-blue-600/20 border-l-4 border-l-blue-500 border border-gray-600' 
                        : 'bg-blue-50/80 border-l-4 border-l-blue-500 border border-gray-300'
                      : isDarkMode 
                        ? 'hover:bg-gray-800 border border-gray-700' 
                        : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {/* Delete button - only visible on hover */}
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    {onDeleteChat && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(item.id);
                        }}
                        className={`p-1.5 rounded-md transition-all duration-200 min-h-[28px] min-w-[28px] flex items-center justify-center ${
                          isDarkMode ? 'hover:text-red-400 text-gray-400 hover:bg-gray-700' : 'hover:text-red-500 text-gray-500 hover:bg-gray-100'
                        }`}
                        title="Delete chat"
                      >
                        <Trash2 size={10} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download functionality
                      }}
                      className={`p-1.5 rounded-md transition-all duration-200 min-h-[28px] min-w-[28px] flex items-center justify-center ${
                        isDarkMode ? 'hover:text-blue-400 text-gray-400 hover:bg-gray-700' : 'hover:text-blue-500 text-gray-500 hover:bg-gray-100'
                      }`}
                      title="Download chat"
                    >
                      <Download size={10} />
                    </button>
                  </div>
                  
                  <h3 className={`text-sm font-medium mb-1 pr-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs line-clamp-2 pr-10 ${
                    activeChat === item.id
                      ? isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.summary}
                  </p>
                  <p className={`text-xs mt-2 pr-10 ${
                    activeChat === item.id
                      ? isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      : isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {formatTimestamp(item.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default History;