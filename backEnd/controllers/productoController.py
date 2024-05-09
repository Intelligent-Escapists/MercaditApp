from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature


from model import modelCalificar as modelCalificar

producto_blueprint = Blueprint("producto", __name__, url_prefix="/producto")


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
