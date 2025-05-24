from sqlalchemy import Column, Integer, String, Text, DateTime, Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.core.database import Base

class Contexto(Base):
    __tablename__ = "contexto"

    id = Column(UUID, primary_key=True, index=True)
    institucion = Column(Text)
    proceso = Column(Text)
    lider = Column(Text)
    fecha = Column(Date)
    objetivo = Column(Text)
    alcance = Column(Text)
    enfoque_metodologico = Column(Text)
    criterios_valoracion = Column(Text)
    criterios_probabilidad = Column(Text)
