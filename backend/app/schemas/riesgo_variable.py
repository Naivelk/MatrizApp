from pydantic import BaseModel, Field
from typing import Optional

class RiesgoVariableBase(BaseModel):
    tipo: str = Field(..., min_length=1)
    amenaza: str = Field(..., min_length=1)
    vulnerabilidad: str = Field(..., min_length=1)
    riesgo: str = Field(..., min_length=1)
    consecuencia: Optional[str] = None

class RiesgoVariableCreate(RiesgoVariableBase):
    pass

class RiesgoVariableUpdate(RiesgoVariableBase):
    tipo: Optional[str] = Field(None, min_length=1)
    amenaza: Optional[str] = Field(None, min_length=1)
    vulnerabilidad: Optional[str] = Field(None, min_length=1)
    riesgo: Optional[str] = Field(None, min_length=1)

class RiesgoVariableInDB(RiesgoVariableBase):
    id: int

    class Config:
        from_attributes = True
