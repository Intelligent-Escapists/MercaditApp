from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature

from model import modelComentario as model

comentario_blueprint = Blueprint('comentario', __name__,url_prefix='/comentario')

@comentario_blueprint.route('/crear-comentario', methods=['POST'])
def crear_comentario():
    id_producto = request.json['id_producto'] #may it should have a .get() method
    id_usuario = request.json['id_usuario']
    comentario = request.json['comentario']

    if (id_producto is None or id_usuario is None or comentario is None):
        return jsonify({"error 1": "Datos faltantes para crear el comentario"}), 400
    
    try:    
        nuevo_comentario = model.crear_comentario(id_producto, id_usuario, comentario)
        return jsonify({
            'id_comentario': nuevo_comentario.id_comentario,
            'id_producto': nuevo_comentario.id_producto,
            'id_usuario': nuevo_comentario.id_usuario,
            'comentario': nuevo_comentario.comentario   
        }), 201
    except Exception as e:
        return jsonify({"error 2": str(e)}), 400

@comentario_blueprint.route('/ver-comentarios/<int:product_id>', methods=['GET'])
def ver_comentarios(product_id):
    comentarios = model.ver_comentarios_por_producto(product_id)
    if comentarios is None:
        return jsonify({"error": "No hay comentarios"}), 404
    return jsonify([{
        'id_comentario': comentario.id_comentario,
        'id_producto': comentario.id_producto,
        'id_usuario': comentario.id_usuario,
        'comentario': comentario.comentario
    } for comentario in comentarios]), 200

@comentario_blueprint.route('/ver-comentario/<int:id_comentario>', methods=['GET'])
def ver_comentario(id_comentario):
    comentario = model.ver_comentario_por_id(id_comentario)
    if comentario is None:
        return jsonify({"error": "No se encontro el comentario"}), 404
    return jsonify({
        'id_comentario': comentario.id_comentario,
        'id_producto': comentario.id_producto,
        'id_usuario': comentario.id_usuario,
        'comentario': comentario.comentario
    }), 200


#no lo probare para este caso de uso. Mario
@comentario_blueprint.route('/actualizar/<int:id_comentario>', methods=['PUT'])
def actualizar_comentario(id_comentario):
    nuevo_texto = request.json.get('comentario')
    if not nuevo_texto:
        return jsonify({'error': 'Texto del comentario es necesario'}), 400
    else:
        comentario = model.actualizar_comentario(id_comentario, nuevo_texto)
        if comentario:
            return jsonify({
                'id_comentario': comentario.id_comentario,
                'id_producto': comentario.id_producto,
                'id_usuario': comentario.id_usuario,
                'comentario': comentario.comentario
            }), 200
        else:
            return jsonify({'error': 'Comentario no encontrado'}), 404

#no lo probare para este caso de uso. Mario
@comentario_blueprint.route('/eliminar/<int:id_comentario>', methods=['DELETE'])    
def eliminar_comentario(id_comentario):
    comentario = model.eliminar_comentario(id_comentario)
    if comentario:
        return jsonify({
            'id_comentario': comentario.id_comentario,
            'id_producto': comentario.id_producto,
            'id_usuario': comentario.id_usuario,
            'comentario': comentario.comentario
        }), 200
    else:
        return jsonify({'error': 'Comentario no encontrado'}), 404