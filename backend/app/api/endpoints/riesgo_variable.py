from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.riesgo_variable import RiesgoVariable
from app.schemas.riesgo_variable import RiesgoVariableCreate, RiesgoVariableUpdate, RiesgoVariableInDB

router = APIRouter()

@router.post("/", response_model=RiesgoVariableInDB)
def create_riesgo_variable(
    riesgo_variable_in: RiesgoVariableCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo riesgo variable
    """
    db_riesgo_variable = RiesgoVariable(**riesgo_variable_in.model_dump())
    db.add(db_riesgo_variable)
    db.commit()
    db.refresh(db_riesgo_variable)
    return db_riesgo_variable

@router.get("/", response_model=List[RiesgoVariableInDB])
def read_riesgos_variables(
    skip: int = 0,
    limit: int = 100,
    tipo: Optional[str] = Query(None),
    amenaza: Optional[str] = Query(None),
    vulnerabilidad: Optional[str] = Query(None),
    riesgo: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de riesgos variables con filtros opcionales
    """
    query = db.query(RiesgoVariable)

    if tipo:
        query = query.filter(RiesgoVariable.tipo == tipo)
    if amenaza:
        query = query.filter(RiesgoVariable.amenaza.ilike(f"%{amenaza}%"))
    if vulnerabilidad:
        query = query.filter(RiesgoVariable.vulnerabilidad.ilike(f"%{vulnerabilidad}%"))
    if riesgo:
        query = query.filter(RiesgoVariable.riesgo.ilike(f"%{riesgo}%"))

    return query.offset(skip).limit(limit).all()

@router.get("/{riesgo_variable_id}", response_model=RiesgoVariableInDB)
def read_riesgo_variable(
    riesgo_variable_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtener un riesgo variable específico por ID
    """
    db_riesgo_variable = db.query(RiesgoVariable).filter(RiesgoVariable.id == riesgo_variable_id).first()
    if db_riesgo_variable is None:
        raise HTTPException(status_code=404, detail="Riesgo variable no encontrado")
    return db_riesgo_variable

@router.put("/{riesgo_variable_id}", response_model=RiesgoVariableInDB)
def update_riesgo_variable(
    riesgo_variable_id: int,
    riesgo_variable_in: RiesgoVariableUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un riesgo variable existente
    """
    db_riesgo_variable = db.query(RiesgoVariable).filter(RiesgoVariable.id == riesgo_variable_id).first()
    if db_riesgo_variable is None:
        raise HTTPException(status_code=404, detail="Riesgo variable no encontrado")

    update_data = riesgo_variable_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_riesgo_variable, field, value)

    db.commit()
    db.refresh(db_riesgo_variable)
    return db_riesgo_variable

@router.delete("/{riesgo_variable_id}", response_model=RiesgoVariableInDB)
def delete_riesgo_variable(
    riesgo_variable_id: int,
    db: Session = Depends(get_db)
):
    """
    Eliminar un riesgo variable
    """
    db_riesgo_variable = db.query(RiesgoVariable).filter(RiesgoVariable.id == riesgo_variable_id).first()
    if db_riesgo_variable is None:
        raise HTTPException(status_code=404, detail="Riesgo variable no encontrado")

    db.delete(db_riesgo_variable)
    db.commit()
    return db_riesgo_variable
