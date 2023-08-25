import React, { useState, useEffect } from 'react';
import './App.css';
import CommentBubble from './components/commentbubble';
import Header from './components/header';
function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    // Fetch comments from your backend API here and set them using setComments
    // For now, let's simulate comments
    const simulatedComments = [
      { id: 1, author: 'John', text: 'Great post!' },
      { id: 2, author: 'Alice', text: 'I agree with you.' },
    ];
    setComments(simulatedComments);
  }, []);
  const handleSubmit = () => {
    if (newComment.trim() === '') return;
    // For now, let's simulate adding a new comment
    const newCommentObj = { id: Date.now(), author: 'You', text: newComment };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  return (
    <div className="App">
      <Header />
      <main>
        <p>Welcome to 'The Cassette Deck' social platform.</p>
        <div className="comments-section">
          {comments.map(comment => (
            <CommentBubble key={comment.id} author={comment.author} text={comment.text} />
          ))}
        </div>
        <div className="comment-input">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </main>
    </div>
  );
}
export default App;