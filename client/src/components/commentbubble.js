import React from 'react';
import './commentbubble.css';
const CommentBubble = ({ imgUrl, author, text }) => {
  return (
    <div className="comment-bubble">
      <li> <img src={imgUrl} /> </li>
      <div className="comment-author">{author}</div>
      <div className="comment-text">{text}</div>
      
    </div>
  );
};
export default CommentBubble;