import base64
import os
from werkzeug.utils import secure_filename

from flask import request, abort, session
from flask.json import jsonify
from cryptoUtils import CryptoUtils as crypto

from alchemyClasses.Producto import Producto
from alchemyClasses import db
from controllers import productoController


def agregar_producto(
    id_usuario, nombre, descripcion, foto, no_stock, precio, calificacion=0
):
    from app import app

    header, encoded = foto.split(",", 1)
    file_data = base64.b64decode(encoded)
    file_extension = header.split("/")[1].split(";")[0]
    file_name = secure_filename(f"{nombre}.{file_extension}")
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file_name)

    with open(file_path, "wb") as file:
        file.write(file_data)

    nuevo_producto = Producto(
        id_usuario=id_usuario,
        nombre=nombre,
        descripcion=descripcion,
        foto=file_name,
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
    return producto


def consultar_productos_del_vendedor(id_usuario):
    try:
        productos = Producto.query.filter_by(id_usuario=id_usuario).all()
    except Exception as e:
        print(f"Error: {e}")
        abort(400, str(e))
    if productos is None:
        abort(404, description="No hay productos")
    return productos


def obtener_imagen_producto(path):

    encoded_string = None
    try:
        with open(path, "rb") as file:
            file_data = file.read()
            encoded_string = base64.b64encode(file_data).decode("utf-8")
    except Exception as e:
        print(f"Error: {e}")
        abort(400, str(e))

    return encoded_string


def consultar_productos():
    try:
        productos = Producto.query.all()
    except Exception as e:
        print(f"Error: {e}")
        abort(400, str(e))
    if productos is None:
        abort(404, description="No hay productos")
    return productos


def eliminar_producto(id_producto):
    producto = producto_existe(id_producto)
    if producto is not None:
        try:
            db.session.delete(producto)
            db.session.commit()
            return True
        except Exception as e:
            print(f"Error: {e}")
            abort(400, str(e))
    else:
        return False


def existe_producto(id_usuario, nombre_producto):
    try:
        producto = (
            Producto.query.filter(Producto.id_usuario == id_usuario)
            .filter(Producto.nombre == nombre_producto)
            .first()
        )
    except Exception as e:
        print(f"Error: {e}")
        abort(400, str(e))
    if producto:
        return True
    else:
        return False


def actualizar_producto(
    id_producto, nombre, descripcion, foto, no_stock, precio, categorias
):
    from app import app

    producto = producto_existe(id_producto=id_producto)
    if producto:
        try:
            # Manejo de la imagen
            if foto:
                header, encoded = foto.split(",", 1)
                file_data = base64.b64decode(encoded)
                file_extension = header.split("/")[1].split(";")[0]
                file_name = secure_filename(f"{nombre}.{file_extension}")
                file_path = os.path.join(app.config["UPLOAD_FOLDER"], file_name)

                with open(file_path, "wb") as file:
                    file.write(file_data)

                producto.foto = file_name

            producto.nombre = nombre
            producto.descripcion = descripcion
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
    try:
        return Producto.query.filter_by(id_producto=id_producto).first()
    except Exception as e:
        print(f"Error: {e}")
        abort(400, str(e))
