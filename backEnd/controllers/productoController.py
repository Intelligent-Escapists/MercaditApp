from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature

from model import modelProducto as model

producto_blueprint = Blueprint('producto', __name__,url_prefix='/producto') 
secret = URLSafeTimedSerializer('ccf3062e71dd06559c9b2a6246653a4e1bc45699ff777386acd612098cf76a99')

@producto_blueprint.route('/consultar-producto/<int:id_producto>', methods=['GET'])
def consultar_producto_por_id(id_producto):
    producto = model.consultar_producto_por_id(id_producto)
    if producto is None:
        return jsonify({"error": "No se encontro el producto"}), 404
    return jsonify({
        'id_producto': producto.id_producto,
        'nombre': producto.nombre,
        'descripcion': producto.descripcion,
        'precio': producto.precio,
        'no_stock': producto.no_stock
    }), 200

@producto_blueprint.route('/consultar-productos', methods=['GET'])
def consultar_productos():
    productos = model.consultar_productos()
    if productos is None:
        return jsonify({"error": "No hay productos"}), 404
    return jsonify([{
        'id_producto': producto.id_producto,
        'nombre': producto.nombre,
        'descripcion': producto.descripcion,
        'precio': producto.precio,
        'no_stock': producto.no_stock
    } for producto in productos]), 200

@producto_blueprint.route('/crear-producto', methods=['POST'])
def crear_producto():
    id_usuario = request.json['id_usuario']
    id_carrito = request.json['id_carrito']
    nombre = request.json['nombre']
    descripcion = request.json['descripcion']
    foto = request.json['foto']
    no_stock = request.json['no_stock']
    precio = request.json['precio']
    calificacion = request.json['calificacion']
    id_compra = request.json['id_compra']

    if (id_usuario is None or id_carrito is None or nombre is None or descripcion is None or foto is None or no_stock is None or precio is None or calificacion is None or id_compra is None):
        return jsonify({"error": "Datos faltantes para crear el producto"}), 400
    try:
        nuevo_producto = model.crear_producto(id_usuario, id_carrito, nombre, descripcion, foto, no_stock, precio, calificacion, id_compra)
        return jsonify({
            'id_producto': nuevo_producto.id_producto,
            'nombre': nuevo_producto.nombre,
            'descripcion': nuevo_producto.descripcion,
            'precio': nuevo_producto.precio,
            'no_stock': nuevo_producto.no_stock
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400