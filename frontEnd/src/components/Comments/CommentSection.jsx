// src/components/Comments/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';

const CommentSection = ({ entityId, userId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comentario/ver-comentarios?entity_id=${entityId}&user_id=${userId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [entityId, userId]);

  const handleAddComment = async () => {
    if (content.trim()) {
      const newComment = {
        id_producto: entityId,
        id_usuario: userId,
        comentario: content,
      };

      try {
        const response = await axios.post('http://localhost:5000/comentario/crear-comentario', newComment);
        setComments([...comments, response.data]);
        setContent('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div className="comment-section">
      <h2>Comentarios</h2>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id_comentario} className="comment">
            <p>{comment.comentario}</p>
          </div>
        ))}
      </div>
      <div className="comment-form">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe un comentario"
        />
        <button onClick={handleAddComment}>Agregar comentario</button>
      </div>
    </div>
  );
};

export default CommentSection;
