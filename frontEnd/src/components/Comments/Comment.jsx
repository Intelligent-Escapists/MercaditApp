// src/components/Comments/Comment.jsx
import React from 'react';
import CommentSection from './CommentSection';

const Comment = () => {
  const entityId = 1; // Reemplaza con el ID del producto adecuado
  const userId = 1; // Reemplaza con el ID del usuario adecuado

  return (
    <div>
      <CommentSection entityId={entityId} userId={userId} />
    </div>
  );
};

export default Comment;
