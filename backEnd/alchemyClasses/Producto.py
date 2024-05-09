from sqlalchemy import (
    Column,
    CheckConstraint,
    Integer,
    String,
    ForeignKey,
    Text,
    SmallInteger,
)
from sqlalchemy.types import DECIMAL  # Cambio aquí

from alchemyClasses import db


class Producto(db.Model):
    __tablename__ = "producto"
    id_producto = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"))
    id_carrito = Column(Integer, ForeignKey("carrito.id_carrito"), nullable=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(Text, nullable=False)
    foto = Column(Text, nullable=False)
    no_stock = Column(Integer, nullable=False)
    precio = Column(DECIMAL, nullable=False)  # Cambio aquí
    calificacion = Column(SmallInteger, nullable=False)
    id_compra = Column(Integer)

    __table_args__ = (
        CheckConstraint("no_stock > 0", name="no_stock_check"),
        CheckConstraint("precio > 0", name="precio_check"),
        CheckConstraint("calificacion BETWEEN 0 AND 10", name="calificacion_check"),
    )

    def __init__(
        self,
        id_usuario,
        id_carrito,
        nombre,
        descripcion,
        foto,
        no_stock,
        precio,
        calificacion,
        id_compra,
    ):
        self.id_usuario = id_usuario
        self.id_carrito = id_carrito
        self.nombre = nombre
        self.descripcion = descripcion
        self.foto = foto
        self.no_stock = no_stock
        self.precio = precio
        self.calificacion = calificacion
        self.id_compra = id_compra
