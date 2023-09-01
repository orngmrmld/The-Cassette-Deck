import React from 'react';
import './commentbubble.css';
import profImg from './profile-picture.jpg'

const CommentBubble = ({ author, text }) => {
  return (
    <div className="comment-bubble">
      <div> <img className="profile" src={profImg} /> </div>
      <div className="comment-author">{author}</div>
      <div className="comment-text">{text}</div>
    </div>
  );
};
export default CommentBubble;