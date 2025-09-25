import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import History from './components/History';
import ChatInterface from './components/ChatInterface';
import CustomerSupport from './components/CustomerSupport';
import VoiceAgent from './components/VoiceAgent';

interface HistoryItem {
  id: string;
  timestamp: string;
  model: string;
  title: string;
  summary: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Mentify 1');
  const [activeChat, setActiveChat] = useState<string>('1');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      timestamp: 'September 25, 2025 at 10:30 AM',
      model: 'Mentify 1',
      title: 'Welcome conversation',
      summary: 'Initial setup and introduction to the platform features and capabilities.'
    },
    {
      id: '2',
      timestamp: 'September 24, 2025 at 2:15 PM',
      model: 'Mentify 2',
      title: 'Code assistance',
      summary: 'Help with React component development and TypeScript implementation.'
    },
    {
      id: '3',
      timestamp: 'September 23, 2025 at 9:45 AM',
      model: 'Mentify 4',
      title: 'Creative writing',
      summary: 'Collaborative story writing session with character development.'
    },
    {
      id: '4',
      timestamp: 'September 22, 2025 at 4:20 PM',
      model: 'Mentify 1',
      title: 'Data analysis help',
      summary: 'Assistance with interpreting statistical data and creating visualizations.'
    },
    {
      id: '5',
      timestamp: 'September 21, 2025 at 11:30 AM',
      model: 'Mentify 3',
      title: 'Language learning',
      summary: 'Practice conversation in Spanish with grammar corrections and tips.'
    },
    {
      id: '6',
      timestamp: 'September 20, 2025 at 3:45 PM',
      model: 'Mentify 2',
      title: 'Recipe suggestions',
      summary: 'Healthy meal planning and cooking instructions for vegetarian dishes.'
    },
    {
      id: '7',
      timestamp: 'September 18, 2025 at 8:15 AM',
      model: 'Mentify 1',
      title: 'Travel planning',
      summary: 'Itinerary creation for a 2-week European vacation with budget considerations.'
    },
    {
      id: '8',
      timestamp: 'September 17, 2025 at 6:30 PM',
      model: 'Mentify 4',
      title: 'Business strategy',
      summary: 'Market analysis and competitive positioning for a new startup idea.'
    }
  ]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setHistory([]);
    setActiveChat('');
    setIsVoiceActive(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
  };

  const handleSupportToggle = () => {
    setIsSupportOpen(!isSupportOpen);
  };

  const handleNewInteraction = (title: string, summary: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      model: selectedModel,
      title,
      summary
    };
    setHistory([newItem, ...history]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleDeleteChat = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    if (activeChat === id && history.length > 1) {
      setActiveChat(history.find(item => item.id !== id)?.id || '');
    }
  };

  const handleNewChat = () => {
    // Clear current chat and start fresh
    setActiveChat('');
    setIsNewChat(true);
    // Reset the flag after a brief moment
    setTimeout(() => setIsNewChat(false), 100);
  };

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} isDarkMode={isDarkMode} />;
  }
  return (
    <div className={`min-h-screen min-h-[100dvh] transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/10 to-blue-900/10' 
        : 'bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30'
    }`}>
      <Navbar 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        onVoiceToggle={handleVoiceToggle}
        onSupportToggle={handleSupportToggle}
        onLogout={handleLogout}
        onNewChat={handleNewChat}
      />
      
      <div className="flex h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] relative">
        <History 
          isDarkMode={isDarkMode}
          history={history}
          activeChat={activeChat}
          onClearHistory={handleClearHistory}
          onDeleteChat={handleDeleteChat}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          {isVoiceActive ? (
            <VoiceAgent 
              isDarkMode={isDarkMode}
              isActive={isVoiceActive}
              onToggle={handleVoiceToggle}
            />
          ) : (
            <ChatInterface 
              isDarkMode={isDarkMode}
              selectedModel={selectedModel}
              onNewInteraction={handleNewInteraction}
              isNewChat={isNewChat}
            />
          )}
        </div>
      </div>
      
      <CustomerSupport isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;