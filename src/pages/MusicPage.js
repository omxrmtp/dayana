import React, { useState, useRef, useEffect } from 'react';
import './MusicPage.css';

const MusicPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef(null);

  const playlist = [
    {
      title: "Donde Nadie Pueda Ir",
      artist: "Manuel Medrano",
      cover: "🎵",
      src: "/manuel-medrano-donde-nadie-pueda-ir.mp3"
    },
    {
      title: "Pero Te Conocí",
      artist: "Reik",
      cover: "💕",
      src: "/reik-pero-te-conoci.mp3"
    },
    {
      title: "Y sólo se me ocurre amarte",
      artist: "Alejandro Sanz",
      cover: "🎶",
      src: "/y-solo-se-me-ocurre-amarte.mp3"
    },
    {
      title: "Photograph",
      artist: "Ed Sheeran",
      cover: "📸",
      src: "/Photograph.mp3"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => {
        setIsPlaying(false);
        nextSong();
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    const newSong = (currentSong + 1) % playlist.length;
    setCurrentSong(newSong);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const prevSong = () => {
    const newSong = (currentSong - 1 + playlist.length) % playlist.length;
    setCurrentSong(newSong);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="music-page-container">
      <audio 
        ref={audioRef}
        src={playlist[currentSong].src}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />
      
      <div className="music-header">
        <h1 className="music-title">Musica</h1>
        <p className="music-subtitle">Nuestras canciones favoritas</p>
      </div>
      
      <div className="music-player">
        <div className="album-cover">
          <div className="cover-image">
            <div className="cover-icon">{playlist[currentSong].cover}</div>
            <div className="vinyl-effect"></div>
          </div>
        </div>
        
        <div className="song-info">
          <h2 className="song-title">{playlist[currentSong].title}</h2>
          <p className="artist-name">{playlist[currentSong].artist}</p>
        </div>
        
        <div className="progress-container">
          <div className="time-display">
            <span className="current-time">{formatTime(Math.floor(currentTime))}</span>
            <span className="total-time">{formatTime(Math.floor(duration))}</span>
          </div>
          <div className="progress-bar" onClick={handleSeek}>
            <div 
              className="progress-fill"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
        
        <div className="player-controls">
          <button className="control-btn" onClick={prevSong}>
            ⏮️
          </button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button className="control-btn" onClick={nextSong}>
            ⏭️
          </button>
        </div>
        
        <div className="playlist">
          <h3 className="playlist-title">Playlist</h3>
          <div className="playlist-items">
            {playlist.map((song, index) => (
              <div 
                key={index}
                className={`playlist-item ${index === currentSong ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSong(index);
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
              >
                <span className="song-cover">{song.cover}</span>
                <div className="song-details">
                  <span className="song-name">{song.title}</span>
                  <span className="artist">{song.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;