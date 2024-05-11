from flask import request, abort, session
from flask.json import jsonify
from cryptoUtils import CryptoUtils as crypto

from alchemyClasses.Producto import Producto
from alchemyClasses import db

def agregar_producto(id_usuario, nombre, descripcion, foto, no_stock, precio,calificacion=0):
    nuevo_producto = Producto(
        id_usuario=id_usuario,
        nombre=nombre,
        descripcion=descripcion,
        foto=foto,
        no_stock=no_stock,
        precio=precio,
        calificacion=calificacion
    )
    try:
        db.session.add(nuevo_producto)
        db.session.commit()
    except Exception as e:
        abort(400, str(e))
    return nuevo_producto

def eliminar_producto(id_producto):
    producto = existe_producto__por_id(id_producto)
    if producto is not None:
        db.session.delete(producto)
        db.session.commit()
        return True
    else:
        return False




def existe_producto(id_usuario,nombre_producto):
    producto = Producto.query.filter(Producto.id_usuario == id_usuario).filter(Producto.nombre == nombre_producto).first()
    if producto:
        return True
    else:
        return False
    
def existe_producto__por_id(id_producto):
    return Producto.query.filter(Producto.id_producto == id_producto).first()
    