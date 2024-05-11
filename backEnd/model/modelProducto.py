from flask import request, abort, session
from flask.json import jsonify
from cryptoUtils import CryptoUtils as crypto

from alchemyClasses.Producto import Producto
from alchemyClasses import db


def consultar_producto_por_id(id_producto):
    producto = Producto.query.filter_by(id_producto=id_producto).first()
    if producto is None:
        abort(404, description="Producto no encontrado")
    return producto

def consultar_productos():
    productos = Producto.query.all()
    if productos is None:
        abort(404, description="No hay productos")
    return productos

def crear_producto(id_usuario, id_carrito, nombre, descripcion, foto, no_stock, precio, calificacion, id_compra):
    nuevo_producto = Producto(
        id_usuario=id_usuario,
        id_carrito=id_carrito,
        nombre=nombre,
        descripcion=descripcion,
        foto=foto,
        no_stock=no_stock,
        precio=precio,
        calificacion=calificacion,
        id_compra=id_compra
    )
    try:
        db.session.add(nuevo_producto)
        db.session.commit()
        return nuevo_producto
    except Exception as e:
        db.session.rollback()
        raise Exception(f"Error al crear el producto: {str(e)}")

