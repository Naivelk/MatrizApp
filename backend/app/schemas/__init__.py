# Importar todos los esquemas
from app.schemas.contexto import ContextoBase, ContextoCreate, ContextoUpdate, ContextoInDB
from app.schemas.riesgo_variable import RiesgoVariableBase, RiesgoVariableCreate, RiesgoVariableUpdate, RiesgoVariableInDB
from app.schemas.causas import CausaBase, CausaCreate, CausaUpdate, CausaInDB
from app.schemas.valor_activo import ValorActivoBase, ValorActivoCreate, ValorActivoUpdate, ValorActivoInDB
from app.schemas.impacto import ImpactoBase, ImpactoCreate, ImpactoUpdate, ImpactoInDB
from app.schemas.probabilidad import ProbabilidadBase, ProbabilidadCreate, ProbabilidadUpdate, ProbabilidadInDB
from app.schemas.clasificacion_riesgo import ClasificacionRiesgoBase, ClasificacionRiesgoCreate, ClasificacionRiesgoUpdate, ClasificacionRiesgoInDB
from app.schemas.tipo_control import TipoControlBase, TipoControlCreate, TipoControlUpdate, TipoControlInDB
from app.schemas.matriz_riesgos import MatrizRiesgosBase, MatrizRiesgosCreate, MatrizRiesgosUpdate, MatrizRiesgosInDB
