from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, DateTime, Boolean, Date, Numeric
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declared_attr

from app.core.database import Base

class MatrizRiesgos(Base):
    __tablename__ = "matriz_riesgos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fecha = Column(Date)
    codigo = Column(Text)
    riesgo = Column(Text)
    descripcion = Column(Text)
    causas = Column(Text)
    efectos = Column(Text)
    afecta_infraestructura = Column(Boolean)
    activos_afectados = Column(Text)
    tipo_activo = Column(Text)
    criticidad_activo = Column(Text)
    proceso = Column(Text)
    propietario = Column(Text)
    rol_propietario = Column(Text)
    tipo_riesgo = Column(Text)
    riesgo_c = Column(Text)
    riesgo_i = Column(Text)
    riesgo_d = Column(Text)
    tipo_impacto = Column(Text)
    controles_existentes = Column(Text)
    probabilidad_valor = Column(Integer)
    probabilidad_desc = Column(Text)
    impacto_valor = Column(Integer)
    impacto_desc = Column(Text)
    valor_activo = Column(Integer)
    # La columna nivel_riesgo es generada automáticamente por la base de datos
    # No la incluimos en el modelo para evitar que SQLAlchemy intente insertarla
    zona_riesgo = Column(Text)
    se_acepta = Column(Boolean)
    tratamiento = Column(Text)
    opcion_tratamiento = Column(Text)
    tipo_control = Column(Text)
    tiempo_implementacion = Column(Text)
    seguimiento_mensual = Column(Boolean)
    seguimiento_semestral = Column(Boolean)
    seguimiento_anual = Column(Boolean)
    herramienta_control = Column(Boolean)
    existe_manual = Column(Boolean)
    calificacion_control = Column(Integer)
    promedio_controles_preventivos = Column(Numeric)
    cuadrantes_disminuir_probabilidad = Column(Integer)
    promedio_controles_correctivos = Column(Numeric)
    cuadrantes_disminuir_impacto = Column(Integer)
    responsable_control = Column(Text)
    estado_implementacion = Column(Text, default="Pendiente")

    # Método para excluir nivel_riesgo de la inserción
    def __init__(self, **kwargs):
        # Siempre eliminar nivel_riesgo de los kwargs para evitar que se intente insertar
        if 'nivel_riesgo' in kwargs:
            del kwargs['nivel_riesgo']

        super(MatrizRiesgos, self).__init__(**kwargs)
