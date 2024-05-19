from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
import os


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


@producto_blueprint.route("/obtener-producto/<int:id_producto>", methods=["GET"])
def consultar_producto_por_id(id_producto):

    producto = model.consultar_producto_por_id(id_producto)
    if producto is None:
        return jsonify({"error": "No se encontro el producto"}), 409
    

    
    imagen_producto = obtener_imagen_producto(producto.foto)
    

    return (
        jsonify(
            {
                "id_producto": producto.id_producto,
                "nombre": producto.nombre,
                "descripcion": producto.descripcion,
                "foto": imagen_producto,
                "precio": producto.precio,
                "no_stock": producto.no_stock,
            }
        ),
        200,
    )

def obtener_imagen_producto(foto_producto):
    from app import app
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], foto_producto)
    imagen_producto = model.obtener_imagen_producto(file_path)

    if imagen_producto is None:
        return jsonify({"error": "No se encontro la imagen del producto"}), 409
    
    base64_imagen = f"data:image/{file_path.split('.')[-1]};base64,{imagen_producto}"

    return base64_imagen

@producto_blueprint.route("/productos", methods=["GET"])
def consultar_productos():
    productos = model.consultar_productos()
    if productos is None:
        return jsonify({"error": "No hay productos"}), 409
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
        return jsonify({"error": "El usuario no existe"}), 403

    if modelRol.rol_de_usuario(id_usuario) == 1:
        return jsonify({"error": "Solo vendedores pueden agregar productos"}), 401

    if modelProducto.existe_producto(id_usuario, nombre):
        return jsonify(
            {"error": "Ya se tiene registrado este producto con este nombre"}
        ), 409
    
    if modelCategoria.existe_categoria_predefinida(categoria) is None:
        return jsonify({"error": "La categoria no existe"}), 409

    nuevo_producto = modelProducto.agregar_producto(
        id_usuario, nombre, descripcion, foto, cantidad, precio
    )
    nueva_categoria = modelCategoria.agregar_categoria_a_producto(
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
                "categoria": nueva_categoria,
            }
        ),
        201,
    )
9

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
    categorias = request.json.get("categorias", [])

    if modelProducto.producto_existe(id_producto=id_producto):
        producto_actualizado = modelProducto.actualizar_producto(
            id_producto=id_producto,
            nombre=nombre,
            descripcion=descripcion,
            foto=foto,
            no_stock=no_stock,
            precio=precio,
            categorias=categorias,
        )

        categorias_actualizadas = modelCategoria.obtener_categorias_de_producto(
            id_producto=id_producto
        )
        return jsonify(
            {
                "nombre": producto_actualizado.nombre,
                "descripcion": producto_actualizado.descripcion,
                "foto": producto_actualizado.foto,
                "no_stock": producto_actualizado.no_stock,
                "precio": producto_actualizado.precio,
                "categoria": categorias_actualizadas,
            }
        )
    else:
        return jsonify({"error": "No existe el producto"})


@producto_blueprint.route("/obtener-categorias-de-un-producto", methods=["GET"])
def obten_categorias():
    id_producto = request.json["id_producto"]
    categorias = modelCategoria.obtener_categorias_de_producto(id_producto=id_producto)
    return jsonify({"categorias": categorias})


@producto_blueprint.route("obtener-todas-las-categorias-existentes", methods=["GET"])
def obten_todas_las_categorias():
    categorias = modelCategoria.obtener_todas_las_categorias()
    return jsonify({"categorias": categorias})


def obtenProducto(id_producto):
    return modelProducto.producto_existe(id_producto=id_producto)


def elimina_categorias_de_producto(id_producto):
    print("Estoy eliminando")
    return modelCategoria.eliminar_todas_las_categorias_de_un_producto(id_producto)


def agregar_categoria(id_producto, categoria):
    return modelCategoria.agregar_categoria_a_producto(
        id_producto=id_producto, categoria=categoria
    )


def obtener_categorias_de_producto(id_producto):
    return modelCategoria.obtener_categorias_de_producto(id_producto=id_producto)
