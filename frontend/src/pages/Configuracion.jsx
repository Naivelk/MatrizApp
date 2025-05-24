import { useState } from 'react';
import { Tabs, Tab, Card, Alert } from 'react-bootstrap';
import ConfiguracionContexto from '../components/forms/ConfiguracionContexto';
import ConfiguracionValorActivo from '../components/forms/ConfiguracionValorActivo';
import ConfiguracionImpacto from '../components/forms/ConfiguracionImpacto';
import ConfiguracionProbabilidad from '../components/forms/ConfiguracionProbabilidad';
import ConfiguracionClasificacionRiesgo from '../components/forms/ConfiguracionClasificacionRiesgo';
import ConfiguracionTipoControl from '../components/forms/ConfiguracionTipoControl';
import ConfiguracionEstadoImplementacion from '../components/forms/ConfiguracionEstadoImplementacion';

const Configuracion = () => {
  const [key, setKey] = useState('estado-implementacion');

  return (
    <div>
      <h1 className="mb-4">Configuración</h1>

      <Alert variant="info" className="mb-4">
        <div className="d-flex align-items-center">
          <span className="me-2" style={{ fontSize: '1.5rem' }}>⚙️</span>
          <div>
            <strong>Nota:</strong> Los parámetros mostrados en esta sección han sido definidos por el administrador del sistema. Actualmente no se permite su edición para mantener la coherencia de la evaluación.
          </div>
        </div>
      </Alert>

      <Card>
        <Card.Body>
          <Tabs
            id="configuracion-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-4"
          >
            <Tab eventKey="estado-implementacion" title="Estados de Implementación">
              <ConfiguracionEstadoImplementacion />
            </Tab>
            <Tab eventKey="impacto" title="Impactos">
              <ConfiguracionImpacto />
            </Tab>
            <Tab eventKey="probabilidad" title="Probabilidades">
              <ConfiguracionProbabilidad />
            </Tab>
            <Tab eventKey="clasificacion-riesgo" title="Clasificaciones de Riesgo">
              <ConfiguracionClasificacionRiesgo />
            </Tab>
            <Tab eventKey="tipo-control" title="Tipos de Control">
              <ConfiguracionTipoControl />
            </Tab>
            <Tab eventKey="valor-activo" title="Valores de Activo">
              <ConfiguracionValorActivo />
            </Tab>
            <Tab eventKey="contexto" title="Contextos">
              <ConfiguracionContexto />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Configuracion;
