import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

import { useState, useEffect } from 'react'; import './App.css';
import CommentBubble from './components/commentbubble';
import Header from './components/header';


import {
  useMutation,
  useQuery,
} from '@apollo/client';
import { QUERY_POSTS } from './utils/queries';
import { ADD_POST } from './utils/mutations';
import { useState, useEffect } from 'react';
import CommentBubble from './components/commentbubble';
import Header from './components/header';


function App() {
  const {loading, data} = useQuery(QUERY_POSTS)
  const postData = data?.posts || []
//   // Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

  const [addPost, { error }] = useMutation(ADD_POST);



  async function callAuth() {
  
  
    // code block that does an authorization check to get info from spotify
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const clientId = "3864bcca1c1d4ceeae0bb170d9dc0fca";
    //const clientSecret = "f67857addec046b893a48b62b0a06347";
  
    if (!code) {
      redirectToAuthCodeFlow(clientId);
    } else if (code) {
      const accessToken = await getAccessToken(clientId, code);
      const profile = await fetchProfile(accessToken);
      console.log(profile);
      populateUI(profile);
    } else {
      console.log()
    }
  
  }
  // if (!code) {
  //   redirectToAuthCodeFlow(clientId);
  // } else {
  //   const accessToken = await getAccessToken(clientId, code);
  //   const profile = await fetchProfile(accessToken);
  //   console.log(profile);
  //   populateUI(profile);
  // }
  
  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
  
    localStorage.setItem("verifier", verifier);
  
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/callback");
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
  
  
 async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
  
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
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
    } else { console.log("Image does not exist") }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
  }
  

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const CLIENT_ID = "3864bcca1c1d4ceeae0bb170d9dc0fca";
  const REDIRECT_URI = "http://localhost:3000/callback";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const CLIENT_SECRET = "f67857addec046b893a48b62b0a06347";

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [playlists, setPlaylist] = useState([])

  useEffect(() => {

      if (postData?.length > 0) {
        setComments(postData)
      }

    console.log(postData)


    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]


  }, [postData]);

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, []);


  const handleSubmit = async () => {
    if (newComment.trim() === '') return;

    const response = await addPost({ variables: { postText: newComment } })

    const newCommentObj = { id: Date.now(), 
       text: newComment };

    setComments([...comments, newCommentObj]);
    setNewComment('');

  };

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
}
const searchPlaylists = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "playlist"
      }
  })

  setPlaylist(data.playlists.items)
}

const renderPlaylist = () => {
  return playlists.map(playlist => (
      <div key={playlist.id}>
          {playlist.images.height ? <img width={"50%"} src={playlist.images[0].url} alt=""/> : <div>No Image</div>}
          {playlist.name}
      </div>
  ))
}

  return (
    // <ApolloProvider client={client}>
    <div className="App">
      <Header />
      <main>
        <p>Welcome to 'The Cassette Deck' social platform.</p>
        <Container>
          <InputGroup className="mb-3" size="lg">
            {/* <FormControl
              placeholder="Search for Playlist"
              type="input"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  search();
                  callAuth();
                }
              }}
              onChange={event => setSearchInput(event.target.value)}
            /> */}

          </InputGroup>
        </Container>
        {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
         
         <form onSubmit={searchPlaylists}>
         <input type="text" onChange={e => setSearchKey(e.target.value)}/>
    <button type={"submit"}>Search</button>
         </form>         
         {renderPlaylist()}

        <div className="comments-section">
          {comments.map(comment => (
            <CommentBubble key={comment.postText} 
            // imgUrl={document.getElementById("avatar")} 
            // author={comment.author}
             text={comment.postText} />
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
    // </ApolloProvider> 
  );
}

export default App;