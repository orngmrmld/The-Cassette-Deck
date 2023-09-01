import './App.css';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react'; 
import {
  useMutation,
  useQuery,
} from '@apollo/client';
import { QUERY_POSTS } from './utils/queries';
import { ADD_POST } from './utils/mutations';
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
  
        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)
  }, [postData]);


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