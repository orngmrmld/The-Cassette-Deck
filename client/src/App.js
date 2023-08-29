import React, { useState, useEffect } from 'react';
import './App.css';
import CommentBubble from './components/commentbubble';
import Header from './components/header';
const clientId = "3864bcca1c1d4ceeae0bb170d9dc0fca";
const clientSecret = "f67857addec046b893a48b62b0a06347"



function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Fetch comments from your backend API here and set them using setComments
    // For now, let's simulate comments
    const simulatedComments = [
      { id: 1, author: 'John', text: 'Great post!' },
      { id: 2, author: 'Alice', text: 'I agree with you.' },
    ];
    setComments(simulatedComments);

    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result = result.json())
      .then(data => setAccessToken(data.access_token))

  }, []);

  const handleSubmit = () => {
    if (newComment.trim() === '') return;
    // For now, let's simulate adding a new comment
    const newCommentObj = { id: Date.now(), author: 'You', text: newComment };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  //search function to find playlist
  async function search(){
    console.log("search for " + searchInput);

    // Get request using search to get the User ID
    var userParameters = {
      method: 'GET' ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer' + accessToken
      }
    }
    var userID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=user', userParameters)
      .then(response => response.json())
      .then(data => {return data.users.items[0].id})

    console.log("User ID is" + userID);
    var playlists = await fetch('')

    // Get request with User ID grab all playlists from that user

    // Display playlist cover art

  }

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