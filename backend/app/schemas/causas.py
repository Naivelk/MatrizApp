from pydantic import BaseModel, Field
from typing import Optional

class CausaBase(BaseModel):
    descripcion: str
    factor: Optional[str] = Field(None, max_length=255)
    riesgo_id: int

class CausaCreate(CausaBase):
    pass

class CausaUpdate(CausaBase):
    descripcion: Optional[str] = None
    riesgo_id: Optional[int] = None

class CausaInDB(CausaBase):
    id: int
    
    class Config:
        from_attributes = True
