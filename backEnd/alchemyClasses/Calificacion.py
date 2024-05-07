from sqlalchemy import CheckConstraint, Column, Integer, ForeignKey, SmallInteger
from alchemyClasses import db


class Calificacion(db.Model):
    __tablename__ = "calificacion"
    id_producto = Column(Integer, ForeignKey("producto.id_producto"), primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuario.id_usuario"), primary_key=True)
    calificacion = Column(SmallInteger, nullable=False, primary_key=True)

    __table_args__ = CheckConstraint(
        "calificacion BETWEEN 0 AND 10", name="calificacion_check"
    )

    def __init__(self, id_producto, id_usuario, calificacion):
        self.id_producto = id_producto
        self.id_usuario = id_usuario
        self.calificacion = calificacion
