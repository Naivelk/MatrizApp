# 🚀 Guía de Instalación Detallada

Esta guía te llevará paso a paso a través del proceso de instalación y configuración de la Matriz de Riesgos de Seguridad Digital.

## 📋 Tabla de Contenidos

- [Prerrequisitos](#prerrequisitos)
- [Instalación del Backend](#instalación-del-backend)
- [Instalación del Frontend](#instalación-del-frontend)
- [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [Verificación de la Instalación](#verificación-de-la-instalación)
- [Solución de Problemas](#solución-de-problemas)

## 🔧 Prerrequisitos

### Software Requerido

1. **Python 3.8 o superior**
   - Descargar desde: https://www.python.org/downloads/
   - Verificar instalación: `python --version`

2. **Node.js 16 o superior**
   - Descargar desde: https://nodejs.org/
   - Verificar instalación: `node --version` y `npm --version`

3. **PostgreSQL 13 o superior**
   - Descargar desde: https://www.postgresql.org/download/
   - Verificar instalación: `psql --version`

4. **Git**
   - Descargar desde: https://git-scm.com/
   - Verificar instalación: `git --version`

### Verificación de Prerrequisitos

```bash
# Verificar todas las versiones
python --version    # Debe mostrar Python 3.8+
node --version      # Debe mostrar v16+
npm --version       # Debe mostrar 8+
psql --version      # Debe mostrar PostgreSQL 13+
git --version       # Debe mostrar Git 2.x+
```

## 🗂️ Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/Naivelk/MatrizApp.git

# Navegar al directorio del proyecto
cd MatrizApp

# Verificar la estructura del proyecto
ls -la
```

## 🐍 Instalación del Backend

### 1. Navegar al Directorio del Backend

```bash
cd backend
```

### 2. Crear Entorno Virtual

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate

# En macOS/Linux:
source venv/bin/activate

# Verificar que el entorno virtual está activo
# El prompt debe mostrar (venv) al inicio
```

### 3. Instalar Dependencias

```bash
# Actualizar pip
python -m pip install --upgrade pip

# Instalar dependencias del proyecto
pip install -r requirements.txt

# Verificar instalación
pip list
```

### 4. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar archivo .env con tus credenciales
# En Windows:
notepad .env

# En macOS/Linux:
nano .env
```

**Contenido del archivo .env:**
```env
DATABASE_URL=postgresql://tu_usuario:tu_password@localhost:5432/matriz
API_PREFIX=/api
DEBUG=True
HOST=localhost
PORT=8000
```

## 🗄️ Configuración de la Base de Datos

### 1. Crear Base de Datos

```bash
# Conectar a PostgreSQL como superusuario
psql -U postgres

# Crear base de datos
CREATE DATABASE matriz;

# Crear usuario (opcional)
CREATE USER matriz_user WITH PASSWORD 'tu_password';

# Otorgar permisos
GRANT ALL PRIVILEGES ON DATABASE matriz TO matriz_user;

# Salir de psql
\q
```

### 2. Verificar Conexión

```bash
# Probar conexión a la base de datos
psql -U tu_usuario -d matriz -h localhost

# Si la conexión es exitosa, salir
\q
```

### 3. Ejecutar Migraciones (si existen)

```bash
# Si hay archivos de migración en la carpeta migrations/
# Ejecutar desde el directorio backend
psql -U tu_usuario -d matriz -f migrations/add_estado_implementacion.sql
```

## 🌐 Instalación del Frontend

### 1. Navegar al Directorio del Frontend

```bash
# Desde la raíz del proyecto
cd frontend
```

### 2. Instalar Dependencias

```bash
# Instalar dependencias de Node.js
npm install

# Verificar instalación
npm list --depth=0
```

### 3. Configurar Variables de Entorno (Opcional)

```bash
# Crear archivo de configuración local si es necesario
touch .env.local

# Agregar configuraciones específicas del entorno
echo "VITE_API_URL=http://localhost:8000/api" > .env.local
```

## 🚀 Ejecución de la Aplicación

### 1. Iniciar el Backend

```bash
# Navegar al directorio backend
cd backend

# Asegurarse de que el entorno virtual está activo
# En Windows:
venv\Scripts\activate

# En macOS/Linux:
source venv/bin/activate

# Iniciar el servidor
python app.py

# O alternativamente:
uvicorn app.main:app --reload --port 8000
```

**El backend estará disponible en:**
- API: http://localhost:8000
- Documentación: http://localhost:8000/api/docs

### 2. Iniciar el Frontend

```bash
# En una nueva terminal, navegar al directorio frontend
cd frontend

# Iniciar el servidor de desarrollo
npm run dev
```

**El frontend estará disponible en:**
- Aplicación: http://localhost:3000

## ✅ Verificación de la Instalación

### 1. Verificar Backend

```bash
# Probar endpoint de salud
curl http://localhost:8000/api/docs

# Debería devolver la documentación de Swagger
```

### 2. Verificar Frontend

1. Abrir http://localhost:3000 en tu navegador
2. Deberías ver el dashboard de la aplicación
3. Verificar que los gráficos se cargan correctamente

### 3. Verificar Conexión Backend-Frontend

1. En el frontend, intentar crear un nuevo riesgo
2. Verificar que los datos se guardan en la base de datos
3. Comprobar que el dashboard muestra las estadísticas actualizadas

## 🔧 Solución de Problemas

### Problema: Error de Conexión a la Base de Datos

**Síntomas:**
```
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) could not connect to server
```

**Soluciones:**
1. Verificar que PostgreSQL está ejecutándose:
   ```bash
   # En Windows:
   net start postgresql-x64-13
   
   # En macOS:
   brew services start postgresql
   
   # En Linux:
   sudo systemctl start postgresql
   ```

2. Verificar credenciales en el archivo `.env`
3. Verificar que la base de datos existe:
   ```bash
   psql -U postgres -l
   ```

### Problema: Puerto ya en Uso

**Síntomas:**
```
Error: listen EADDRINUSE: address already in use :::8000
```

**Soluciones:**
1. Cambiar el puerto en el archivo `.env`:
   ```env
   PORT=8001
   ```

2. O terminar el proceso que usa el puerto:
   ```bash
   # En Windows:
   netstat -ano | findstr :8000
   taskkill /PID <PID> /F
   
   # En macOS/Linux:
   lsof -ti:8000 | xargs kill -9
   ```

### Problema: Dependencias de Python no se Instalan

**Síntomas:**
```
ERROR: Could not find a version that satisfies the requirement
```

**Soluciones:**
1. Actualizar pip:
   ```bash
   python -m pip install --upgrade pip
   ```

2. Verificar versión de Python:
   ```bash
   python --version
   ```

3. Instalar dependencias una por una para identificar el problema:
   ```bash
   pip install fastapi
   pip install sqlalchemy
   pip install psycopg2-binary
   ```

### Problema: Error de CORS en el Frontend

**Síntomas:**
```
Access to XMLHttpRequest at 'http://localhost:8000/api/riesgos' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Soluciones:**
1. Verificar configuración de CORS en el backend
2. Asegurarse de que el frontend está ejecutándose en el puerto correcto (3000)

### Problema: Módulos de Node.js no Encontrados

**Síntomas:**
```
Module not found: Can't resolve 'react'
```

**Soluciones:**
1. Eliminar node_modules y reinstalar:
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. Verificar versión de Node.js:
   ```bash
   node --version
   ```

## 📞 Obtener Ayuda

Si sigues teniendo problemas después de seguir esta guía:

1. **Revisa los logs** de la aplicación para obtener más detalles del error
2. **Consulta la documentación** de la API en http://localhost:8000/api/docs
3. **Abre un issue** en el repositorio de GitHub con:
   - Descripción detallada del problema
   - Pasos que seguiste
   - Mensajes de error completos
   - Información de tu sistema operativo y versiones de software

## 🎉 ¡Instalación Completada!

Si has llegado hasta aquí y todo funciona correctamente, ¡felicidades! Ya tienes la Matriz de Riesgos de Seguridad Digital funcionando en tu entorno local.

### Próximos Pasos

1. **Explorar la aplicación**: Navega por las diferentes secciones
2. **Crear tu primer riesgo**: Usa el formulario de creación de riesgos
3. **Configurar parámetros**: Ajusta la configuración según tus necesidades
4. **Leer la documentación**: Revisa la documentación de la API y las guías de contribución

¡Disfruta usando la aplicación! 🚀
