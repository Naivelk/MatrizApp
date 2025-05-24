# 📚 Documentación de la API

Esta documentación describe los endpoints disponibles en la API REST de la Matriz de Riesgos de Seguridad Digital.

## 🔗 URL Base

```
http://localhost:8000/api
```

## 📖 Documentación Interactiva

La API incluye documentación interactiva generada automáticamente:

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/redoc

## 🛡️ Endpoints de Riesgos

### Listar Todos los Riesgos

```http
GET /api/riesgos
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "codigo": "R001",
    "fecha": "2024-01-15",
    "riesgo": "Acceso no autorizado al sistema",
    "descripcion": "Riesgo de acceso no autorizado...",
    "tipo_activo": "Sistema",
    "propietario": "TI",
    "proceso": "Gestión de Accesos",
    "tipo_riesgo": "Seguridad",
    "causas": "Contraseñas débiles",
    "efectos": "Pérdida de confidencialidad",
    "probabilidad_valor": 3,
    "probabilidad_desc": "Posible",
    "impacto_valor": 4,
    "impacto_desc": "Mayor",
    "nivel_riesgo": 12,
    "zona_riesgo": "Alto",
    "tratamiento": "Implementar autenticación multifactor",
    "tipo_control": "Preventivo",
    "responsable_control": "Administrador de TI",
    "tiempo_implementacion": "3 meses",
    "estado_implementacion": "Pendiente",
    "seguimiento_mensual": true,
    "seguimiento_semestral": false,
    "seguimiento_anual": false
  }
]
```

### Obtener un Riesgo Específico

```http
GET /api/riesgos/{id}
```

**Parámetros:**
- `id` (integer): ID del riesgo

**Respuesta:**
```json
{
  "id": 1,
  "codigo": "R001",
  "fecha": "2024-01-15",
  "riesgo": "Acceso no autorizado al sistema",
  "descripcion": "Riesgo de acceso no autorizado...",
  // ... resto de campos
}
```

### Crear un Nuevo Riesgo

```http
POST /api/riesgos
```

**Cuerpo de la Petición:**
```json
{
  "codigo": "R002",
  "fecha": "2024-01-16",
  "riesgo": "Falla del servidor principal",
  "descripcion": "Riesgo de falla del servidor principal...",
  "tipo_activo": "Hardware",
  "propietario": "TI",
  "proceso": "Infraestructura",
  "tipo_riesgo": "Operacional",
  "causas": "Envejecimiento del hardware",
  "efectos": "Interrupción del servicio",
  "probabilidad_valor": 2,
  "probabilidad_desc": "Improbable",
  "impacto_valor": 5,
  "impacto_desc": "Catastrófico",
  "zona_riesgo": "Alto",
  "tratamiento": "Implementar redundancia",
  "tipo_control": "Preventivo",
  "responsable_control": "Jefe de Infraestructura",
  "tiempo_implementacion": "6 meses",
  "estado_implementacion": "Pendiente"
}
```

**Respuesta:**
```json
{
  "id": 2,
  "codigo": "R002",
  "fecha": "2024-01-16",
  // ... resto de campos con valores asignados
}
```

### Actualizar un Riesgo

```http
PUT /api/riesgos/{id}
```

**Parámetros:**
- `id` (integer): ID del riesgo a actualizar

**Cuerpo de la Petición:**
```json
{
  "codigo": "R002",
  "fecha": "2024-01-16",
  "riesgo": "Falla del servidor principal - Actualizado",
  "descripcion": "Descripción actualizada...",
  // ... resto de campos
}
```

### Eliminar un Riesgo

```http
DELETE /api/riesgos/{id}
```

**Parámetros:**
- `id` (integer): ID del riesgo a eliminar

**Respuesta:**
```json
{
  "message": "Riesgo eliminado exitosamente"
}
```

## 📊 Endpoints de Configuración

### Obtener Configuración de Probabilidad

```http
GET /api/configuracion/probabilidad
```

### Obtener Configuración de Impacto

```http
GET /api/configuracion/impacto
```

### Obtener Configuración de Clasificación de Riesgo

```http
GET /api/configuracion/clasificacion-riesgo
```

## 🔍 Filtros y Búsqueda

### Filtrar Riesgos por Estado

```http
GET /api/riesgos?estado_implementacion=Pendiente
```

