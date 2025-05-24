from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import get_db
from app.models.contexto import Contexto
from app.schemas.contexto import ContextoCreate, ContextoUpdate, ContextoInDB

router = APIRouter()

@router.post("/", response_model=ContextoInDB)
def create_contexto(
    contexto_in: ContextoCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo contexto de evaluación de riesgos
    """
    db_contexto = Contexto(**contexto_in.model_dump())
    db.add(db_contexto)
    db.commit()
    db.refresh(db_contexto)
    return db_contexto

@router.get("/", response_model=List[ContextoInDB])
def read_contextos(
    skip: int = 0,
    limit: int = 100,
    institucion: Optional[str] = Query(None),
    proceso: Optional[str] = Query(None),
    lider: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de contextos con filtros opcionales
    """
    query = db.query(Contexto)

    if institucion:
        query = query.filter(Contexto.institucion.ilike(f"%{institucion}%"))
    if proceso:
        query = query.filter(Contexto.proceso.ilike(f"%{proceso}%"))
    if lider:
        query = query.filter(Contexto.lider.ilike(f"%{lider}%"))

    return query.offset(skip).limit(limit).all()

@router.get("/{contexto_id}", response_model=ContextoInDB)
def read_contexto(
    contexto_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Obtener un contexto específico por ID
    """
    db_contexto = db.query(Contexto).filter(Contexto.id == contexto_id).first()
    if db_contexto is None:
        raise HTTPException(status_code=404, detail="Contexto no encontrado")
    return db_contexto

@router.put("/{contexto_id}", response_model=ContextoInDB)
def update_contexto(
    contexto_id: UUID,
    contexto_in: ContextoUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un contexto existente
    """
    db_contexto = db.query(Contexto).filter(Contexto.id == contexto_id).first()
    if db_contexto is None:
        raise HTTPException(status_code=404, detail="Contexto no encontrado")

    update_data = contexto_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_contexto, field, value)

    db.commit()
    db.refresh(db_contexto)
    return db_contexto

@router.delete("/{contexto_id}", response_model=ContextoInDB)
def delete_contexto(
    contexto_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Eliminar un contexto
    """
    db_contexto = db.query(Contexto).filter(Contexto.id == contexto_id).first()
    if db_contexto is None:
        raise HTTPException(status_code=404, detail="Contexto no encontrado")

    db.delete(db_contexto)
    db.commit()
    return db_contexto
