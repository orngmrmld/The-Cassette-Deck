import React from 'react';
import './postbutton.css';

function CreatePostButton() {
  return (
    <button className="create-post-button">
      <span className="plus-symbol">+</span> Create New Post
    </button>
  );
}

export default CreatePostButton;
