# 🛡️ Matriz de Riesgos de Seguridad Digital

Una aplicación web completa para la gestión de matrices de riesgos de seguridad digital, conforme a las normas **NTC ISO 31000** y **NTC-ISO/IEC 27005**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-18.2+-blue.svg)
![FastAPI](https://img.shields.io/badge/fastapi-0.104+-green.svg)
![PostgreSQL](https://img.shields.io/badge/postgresql-13+-blue.svg)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación Rápida](#-instalación-rápida)
- [Uso](#-uso)
- [API](#-api)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

### 🎯 Funcionalidades Principales
- **Gestión completa de riesgos** - Crear, editar, visualizar y eliminar riesgos
- **Dashboard interactivo** - Gráficos y estadísticas en tiempo real
- **Matriz de riesgos visual** - Visualización clara de la matriz de riesgos
- **Exportación de datos** - Exportar a Excel y PDF con colores
- **Modo oscuro/claro** - Interfaz adaptable al tema del sistema
- **Responsive design** - Funciona en desktop, tablet y móvil

### 📊 Análisis y Reportes
- Gráficos de distribución por nivel de riesgo
- Análisis de estado de implementación de controles
- Distribución de riesgos por tipo de activo
- Filtros avanzados y búsqueda
- Cálculo automático de nivel de riesgo

### 🔧 Configuración
- Configuración de parámetros de evaluación
- Gestión de estados de implementación
- Personalización de colores y categorías
- Configuración de valores de probabilidad e impacto

## 🚀 Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **PostgreSQL** - Base de datos relacional
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **React Bootstrap** - Componentes UI
- **React Router** - Navegación
- **Recharts** - Gráficos interactivos
- **Axios** - Cliente HTTP
- **Vite** - Herramienta de construcción
- **ExcelJS** - Exportación a Excel

### Base de Datos
- **PostgreSQL 13+** - Base de datos principal
- **Esquema normalizado** - Diseño eficiente de datos

## ⚡ Instalación Rápida

### Prerrequisitos
- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/Naivelk/MatrizApp.git
cd MatrizApp
```

### 2. Configurar Backend
```bash
cd backend
python -m venv venv
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Configurar Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb matriz

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales:
# DATABASE_URL=postgresql://usuario:password@localhost:5432/matriz
# API_PREFIX=/api
# DEBUG=True
```

### 4. Configurar Frontend
```bash
cd ../frontend
npm install
```

### 5. Ejecutar la aplicación
```bash
# Terminal 1 - Backend
cd backend
python app.py
# o
uvicorn app.main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/api/docs

## 📖 Uso

### Crear un Nuevo Riesgo
1. Navega al **Dashboard**
2. Haz clic en **"Nuevo Riesgo"**
3. Completa el formulario con:
   - Información básica del riesgo
   - Evaluación de probabilidad e impacto
   - Controles y tratamiento
   - Estado de implementación
4. Guarda el riesgo

### Ver la Matriz de Riesgos
1. Ve a **"Matriz de Riesgos"**
2. Visualiza todos los riesgos en formato tabla
3. Usa filtros para encontrar riesgos específicos
4. Exporta datos a Excel o PDF

### Configurar Parámetros
1. Accede a **"Configuración"**
2. Ajusta parámetros de evaluación
3. Configura estados de implementación
4. Personaliza colores y categorías

## 🔌 API

La API REST está documentada con OpenAPI/Swagger. Accede a la documentación interactiva en:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/redoc

### Endpoints Principales
- `GET /api/riesgos` - Listar todos los riesgos
- `POST /api/riesgos` - Crear nuevo riesgo
- `GET /api/riesgos/{id}` - Obtener riesgo específico
- `PUT /api/riesgos/{id}` - Actualizar riesgo
- `DELETE /api/riesgos/{id}` - Eliminar riesgo

## 📁 Estructura del Proyecto

```
MatrizApp/
├── backend/                 # API FastAPI
│   ├── app/
│   │   ├── api/            # Endpoints de la API
│   │   ├── core/           # Configuración
│   │   ├── models/         # Modelos SQLAlchemy
│   │   ├── schemas/        # Esquemas Pydantic
│   │   └── services/       # Lógica de negocio
│   ├── requirements.txt    # Dependencias Python
│   └── .env               # Variables de entorno
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Páginas principales
│   │   ├── services/      # Servicios API
│   │   └── utils/         # Utilidades
│   ├── package.json       # Dependencias Node.js
│   └── vite.config.js     # Configuración Vite
└── README.md              # Este archivo
```

## 🗄️ Estructura de la Base de Datos

- **matriz_riesgos**: Tabla principal con todos los riesgos
- **contexto**: Información del proyecto de evaluación
- **valor_activo**: Evaluación CID (Confidencialidad, Integridad, Disponibilidad)
- **impacto**: Dimensiones de impacto (financiero, legal, etc.)
- **probabilidad**: Niveles de ocurrencia del riesgo
- **clasificacion_riesgo**: Definición de zonas de riesgo
- **tipo_control**: Catalogación de controles

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

### Desarrollo Local
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Naivelk** - *Desarrollo inicial* - [Naivelk](https://github.com/Naivelk)

## 🙏 Agradecimientos

- Normas NTC ISO 31000 y NTC-ISO/IEC 27005
- Comunidad de FastAPI y React
- Contribuidores del proyecto

---

⭐ **¡Si este proyecto te ayuda, dale una estrella!** ⭐
