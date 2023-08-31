import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';import './App.css';
import CommentBubble from './components/commentbubble';
import Header from './components/header';
const clientId = "3864bcca1c1d4ceeae0bb170d9dc0fca";
//const clientSecret = "f67857addec046b893a48b62b0a06347";

// code block that does an authorization check to get info from spotify
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
  console.log(profile);
  populateUI(profile);
}

export async function redirectToAuthCodeFlow(clientId) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://the-cassette-deck-8f7eb67739f4.herokuapp.com/callback");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://the-cassette-deck-8f7eb67739f4.herokuapp.com/callback");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const { access_token } = await result.json();
  return access_token;
}

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

function populateUI(profile) {
  document.getElementById("displayName").innerText = profile.display_name;
  if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById("avatar").appendChild(profileImage);
    document.getElementById("imgUrl").innerText = profile.images[0].url;
  }
  document.getElementById("id").innerText = profile.id;
  document.getElementById("email").innerText = profile.email;
  document.getElementById("uri").innerText = profile.uri;
  document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url").innerText = profile.href;
  document.getElementById("url").setAttribute("href", profile.href);
}

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [searchInput, setSearchInput] = useState('');
  //  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Fetch comments from your backend API here and set them using setComments
    // For now, let's simulate comments
    const simulatedComments = [
      { id: 1, author: 'John', text: 'Great post!' },
      { id: 2, author: 'Alice', text: 'I agree with you.' },
    ];
    setComments(simulatedComments);

    // var authParameters = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
    // }

    // fetch('https://accounts.spotify.com/api/token', authParameters)
    //   .then(result => result.json())
    //   .then(data => setAccessToken(data.access_token))

  }, []);

  const handleSubmit = () => {
    if (newComment.trim() === '') return;
    // For now, let's simulate adding a new comment
    const newCommentObj = { id: Date.now(), author: 'You', text: newComment };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  //search function to find playlist
  async function search() {
    console.log("search for " + searchInput);
    const accessToken = await getAccessToken(clientId, code);
    // Get request using search to get the User ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    }
    var playlistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => console.log(data))

    // console.log("User ID is" + userID);
    // var playlists = await.fetch('')

    //get playlist by playlist id 
    // var playlist = await fetch('https://api.spotify.com/v1/playlists/' + playlistID, searchParameters)
    //   .then(response => response.json())

    // // Get request with User ID grab all playlists from that user

    // // Display playlist cover art
    // var coverArt = await fetch('https://api.spotify.com/v1/playlists/' + playlistID + 'images', searchParameters)
    //   .then(response => response.json())
  }


  return (
    <div className="App">
      <Header />
      <main>
        <p>Welcome to 'The Cassette Deck' social platform.</p>
        <Container>
          <InputGroup className="mb-3" size="lg">
            <FormControl
              placeholder="Search for Playlist"
              type="input"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  search();

                }
              }}
              onChange={event => setSearchInput(event.target.value)}
            />
            <Button onClick={search}>
              Search
            </Button>
          </InputGroup>
        </Container>
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