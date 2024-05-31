// src/components/Comments/CommentSection.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CommentSection.css';
import { UserContext } from '@/providers/UserProvider';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';




const CommentSection = ({ entityId, userId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState(''); // [1
  const { user } = useContext(UserContext);



  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comentario/ver-comentarios-nombre/${entityId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
    console.log(comments);
  }, [userName]);

  const handleCommentChange = (e) => {
    setContent(e.target.value)
  }

  const handleAddComment = async () => {
    if (content.trim()) {
      const newComment = {
        id_producto: entityId,
        id_usuario: userId,
        comentario: content,
        nombre_usuario: setUserName(user.nombre_usuario)
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
    <>
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
        <div className="grid gap-4">
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Escribe un comentario..."
              value={content}
              onChange={handleCommentChange}
              className="p-4 min-h-[100px] rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <Button onClick={handleAddComment} className="font-semibold">Agregar Comentario</Button>
          </div>
          {comments.map((comment) => (
            <div key={comment.id_comentario} className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <img src="/placeholder.svg" />
                <AvatarFallback>{comment.nombre_usuario}</AvatarFallback>
              </Avatar>
              <div className="flex-1 grid gap-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">{comment.nombre_usuario}</div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">{comment.comentario}</div>
              </div>
            </div>
          ))}
        </div>
      </div >
    </>
  );
};
export default CommentSection;
