import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Applicationconfig
from alchemyClasses import db
from alchemyClasses.Usuario import Usuario
from alchemyClasses.Comentario import Comentario
from alchemyClasses.Producto import Producto
from alchemyClasses.Carrito import Carrito
from flask_mail import Mail

from controllers.usuarioController import usuario_blueprint
from controllers.productoController import producto_blueprint
from controllers.comentarioController import comentario_blueprint

app = Flask(__name__)
app.config.from_object(Applicationconfig)
CORS(app, supports_credentials=True)
db.init_app(app)
mail = Mail(app)

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])


def return_mail():
    return mail


app.register_blueprint(usuario_blueprint)
app.register_blueprint(producto_blueprint)
app.register_blueprint(comentario_blueprint)



if __name__ == "__main__":
    app.run(debug=True)
