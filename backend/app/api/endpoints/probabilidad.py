from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.probabilidad import Probabilidad
from app.schemas.probabilidad import ProbabilidadCreate, ProbabilidadUpdate, ProbabilidadInDB

router = APIRouter()

@router.post("/", response_model=ProbabilidadInDB)
def create_probabilidad(
    probabilidad_in: ProbabilidadCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo nivel de probabilidad
    """
    db_probabilidad = Probabilidad(**probabilidad_in.model_dump())
    db.add(db_probabilidad)
    db.commit()
    db.refresh(db_probabilidad)
    return db_probabilidad

@router.get("/", response_model=List[ProbabilidadInDB])
def read_probabilidades(
    skip: int = 0,
    limit: int = 100,
    nivel: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de niveles de probabilidad con filtros opcionales
    """
    query = db.query(Probabilidad)
    
    if nivel:
        query = query.filter(Probabilidad.nivel == nivel)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{probabilidad_id}", response_model=ProbabilidadInDB)
def read_probabilidad(
    probabilidad_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener un nivel de probabilidad específico por ID
    """
    db_probabilidad = db.query(Probabilidad).filter(Probabilidad.id == probabilidad_id).first()
    if db_probabilidad is None:
        raise HTTPException(status_code=404, detail="Nivel de probabilidad no encontrado")
    return db_probabilidad

@router.put("/{probabilidad_id}", response_model=ProbabilidadInDB)
def update_probabilidad(
    probabilidad_id: int,
    probabilidad_in: ProbabilidadUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un nivel de probabilidad existente
    """
    db_probabilidad = db.query(Probabilidad).filter(Probabilidad.id == probabilidad_id).first()
    if db_probabilidad is None:
        raise HTTPException(status_code=404, detail="Nivel de probabilidad no encontrado")
    
    update_data = probabilidad_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_probabilidad, field, value)
    
    db.commit()
    db.refresh(db_probabilidad)
    return db_probabilidad

@router.delete("/{probabilidad_id}", response_model=ProbabilidadInDB)
def delete_probabilidad(
    probabilidad_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar un nivel de probabilidad
    """
    db_probabilidad = db.query(Probabilidad).filter(Probabilidad.id == probabilidad_id).first()
    if db_probabilidad is None:
        raise HTTPException(status_code=404, detail="Nivel de probabilidad no encontrado")
    
    db.delete(db_probabilidad)
    db.commit()
    return db_probabilidad
