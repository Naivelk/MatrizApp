from pydantic import BaseModel
from typing import Optional, List, Union, Dict, Any
from datetime import date
from uuid import UUID
from decimal import Decimal

class CausaSchema(BaseModel):
    descripcion: str
    factor: Optional[str] = None

class ContextoSchema(BaseModel):
    id: UUID
    institucion: Optional[str] = None
    proceso: Optional[str] = None
    lider: Optional[str] = None
    fecha: Optional[date] = None

class RiesgoVariableSchema(BaseModel):
    id: int
    tipo: str
    amenaza: str
    vulnerabilidad: str
    riesgo: str
    consecuencia: Optional[str] = None  # Corresponde a consecuencia en el modelo

class ImpactoSchema(BaseModel):
    id: int
    nivel: str
    valor: int
    financiero: Optional[str] = None
    continuidad_operativa: Optional[str] = None
    imagen: Optional[str] = None
    legal: Optional[str] = None

class ProbabilidadSchema(BaseModel):
    id: int
    valor: int
    nivel: str
    descripcion: str
    frecuencia: Optional[str] = None

class TipoControlSchema(BaseModel):
    id: int
    nombre: str

class ValorActivoSchema(BaseModel):
    id: int
    nivel: str
    valor: int
    descripcion: Optional[str] = None

class MatrizRiesgosBase(BaseModel):
    fecha: Optional[date] = None
    codigo: Optional[str] = None
    riesgo: Optional[str] = None
    descripcion: Optional[str] = None
    causas: Optional[Union[str, List[CausaSchema]]] = None
    efectos: Optional[str] = None
    afecta_infraestructura: Optional[bool] = None
    activos_afectados: Optional[str] = None
    tipo_activo: Optional[str] = None
    criticidad_activo: Optional[str] = None
    proceso: Optional[str] = None
    propietario: Optional[str] = None
    rol_propietario: Optional[str] = None
    tipo_riesgo: Optional[str] = None
    riesgo_c: Optional[str] = None
    riesgo_i: Optional[str] = None
    riesgo_d: Optional[str] = None
    tipo_impacto: Optional[str] = None
    controles_existentes: Optional[str] = None
    probabilidad_valor: Optional[int] = None
    probabilidad_desc: Optional[str] = None
    impacto_valor: Optional[int] = None
    impacto_desc: Optional[str] = None
    valor_activo: Optional[int] = None
    # nivel_riesgo es un campo calculado por la base de datos, solo lectura
    nivel_riesgo: Optional[int] = None
    zona_riesgo: Optional[str] = None
    se_acepta: Optional[bool] = None
    tratamiento: Optional[str] = None
    opcion_tratamiento: Optional[str] = None
    tipo_control: Optional[str] = None
    tiempo_implementacion: Optional[str] = None
    seguimiento_mensual: Optional[bool] = None
    seguimiento_semestral: Optional[bool] = None
    seguimiento_anual: Optional[bool] = None
    herramienta_control: Optional[bool] = None
    existe_manual: Optional[bool] = None
    calificacion_control: Optional[int] = None
    promedio_controles_preventivos: Optional[Decimal] = None
    cuadrantes_disminuir_probabilidad: Optional[int] = None
    promedio_controles_correctivos: Optional[Decimal] = None
    cuadrantes_disminuir_impacto: Optional[int] = None
    responsable_control: Optional[str] = None
    estado_implementacion: Optional[str] = "Pendiente"

    # Campos adicionales que vienen del frontend
    contexto_id: Optional[str] = None
    riesgo_variable_id: Optional[str] = None
    activo_nombre: Optional[str] = None
    activo_tipo: Optional[str] = None
    activo_descripcion: Optional[str] = None
    activo_propietario: Optional[str] = None
    activo_ubicacion: Optional[str] = None
    valor_activo_id: Optional[str] = None
    impacto_id: Optional[str] = None
    probabilidad_id: Optional[str] = None
    tipo_control_id: Optional[str] = None
    control_descripcion: Optional[str] = None
    plan_tratamiento: Optional[str] = None
    responsable_tratamiento: Optional[str] = None
    fecha_implementacion: Optional[date] = None
    observaciones: Optional[str] = None

class MatrizRiesgosCreate(MatrizRiesgosBase):
    pass

class MatrizRiesgosUpdate(MatrizRiesgosBase):
    pass

class MatrizRiesgosInDB(MatrizRiesgosBase):
    id: int

    class Config:
        from_attributes = True

class MatrizRiesgosExtendido(MatrizRiesgosInDB):
    # Datos relacionados
    contexto: Optional[ContextoSchema] = None
    riesgo_variable: Optional[RiesgoVariableSchema] = None
    impacto_info: Optional[ImpactoSchema] = None
    probabilidad_info: Optional[ProbabilidadSchema] = None
    tipo_control_info: Optional[TipoControlSchema] = None
    valor_activo_info: Optional[ValorActivoSchema] = None
    estado: Optional[str] = None  # Campo calculado para mostrar el estado actual

