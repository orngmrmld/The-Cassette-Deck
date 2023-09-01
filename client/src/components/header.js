import React from 'react';
import './header.css';
import logo from './images/logo.png';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Your Logo" className="logo" />
      <nav className="navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#">Home</a>
          </li>
          <li className="nav-item">
            <a href="#">Friends</a>
          </li>
          <li className="nav-item">
            <a href="#">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
