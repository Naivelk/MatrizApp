# 📤 Guía para Subir el Proyecto a GitHub

Esta guía te ayudará a subir tu proyecto completo al repositorio de GitHub que ya creaste.

## 🔧 Preparación Inicial

### 1. Verificar que Git está instalado
```bash
git --version
```

### 2. Configurar Git (si no lo has hecho antes)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
```

## 📁 Inicializar el Repositorio Local

### 1. Navegar al directorio del proyecto
```bash
cd "Downloads\Calidad de software universidad\Matrices"
```

### 2. Inicializar Git (si no está inicializado)
```bash
git init
```

### 3. Agregar el repositorio remoto
```bash
git remote add origin https://github.com/Naivelk/MatrizApp.git
```

### 4. Verificar el repositorio remoto
```bash
git remote -v
```

## 📋 Verificar Archivos a Subir

### 1. Ver el estado actual
```bash
git status
```

### 2. Verificar que .gitignore está funcionando
```bash
# Estos directorios NO deben aparecer en git status:
# - backend/__pycache__/
# - backend/venv/
# - frontend/node_modules/
# - frontend/dist/
```

## 📤 Subir el Proyecto

### 1. Agregar todos los archivos
```bash
git add .
```

### 2. Verificar qué archivos se van a subir
```bash
git status
```

### 3. Hacer el primer commit
```bash
git commit -m "🎉 Initial commit: Complete Risk Matrix Application

✨ Features:
- 🛡️ Complete risk management system
- 📊 Interactive dashboard with charts
- 📋 Risk matrix visualization
- 📤 Excel and PDF export functionality
- 🌙 Dark/light mode support
- 📱 Responsive design

🚀 Tech Stack:
- Backend: FastAPI + PostgreSQL + SQLAlchemy
- Frontend: React + Bootstrap + Recharts
- Database: PostgreSQL with normalized schema

📚 Documentation:
- Complete README with installation guide
- API documentation with Swagger
- Contributing guidelines
- Docker support for easy deployment

🔧 Configuration:
- Environment variables setup
- CORS configuration
- Database migrations
- Comprehensive .gitignore

Complies with NTC ISO 31000 and NTC-ISO/IEC 27005 standards"
```

### 4. Subir al repositorio remoto
```bash
git push -u origin main
```

## 🔄 Si el Repositorio ya Tiene Contenido

Si tu repositorio de GitHub ya tiene algunos archivos (como README.md), necesitarás hacer un pull primero:

### 1. Hacer pull del repositorio remoto
```bash
git pull origin main --allow-unrelated-histories
```

### 2. Resolver conflictos si los hay
```bash
# Si hay conflictos, Git te mostrará los archivos en conflicto
# Edita los archivos para resolver los conflictos
# Luego agrega los archivos resueltos:
git add .
git commit -m "🔀 Merge remote repository with local project"
```

### 3. Subir los cambios
```bash
git push origin main
```

## 📝 Comandos de Git para Uso Futuro

### Agregar cambios específicos
```bash
# Agregar archivos específicos
git add archivo1.py archivo2.js

# Agregar todos los archivos modificados
git add .

# Agregar solo archivos rastreados modificados
git add -u
```

### Hacer commits descriptivos
```bash
# Commit con mensaje corto
git commit -m "✨ Add new feature: risk filtering"

# Commit con mensaje detallado
git commit -m "🐛 Fix dark mode text visibility

- Fixed white text on white background in risk level field
- Added CSS variables for better theme compatibility
- Updated form styles for both light and dark modes

Fixes #123"
```

### Subir cambios
```bash
# Subir cambios a la rama principal
git push origin main

# Subir una nueva rama
git push origin nombre-de-la-rama
```

### Trabajar con ramas
```bash
# Crear y cambiar a una nueva rama
git checkout -b feature/nueva-funcionalidad

# Cambiar entre ramas
git checkout main
git checkout feature/nueva-funcionalidad

# Listar ramas
git branch

# Eliminar una rama local
git branch -d nombre-de-la-rama
```

## 🏷️ Crear Releases

### 1. Crear un tag para la versión
```bash
git tag -a v1.0.0 -m "🚀 Release v1.0.0: Initial stable release

✨ Features included:
- Complete risk management system
- Interactive dashboard
- Excel/PDF export
- Dark/light mode
- Responsive design

📊 Statistics:
- 25+ React components
- 15+ API endpoints
- Full CRUD operations
- Real-time charts and analytics"
```

### 2. Subir el tag
```bash
git push origin v1.0.0
```

### 3. Crear release en GitHub
1. Ve a tu repositorio en GitHub
2. Haz clic en "Releases"
3. Haz clic en "Create a new release"
4. Selecciona el tag v1.0.0
5. Agrega título y descripción
6. Publica el release

## 📊 Verificar la Subida

### 1. Verificar en GitHub
- Ve a https://github.com/Naivelk/MatrizApp
- Verifica que todos los archivos están presentes
- Revisa que el README.md se muestra correctamente

### 2. Verificar la documentación
- Comprueba que los badges se muestran correctamente
- Verifica que los enlaces funcionan
- Revisa que las imágenes se cargan (si las hay)

### 3. Probar el clone
```bash
# En otro directorio, probar clonar el repositorio
git clone https://github.com/Naivelk/MatrizApp.git
cd MatrizApp
```

## 🎯 Mejores Prácticas

### Mensajes de Commit
Usa emojis y sigue el formato:
- ✨ `:sparkles:` para nuevas funcionalidades
- 🐛 `:bug:` para corrección de bugs
- 📚 `:books:` para documentación
- 🎨 `:art:` para mejoras de UI/UX
- ⚡ `:zap:` para mejoras de rendimiento
- 🔧 `:wrench:` para configuración
- 🚀 `:rocket:` para releases

### Frecuencia de Commits
- Haz commits pequeños y frecuentes
- Cada commit debe representar un cambio lógico
- No subas código que no funcione

### Ramas
- `main`: código estable y listo para producción
- `develop`: desarrollo activo
- `feature/nombre`: nuevas funcionalidades
- `bugfix/nombre`: corrección de bugs
- `hotfix/nombre`: correcciones urgentes

## 🎉 ¡Proyecto Subido Exitosamente!

Si has seguido todos los pasos, tu proyecto ya debería estar disponible en:
https://github.com/Naivelk/MatrizApp

### Próximos Pasos
1. 🌟 **Agregar una estrella** a tu propio repositorio
2. 📝 **Crear issues** para funcionalidades futuras
3. 🔄 **Configurar GitHub Actions** para CI/CD (opcional)
4. 📊 **Agregar badges** adicionales (cobertura de tests, etc.)
5. 🌐 **Configurar GitHub Pages** para documentación (opcional)

¡Felicidades por tener tu proyecto en GitHub! 🎊
