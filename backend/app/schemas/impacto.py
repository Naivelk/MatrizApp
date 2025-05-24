from pydantic import BaseModel, Field
from typing import Optional

class ImpactoBase(BaseModel):
    nivel: str = Field(..., min_length=1, max_length=255)
    valor: int = Field(..., ge=1, le=5)
    financiero: Optional[str] = None
    continuidad_operativa: Optional[str] = None
    imagen: Optional[str] = None
    legal: Optional[str] = None

class ImpactoCreate(ImpactoBase):
    pass

class ImpactoUpdate(ImpactoBase):
    nivel: Optional[str] = Field(None, min_length=1, max_length=255)
    valor: Optional[int] = Field(None, ge=1, le=5)

class ImpactoInDB(ImpactoBase):
    id: int

    class Config:
        from_attributes = True
