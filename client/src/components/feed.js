import React from 'react';
import './feed.css';
import Card from './card';

function Feed() {
  // Define user data including name and photo URL
  const user = {
    userName: "User 1",
    userPhoto: "url_to_user_photo.jpg", // Replace with the actual URL of the user's photo
  };

  return (
    <div className="feed">
      <Card userName={user.userName} userPhoto={user.userPhoto} /> {/* Pass the userPhoto prop */}
    </div>
  );
}

export default Feed;