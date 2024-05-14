from flask import request, abort, session
from flask.json import jsonify
from cryptoUtils import CryptoUtils as crypto

from alchemyClasses.Producto import Producto
from alchemyClasses import db
from controllers import productoController


def agregar_producto(
    id_usuario, nombre, descripcion, foto, no_stock, precio, calificacion=0
):
    nuevo_producto = Producto(
        id_usuario=id_usuario,
        nombre=nombre,
        descripcion=descripcion,
        foto=foto,
        no_stock=no_stock,
        precio=precio,
        calificacion=calificacion,
    )
    try:
        db.session.add(nuevo_producto)
        db.session.commit()
    except Exception as e:
        abort(400, str(e))
    return nuevo_producto


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


def eliminar_producto(id_producto):
    producto = existe_producto__por_id(id_producto)
    if producto is not None:
        db.session.delete(producto)
        db.session.commit()
        return True
    else:
        return False


def existe_producto(id_usuario, nombre_producto):
    producto = (
        Producto.query.filter(Producto.id_usuario == id_usuario)
        .filter(Producto.nombre == nombre_producto)
        .first()
    )
    if producto:
        return True
    else:
        return False


def actualizar_producto(
    id_producto, nombre, descripcion, foto, no_stock, precio, categorias
):
    producto = producto_existe(id_producto=id_producto)
    if producto:
        try:
            producto.nombre = nombre
            producto.descripcion = descripcion
            producto.foto = foto
            producto.no_stock = no_stock
            producto.precio = precio
            actualizar_categorias(id_producto=id_producto, categorias=categorias)
            db.session.commit()
            return producto_existe(id_producto=id_producto)
        except Exception as e:
            print(f"Error: {e}")
            abort(400, str(e))
    else:
        return "no existe producto"


def actualizar_categorias(id_producto, categorias):
    producto = producto_existe(
        id_producto=id_producto
    )  # Verificamos si existe el producto
    categorias_eliminadas = productoController.elimina_categorias_de_producto(
        id_producto=id_producto
    )  # Verificamos si se pueden eliminar
    if producto and categorias_eliminadas:
        try:
            for nombre_categoria in categorias:
                resultado = productoController.agregar_categoria(
                    id_producto, nombre_categoria
                )
                if resultado:  # Verificar si hay un mensaje de error
                    return resultado
        except Exception as e:
            print(f"Error: {e}")
            abort(400, str(e))
    else:
        return productoController.obtener_categorias_de_producto(id_producto)


def producto_existe(id_producto):
    return Producto.query.filter_by(id_producto=id_producto).first()
