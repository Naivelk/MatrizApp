from fastapi import APIRouter

from app.api.endpoints import (
    contexto,
    riesgo_variable,
    causas,
    valor_activo,
    impacto,
    probabilidad,
    clasificacion_riesgo,
    tipo_control,
    matriz_riesgos
)

api_router = APIRouter()

api_router.include_router(contexto.router, prefix="/contextos", tags=["contextos"])
api_router.include_router(riesgo_variable.router, prefix="/riesgos-variables", tags=["riesgos-variables"])
api_router.include_router(causas.router, prefix="/causas", tags=["causas"])
api_router.include_router(valor_activo.router, prefix="/valores-activos", tags=["valores-activos"])
api_router.include_router(impacto.router, prefix="/impactos", tags=["impactos"])
api_router.include_router(probabilidad.router, prefix="/probabilidades", tags=["probabilidades"])
api_router.include_router(clasificacion_riesgo.router, prefix="/clasificaciones-riesgo", tags=["clasificaciones-riesgo"])
api_router.include_router(tipo_control.router, prefix="/tipos-control", tags=["tipos-control"])
api_router.include_router(matriz_riesgos.router, prefix="/matriz-riesgos", tags=["matriz-riesgos"])
