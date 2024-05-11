from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature


from model import modelCalificar as modelCalificar
from model import modelProducto as modelProducto
from model import modelUsuario as modelUsuario
from model import modelRol as modelRol
from model import modelCategoria as modelCategoria

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

    if( not modelUsuario.buscar_usuario_por_id(id_usuario)):
       return jsonify({"error": "El usuario no existe"})

    if(modelRol.rol_de_usuario(id_usuario) == 1):
        return jsonify({"error": "Solo vendedores pueden agregar productos"})
    

    if(modelProducto.existe_producto(id_usuario,nombre)):
        return jsonify({"error": "Ya se tiene registrado este producto con este nombre"})
    
    nuevo_producto = modelProducto.agregar_producto(id_usuario,nombre,descripcion,foto,cantidad,precio)
    nueva_categoria = modelCategoria.crear_categoria(nuevo_producto.id_producto,categoria)
    
    return jsonify({
        "id_producto": nuevo_producto.id_producto,
        "id_usuario": nuevo_producto.id_usuario,
        "nombre": nuevo_producto.nombre,
        "descripcion": nuevo_producto.descripcion,
        "precio": nuevo_producto.precio,
        "no_stock" : nuevo_producto.no_stock,
        "foto": nuevo_producto.foto,
        "calificacion": nuevo_producto.calificacion,
        "categoria": nueva_categoria.categoria
        }), 201

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
