from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.valor_activo import ValorActivo
from app.schemas.valor_activo import ValorActivoCreate, ValorActivoUpdate, ValorActivoInDB

router = APIRouter()

@router.post("/", response_model=ValorActivoInDB)
def create_valor_activo(
    valor_activo_in: ValorActivoCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo valor de activo
    """
    db_valor_activo = ValorActivo(**valor_activo_in.model_dump())
    db.add(db_valor_activo)
    db.commit()
    db.refresh(db_valor_activo)
    return db_valor_activo

@router.get("/", response_model=List[ValorActivoInDB])
def read_valores_activos(
    skip: int = 0,
    limit: int = 100,
    nivel: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de valores de activos con filtros opcionales
    """
    query = db.query(ValorActivo)
    
    if nivel:
        query = query.filter(ValorActivo.nivel == nivel)
    
    return query.offset(skip).limit(limit).all()

@router.get("/{valor_activo_id}", response_model=ValorActivoInDB)
def read_valor_activo(
    valor_activo_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener un valor de activo específico por ID
    """
    db_valor_activo = db.query(ValorActivo).filter(ValorActivo.id == valor_activo_id).first()
    if db_valor_activo is None:
        raise HTTPException(status_code=404, detail="Valor de activo no encontrado")
    return db_valor_activo

@router.put("/{valor_activo_id}", response_model=ValorActivoInDB)
def update_valor_activo(
    valor_activo_id: int,
    valor_activo_in: ValorActivoUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un valor de activo existente
    """
    db_valor_activo = db.query(ValorActivo).filter(ValorActivo.id == valor_activo_id).first()
    if db_valor_activo is None:
        raise HTTPException(status_code=404, detail="Valor de activo no encontrado")
    
    update_data = valor_activo_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_valor_activo, field, value)
    
    # Recalcular el valor total
    if hasattr(db_valor_activo, 'confidencialidad') and hasattr(db_valor_activo, 'integridad') and hasattr(db_valor_activo, 'disponibilidad'):
        db_valor_activo.valor_total = (db_valor_activo.confidencialidad + db_valor_activo.integridad + db_valor_activo.disponibilidad) / 3
    
    db.commit()
    db.refresh(db_valor_activo)
    return db_valor_activo

@router.delete("/{valor_activo_id}", response_model=ValorActivoInDB)
def delete_valor_activo(
    valor_activo_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar un valor de activo
    """
    db_valor_activo = db.query(ValorActivo).filter(ValorActivo.id == valor_activo_id).first()
    if db_valor_activo is None:
        raise HTTPException(status_code=404, detail="Valor de activo no encontrado")
    
    db.delete(db_valor_activo)
    db.commit()
    return db_valor_activo
