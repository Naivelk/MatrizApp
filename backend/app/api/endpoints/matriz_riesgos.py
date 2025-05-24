from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from uuid import UUID
from datetime import date, datetime

from app.core.database import get_db
from app.models.matriz_riesgos import MatrizRiesgos
from app.models.contexto import Contexto
from app.models.riesgo_variable import RiesgoVariable
from app.models.impacto import Impacto
from app.models.probabilidad import Probabilidad
from app.models.tipo_control import TipoControl
from app.models.valor_activo import ValorActivo
from app.schemas.matriz_riesgos import (
    MatrizRiesgosCreate,
    MatrizRiesgosUpdate,
    MatrizRiesgosInDB,
    MatrizRiesgosExtendido,
    ContextoSchema,
    RiesgoVariableSchema,
    ImpactoSchema,
    ProbabilidadSchema,
    TipoControlSchema,
    ValorActivoSchema
)

router = APIRouter()

@router.post("/", response_model=MatrizRiesgosInDB)
def create_matriz_riesgos(
    matriz_riesgos_in: MatrizRiesgosCreate,
    db: Session = Depends(get_db)
):
    """
    Crear un nuevo registro en la matriz de riesgos
    """
    try:
        # Imprimir los datos recibidos para depuración
        print("Datos recibidos:", matriz_riesgos_in.model_dump())

        # Convertir los datos del frontend al formato esperado por el modelo
        matriz_data = matriz_riesgos_in.model_dump()

        # Procesar el campo causas si es un array
        if "causas" in matriz_data and isinstance(matriz_data["causas"], list):
            # Convertir el array de causas a un string JSON
            import json
            matriz_data["causas"] = json.dumps(matriz_data["causas"])

        # Crear un nuevo objeto MatrizRiesgos
        from datetime import date

        # Asegurarse de que los valores numéricos sean enteros
        probabilidad_valor = int(matriz_data.get("probabilidad_valor", 1)) if matriz_data.get("probabilidad_valor") else 1
        impacto_valor = int(matriz_data.get("impacto_valor", 1)) if matriz_data.get("impacto_valor") else 1

        # El nivel de riesgo se calculará automáticamente en la base de datos
        # Determinar la zona de riesgo
        zona_riesgo = matriz_data.get("zona_riesgo", "BAJA")
        if not zona_riesgo:
            # Calcular temporalmente el nivel de riesgo solo para determinar la zona
            temp_nivel_riesgo = probabilidad_valor * impacto_valor
            zona_riesgo = "BAJA"
            if temp_nivel_riesgo > 5:
                zona_riesgo = "MEDIA"
            if temp_nivel_riesgo > 15:
                zona_riesgo = "ALTA"

        # Procesar la fecha
        fecha_str = matriz_data.get("fecha")
        fecha = None
        if fecha_str:
            try:
                # Intentar convertir la fecha desde formato ISO
                if isinstance(fecha_str, str):
                    fecha = date.fromisoformat(fecha_str)
                else:
                    # Si no es una cadena, usar la fecha actual
                    fecha = date.today()
            except Exception as e:
                print(f"Error al procesar la fecha: {str(e)}")
                fecha = date.today()
        else:
            fecha = date.today()

        # Crear un diccionario con los datos para el nuevo registro
        new_matriz_data = {
            "fecha": fecha,
            "codigo": matriz_data.get("codigo", f"R-{date.today().year}-{date.today().month:02d}"),
            "riesgo": matriz_data.get("riesgo", ""),
            "descripcion": matriz_data.get("descripcion", ""),
            "causas": matriz_data.get("causas", ""),
            "efectos": matriz_data.get("efectos", ""),
            "tipo_activo": matriz_data.get("tipo_activo", ""),
            "proceso": matriz_data.get("proceso", ""),
            "propietario": matriz_data.get("propietario", ""),
            "tipo_riesgo": matriz_data.get("tipo_riesgo", ""),
            "probabilidad_valor": probabilidad_valor,
            "impacto_valor": impacto_valor,
            # NO incluimos nivel_riesgo ya que es una columna generada automáticamente en la base de datos
            "zona_riesgo": zona_riesgo,
            "tratamiento": matriz_data.get("tratamiento", ""),
            "tipo_control": matriz_data.get("tipo_control", ""),
            "responsable_control": matriz_data.get("responsable_control", ""),
            "riesgo_c": matriz_data.get("riesgo_c", "No"),
            "riesgo_i": matriz_data.get("riesgo_i", "No"),
            "riesgo_d": matriz_data.get("riesgo_d", "No"),
            "se_acepta": matriz_data.get("se_acepta", False)
            # Eliminamos el campo "clasificacion" ya que no existe en el modelo MatrizRiesgos
        }

        # Asegurarnos de que nivel_riesgo no esté en el diccionario
        if "nivel_riesgo" in new_matriz_data:
            del new_matriz_data["nivel_riesgo"]

        # Crear un nuevo objeto MatrizRiesgos con los datos mínimos necesarios
        new_matriz_riesgo = MatrizRiesgos(**new_matriz_data)

        # Guardar en la base de datos
        db.add(new_matriz_riesgo)
        db.commit()
        db.refresh(new_matriz_riesgo)

        return new_matriz_riesgo
    except Exception as e:
        # Imprimir el error para depuración
        import traceback
        print("Error al crear matriz de riesgos:", str(e))
        print("Traceback:", traceback.format_exc())
        db.rollback()  # Hacer rollback en caso de error
        raise HTTPException(status_code=500, detail=f"Error al crear matriz de riesgos: {str(e)}")

