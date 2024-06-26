from flask import request, abort, session
from flask.json import jsonify
from cryptoUtils import CryptoUtils as crypto

from alchemyClasses.Comentario import Comentario
from alchemyClasses.Usuario import Usuario
from alchemyClasses import db

def crear_comentario(id_producto, id_usuario, comentario):
    nuevo_comentario = Comentario(
        id_producto=id_producto,
          id_usuario=id_usuario, 
          comentario=comentario
          )
    try:
        db.session.add(nuevo_comentario)
        db.session.commit()
        return nuevo_comentario
    except Exception as e:
        db.session.rollback() # Rollback the changes on error
        #abort(400, str(e))
        raise Exception(f"Error al crear el producto: {str(e)}")

def eliminar_comentario(id_comentario):
    comentario = Comentario.query.filter_by(id_comentario=id_comentario).first()
    if comentario is None:
        return None
    try:
        db.session.delete(comentario)
        db.session.commit()
        return comentario
    except Exception as e:
        db.session.rollback() # Rollback the changes on error
        abort(400, str(e))

def ver_comentarios():
    comentarios = Comentario.query.all()
    if comentarios is None:
        return None
    return comentarios

#front mario
def ver_comentarios_por_producto(product_id):
    comentarios = Comentario.query.filter_by(id_producto=product_id).all()
    if not comentarios:
        return None
    return comentarios

#front mario
def ver_comentarios_y_nombre_usuario_por_producto(product_id):
    return db.session.query(Comentario, Usuario.nombre_usuario).join(Usuario, Usuario.id_usuario == Comentario.id_usuario).filter(Comentario.id_producto == product_id).all()



def ver_comentario_por_id(id_comentario):
    comentario = Comentario.query.filter_by(id_comentario=id_comentario).first()
    if comentario is None:
        return None
    return comentario

def actualizar_comentario(id_comentario, comentario):
    comentario = Comentario.query.filter_by(id_comentario=id_comentario).first()
    if comentario is None:
        return None
    comentario.comentario = comentario
    try:
        db.session.commit()
        return comentario
    except Exception as e:
        db.session.rollback() # Rollback the changes on error
        abort(400, str(e))
        
