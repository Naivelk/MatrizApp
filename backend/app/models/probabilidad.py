from sqlalchemy import Column, Integer, Text

from app.core.database import Base

class Probabilidad(Base):
    __tablename__ = "probabilidad"

    id = Column(Integer, primary_key=True, index=True)
    valor = Column(Integer, nullable=False)
    nivel = Column(Text, nullable=False)
    descripcion = Column(Text, nullable=False)
    frecuencia = Column(Text)
