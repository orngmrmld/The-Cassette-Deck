// Header.js
import React from 'react';
import './header.css';
import {Button} from 'react-bootstrap'

function Header() {
  return (
    <header className="header">
      <h1 className="graffiti-title">The Cassette Deck</h1>
      <nav className="nav">
        <ul>
          <li>Home</li>
          <li>Friends</li>

        </ul>
      </nav>
    </header>
  );
}

export default Header;
