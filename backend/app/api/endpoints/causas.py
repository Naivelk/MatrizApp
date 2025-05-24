from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.causas import Causa
from app.schemas.causas import CausaCreate, CausaUpdate, CausaInDB

router = APIRouter()

@router.post("/", response_model=CausaInDB)
def create_causa(
    causa_in: CausaCreate,
    db: Session = Depends(get_db)
):
    """
    Crear una nueva causa
    """
    db_causa = Causa(**causa_in.model_dump())
    db.add(db_causa)
    db.commit()
    db.refresh(db_causa)
    return db_causa

@router.get("/", response_model=List[CausaInDB])
def read_causas(
    skip: int = 0,
    limit: int = 100,
    riesgo_id: Optional[int] = Query(None),
    factor: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de causas con filtros opcionales
    """
    query = db.query(Causa)
    
    if riesgo_id:
        query = query.filter(Causa.riesgo_id == riesgo_id)
    if factor:
        query = query.filter(Causa.factor.ilike(f"%{factor}%"))
    
    return query.offset(skip).limit(limit).all()

@router.get("/{causa_id}", response_model=CausaInDB)
def read_causa(
    causa_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener una causa específica por ID
    """
    db_causa = db.query(Causa).filter(Causa.id == causa_id).first()
    if db_causa is None:
        raise HTTPException(status_code=404, detail="Causa no encontrada")
    return db_causa

@router.put("/{causa_id}", response_model=CausaInDB)
def update_causa(
    causa_id: int,
    causa_in: CausaUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar una causa existente
    """
    db_causa = db.query(Causa).filter(Causa.id == causa_id).first()
    if db_causa is None:
        raise HTTPException(status_code=404, detail="Causa no encontrada")
    
    update_data = causa_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_causa, field, value)
    
    db.commit()
    db.refresh(db_causa)
    return db_causa

@router.delete("/{causa_id}", response_model=CausaInDB)
def delete_causa(
    causa_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar una causa
    """
    db_causa = db.query(Causa).filter(Causa.id == causa_id).first()
    if db_causa is None:
        raise HTTPException(status_code=404, detail="Causa no encontrada")
    
    db.delete(db_causa)
    db.commit()
    return db_causa
