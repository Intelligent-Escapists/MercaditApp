from flask import abort, session
from alchemyClasses.Rol import Rol
from alchemyClasses import db

def crear_rol(id_usuario, rol):
    nuevo_rol = Rol(
        id_usuario=id_usuario,
        id_rol=rol
    )

    try:
        db.session.add(nuevo_rol)
        db.session.commit()
    except Exception as e:
        abort(400, str(e))

    return nuevo_rol


def rol_de_usuario(id_ususario):
    rol = Rol.query.filter(Rol.id_usuario == id_ususario).first()
    return rol.id_rol