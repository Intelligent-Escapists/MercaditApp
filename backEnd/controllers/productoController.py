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
        'inventario': producto.inventario
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
        'inventario': producto.inventario
    } for producto in productos]), 200

@producto_blueprint.route('/crear-producto', methods=['POST'])
def crear_producto():
    data = request.json()
    nuevo_producto = model.crear_producto(
        data['id_usuario'],
        data['id_carrito'],
        data['nombre'],
        data['descripcion'],
        data['foto'],
        data['no_stock'],
        data['precio'],
        data['calificacion'],
        data['id_compra']
    )
    return jsonify({
        'id_producto': nuevo_producto.id_producto,
        'nombre': nuevo_producto.nombre,
        'descripcion': nuevo_producto.descripcion,
        'precio': nuevo_producto.precio,
        'inventario': nuevo_producto.inventario
    }), 201