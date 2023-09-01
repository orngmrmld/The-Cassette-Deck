import React, { useState } from 'react';
import './card.css';

function Card({ userName }) {
  const [vibeValue, setVibeValue] = useState(50);

  const handleVibeChange = (e) => {
    const newValue = e.target.value;
    setVibeValue(newValue);
  };

  return (
    <div className="card">
      <h3 className="user-name">{userName}</h3>
      <img
        src="user-photo.jpg" // Replace with the path to your user's photo
        alt={userName}
        className="user-photo"
      />
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={vibeValue}
        className="vibe-slider"
        onChange={handleVibeChange}
      />
      <iframe
        src="https://open.spotify.com/embed/playlist/your_playlist_id"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        title="Spotify Playlist"
        className="spotify-playlist">
      </iframe>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      {/* First Card */}
      <Card userName="User 1" />

      {/* Second Card */}
      <Card userName="User 2" />

      {/* Third Card */}
      <Card userName="User 3" />
    </div>
  );
}

export default App;
