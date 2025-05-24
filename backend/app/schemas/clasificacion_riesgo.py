from pydantic import BaseModel, Field
from typing import Optional

class ClasificacionRiesgoBase(BaseModel):
    limite_inferior: Optional[int] = None
    limite_superior: Optional[int] = None
    nivel: Optional[str] = None
    respuesta: Optional[str] = None
    descripcion: Optional[str] = None
    tratamiento: Optional[str] = None
    rol: Optional[str] = None

class ClasificacionRiesgoCreate(ClasificacionRiesgoBase):
    pass

class ClasificacionRiesgoUpdate(ClasificacionRiesgoBase):
    pass

class ClasificacionRiesgoInDB(ClasificacionRiesgoBase):
    id: int

    class Config:
        from_attributes = True
