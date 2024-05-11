from flask import abort, session
from alchemyClasses.Categoria import Categoria
from alchemyClasses import db

def crear_categoria(id_producto, categoria):
    nueva_categoria = Categoria(id_producto=id_producto,categoria=categoria)

    try:
        db.session.add(nueva_categoria)
        db.session.commit()
    except Exception as e:
        abort(400, str(e))
    
    return nueva_categoria
