from pydantic import BaseModel, Field
from typing import Optional

class ProbabilidadBase(BaseModel):
    valor: int = Field(..., ge=1, le=5)
    nivel: str = Field(..., min_length=1, max_length=255)
    descripcion: str = Field(..., min_length=1, max_length=255)
    frecuencia: Optional[str] = Field(None, max_length=255)

class ProbabilidadCreate(ProbabilidadBase):
    pass

class ProbabilidadUpdate(ProbabilidadBase):
    valor: Optional[int] = Field(None, ge=1, le=5)
    nivel: Optional[str] = Field(None, min_length=1, max_length=255)
    descripcion: Optional[str] = Field(None, min_length=1, max_length=255)

class ProbabilidadInDB(ProbabilidadBase):
    id: int

    class Config:
        from_attributes = True
