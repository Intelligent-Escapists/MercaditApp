from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature


from model import modelCalificar as modelCalificar
from model import modelProducto as modelProducto
from model import modelUsuario as modelUsuario
from model import modelRol as modelRol
from model import modelCategoria as modelCategoria


from model import modelProducto as model

producto_blueprint = Blueprint("producto", __name__, url_prefix="/producto")
secret = URLSafeTimedSerializer(
    "ccf3062e71dd06559c9b2a6246653a4e1bc45699ff777386acd612098cf76a99"
)


@producto_blueprint.route("/consultar-producto/<int:id_producto>", methods=["GET"])
def consultar_producto_por_id(id_producto):
    producto = model.consultar_producto_por_id(id_producto)
    if producto is None:
        return jsonify({"error": "No se encontro el producto"}), 404
    return (
        jsonify(
            {
                "id_producto": producto.id_producto,
                "nombre": producto.nombre,
                "descripcion": producto.descripcion,
                "precio": producto.precio,
                "no_stock": producto.no_stock,
            }
        ),
        200,
    )


@producto_blueprint.route("/consultar-productos", methods=["GET"])
def consultar_productos():
    productos = model.consultar_productos()
    if productos is None:
        return jsonify({"error": "No hay productos"}), 404
    return (
        jsonify(
            [
                {
                    "id_producto": producto.id_producto,
                    "nombre": producto.nombre,
                    "descripcion": producto.descripcion,
                    "precio": producto.precio,
                    "no_stock": producto.no_stock,
                }
                for producto in productos
            ]
        ),
        200,
    )


@producto_blueprint.route("/crear-producto", methods=["POST"])
def crear_producto():
    id_usuario = request.json["id_usuario"]
    id_carrito = request.json["id_carrito"]
    nombre = request.json["nombre"]
    descripcion = request.json["descripcion"]
    foto = request.json["foto"]
    no_stock = request.json["no_stock"]
    precio = request.json["precio"]
    calificacion = request.json["calificacion"]
    id_compra = request.json["id_compra"]

    if (
        id_usuario is None
        or id_carrito is None
        or nombre is None
        or descripcion is None
        or foto is None
        or no_stock is None
        or precio is None
        or calificacion is None
        or id_compra is None
    ):
        return jsonify({"error": "Datos faltantes para crear el producto"}), 400
    try:
        nuevo_producto = model.crear_producto(
            id_usuario,
            id_carrito,
            nombre,
            descripcion,
            foto,
            no_stock,
            precio,
            calificacion,
            id_compra,
        )
        return (
            jsonify(
                {
                    "id_producto": nuevo_producto.id_producto,
                    "nombre": nuevo_producto.nombre,
                    "descripcion": nuevo_producto.descripcion,
                    "precio": nuevo_producto.precio,
                    "no_stock": nuevo_producto.no_stock,
                }
            ),
            201,
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400


producto_blueprint = Blueprint("producto", __name__, url_prefix="/producto")


@producto_blueprint.route("/agregar-producto", methods=["POST"])
def agregar_producto():
    id_usuario = request.json["id_usuario"]
    nombre = request.json["nombre"]
    descripcion = request.json["descripcion"]
    precio = request.json["precio"]
    cantidad = request.json["cantidad"]
    foto = request.json["foto"]
    categoria = request.json["categoria"]

    if not modelUsuario.buscar_usuario_por_id(id_usuario):
        return jsonify({"error": "El usuario no existe"})

    if modelRol.rol_de_usuario(id_usuario) == 1:
        return jsonify({"error": "Solo vendedores pueden agregar productos"})

    if modelProducto.existe_producto(id_usuario, nombre):
        return jsonify(
            {"error": "Ya se tiene registrado este producto con este nombre"}
        )

    nuevo_producto = modelProducto.agregar_producto(
        id_usuario, nombre, descripcion, foto, cantidad, precio
    )
    nueva_categoria = modelCategoria.crear_categoria(
        nuevo_producto.id_producto, categoria
    )

    return (
        jsonify(
            {
                "id_producto": nuevo_producto.id_producto,
                "id_usuario": nuevo_producto.id_usuario,
                "nombre": nuevo_producto.nombre,
                "descripcion": nuevo_producto.descripcion,
                "precio": nuevo_producto.precio,
                "no_stock": nuevo_producto.no_stock,
                "foto": nuevo_producto.foto,
                "calificacion": nuevo_producto.calificacion,
                "categoria": nueva_categoria.categoria,
            }
        ),
        201,
    )


@producto_blueprint.route("/eliminar-producto/<id_producto>", methods=["DELETE"])
def eliminar_producto(id_producto):
    if modelProducto.eliminar_producto(id_producto):
        return jsonify({"mensaje": "Producto eliminado"})
    else:
        return jsonify({"error": "El producto no existe"})


@producto_blueprint.route("/obtener-calificacion-producto", methods=["GET"])
def obtener_calificacion():
    id_producto = request.json["id_producto"]
    calificacion = modelCalificar.actualizar_calificacion_general(id_producto)
    return jsonify({"calificacion": calificacion})


@producto_blueprint.route("/calificar-producto", methods=["POST"])
def calificar_producto():

    id_producto = request.json["id_producto"]
    id_usuario = request.json["id_usuario"]
    calificacion = request.json["calificacion"]
    calificacion = modelCalificar.calificar_producto(
        id_producto=id_producto, id_usuario=id_usuario, nueva_calificacion=calificacion
    )
    if calificacion != -1:
        return jsonify({"calificacion": calificacion})
    else:
        return jsonify({"error": "El producto o el usuario no existen"})


@producto_blueprint.route("/existe-calificacion", methods=["GET"])
def existe_calificacion():
    id_producto = request.json["id_producto"]
    id_usuario = request.json["id_usuario"]
    if modelCalificar.existe_calificacion(
        id_producto=id_producto, id_usuario=id_usuario
    ):
        return jsonify({"existe_calificacion": True})
    else:
        return jsonify({"existe_calificacion": False})


@producto_blueprint.route("/obten-calificacion", methods=["GET"])
def obten_calificacion():
    id_producto = request.json["id_producto"]
    id_usuario = request.json["id_usuario"]
    calificacion = modelCalificar.existe_calificacion(
        id_producto=id_producto, id_usuario=id_usuario
    )
    if calificacion:
        return jsonify({"calificacion": calificacion.calificacion})
    else:
        return jsonify({"error": "No existe calificacion"})


@producto_blueprint.route("/actualizar-producto", methods=["POST"])
def actualiza_producto():

    # Tengo duda acerca de este metodo y como se comportará la actualizacion de una categoria
    id_producto = request.json["id_producto"]
    nombre = request.json["nombre"]
    descripcion = request.json["descripcion"]
    foto = request.json["foto"]
    no_stock = request.json["no_stock"]
    precio = request.json["precio"]

    if modelProducto.producto_existe(id_producto=id_producto):
        producto_actualizado = modelProducto.actualizar_producto(
            id_producto=id_producto,
            nombre=nombre,
            descripcion=descripcion,
            foto=foto,
            no_stock=no_stock,
            precio=precio,
        )

        return jsonify(
            {
                "nombre": producto_actualizado.nombre,
                "descripcion": producto_actualizado.descripcion,
                "foto": producto_actualizado.foto,
                "no_stock": producto_actualizado.no_stock,
                "precio": producto_actualizado.precio,
            }
        )
    else:
        return jsonify({"error": "No existe el producto"})