### Filtrar Riesgos por Zona

```http
GET /api/riesgos?zona_riesgo=Alto
```

### Filtrar Riesgos por Tipo de Activo

```http
GET /api/riesgos?tipo_activo=Sistema
```

### Búsqueda por Texto

```http
GET /api/riesgos?search=acceso
```

## 📈 Endpoints de Estadísticas

### Obtener Estadísticas del Dashboard

```http
GET /api/estadisticas/dashboard
```

**Respuesta:**
```json
{
  "total_riesgos": 25,
  "por_nivel": {
    "Bajo": 5,
    "Moderado": 10,
    "Alto": 8,
    "Extremo": 2
  },
  "por_estado": {
    "Pendiente": 15,
    "En Proceso": 7,
    "Implementado": 3
  },
  "por_tipo_activo": {
    "Sistema": 18,
    "Hardware": 4,
    "Software": 3
  }
}
```

## ❌ Códigos de Error

### 400 - Bad Request
```json
{
  "detail": "Datos de entrada inválidos",
  "errors": {
    "probabilidad_valor": ["El valor debe estar entre 1 y 5"]
  }
}
```

### 404 - Not Found
```json
{
  "detail": "Riesgo no encontrado"
}
```

### 422 - Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "codigo"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

### 500 - Internal Server Error
```json
{
  "detail": "Error interno del servidor"
}
```

## 📝 Esquemas de Datos

### RiesgoCreate
```json
{
  "codigo": "string",
  "fecha": "string (YYYY-MM-DD)",
  "riesgo": "string",
  "descripcion": "string",
  "tipo_activo": "string",
  "propietario": "string",
  "proceso": "string",
  "tipo_riesgo": "string",
  "causas": "string",
  "efectos": "string",
  "probabilidad_valor": "integer (1-5)",
  "probabilidad_desc": "string",
  "impacto_valor": "integer (1-5)",
  "impacto_desc": "string",
  "zona_riesgo": "string",
  "tratamiento": "string",
  "tipo_control": "string",
  "responsable_control": "string",
  "tiempo_implementacion": "string",
  "estado_implementacion": "string"
}
```

### RiesgoResponse
```json
{
  "id": "integer",
  "codigo": "string",
  "fecha": "string",
  "riesgo": "string",
  "descripcion": "string",
  "tipo_activo": "string",
  "propietario": "string",
  "proceso": "string",
  "tipo_riesgo": "string",
  "causas": "string",
  "efectos": "string",
  "probabilidad_valor": "integer",
  "probabilidad_desc": "string",
  "impacto_valor": "integer",
  "impacto_desc": "string",
  "nivel_riesgo": "integer",
  "zona_riesgo": "string",
  "tratamiento": "string",
  "tipo_control": "string",
  "responsable_control": "string",
  "tiempo_implementacion": "string",
  "estado_implementacion": "string",
  "seguimiento_mensual": "boolean",
  "seguimiento_semestral": "boolean",
  "seguimiento_anual": "boolean",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}
```

## 🔧 Configuración CORS

La API está configurada para aceptar peticiones desde:
- http://localhost:3000 (desarrollo frontend)
- http://127.0.0.1:3000

## 📚 Ejemplos de Uso

### Usando cURL

```bash
# Obtener todos los riesgos
curl -X GET "http://localhost:8000/api/riesgos"

# Crear un nuevo riesgo
curl -X POST "http://localhost:8000/api/riesgos" \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "R003",
    "fecha": "2024-01-17",
    "riesgo": "Ejemplo de riesgo",
    "descripcion": "Descripción del riesgo",
    "tipo_activo": "Sistema",
    "probabilidad_valor": 3,
    "impacto_valor": 3
  }'
```

### Usando JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Obtener todos los riesgos
const riesgos = await api.get('/riesgos');

// Crear un nuevo riesgo
const nuevoRiesgo = await api.post('/riesgos', {
  codigo: 'R003',
  fecha: '2024-01-17',
  riesgo: 'Ejemplo de riesgo',
  descripcion: 'Descripción del riesgo',
  tipo_activo: 'Sistema',
  probabilidad_valor: 3,
  impacto_valor: 3
});
```

## 🔄 Versionado

La API actualmente está en la versión 1.0. Futuras versiones mantendrán compatibilidad hacia atrás cuando sea posible.
