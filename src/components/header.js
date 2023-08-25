import React from 'react';
import './header.css';

function Header() {
  return (
    <header className="navbar">
      <h1 className="navbar-title">The Cassette Deck</h1>
      <ul className="navbar-nav">
        <li><button className="nav-button">Home</button></li>
        <li><button className="nav-button">Friends</button></li>
        <li><button className="nav-button">Profile</button></li>
      </ul>
    </header>
  );
}

export default Header;
