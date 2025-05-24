from sqlalchemy.orm import Session
from app.models.clasificacion_riesgo import ClasificacionRiesgo

def obtener_clasificacion_riesgo(db: Session, nivel_riesgo: int) -> int:
    """
    Obtiene la clasificación del riesgo según el nivel de riesgo calculado
    """
    clasificacion = db.query(ClasificacionRiesgo).filter(
        ClasificacionRiesgo.limite_inferior <= nivel_riesgo,
        ClasificacionRiesgo.limite_superior >= nivel_riesgo
    ).first()

    if not clasificacion:
        # Si no se encuentra una clasificación, buscar la más alta
        clasificacion = db.query(ClasificacionRiesgo).order_by(
            ClasificacionRiesgo.limite_superior.desc()
        ).first()

    return clasificacion.id if clasificacion else None
