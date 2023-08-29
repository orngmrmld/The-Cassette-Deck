import React from 'react';
import './App.css';
import Header from './Header';
import CommentBubble from './commentbubble'; // Adjust the path based on your folder structure

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <p>Welcome to 'The Cassette Deck' social platform.</p>
        
        <div className="comments-section">
          <CommentBubble author="John" text="Great post!" />
          <CommentBubble author="Alice" text="I agree with you." />
        </div>
        {/* Add more content here */}
      </main>
    </div>
  );
}

export default App;
