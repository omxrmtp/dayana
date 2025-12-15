import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import MessagePage from './pages/MessagePage';
import MusicPage from './pages/MusicPage';
import PhotoGallery from './pages/PhotoGallery';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-link" data-icon="💌">💌 Un mensaje para ti</Link>
            <Link to="/music" className="nav-link" data-icon="🎵">🎵 Musica</Link>
            <Link to="/photos" className="nav-link" data-icon="📸">📸 Album</Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<MessagePage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/photos" element={<PhotoGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
