// Header.js
import React from 'react';
import './header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="graffiti-title">The Cassette Deck</h1>
      <nav className="nav">
        <button type="button">Home</button>
        <button type="button">Profile</button>
        <button type="button">Friends</button>
      </nav>
    </header>
  );
}

export default Header;
 
