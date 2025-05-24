from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.clasificacion_riesgo import ClasificacionRiesgo
from app.schemas.clasificacion_riesgo import ClasificacionRiesgoCreate, ClasificacionRiesgoUpdate, ClasificacionRiesgoInDB

router = APIRouter()

@router.post("/", response_model=ClasificacionRiesgoInDB)
def create_clasificacion_riesgo(
    clasificacion_riesgo_in: ClasificacionRiesgoCreate,
    db: Session = Depends(get_db)
):
    """
    Crear una nueva clasificación de riesgo
    """
    db_clasificacion_riesgo = ClasificacionRiesgo(**clasificacion_riesgo_in.model_dump())
    db.add(db_clasificacion_riesgo)
    db.commit()
    db.refresh(db_clasificacion_riesgo)
    return db_clasificacion_riesgo

@router.get("/", response_model=List[ClasificacionRiesgoInDB])
def read_clasificaciones_riesgo(
    skip: int = 0,
    limit: int = 100,
    nivel: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de clasificaciones de riesgo con filtros opcionales
    """
    query = db.query(ClasificacionRiesgo)

    if nivel:
        query = query.filter(ClasificacionRiesgo.nivel.ilike(f"%{nivel}%"))

    return query.offset(skip).limit(limit).all()

@router.get("/{clasificacion_riesgo_id}", response_model=ClasificacionRiesgoInDB)
def read_clasificacion_riesgo(
    clasificacion_riesgo_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener una clasificación de riesgo específica por ID
    """
    db_clasificacion_riesgo = db.query(ClasificacionRiesgo).filter(ClasificacionRiesgo.id == clasificacion_riesgo_id).first()
    if db_clasificacion_riesgo is None:
        raise HTTPException(status_code=404, detail="Clasificación de riesgo no encontrada")
    return db_clasificacion_riesgo

@router.put("/{clasificacion_riesgo_id}", response_model=ClasificacionRiesgoInDB)
def update_clasificacion_riesgo(
    clasificacion_riesgo_id: int,
    clasificacion_riesgo_in: ClasificacionRiesgoUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar una clasificación de riesgo existente
    """
    db_clasificacion_riesgo = db.query(ClasificacionRiesgo).filter(ClasificacionRiesgo.id == clasificacion_riesgo_id).first()
    if db_clasificacion_riesgo is None:
        raise HTTPException(status_code=404, detail="Clasificación de riesgo no encontrada")

    update_data = clasificacion_riesgo_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_clasificacion_riesgo, field, value)

    db.commit()
    db.refresh(db_clasificacion_riesgo)
    return db_clasificacion_riesgo

@router.delete("/{clasificacion_riesgo_id}", response_model=ClasificacionRiesgoInDB)
def delete_clasificacion_riesgo(
    clasificacion_riesgo_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar una clasificación de riesgo
    """
    db_clasificacion_riesgo = db.query(ClasificacionRiesgo).filter(ClasificacionRiesgo.id == clasificacion_riesgo_id).first()
    if db_clasificacion_riesgo is None:
        raise HTTPException(status_code=404, detail="Clasificación de riesgo no encontrada")

    db.delete(db_clasificacion_riesgo)
    db.commit()
    return db_clasificacion_riesgo
