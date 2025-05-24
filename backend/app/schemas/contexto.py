from pydantic import BaseModel, Field
from typing import Optional
from datetime import date
from uuid import UUID

class ContextoBase(BaseModel):
    institucion: Optional[str] = None
    proceso: Optional[str] = None
    lider: Optional[str] = None
    fecha: Optional[date] = None
    objetivo: Optional[str] = None
    alcance: Optional[str] = None
    enfoque_metodologico: Optional[str] = None
    criterios_valoracion: Optional[str] = None
    criterios_probabilidad: Optional[str] = None

class ContextoCreate(ContextoBase):
    pass

class ContextoUpdate(ContextoBase):
    pass

class ContextoInDB(ContextoBase):
    id: UUID

    class Config:
        from_attributes = True
