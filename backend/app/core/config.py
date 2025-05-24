import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class Settings:
    API_PREFIX = os.getenv("API_PREFIX", "/api")
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"

    # Configuración de la base de datos
    DATABASE_URL = os.getenv("DATABASE_URL")

    # Configuración de la aplicación
    PROJECT_NAME = "Matriz de Riesgos"
    PROJECT_DESCRIPTION = "Sistema para gestionar una Matriz de Riesgos de Seguridad Digital conforme a las normas NTC ISO 31000 y NTC-ISO/IEC 27005"
    PROJECT_VERSION = "1.0.0"

settings = Settings()
