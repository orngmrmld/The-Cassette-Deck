import React, { useState, useEffect } from 'react';
import ProfileCard from './profileCard';
import './feed.css';
import CassetteWall from './images/cassette-wall.jpg';

function Feed() {
  // Data for user profiles and playlists
  const initialProfiles = [
    {
      user: {
        name: 'User 1',
        avatar: 'url-to-avatar',
      },
      playlist: ['Song 1', 'Song 2', 'Song 3'],
    },
    {
      user: {
        name: 'User 2',
        avatar: 'url-to-avatar',
      },
      playlist: ['Song 1', 'Song 2', 'Song 3'],
    },
    {
      user: {
        name: 'User 3',
        avatar: 'url-to-avatar',
      },
      playlist: ['Song 1', 'Song 2', 'Song 3'],
    },
    // Add more initial profiles as needed
  ];

  const [profiles, setProfiles] = useState(initialProfiles);
  const [visibleProfiles, setVisibleProfiles] = useState(3); // Number of profiles to initially display
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    // Add a scroll event listener to trigger when the user scrolls to the bottom
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setVisibleProfiles((prevVisibleProfiles) => prevVisibleProfiles + 3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="feed">
      <div className="feed-content">
        <button className="create-post-button" onClick={toggleModal}>
          Create New Post
        </button>
        <div className="cards-container">
          {/* Map over profiles to display profile cards */}
          {profiles.slice(0, visibleProfiles).map((profile, index) => (
            <ProfileCard key={index} user={profile.user} playlist={profile.playlist} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <h2>Create New Post</h2>
          {/* Add form fields for playlist details and blog post */}
        </div>
      )}
    </div>
  );
}

export default Feed;
