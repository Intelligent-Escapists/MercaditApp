from flask import abort, session
from alchemyClasses.Categoria import Categoria

from alchemyClasses.CategoriasPredefinidas import CategoriasPredefinidas
from alchemyClasses import db
from controllers import productoController


def agregar_categoria_a_producto(id_producto, categoria):
    nueva_categoria = Categoria(id_producto=id_producto, categoria=categoria)

    try:
        db.session.add(nueva_categoria)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return str(e)

    return nueva_categoria.categoria  # Retornar None si no hay errores

def existe_categoria_predefinida(categoria):
    # Verificar si la categoría existe en categorias_predefinidas
    return db.session.query(CategoriasPredefinidas).filter(CategoriasPredefinidas.nombre_categoria == categoria).first()
    

def obtener_categorias_de_producto(id_producto):
    producto = productoController.obtenProducto(id_producto=id_producto)
    if producto:
        categorias = Categoria.query.filter_by(id_producto=id_producto).all()
        if categorias:
            return [categoria.categoria for categoria in categorias]
        else:
            return "El producto no tiene categorías asociadas."
    else:
        return "NO EXISTE PRODUCTO"


def obtener_todas_las_categorias():
    try:
        categorias = db.session.query(CategoriasPredefinidas.nombre_categoria).all()
    except Exception as e:
        print(f"Error: {e}")
        abort(400, str(e))
    if categorias:
        return [categoria.nombre_categoria for categoria in categorias]
    else:
        return "No existen categorias"


def eliminar_todas_las_categorias_de_un_producto(id_producto):
    producto = productoController.obtenProducto(id_producto=id_producto)
    if producto:
        try:
            Categoria.query.filter_by(id_producto=id_producto).delete()
            db.session.commit()
            print("CONFIRMADO ELIMINACION")
            return True
        except Exception as e:
            print(f"Error: {e}")
            abort(400, str(e))
    else:
        print("No pude eliminar", producto, id_producto)
        return False
    
def filtrar_categoria(categoria):
    try:
        categorias = db.session.query(Categoria.id_producto).filter(Categoria.categoria == categoria).all()
    except Exception as e:
        print(f"Error: {e}")
        abort(400, str(e))
    if categorias:
        return [categoria.id_producto for categoria in categorias]
    else:
        print("No hay productos que coincidan")
        return False