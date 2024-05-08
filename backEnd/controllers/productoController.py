from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature


from model import modelCalificar as modelCalificar

producto_blueprint = Blueprint("producto", __name__, url_prefix="/producto")


@producto_blueprint.route("/obtenerCalificacionProducto", methods=["GET"])
def obtener_calificacion():
    id_producto = request.json["id_producto"]
    calificacion = modelCalificar.actualizar_calificacion_general(id_producto)
    return jsonify({"calificacion": calificacion})
