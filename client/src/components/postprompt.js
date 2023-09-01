import React from 'react';
import './postprompt.css'; 

function CreatePostPrompt({ onClose }) {
  return (
    <div className="create-post-prompt">
      {/* Your prompt content */}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default CreatePostPrompt;
