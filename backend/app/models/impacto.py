from sqlalchemy import Column, Integer, Text

from app.core.database import Base

class Impacto(Base):
    __tablename__ = "impacto"

    id = Column(Integer, primary_key=True, index=True)
    nivel = Column(Text, nullable=False)
    valor = Column(Integer, nullable=False)
    financiero = Column(Text)
    continuidad_operativa = Column(Text)
    imagen = Column(Text)
    legal = Column(Text)
