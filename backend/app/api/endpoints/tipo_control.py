from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.tipo_control import TipoControl
from app.schemas.tipo_control import TipoControlCreate, TipoControlUpdate, TipoControlInDB

router = APIRouter()

@router.post("/", response_model=TipoControlInDB)
def create_tipo_control(
    tipo_control_in: TipoControlCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo tipo de control
    """
    db_tipo_control = TipoControl(**tipo_control_in.model_dump())
    db.add(db_tipo_control)
    db.commit()
    db.refresh(db_tipo_control)
    return db_tipo_control

@router.get("/", response_model=List[TipoControlInDB])
def read_tipos_control(
    skip: int = 0,
    limit: int = 100,
    nombre: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de tipos de control con filtros opcionales
    """
    query = db.query(TipoControl)

    if nombre:
        query = query.filter(TipoControl.nombre.ilike(f"%{nombre}%"))

    return query.offset(skip).limit(limit).all()

@router.get("/{tipo_control_id}", response_model=TipoControlInDB)
def read_tipo_control(
    tipo_control_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener un tipo de control específico por ID
    """
    db_tipo_control = db.query(TipoControl).filter(TipoControl.id == tipo_control_id).first()
    if db_tipo_control is None:
        raise HTTPException(status_code=404, detail="Tipo de control no encontrado")
    return db_tipo_control

@router.put("/{tipo_control_id}", response_model=TipoControlInDB)
def update_tipo_control(
    tipo_control_id: int,
    tipo_control_in: TipoControlUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un tipo de control existente
    """
    db_tipo_control = db.query(TipoControl).filter(TipoControl.id == tipo_control_id).first()
    if db_tipo_control is None:
        raise HTTPException(status_code=404, detail="Tipo de control no encontrado")

    update_data = tipo_control_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_tipo_control, field, value)

    db.commit()
    db.refresh(db_tipo_control)
    return db_tipo_control

@router.delete("/{tipo_control_id}", response_model=TipoControlInDB)
def delete_tipo_control(
    tipo_control_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar un tipo de control
    """
    db_tipo_control = db.query(TipoControl).filter(TipoControl.id == tipo_control_id).first()
    if db_tipo_control is None:
        raise HTTPException(status_code=404, detail="Tipo de control no encontrado")

    db.delete(db_tipo_control)
    db.commit()
    return db_tipo_control
