from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.impacto import Impacto
from app.schemas.impacto import ImpactoCreate, ImpactoUpdate, ImpactoInDB

router = APIRouter()

@router.post("/", response_model=ImpactoInDB)
def create_impacto(
    impacto_in: ImpactoCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo nivel de impacto
    """
    db_impacto = Impacto(**impacto_in.model_dump())
    db.add(db_impacto)
    db.commit()
    db.refresh(db_impacto)
    return db_impacto

@router.get("/", response_model=List[ImpactoInDB])
def read_impactos(
    skip: int = 0,
    limit: int = 100,
    nivel: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de niveles de impacto con filtros opcionales
    """
    query = db.query(Impacto)
    
    if nivel:
        query = query.filter(Impacto.nivel == nivel)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{impacto_id}", response_model=ImpactoInDB)
def read_impacto(
    impacto_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener un nivel de impacto específico por ID
    """
    db_impacto = db.query(Impacto).filter(Impacto.id == impacto_id).first()
    if db_impacto is None:
        raise HTTPException(status_code=404, detail="Nivel de impacto no encontrado")
    return db_impacto

@router.put("/{impacto_id}", response_model=ImpactoInDB)
def update_impacto(
    impacto_id: int,
    impacto_in: ImpactoUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un nivel de impacto existente
    """
    db_impacto = db.query(Impacto).filter(Impacto.id == impacto_id).first()
    if db_impacto is None:
        raise HTTPException(status_code=404, detail="Nivel de impacto no encontrado")
    
    update_data = impacto_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_impacto, field, value)
    
    db.commit()
    db.refresh(db_impacto)
    return db_impacto

@router.delete("/{impacto_id}", response_model=ImpactoInDB)
def delete_impacto(
    impacto_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar un nivel de impacto
    """
    db_impacto = db.query(Impacto).filter(Impacto.id == impacto_id).first()
    if db_impacto is None:
        raise HTTPException(status_code=404, detail="Nivel de impacto no encontrado")
    
    db.delete(db_impacto)
    db.commit()
    return db_impacto
