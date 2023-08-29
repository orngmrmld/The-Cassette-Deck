import React from 'react';
import './commentbubble.css';

const CommentBubble = ({ author, text }) => {
  return (
    <div className="comment-bubble">
      <div className="comment-author">{author}</div>
      <div className="comment-text">{text}</div>
    </div>
  );
};

export default CommentBubble;