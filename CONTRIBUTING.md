# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto Matriz de Riesgos de Seguridad Digital! Esta guía te ayudará a entender cómo puedes participar en el desarrollo del proyecto.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Reportar Bugs](#reportar-bugs)
- [Solicitar Funcionalidades](#solicitar-funcionalidades)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código. Por favor reporta comportamientos inaceptables.

### Nuestros Estándares

- Usar un lenguaje acogedor e inclusivo
- Ser respetuoso con diferentes puntos de vista y experiencias
- Aceptar críticas constructivas de manera elegante
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

## 🚀 ¿Cómo puedo contribuir?

### Tipos de Contribuciones

- **🐛 Reportar bugs**: Ayuda a identificar y documentar problemas
- **💡 Sugerir mejoras**: Propón nuevas funcionalidades o mejoras
- **📝 Mejorar documentación**: Ayuda a mantener la documentación actualizada
- **💻 Contribuir código**: Implementa nuevas funcionalidades o corrige bugs
- **🧪 Escribir tests**: Mejora la cobertura de pruebas
- **🎨 Mejorar UI/UX**: Propón mejoras en la interfaz de usuario

## 🛠️ Configuración del Entorno de Desarrollo

### Prerrequisitos

- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- Git

### Configuración Inicial

1. **Fork el repositorio**
   ```bash
   # Haz fork desde GitHub y luego clona tu fork
   git clone https://github.com/TU_USUARIO/MatrizApp.git
   cd MatrizApp
   ```

2. **Configurar Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edita .env con tus credenciales de base de datos
   ```

3. **Configurar Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configurar Base de Datos**
   ```bash
   createdb matriz
   # Ejecuta las migraciones si las hay
   ```

## 🔄 Proceso de Desarrollo

### 1. Crear una Rama

```bash
git checkout -b feature/nombre-de-la-funcionalidad
# o
git checkout -b bugfix/descripcion-del-bug
```

### 2. Realizar Cambios

- Mantén los commits pequeños y enfocados
- Escribe mensajes de commit descriptivos
- Sigue las convenciones de código del proyecto

### 3. Probar los Cambios

```bash
# Backend
cd backend
python -m pytest  # Si hay tests

# Frontend
cd frontend
npm test  # Si hay tests
npm run build  # Verificar que compila
```

### 4. Enviar Pull Request

1. Push a tu fork
2. Crea un Pull Request desde GitHub
3. Describe claramente los cambios realizados
4. Referencia issues relacionados

## 📏 Estándares de Código

### Backend (Python)

- Sigue PEP 8
- Usa type hints cuando sea posible
- Documenta funciones y clases
- Mantén las líneas bajo 88 caracteres

```python
def calcular_nivel_riesgo(probabilidad: int, impacto: int) -> int:
    """
    Calcula el nivel de riesgo basado en probabilidad e impacto.
    
    Args:
        probabilidad: Valor de probabilidad (1-5)
        impacto: Valor de impacto (1-5)
        
    Returns:
        Nivel de riesgo calculado
    """
    return probabilidad * impacto
```

### Frontend (React/JavaScript)

- Usa componentes funcionales con hooks
- Sigue las convenciones de naming de React
- Usa PropTypes o TypeScript para validación
- Mantén los componentes pequeños y reutilizables

```jsx
const RiesgoCard = ({ riesgo, onEdit, onDelete }) => {
  return (
    <Card>
      <Card.Header>{riesgo.codigo}</Card.Header>
      <Card.Body>
        <Card.Title>{riesgo.riesgo}</Card.Title>
        <Card.Text>{riesgo.descripcion}</Card.Text>
      </Card.Body>
    </Card>
  );
};
```

### Commits

Usa el formato de Conventional Commits:

```
tipo(alcance): descripción

feat(dashboard): agregar gráfico de riesgos por tipo
fix(api): corregir validación de datos de entrada
docs(readme): actualizar instrucciones de instalación
style(ui): mejorar espaciado en formularios
refactor(backend): simplificar lógica de cálculo de riesgo
test(frontend): agregar tests para componente RiesgoForm
```

## 🐛 Reportar Bugs

### Antes de Reportar

1. Verifica que el bug no haya sido reportado antes
2. Asegúrate de estar usando la versión más reciente
3. Verifica que el problema sea reproducible

### Información a Incluir

- **Descripción clara** del problema
- **Pasos para reproducir** el bug
- **Comportamiento esperado** vs **comportamiento actual**
- **Capturas de pantalla** si es relevante
- **Información del entorno**:
  - OS (Windows, macOS, Linux)
  - Versión de Python
  - Versión de Node.js
  - Navegador y versión

### Template de Bug Report

```markdown
## Descripción del Bug
Una descripción clara y concisa del bug.

## Pasos para Reproducir
1. Ve a '...'
2. Haz clic en '...'
3. Desplázate hacia abajo hasta '...'
4. Ve el error

## Comportamiento Esperado
Una descripción clara de lo que esperabas que pasara.

## Capturas de Pantalla
Si es aplicable, agrega capturas de pantalla.

## Información del Entorno
- OS: [ej. Windows 10]
- Python: [ej. 3.9.0]
- Node.js: [ej. 16.14.0]
- Navegador: [ej. Chrome 96.0]
```

## 💡 Solicitar Funcionalidades

### Antes de Solicitar

1. Verifica que la funcionalidad no exista ya
2. Busca en issues existentes
3. Considera si la funcionalidad encaja con el objetivo del proyecto

### Información a Incluir

- **Descripción clara** de la funcionalidad
- **Justificación** de por qué sería útil
- **Casos de uso** específicos
- **Posible implementación** (opcional)

## 🎯 Áreas de Contribución Prioritarias

- **Mejoras en la UI/UX**: Hacer la interfaz más intuitiva
- **Optimización de rendimiento**: Mejorar velocidad de carga
- **Tests automatizados**: Aumentar cobertura de pruebas
- **Documentación**: Mejorar guías y ejemplos
- **Accesibilidad**: Hacer la aplicación más accesible
- **Internacionalización**: Soporte para múltiples idiomas

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir, puedes:

- Abrir un issue con la etiqueta "question"
- Contactar a los mantenedores del proyecto

¡Gracias por contribuir! 🙏
