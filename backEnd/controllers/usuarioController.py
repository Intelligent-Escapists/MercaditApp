from flask import Blueprint, request, jsonify, session, url_for
from cryptoUtils import CryptoUtils as crypto
from hashlib import sha256
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature


from model import modelUsuario as modelUsuario
from model import modelRol as modelRol
from controllers import mailController as mail

usuario_blueprint = Blueprint("usuario", __name__, url_prefix="/usuario")
secret = URLSafeTimedSerializer(
    "ccf3062e71dd06559c9b2a6246653a4e1bc45699ff777386acd612098cf76a99"
)

@usuario_blueprint.route("/obtener-usuarios", methods=["GET"])
def obtener_usuarios():
    usuarios = modelUsuario.obtener_usaurios()
    return jsonify(
        [
            {
                "id_usuario": usuario.id_usuario,
                "nombre_usuario": usuario.nombre_usuario,
                "correo": usuario.correo,
                "password": usuario.password,
                "telefono": usuario.telefono,
                "email_confirmado": usuario.email_confirmado,
                "rol": modelRol.rol_de_usuario(usuario.id_usuario)
            }
            for usuario in usuarios
        ]
    )

@usuario_blueprint.route("/verificar-correo/<token>", methods=["GET"])
def confirmar_email(token):
    try:
        correo = secret.loads(token, salt="email-confirm", max_age=1200)
    except SignatureExpired:
        return jsonify({"error": "El token ha expirado"}), 401
    except BadTimeSignature:
        return jsonify({"error": "El token no es válido"}), 401

    usuario = modelUsuario.buscar_usuario_por_correo(correo)

    if usuario is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    status = modelUsuario.confirmar_email(usuario)

    return jsonify({"mensaje": "Correo confirmado exitosamente"}), status


@usuario_blueprint.route("/crear-usuario", methods=["POST"])
def crear_usuario():
    nombre_usuario = request.json["nombre_usuario"]
    correo = request.json["correo"]
    password = request.json["password"]
    telefono = request.json["telefono"]
    rol = request.json["rol"]

    if modelUsuario.existe_usuario_correo(correo):
        return jsonify({"error": "El usuario con este correo ya existe"}), 409

    if modelUsuario.existe_usuario_nomre_usuario(nombre_usuario):
        return jsonify({"error": "El nombre de usuario ya existe"}), 409

    password_hashed = sha256(crypto.cipher(password)).hexdigest()
    nuevo_usuario = modelUsuario.crear_usuario(
        nombre_usuario, correo, password_hashed, telefono
    )
    rol_usuario = modelRol.crear_rol(nuevo_usuario.id_usuario, rol)


    token = secret.dumps(correo, salt="email-confirm")
    mensaje = "Bienvenido a MercaditApp, confirma tu correo"
    # f'http://localhost:5173/verificar-correo:{token}'
    link = f"http://localhost:5173/verificar-correo:{token}"
    print("Link: ", link)
    body = f"Para confirmar tu correo da click en el siguiente link: {link}"
    recipient = nuevo_usuario.correo
    mail.send_email(recipient, mensaje, body)

    return jsonify(
        {
            "id_usuario": nuevo_usuario.id_usuario,
            "nombre_usuario": nuevo_usuario.nombre_usuario,
            "correo": nuevo_usuario.correo,
            "password": nuevo_usuario.password,
            "telefono": nuevo_usuario.telefono,
            "rol": rol_usuario.id_rol,
            "email_confirmado": nuevo_usuario.email_confirmado,
        }
    ),201


@usuario_blueprint.route("/login-usuario", methods=["POST"])
def login_usuario():
    correo = request.json["correo"]
    password = request.json["password"]
    usuario = modelUsuario.validar_usuario(correo, password)

    if usuario is None:
        return jsonify({"error": "correo o contraseña incorrectos"}), 401

    if usuario == -1:
        return jsonify({"error": "Correo no verificado"}), 401

    session["id_usuario"] = usuario.id_usuario
    return jsonify(
        {
            "id_usuario": usuario.id_usuario,
            "correo": usuario.correo,
            "password": usuario.password,
        }
    )


@usuario_blueprint.route("/logout-usuario", methods=["POST"])
def logout_usuario():
    session.pop("id_usuario", None)
    return "200"


@usuario_blueprint.route("/@usuario")
def get_usuario_autenticado():
    id_usuario = session.get("id_usuario")

    if not id_usuario:
        return jsonify({"error": "No autenticado"}), 401

    usuario = modelUsuario.buscar_usuario_por_id(id_usuario)

    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(
        {
            "id_usuario": usuario.id_usuario,
            "correo": usuario.correo,
            "password": usuario.password,
        }
    )


def existeUsuario(id_usuario):
    return modelUsuario.buscar_usuario_por_id(id_usuario=id_usuario)

