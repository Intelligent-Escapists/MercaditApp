// src/components/Comments/Comment.jsx
import React, {useContext} from 'react';
import CommentSection from './CommentSection';
import { UserContext } from '../../providers/UserProvider';
import { useParams } from 'react-router-dom';

const Comment = () => {
  const {id: entityId } = useParams();
  //const entityId = 1; // Reemplaza con el ID del producto adecuado
  //const userId = 1; // Reemplaza con el ID del usuario adecuado
  //const userId = useContext(UserContext).user.id_usuario;
  const {user} = useContext(UserContext);
  const  userId  = user ? user.id : 0;

  return (
    <div>
      <CommentSection entityId={entityId} userId={userId} />
    </div>
  );
};

export default Comment;
