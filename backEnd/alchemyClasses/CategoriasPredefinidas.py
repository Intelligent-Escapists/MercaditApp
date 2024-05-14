from sqlalchemy import Column, Integer, ForeignKey, String
from alchemyClasses import db


class CategoriasPredefinidas(db.Model):
    __tablename__ = "categorias_predefinidas"
    categoria_id = Column(Integer, primary_key=True, autoincrement=True)
    nombre_categoria = Column(String(50), unique=True, index=True)

    def __init__(self, nombre_categoria):
        self.nombre_categoria = nombre_categoria
