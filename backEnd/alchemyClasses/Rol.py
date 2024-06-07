from sqlalchemy import Column, Integer, String, ForeignKey, CheckConstraint
from alchemyClasses import db

class Rol(db.Model):
    __tablename__ = 'rol'
    id_usuario = Column(Integer, ForeignKey('usuario.id_usuario'), primary_key=True)
    id_rol = Column(Integer, primary_key=True)

    __table_args__ = (
        CheckConstraint('id_rol IN (0, 1)', name='id_rol_check'),
    )
    
    def __init__(self, id_usuario,id_rol):
        self.id_rol = id_rol
        self.id_usuario = id_usuario 