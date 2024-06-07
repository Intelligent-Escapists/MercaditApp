from sqlalchemy import Column, Integer, String, ForeignKey, CheckConstraint
from alchemyClasses import db

class Carrito(db.Model):
    __tablename__ = 'carrito'
    id_carrito = Column(Integer, primary_key=True)

    def __init__(self):
        pass