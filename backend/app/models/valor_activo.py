from sqlalchemy import Column, Integer, String, Text

from app.core.database import Base

class ValorActivo(Base):
    __tablename__ = "valor_activo"

    id = Column(Integer, primary_key=True, index=True)
    valor = Column(Integer, nullable=False)
    nivel = Column(Text, nullable=False)
    confidencialidad = Column(Text, nullable=True)
    integridad = Column(Text, nullable=True)
    disponibilidad = Column(Text, nullable=True)
