#!/usr/bin/env python3
"""
Script para insertar datos de ejemplo realistas en la matriz de riesgos
Este script es seguro porque solo agrega datos, no modifica la estructura existente
"""

import sys
import os
from datetime import date, datetime
import json

# Agregar el directorio padre al path para importar los módulos de la aplicación
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine
from app.models.matriz_riesgos import MatrizRiesgos
from app.models.impacto import Impacto
from app.models.probabilidad import Probabilidad
from app.models.clasificacion_riesgo import ClasificacionRiesgo
from app.models.tipo_control import TipoControl
from app.models.valor_activo import ValorActivo
from app.models.contexto import Contexto

def create_sample_data():
    """Crear datos de ejemplo realistas para la demostración"""
    db = SessionLocal()

    try:
        print("🚀 Iniciando inserción de datos de ejemplo...")

        # 1. Primero verificar y crear datos de configuración básicos
        print("📊 Verificando datos de configuración...")

        # Verificar Impactos
        if db.query(Impacto).count() == 0:
            print("   Creando niveles de impacto...")
            impactos = [
                {"nivel": "Insignificante", "valor": 1, "financiero": "< $10,000", "continuidad_operativa": "Sin interrupción", "imagen": "Sin impacto", "legal": "Sin consecuencias"},
                {"nivel": "Menor", "valor": 2, "financiero": "$10,000 - $50,000", "continuidad_operativa": "< 4 horas", "imagen": "Impacto local", "legal": "Multas menores"},
                {"nivel": "Moderado", "valor": 3, "financiero": "$50,000 - $200,000", "continuidad_operativa": "4 - 24 horas", "imagen": "Impacto regional", "legal": "Sanciones moderadas"},
                {"nivel": "Mayor", "valor": 4, "financiero": "$200,000 - $1,000,000", "continuidad_operativa": "1 - 7 días", "imagen": "Impacto nacional", "legal": "Sanciones graves"},
                {"nivel": "Catastrófico", "valor": 5, "financiero": "> $1,000,000", "continuidad_operativa": "> 7 días", "imagen": "Impacto internacional", "legal": "Consecuencias legales severas"}
            ]
            for imp in impactos:
                db.add(Impacto(**imp))

        # Verificar Probabilidades
        if db.query(Probabilidad).count() == 0:
            print("   Creando niveles de probabilidad...")
            probabilidades = [
                {"valor": 1, "nivel": "Raro", "descripcion": "Puede ocurrir en circunstancias excepcionales", "frecuencia": "< 1 vez al año"},
                {"valor": 2, "nivel": "Improbable", "descripcion": "Podría ocurrir en algún momento", "frecuencia": "1-2 veces al año"},
                {"valor": 3, "nivel": "Posible", "descripcion": "Podría ocurrir ocasionalmente", "frecuencia": "1 vez al mes"},
                {"valor": 4, "nivel": "Probable", "descripcion": "Probablemente ocurrirá", "frecuencia": "1 vez a la semana"},
                {"valor": 5, "nivel": "Casi Seguro", "descripcion": "Se espera que ocurra", "frecuencia": "Diariamente"}
            ]
            for prob in probabilidades:
                db.add(Probabilidad(**prob))

        # Verificar Clasificaciones de Riesgo
        if db.query(ClasificacionRiesgo).count() == 0:
            print("   Creando clasificaciones de riesgo...")
            clasificaciones = [
                {"limite_inferior": 1, "limite_superior": 4, "nivel": "Bajo", "respuesta": "Aceptar", "descripcion": "Riesgo tolerable", "tratamiento": "Monitoreo", "rol": "Supervisor"},
                {"limite_inferior": 5, "limite_superior": 9, "nivel": "Medio", "respuesta": "Mitigar", "descripcion": "Riesgo que requiere atención", "tratamiento": "Controles adicionales", "rol": "Gerente"},
                {"limite_inferior": 10, "limite_superior": 15, "nivel": "Alto", "respuesta": "Tratar", "descripcion": "Riesgo significativo", "tratamiento": "Plan de acción inmediato", "rol": "Director"},
                {"limite_inferior": 16, "limite_superior": 25, "nivel": "Crítico", "respuesta": "Evitar", "descripcion": "Riesgo inaceptable", "tratamiento": "Acción inmediata requerida", "rol": "CEO"}
            ]
            for clas in clasificaciones:
                db.add(ClasificacionRiesgo(**clas))

        # Verificar Tipos de Control
        if db.query(TipoControl).count() == 0:
            print("   Creando tipos de control...")
            tipos_control = [
                {"nombre": "Preventivo"},
                {"nombre": "Detectivo"},
                {"nombre": "Correctivo"},
                {"nombre": "Compensatorio"}
            ]
            for tipo in tipos_control:
                db.add(TipoControl(**tipo))

        # Verificar Valores de Activo
        if db.query(ValorActivo).count() == 0:
            print("   Creando valores de activo...")
            valores_activo = [
                {"nivel": "Público", "valor": 1, "descripcion": "Información de dominio público"},
                {"nivel": "Interno", "valor": 2, "descripcion": "Información de uso interno"},
                {"nivel": "Confidencial", "valor": 3, "descripcion": "Información confidencial"},
                {"nivel": "Restringido", "valor": 4, "descripcion": "Información altamente sensible"},
                {"nivel": "Secreto", "valor": 5, "descripcion": "Información de máxima seguridad"}
            ]
            for val in valores_activo:
                db.add(ValorActivo(**val))

        # Verificar Contextos
        if db.query(Contexto).count() == 0:
            print("   Creando contextos organizacionales...")
            contextos = [
                {"institucion": "TechCorp S.A.S", "proceso": "Gestión de TI", "lider": "Juan Pérez", "fecha": date.today()},
                {"institucion": "TechCorp S.A.S", "proceso": "Recursos Humanos", "lider": "María García", "fecha": date.today()},
                {"institucion": "TechCorp S.A.S", "proceso": "Finanzas", "lider": "Carlos López", "fecha": date.today()}
            ]
            for ctx in contextos:
                db.add(Contexto(**ctx))

        # Commit de datos de configuración
        db.commit()
        print("✅ Datos de configuración creados exitosamente")

        # 2. Crear riesgos de ejemplo realistas
        print("🎯 Creando riesgos de ejemplo...")

        # Verificar si ya existen riesgos
        if db.query(MatrizRiesgos).count() > 0:
            print("   Ya existen riesgos en la base de datos. Saltando inserción...")
            return

        riesgos_ejemplo = [
            {
                "fecha": date.today(),
                "codigo": "R-2024-001",
                "riesgo": "Falla del servidor principal",
                "descripcion": "Interrupción del servicio por falla de hardware del servidor principal",
                "causas": "Envejecimiento del hardware, falta de mantenimiento preventivo",
                "efectos": "Pérdida de productividad, insatisfacción del cliente, pérdidas económicas",
                "tipo_activo": "Servidor",
                "proceso": "Gestión de TI",
                "propietario": "Juan Pérez",
                "tipo_riesgo": "Tecnológico",
                "probabilidad_valor": 3,
                "probabilidad_desc": "Posible",
                "impacto_valor": 4,
                "impacto_desc": "Mayor",
                "zona_riesgo": "Alto",
                "tratamiento": "Implementar redundancia de servidores y plan de mantenimiento",
                "tipo_control": "Preventivo",
                "estado_implementacion": "En Proceso"
            },
            {
                "fecha": date.today(),
                "codigo": "R-2024-002",
                "riesgo": "Ataque de ransomware",
                "descripcion": "Cifrado malicioso de archivos críticos por software malicioso",
                "causas": "Falta de capacitación en ciberseguridad, sistemas desactualizados",
                "efectos": "Pérdida de datos, paralización de operaciones, daño reputacional",
                "tipo_activo": "Base de Datos",
                "proceso": "Gestión de TI",
                "propietario": "Juan Pérez",
                "tipo_riesgo": "Ciberseguridad",
                "probabilidad_valor": 4,
                "probabilidad_desc": "Probable",
                "impacto_valor": 5,
                "impacto_desc": "Catastrófico",
                "zona_riesgo": "Crítico",
                "tratamiento": "Implementar backup automático, antivirus empresarial y capacitación",
                "tipo_control": "Preventivo",
                "estado_implementacion": "Pendiente"
            },
            {
                "fecha": date.today(),
                "codigo": "R-2024-003",
                "riesgo": "Rotación alta de personal clave",
                "descripcion": "Pérdida de conocimiento crítico por salida de empleados especializados",
                "causas": "Falta de plan de carrera, salarios no competitivos, ambiente laboral",
                "efectos": "Pérdida de conocimiento, retrasos en proyectos, costos de reclutamiento",
                "tipo_activo": "Recurso Humano",
                "proceso": "Recursos Humanos",
                "propietario": "María García",
                "tipo_riesgo": "Operacional",
                "probabilidad_valor": 3,
                "probabilidad_desc": "Posible",
                "impacto_valor": 3,
                "impacto_desc": "Moderado",
                "zona_riesgo": "Medio",
                "tratamiento": "Programa de retención, documentación de procesos, plan de sucesión",
                "tipo_control": "Preventivo",
                "estado_implementacion": "Implementado"
            },
            {
                "fecha": date.today(),
                "codigo": "R-2024-004",
                "riesgo": "Fraude financiero interno",
                "descripcion": "Manipulación de registros financieros por personal interno",
                "causas": "Controles internos débiles, falta de segregación de funciones",
                "efectos": "Pérdidas económicas, problemas legales, daño reputacional",
                "tipo_activo": "Sistema Financiero",
                "proceso": "Finanzas",
                "propietario": "Carlos López",
                "tipo_riesgo": "Financiero",
                "probabilidad_valor": 2,
                "probabilidad_desc": "Improbable",
                "impacto_valor": 4,
                "impacto_desc": "Mayor",
                "zona_riesgo": "Medio",
                "tratamiento": "Implementar controles de autorización dual y auditorías regulares",
                "tipo_control": "Detectivo",
                "estado_implementacion": "En Proceso"
            },
            {
                "fecha": date.today(),
                "codigo": "R-2024-005",
                "riesgo": "Incumplimiento normativo GDPR",
                "descripcion": "Violación de regulaciones de protección de datos personales",
                "causas": "Falta de políticas de privacidad, personal no capacitado",
                "efectos": "Multas regulatorias, demandas legales, pérdida de confianza",
                "tipo_activo": "Datos Personales",
                "proceso": "Gestión de TI",
                "propietario": "Juan Pérez",
                "tipo_riesgo": "Legal/Regulatorio",
                "probabilidad_valor": 3,
                "probabilidad_desc": "Posible",
                "impacto_valor": 4,
                "impacto_desc": "Mayor",
                "zona_riesgo": "Alto",
                "tratamiento": "Implementar políticas GDPR y capacitación en privacidad",
                "tipo_control": "Preventivo",
                "estado_implementacion": "Pendiente"
            },
            {
                "fecha": date.today(),
                "codigo": "R-2024-006",
                "riesgo": "Interrupción del suministro eléctrico",
                "descripcion": "Corte prolongado de energía eléctrica en las instalaciones",
                "causas": "Fallas en la red eléctrica, mantenimiento no programado",
                "efectos": "Paralización de operaciones, pérdida de datos no guardados",
                "tipo_activo": "Infraestructura",
                "proceso": "Gestión de TI",
                "propietario": "Juan Pérez",
                "tipo_riesgo": "Operacional",
                "probabilidad_valor": 2,
                "probabilidad_desc": "Improbable",
                "impacto_valor": 3,
                "impacto_desc": "Moderado",
                "zona_riesgo": "Medio",
                "tratamiento": "Instalar UPS y generador de respaldo",
                "tipo_control": "Preventivo",
                "estado_implementacion": "Implementado"
            },
            {
                "fecha": date.today(),
                "codigo": "R-2024-007",
                "riesgo": "Acceso no autorizado a sistemas",
                "descripcion": "Intrusión de personas no autorizadas a sistemas críticos",
                "causas": "Contraseñas débiles, falta de autenticación multifactor",
                "efectos": "Robo de información, modificación de datos, sabotaje",
                "tipo_activo": "Sistema de Información",
                "proceso": "Gestión de TI",
                "propietario": "Juan Pérez",
                "tipo_riesgo": "Ciberseguridad",
                "probabilidad_valor": 3,
                "probabilidad_desc": "Posible",
                "impacto_valor": 3,
                "impacto_desc": "Moderado",
                "zona_riesgo": "Medio",
                "tratamiento": "Implementar autenticación multifactor y políticas de contraseñas",
                "tipo_control": "Preventivo",
                "estado_implementacion": "En Proceso"
            },
            {
                "fecha": date.today(),
                "codigo": "R-2024-008",
                "riesgo": "Pérdida de datos críticos",
                "descripcion": "Eliminación accidental o corrupción de información importante",
                "causas": "Error humano, falla de hardware, virus informáticos",
                "efectos": "Pérdida de información histórica, retrasos operacionales",
                "tipo_activo": "Base de Datos",
                "proceso": "Gestión de TI",
                "propietario": "Juan Pérez",
                "tipo_riesgo": "Tecnológico",
                "probabilidad_valor": 2,
                "probabilidad_desc": "Improbable",
                "impacto_valor": 4,
                "impacto_desc": "Mayor",
                "zona_riesgo": "Medio",
                "tratamiento": "Implementar backup automático diario y plan de recuperación",
                "tipo_control": "Preventivo",
                "estado_implementacion": "Implementado"
            }
        ]

        for riesgo_data in riesgos_ejemplo:
            nuevo_riesgo = MatrizRiesgos(**riesgo_data)
            db.add(nuevo_riesgo)

        db.commit()
        print("✅ Riesgos de ejemplo creados exitosamente")

        print("🎉 ¡Datos de ejemplo insertados correctamente!")
        print("   Puede verificar los datos en la aplicación web")

    except Exception as e:
        print(f"❌ Error al insertar datos: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
