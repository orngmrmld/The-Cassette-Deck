import React from 'react';
import './commentbubble.css';
// import {
//   useQuery,
// } from '@apollo/client';
// import { QUERY_POSTS } from './utils/queries';

const CommentBubble = ({ text }) => {
// const {loading, data} = useQuery(QUERY_POSTS)
// const postData = data?.posts || []

  return (
    <div className="comment-bubble">
      {/* <li> <img src={imgUrl} /> </li> */}
      {/* <div className="comment-author">{author}</div> */}
      <div className="comment-text">{text}</div>
      
    </div>
  );
};
export default CommentBubble;