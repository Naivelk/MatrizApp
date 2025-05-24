from sqlalchemy import Column, Integer, Text

from app.core.database import Base

class TipoControl(Base):
    __tablename__ = "tipo_control"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(Text, nullable=False)
