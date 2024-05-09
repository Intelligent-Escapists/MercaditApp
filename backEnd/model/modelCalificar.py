from flask import abort
from sqlalchemy import and_

from alchemyClasses.Producto import Producto
from alchemyClasses.Calificacion import Calificacion
from alchemyClasses.Carrito import Carrito
from alchemyClasses import db
from sqlalchemy import func
from controllers.usuarioController import existeUsuario
import math


# Calificar un producto
def calificar_producto(id_producto, id_usuario, nueva_calificacion):
    if existe_producto_y_usuario(id_producto=id_producto, id_usuario=id_usuario):
        calificacion = existe_calificacion(id_producto, id_usuario)
        print("calificacion XDXXD", calificacion)
        if calificacion:  # Si existe se actualiza
            try:
                calificacion.calificacion = nueva_calificacion
                db.session.commit()
                actualizar_calificacion_general(id_producto=id_producto)
                return nueva_calificacion
            except Exception as e:
                abort(400, str(e))

        else:  # Si no hay se crea una nueva
            nueva_calificacion = Calificacion(
                id_producto=id_producto,
                id_usuario=id_usuario,
                calificacion=nueva_calificacion,
            )
            try:
                db.session.add(nueva_calificacion)
                db.session.commit()
            except Exception as e:
                abort(400, str(e))
            actualizar_calificacion_general(id_producto=id_producto)
    else:
        return -1


# Actualiza la calificacion de un producto en general
def actualizar_calificacion_general(id_producto):
    # Buscar el producto
    producto = Producto.query.filter(Producto.id_producto == id_producto).first()
    if producto:
        # Obtener todas las calificaciones para el producto
        calificaciones_producto = Calificacion.query.filter_by(
            id_producto=id_producto
        ).all()
        lista_calificaciones = [cal.calificacion for cal in calificaciones_producto]
        # Calcular la nueva calificación general
        total_calificaciones = len(lista_calificaciones)
        suma_calificaciones = sum(cal for cal in lista_calificaciones)
        nueva_calificacion_general = round(
            suma_calificaciones / (total_calificaciones)
        )  # Sumar 1 para incluir la nueva calificación
        try:
            # Actualizar la calificación general del producto
            producto.calificacion = nueva_calificacion_general
            db.session.commit()
        except Exception as e:
            print(f"Error XDXDXD: {e}")
            abort(400, str(e))
        # Guardar los cambios en la base de datos

        return nueva_calificacion_general
    else:
        return False


# Verifica si ya existe una calificacion
def existe_calificacion(id_producto, id_usuario):
    return Calificacion.query.filter(
        and_(
            Calificacion.id_usuario == id_usuario,
            Calificacion.id_producto == id_producto,
        )
    ).first()


# verifica si ya existe un producto y usuario
def existe_producto_y_usuario(id_producto, id_usuario):
    existe_producto = Producto.query.filter_by(id_producto=id_producto).first()
    existe_usuario = existeUsuario(id_usuario=id_usuario)
    if existe_producto and existe_usuario:
        return True
    else:
        return False
