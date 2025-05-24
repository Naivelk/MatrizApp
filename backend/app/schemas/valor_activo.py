from pydantic import BaseModel, Field
from typing import Optional

class ValorActivoBase(BaseModel):
    valor: int = Field(..., ge=1, le=5)
    nivel: str = Field(..., min_length=1, max_length=255)
    confidencialidad: Optional[str] = None
    integridad: Optional[str] = None
    disponibilidad: Optional[str] = None

class ValorActivoCreate(ValorActivoBase):
    pass

class ValorActivoUpdate(ValorActivoBase):
    valor: Optional[int] = Field(None, ge=1, le=5)
    nivel: Optional[str] = Field(None, min_length=1, max_length=255)
    confidencialidad: Optional[str] = None
    integridad: Optional[str] = None
    disponibilidad: Optional[str] = None

class ValorActivoInDB(ValorActivoBase):
    id: int

    class Config:
        from_attributes = True
