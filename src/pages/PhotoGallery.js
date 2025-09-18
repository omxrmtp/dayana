import React, { useState } from 'react';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // Fotos reales de nuestra galería
  const photos = [
    { id: 1, src: '/1.jpeg', title: 'Nuestro Primer Encuentro', description: 'El día que todo comenzó' },
    { id: 2, src: '/2.jpeg', title: 'Atardecer en la Playa', description: 'Viendo el atardecer juntos' },
    { id: 3, src: '/3.jpeg', title: 'Sorpresa de Cumpleaños', description: 'Tu día especial' },
    { id: 4, src: '/4.jpeg', title: 'Aniversario', description: 'Un año de amor' },
    { id: 5, src: '/5.jpeg', title: 'Vacaciones', description: 'Nuestra escapada romántica' },
    { id: 6, src: '/6.jpeg', title: 'Noche Acogedora', description: 'Noche de películas en casa' },
    { id: 7, src: '/7.jpeg', title: 'Paseo Primaveral', description: 'De la mano en el parque' },
    { id: 8, src: '/8.jpeg', title: 'Jardín de Flores', description: 'Entre las hermosas flores' },
    { id: 9, src: '/9.jpeg', title: 'Cita en el Teatro', description: 'Nuestra noche cultural' },
    { id: 10, src: '/10.jpeg', title: 'Momento Especial', description: 'Un recuerdo inolvidable' },
    { id: 11, src: '/11.jpeg', title: 'Aventura Juntos', description: 'Explorando nuevos lugares' },
    { id: 12, src: '/12.jpeg', title: 'Risas y Alegría', description: 'Momentos de felicidad pura' },
    { id: 13, src: '/13.jpeg', title: 'Abrazo Eterno', description: 'En tus brazos me siento segura' },
    { id: 14, src: '/14.jpeg', title: 'Miradas Cómplices', description: 'Cuando nuestros ojos se encuentran' },
    { id: 15, src: '/15.jpeg', title: 'Amor Verdadero', description: 'Lo que siento por ti' },
    { id: 16, src: '/16.jpeg', title: 'Para Siempre', description: 'Nuestro amor eterno' }
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
        <h1 className="gallery-title">Fotillos 😉</h1>
        <p className="gallery-subtitle">Nuestras fotos</p>
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
              <img 
                src={photo.src} 
                alt={photo.title}
                className="photo-image"
              />
            </div>
          </div>
        ))}
      </div>
      
      {selectedPhoto && (
        <div className="photo-modal" onClick={closePhoto}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closePhoto}>×</button>
            <div className="modal-photo">
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.title}
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;