@router.get("/", response_model=List[MatrizRiesgosExtendido])
def read_matriz_riesgos(
    skip: int = 0,
    limit: int = 100,
    proceso: Optional[str] = Query(None),
    tipo_riesgo: Optional[str] = Query(None),
    propietario: Optional[str] = Query(None),
    zona_riesgo: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Obtener lista de registros de la matriz de riesgos con filtros opcionales
    """
    query = db.query(MatrizRiesgos)

    if proceso:
        query = query.filter(MatrizRiesgos.proceso.ilike(f"%{proceso}%"))
    if tipo_riesgo:
        query = query.filter(MatrizRiesgos.tipo_riesgo.ilike(f"%{tipo_riesgo}%"))
    if propietario:
        query = query.filter(MatrizRiesgos.propietario.ilike(f"%{propietario}%"))
    if zona_riesgo:
        query = query.filter(MatrizRiesgos.zona_riesgo.ilike(f"%{zona_riesgo}%"))

    # Obtener los registros de la matriz de riesgos
    matriz_riesgos_list = query.offset(skip).limit(limit).all()

    # Crear una lista para almacenar los resultados con datos relacionados
    result = []

    # Para cada registro de la matriz de riesgos, obtener los datos relacionados
    for matriz_riesgo in matriz_riesgos_list:
        # Convertir el registro a un diccionario
        matriz_dict = {c.name: getattr(matriz_riesgo, c.name) for c in matriz_riesgo.__table__.columns}

        # Calcular el nivel de riesgo si no está presente o es nulo
        if matriz_dict.get('nivel_riesgo') is None and matriz_dict.get('probabilidad_valor') is not None and matriz_dict.get('impacto_valor') is not None:
            matriz_dict['nivel_riesgo'] = matriz_dict['probabilidad_valor'] * matriz_dict['impacto_valor']

        # Crear un objeto MatrizRiesgosExtendido
        matriz_extendido = MatrizRiesgosExtendido(**matriz_dict)

        # Obtener los datos relacionados si existen los IDs
        try:
            # Contexto
            if matriz_riesgo.contexto_id:
                contexto = db.query(Contexto).filter(Contexto.id == matriz_riesgo.contexto_id).first()
                if contexto:
                    matriz_extendido.contexto = ContextoSchema(
                        id=contexto.id,
                        institucion=contexto.institucion,
                        proceso=contexto.proceso,
                        lider=contexto.lider,
                        fecha=contexto.fecha
                    )

            # RiesgoVariable
            if matriz_riesgo.riesgo_variable_id:
                riesgo_variable = db.query(RiesgoVariable).filter(RiesgoVariable.id == matriz_riesgo.riesgo_variable_id).first()
                if riesgo_variable:
                    matriz_extendido.riesgo_variable = RiesgoVariableSchema(
                        id=riesgo_variable.id,
                        tipo=str(riesgo_variable.tipo.value) if hasattr(riesgo_variable.tipo, 'value') else str(riesgo_variable.tipo),
                        amenaza=riesgo_variable.amenaza,
                        vulnerabilidad=riesgo_variable.vulnerabilidad,
                        riesgo=riesgo_variable.riesgo,
                        consecuencia=riesgo_variable.consecuencia
                    )

            # Impacto
            if matriz_riesgo.impacto_id:
                impacto = db.query(Impacto).filter(Impacto.id == matriz_riesgo.impacto_id).first()
                if impacto:
                    matriz_extendido.impacto_info = ImpactoSchema(
                        id=impacto.id,
                        nivel=impacto.nivel,
                        valor=impacto.valor,
                        financiero=impacto.financiero,
                        continuidad_operativa=impacto.continuidad_operativa,
                        imagen=impacto.imagen,
                        legal=impacto.legal
                    )

            # Probabilidad
            if matriz_riesgo.probabilidad_id:
                probabilidad = db.query(Probabilidad).filter(Probabilidad.id == matriz_riesgo.probabilidad_id).first()
                if probabilidad:
                    matriz_extendido.probabilidad_info = ProbabilidadSchema(
                        id=probabilidad.id,
                        valor=probabilidad.valor,
                        nivel=probabilidad.nivel,
                        descripcion=probabilidad.descripcion,
                        frecuencia=probabilidad.frecuencia
                    )

            # TipoControl
            if matriz_riesgo.tipo_control_id:
                tipo_control = db.query(TipoControl).filter(TipoControl.id == matriz_riesgo.tipo_control_id).first()
                if tipo_control:
                    matriz_extendido.tipo_control_info = TipoControlSchema(
                        id=tipo_control.id,
                        nombre=tipo_control.nombre
                    )

            # ValorActivo
            if matriz_riesgo.valor_activo_id:
                valor_activo = db.query(ValorActivo).filter(ValorActivo.id == matriz_riesgo.valor_activo_id).first()
                if valor_activo:
                    matriz_extendido.valor_activo_info = ValorActivoSchema(
                        id=valor_activo.id,
                        nivel=valor_activo.nivel,
                        valor=valor_activo.valor,
                        descripcion=valor_activo.descripcion
                    )

            # Estado
            matriz_extendido.estado = matriz_riesgo.estado_implementacion or "Pendiente"

        except Exception as e:
            import traceback
            print(f"Error al obtener datos relacionados: {str(e)}")
            print("Traceback:", traceback.format_exc())

        # Agregar el objeto a la lista de resultados
        result.append(matriz_extendido)

    return result

@router.get("/{matriz_riesgos_id}", response_model=MatrizRiesgosExtendido)
def read_matriz_riesgos_item(
    matriz_riesgos_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Obtener un registro específico de la matriz de riesgos por ID
    """
    matriz_riesgo = db.query(MatrizRiesgos).filter(MatrizRiesgos.id == matriz_riesgos_id).first()
    if matriz_riesgo is None:
        raise HTTPException(status_code=404, detail="Registro de matriz de riesgos no encontrado")

    # Convertir el registro a un diccionario
    matriz_dict = {c.name: getattr(matriz_riesgo, c.name) for c in matriz_riesgo.__table__.columns}

    # Calcular el nivel de riesgo si no está presente o es nulo
    if matriz_dict.get('nivel_riesgo') is None and matriz_dict.get('probabilidad_valor') is not None and matriz_dict.get('impacto_valor') is not None:
        matriz_dict['nivel_riesgo'] = matriz_dict['probabilidad_valor'] * matriz_dict['impacto_valor']

    # Crear un objeto MatrizRiesgosExtendido
    matriz_extendido = MatrizRiesgosExtendido(**matriz_dict)

    # Obtener los datos relacionados si existen los IDs
    try:
        # Contexto
        if matriz_riesgo.contexto_id:
            contexto = db.query(Contexto).filter(Contexto.id == matriz_riesgo.contexto_id).first()
            if contexto:
                matriz_extendido.contexto = ContextoSchema(
                    id=contexto.id,
                    institucion=contexto.institucion,
                    proceso=contexto.proceso,
                    lider=contexto.lider,
                    fecha=contexto.fecha
                )

        # RiesgoVariable
        if matriz_riesgo.riesgo_variable_id:
            riesgo_variable = db.query(RiesgoVariable).filter(RiesgoVariable.id == matriz_riesgo.riesgo_variable_id).first()
            if riesgo_variable:
                matriz_extendido.riesgo_variable = RiesgoVariableSchema(
                    id=riesgo_variable.id,
                    tipo=str(riesgo_variable.tipo.value) if hasattr(riesgo_variable.tipo, 'value') else str(riesgo_variable.tipo),
                    amenaza=riesgo_variable.amenaza,
                    vulnerabilidad=riesgo_variable.vulnerabilidad,
                    riesgo=riesgo_variable.riesgo,
                    consecuencia=riesgo_variable.consecuencia
                )

        # Impacto
        if matriz_riesgo.impacto_id:
            impacto = db.query(Impacto).filter(Impacto.id == matriz_riesgo.impacto_id).first()
            if impacto:
                matriz_extendido.impacto_info = ImpactoSchema(
                    id=impacto.id,
                    nivel=impacto.nivel,
                    valor=impacto.valor,
                    financiero=impacto.financiero,
                    continuidad_operativa=impacto.continuidad_operativa,
                    imagen=impacto.imagen,
                    legal=impacto.legal
                )

        # Probabilidad
        if matriz_riesgo.probabilidad_id:
            probabilidad = db.query(Probabilidad).filter(Probabilidad.id == matriz_riesgo.probabilidad_id).first()
            if probabilidad:
                matriz_extendido.probabilidad_info = ProbabilidadSchema(
                    id=probabilidad.id,
                    valor=probabilidad.valor,
                    nivel=probabilidad.nivel,
                    descripcion=probabilidad.descripcion,
                    frecuencia=probabilidad.frecuencia
                )

        # TipoControl
        if matriz_riesgo.tipo_control_id:
            tipo_control = db.query(TipoControl).filter(TipoControl.id == matriz_riesgo.tipo_control_id).first()
            if tipo_control:
                matriz_extendido.tipo_control_info = TipoControlSchema(
                    id=tipo_control.id,
                    nombre=tipo_control.nombre
                )

        # ValorActivo
        if matriz_riesgo.valor_activo_id:
            valor_activo = db.query(ValorActivo).filter(ValorActivo.id == matriz_riesgo.valor_activo_id).first()
            if valor_activo:
                matriz_extendido.valor_activo_info = ValorActivoSchema(
                    id=valor_activo.id,
                    nivel=valor_activo.nivel,
                    valor=valor_activo.valor,
                    descripcion=valor_activo.descripcion
                )

        # Estado
        matriz_extendido.estado = matriz_riesgo.estado_implementacion or "Pendiente"

    except Exception as e:
        import traceback
        print(f"Error al obtener datos relacionados: {str(e)}")
        print("Traceback:", traceback.format_exc())

    return matriz_extendido

@router.put("/{matriz_riesgos_id}", response_model=MatrizRiesgosInDB)
def update_matriz_riesgos(
    matriz_riesgos_id: UUID,
    matriz_riesgos_in: MatrizRiesgosUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualizar un registro existente en la matriz de riesgos
    """
    try:
        db_matriz_riesgos = db.query(MatrizRiesgos).filter(MatrizRiesgos.id == matriz_riesgos_id).first()
        if db_matriz_riesgos is None:
            raise HTTPException(status_code=404, detail="Registro de matriz de riesgos no encontrado")

        # Actualizar los campos básicos
        update_data = matriz_riesgos_in.model_dump(exclude_unset=True)

        # Imprimir los datos recibidos para depuración
        print("Datos recibidos para actualización:", update_data)
        print("Estado de implementación recibido:", update_data.get("estado_implementacion", "No presente"))

        # Asegurarse de que nivel_riesgo no esté en los datos de actualización
        if "nivel_riesgo" in update_data:
            del update_data["nivel_riesgo"]

        # Actualizar los campos
        for field, value in update_data.items():
            setattr(db_matriz_riesgos, field, value)

        # Imprimir el estado de implementación después de actualizar los campos
        print("Estado de implementación después de actualizar:", db_matriz_riesgos.estado_implementacion)

        # Calcular la zona de riesgo si se actualizó probabilidad o impacto
        if "probabilidad_valor" in update_data or "impacto_valor" in update_data:
            # Obtener los valores actuales
            probabilidad_valor = db_matriz_riesgos.probabilidad_valor or 1
            impacto_valor = db_matriz_riesgos.impacto_valor or 1

            # Determinar la zona de riesgo basada en el nivel de riesgo calculado
            temp_nivel_riesgo = probabilidad_valor * impacto_valor
            zona_riesgo = "BAJA"
            if temp_nivel_riesgo > 5:
                zona_riesgo = "MEDIA"
            if temp_nivel_riesgo > 15:
                zona_riesgo = "ALTA"

            # Actualizar la zona de riesgo solo si no es un estado de implementación
            if db_matriz_riesgos.zona_riesgo not in ["Pendiente", "En Proceso", "Implementado"]:
                db_matriz_riesgos.zona_riesgo = zona_riesgo

        db.commit()
        db.refresh(db_matriz_riesgos)
        return db_matriz_riesgos
    except Exception as e:
        # Imprimir el error para depuración
        import traceback
        print("Error al actualizar matriz de riesgos:", str(e))
        print("Traceback:", traceback.format_exc())
        db.rollback()  # Hacer rollback en caso de error
        raise HTTPException(status_code=500, detail=f"Error al actualizar matriz de riesgos: {str(e)}")

@router.delete("/{matriz_riesgos_id}", response_model=MatrizRiesgosInDB)
def delete_matriz_riesgos(
    matriz_riesgos_id: UUID,
    db: Session = Depends(get_db)
):
    """
    Eliminar un registro de la matriz de riesgos
    """
    db_matriz_riesgos = db.query(MatrizRiesgos).filter(MatrizRiesgos.id == matriz_riesgos_id).first()
    if db_matriz_riesgos is None:
        raise HTTPException(status_code=404, detail="Registro de matriz de riesgos no encontrado")

    db.delete(db_matriz_riesgos)
    db.commit()
    return db_matriz_riesgos
