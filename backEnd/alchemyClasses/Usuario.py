from sqlalchemy import Column, Integer, String, Boolean
from alchemyClasses import db


class Usuario(db.Model):
    __tablename__ = "usuario"
    id_usuario = Column(Integer, primary_key=True)
    nombre_usuario = Column(String(100), unique=True, nullable=False)
    correo = Column(String(345), unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    telefono = Column(String(13), nullable=False)
    email_confirmado = Column(Boolean, default=False)

    def __init__(
        self, nombre_usuario, correo, password, telefono, email_confirmado=False
    ):
        self.nombre_usuario = nombre_usuario
        self.correo = correo
        self.password = password
        self.telefono = telefono
        self.email_confirmado = email_confirmado
