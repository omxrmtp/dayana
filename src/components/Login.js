import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const correctPin = '091125';

  const handleNumberClick = (number) => {
    if (pin.length < 6) {
      const newPin = pin + number;
      setPin(newPin);
      setError('');
      
      // Auto verificar cuando llegue a 6 dígitos
      if (newPin.length === 6) {
        setTimeout(() => {
          verifyPin(newPin);
        }, 300);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  const verifyPin = (pinToVerify) => {
    if (pinToVerify === correctPin) {
      setError('');
      onLogin(true);
    } else {
      setError('PIN incorrecto. Intenta de nuevo.');
      setIsShaking(true);
      setPin('');
      
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-hearts">
          <span className="heart heart-1">💕</span>
          <span className="heart heart-2">💖</span>
          <span className="heart heart-3">💗</span>
          <span className="heart heart-4">💝</span>
          <span className="heart heart-5">💘</span>
        </div>
        
        <div className={`login-card ${isShaking ? 'shake' : ''}`}>
          <div className="login-header">
            <h1 className="login-title">💕Love PIN💕</h1>
            <p className="login-subtitle">Ingresa tu PIN especial</p>
          </div>
          
          <div className="pin-display">
            <div className="pin-dots">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index} 
                  className={`pin-dot ${index < pin.length ? 'filled' : ''}`}
                >
                  {index < pin.length ? '●' : '○'}
                </div>
              ))}
            </div>
          </div>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">💔</span>
              {error}
            </div>
          )}
          
          <div className="pin-keypad">
            <div className="keypad-row">
              {[1, 2, 3].map(num => (
                <button 
                  key={num}
                  className="keypad-button"
                  onClick={() => handleNumberClick(num.toString())}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="keypad-row">
              {[4, 5, 6].map(num => (
                <button 
                  key={num}
                  className="keypad-button"
                  onClick={() => handleNumberClick(num.toString())}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="keypad-row">
              {[7, 8, 9].map(num => (
                <button 
                  key={num}
                  className="keypad-button"
                  onClick={() => handleNumberClick(num.toString())}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="keypad-row">
              <button 
                className="keypad-button action-button"
                onClick={handleClear}
              >
                C
              </button>
              <button 
                className="keypad-button"
                onClick={() => handleNumberClick('0')}
              >
                0
              </button>
              <button 
                className="keypad-button action-button"
                onClick={handleDelete}
              >
                ⌫
              </button>
            </div>
          </div>
          
          <div className="login-hint">
            <span className="hint-icon">💡</span>
            <span className="hint-text">Pista: Nuestra primera cita</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;