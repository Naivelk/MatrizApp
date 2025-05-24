from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base

class Causa(Base):
    __tablename__ = "causas"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(Text, nullable=False)
    factor = Column(String(255))
    riesgo_id = Column(Integer, ForeignKey("matriz_riesgos.id", ondelete="CASCADE"))

    # Relación con matriz_riesgos (sin back_populates)
    matriz_riesgo = relationship("MatrizRiesgos")
