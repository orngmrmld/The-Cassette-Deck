import React from 'react';
import './profileCard.css'; // Apply styling for the card

function ProfileCard({ user, playlist }) {
  return (
    <div className="profile-card">
      {/* Display user's name */}
      <h2 className="user-name">{user.name}</h2>

      {/* User's picture container */}
      <div className="user-picture-container">
        <img src={user.avatar} alt={user.name} className="user-picture" />
      </div>

      {/* Vibe meter */}
      <div className="vibe-meter">
        <input type="range" min="0" max="100" step="1" />
      </div>

      {/* Display user's Spotify playlist */}
      <div className="playlist">
        <h3>Spotify Playlist</h3>
        {/* Display the playlist */}
        {/* You can customize how you want to show the playlist */}
      </div>

      {/* Comment section */}
      <div className="comment-section">
        <textarea
          className="comment-input"
          placeholder="Add a comment..."
        ></textarea>
        <button className="comment-button">Comment</button>
      </div>
    </div>
  );
}

export default ProfileCard;
