import React, { useState } from 'react';
import './MessagePage.css';

const MessagePage = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  
  const loveMessage = `
Queridisima Pattyy 🥰,

Cada momento contigo es un regalo que me ayuda en mis malos momentos. Tu voz calma todas mis tormentas. Tus lindos ojos me tiene embobado

Desde el primer día que te conocí, supe que cambiaras algo en mi . No solo trajiste cariño a mi vida, sino también la certeza de que siempre estaré aquí para protegerte, cuidarte y quererte incondicionalmente.

Quiero que sepas que eres mi prioridad. Prometo ser tu escudo ante cualquier adversidad, tu apoyo en cada desafío y tu compañía fiel en cada alegría. Mi corazón hace mucho tiempo cayo rendido por ti.

Eres mi fortaleza y mi debilidad a la vez. Te quiero con una intensidad que trasciende las palabras, y juro proteger tu corazón como el regalo más sagrado que la vida me ha dado.

Por siempre tuyoooo,
Tu Protector y Eterno Enamorado Omaar💕
  `;

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(!isEnvelopeOpen);
  };

  return (
    <div className="message-page-container">
      <div className="message-header">
        <h1 className="page-title">Un Mensaje para ti ❤️</h1>
        <p className="page-subtitle">Click para leer el mensaje</p>
      </div>
      
      <div className="envelope-container">
        <div 
          className={`envelope ${isEnvelopeOpen ? 'open' : ''}`}
          onClick={handleEnvelopeClick}
        >
          <div className="envelope-flap"></div>
          <div className="envelope-body">
            <div className="heart-seal">💖</div>
          </div>
        </div>
      </div>
      
      {!isEnvelopeOpen && (
        <div className="instruction-text">
          <p>💌 Click para abrir el sobre</p>
        </div>
      )}
      
      {isEnvelopeOpen && (
        <div className="message-popup-overlay" onClick={handleEnvelopeClick}>
          <div className="message-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup-btn" onClick={handleEnvelopeClick}>
              ✕
            </button>
            <div className="popup-header">
              <h2 className="popup-title">💕 Mensajito 💕</h2>
            </div>
            <div className="popup-content">
              <pre className="message-text">{loveMessage}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePage;