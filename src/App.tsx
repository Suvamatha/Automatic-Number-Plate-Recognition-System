import { useState } from 'react';
import { Camera, Shield, LayoutDashboard } from 'lucide-react';
import './App.css';
import Scanner from './components/Scanner';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState<'scanner' | 'dashboard'>('scanner');

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <Shield size={36} className="shield-icon" />
            <span className="logo-text">ANPR System</span>
          </div>
          <div className="nav-buttons">
            <button
              className={`nav-btn ${currentView === 'scanner' ? 'active' : ''}`}
              onClick={() => setCurrentView('scanner')}
            >
              <Camera size={18} /> Scanner
            </button>
            <button
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        {currentView === 'scanner' ? <Scanner /> : <Dashboard />}
      </main>
    </div>
  );
}

export default App;