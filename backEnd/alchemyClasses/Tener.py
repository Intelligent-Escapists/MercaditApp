from sqlalchemy import Column, Integer, ForeignKey
from alchemyClasses import db

class Tener(db.Model):
    __tablename__ = 'tener'
    id_usuario = Column(Integer, ForeignKey('usuario.id_usuario'))
    id_carrito = Column(Integer, ForeignKey('carrito.id_carrito'))
    
    def __init__(self, id_producto, id_carrito):
        self.id_producto = id_producto
        self.id_carrito = id_carrito