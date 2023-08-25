import React from 'react';
import Header from './components/header';
import Feed from './components/feed';
import './app.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <div className="spacer" />
        <Feed />
      </main>
    </div>
  );
}

export default App;
