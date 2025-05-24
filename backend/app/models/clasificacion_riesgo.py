from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.sql import func

from app.core.database import Base

class ClasificacionRiesgo(Base):
    __tablename__ = "clasificacion_riesgo"

    id = Column(Integer, primary_key=True, index=True)
    limite_inferior = Column(Integer)
    limite_superior = Column(Integer)
    nivel = Column(Text)
    respuesta = Column(Text)
    descripcion = Column(Text)
    tratamiento = Column(Text)
    rol = Column(Text)
