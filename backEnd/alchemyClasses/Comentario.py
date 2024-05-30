from sqlalchemy import Column, Integer, ForeignKey, Text
from alchemyClasses import db

class Comentario(db.Model):
    __tablename__ = 'comentario'
    id_comentario = Column(Integer, primary_key=True, autoincrement=True)
    id_producto = Column(Integer, ForeignKey('producto.id_producto'), primary_key=True)
    id_usuario = Column(Integer, ForeignKey('usuario.id_usuario'))
    comentario = Column(Text, nullable=False)
    usuario = db.relationship('Usuario', backref=db.backref('comentarios', lazy=True))


    def __init__(self, id_producto, id_usuario, comentario):
        self.id_producto = id_producto
        self.id_usuario = id_usuario
        self.comentario = comentario