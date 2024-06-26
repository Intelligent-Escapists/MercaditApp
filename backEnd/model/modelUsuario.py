from flask import request, abort, session
from flask.json import jsonify
from cryptoUtils import CryptoUtils as crypto

from alchemyClasses.Usuario import Usuario
from alchemyClasses import db


def obtener_usaurios():
    return Usuario.query.all()

def crear_usuario(nombre_usuario, correo, password, telefono):
    nuevo_usuario = Usuario(
        nombre_usuario=nombre_usuario,
        correo=correo,
        password=password,
        telefono=telefono,
    )
    try:
        db.session.add(nuevo_usuario)
        db.session.commit()
    except Exception as e:
        abort(400, str(e))
    return nuevo_usuario

def actualizar_usuario(nombre_usuario, correo, telefono):
    usuario = Usuario.query.filter_by(correo=correo).first()
    if usuario is None:
        abort(404, "Usuario no encontrado")
    usuario.nombre_usuario = nombre_usuario
    usuario.telefono = telefono
    usuario.correo = correo
    try:
        db.session.commit()
    except Exception as e:
        abort(400, str(e))
    return usuario

def confirmar_email(usuario):
    usuario.email_confirmado = True
    try:
        db.session.commit()
    except Exception as e:
        abort(400, str(e))
    return 200

def validar_usuario(correo, password):
    usuario = Usuario.query.filter_by(correo=correo).first()
    if usuario is None:
        return None
    if not usuario.email_confirmado:
        return -1
    if crypto.validate(password, usuario.password):
        return usuario
    return None



def buscar_usuario_por_id(id_usuario):
    return Usuario.query.filter_by(id_usuario=id_usuario).first() 


def buscar_usuario_por_correo(correo):
    return Usuario.query.filter_by(correo=correo).first()


def existe_usuario_correo(correo):
    return Usuario.query.filter_by(correo=correo).first() is not None


def existe_usuario_nombre_usuario(nombre_usuario):
    return Usuario.query.filter_by(nombre_usuario=nombre_usuario).first() is not None
