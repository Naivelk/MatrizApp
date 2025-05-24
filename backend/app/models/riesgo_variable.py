from sqlalchemy import Column, Integer, String, Text

from app.core.database import Base

class RiesgoVariable(Base):
    __tablename__ = "riesgo_variable"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(Text, nullable=False)
    amenaza = Column(Text, nullable=False)
    vulnerabilidad = Column(Text, nullable=False)
    riesgo = Column(Text, nullable=False)
    consecuencia = Column(Text)
