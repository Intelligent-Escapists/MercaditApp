from sqlalchemy import Column, Integer, ForeignKey, String
from alchemyClasses import db

class Categoria(db.Model):
    __tablename__ = 'categoria'
    id_producto = Column(Integer, ForeignKey('producto.id_producto'), primary_key=True)
    categoria = Column(String(100), primary_key=True)

    def __init__(self,id_producto, categoria):
        self.id_producto = id_producto
        self.categoria = categoria
