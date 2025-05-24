from pydantic import BaseModel, Field
from typing import Optional

class TipoControlBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=255)

class TipoControlCreate(TipoControlBase):
    pass

class TipoControlUpdate(TipoControlBase):
    nombre: Optional[str] = Field(None, min_length=1, max_length=255)

class TipoControlInDB(TipoControlBase):
    id: int

    class Config:
        from_attributes = True
