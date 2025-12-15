import React, { useState } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Fotos y videos reales de nuestra galería
  const photos = [
    { id: 1, src: `${process.env.PUBLIC_URL}/1.JPEG`, type: 'image', title: 'Nuestro Primer Encuentro', description: 'El día que todo comenzó' },
    { id: 2, src: `${process.env.PUBLIC_URL}/2.MP4`, type: 'video', title: 'Atardecer en la Playa', description: 'Viendo el atardecer juntos' },
    { id: 3, src: `${process.env.PUBLIC_URL}/3.JPEG`, type: 'image', title: 'Sorpresa de Cumpleaños', description: 'Tu día especial' },
    { id: 4, src: `${process.env.PUBLIC_URL}/4.MP4`, type: 'video', title: 'Aniversario', description: 'Un año de amor' },
    { id: 5, src: `${process.env.PUBLIC_URL}/5.JPEG`, type: 'image', title: 'Vacaciones', description: 'Nuestra escapada romántica' },
    { id: 6, src: `${process.env.PUBLIC_URL}/6.JPEG`, type: 'image', title: 'Noche Acogedora', description: 'Noche de películas en casa' },
    { id: 7, src: `${process.env.PUBLIC_URL}/7.JPEG`, type: 'image', title: 'Paseo Primaveral', description: 'De la mano en el parque' },
    { id: 8, src: `${process.env.PUBLIC_URL}/8.MP4`, type: 'video', title: 'Jardín de Flores', description: 'Entre las hermosas flores' },
    { id: 9, src: `${process.env.PUBLIC_URL}/9.JPEG`, type: 'image', title: 'Cita en el Teatro', description: 'Nuestra noche cultural' },
    { id: 10, src: `${process.env.PUBLIC_URL}/10.JPEG`, type: 'image', title: 'Momento Especial', description: 'Un recuerdo inolvidable' },
    { id: 11, src: `${process.env.PUBLIC_URL}/11.JPEG`, type: 'image', title: 'Aventura Juntos', description: 'Explorando nuevos lugares' },
    { id: 12, src: `${process.env.PUBLIC_URL}/12.JPEG`, type: 'image', title: 'Risas y Alegría', description: 'Momentos de felicidad pura' },
    { id: 13, src: `${process.env.PUBLIC_URL}/13.JPEG`, type: 'image', title: 'Abrazo Eterno', description: 'En tus brazos me siento segura' },
    { id: 14, src: `${process.env.PUBLIC_URL}/14.JPEG`, type: 'image', title: 'Miradas Cómplices', description: 'Cuando nuestros ojos se encuentran' },
    { id: 15, src: `${process.env.PUBLIC_URL}/15.JPEG`, type: 'image', title: 'Amor Verdadero', description: 'Lo que siento por ti' },
    { id: 16, src: `${process.env.PUBLIC_URL}/16.JPEG`, type: 'image', title: 'Para Siempre', description: 'Nuestro amor eterno' }
  ];

  const openPhoto = (photo) => {
    setSelectedPhoto(photo);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="photo-gallery-container">
      <div className="gallery-header">
        <h1 className="gallery-title">Nuestro album 😉</h1>
        <p className="gallery-subtitle">Nuestras fotos y videos</p>
        <div className="love-message">
          <span className="heart-icon">💕</span>
          <span className="message-text">Te quiero muchoo</span>
          <span className="heart-icon">💕</span>
        </div>
      </div>
      
      <div className="photo-grid">
        {photos.map((photo) => (
          <div 
            key={photo.id}
            className="photo-card"
            onClick={() => openPhoto(photo)}
          >
            <div className="photo-placeholder">
              {photo.type === 'video' ? (
                <video 
                  src={photo.src} 
                  className="photo-image"
                  muted
                  playsInline
                />
              ) : (
                <img 
                  src={photo.src} 
                  alt={photo.title}
                  className="photo-image"
                />
              )}
              {photo.type === 'video' && (
                <div className="video-play-icon">▶️</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedPhoto && (
        <div className="photo-modal" onClick={closePhoto}>
          <div className={`modal-content ${selectedPhoto.type === 'video' ? 'modal-video' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePhoto} type="button">×</button>
            <div className={`modal-photo ${selectedPhoto.type === 'video' ? 'modal-photo-video' : ''}`}>
              {selectedPhoto.type === 'video' ? (
                <video 
                  src={selectedPhoto.src} 
                  className="modal-image modal-video-element"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.title}
                  className="modal-image"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;