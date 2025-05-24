import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, ListGroup } from 'react-bootstrap';
import { matrizRiesgosService, clasificacionRiesgoService } from '../services/api';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const VerRiesgo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [riesgo, setRiesgo] = useState(null);
  const [clasificaciones, setClasificaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Intentando obtener el riesgo con ID:", id);

        // Validar el formato del ID
        if (!id || id === 'undefined' || id === 'null') {
          throw new Error(`ID no válido: ${id}`);
        }

        // Formatear el ID si es necesario (por ejemplo, si es un UUID)
        let formattedId = id;

        // Si el ID tiene un formato incorrecto, intentar corregirlo
        if (id.includes('%')) {
          formattedId = decodeURIComponent(id);
          console.log("ID decodificado:", formattedId);
        }

        // Obtener el riesgo
        const riesgoRes = await matrizRiesgosService.getById(formattedId);
        console.log("Respuesta del servidor para el riesgo:", riesgoRes);

        // Obtener las clasificaciones
        const clasificacionesRes = await clasificacionRiesgoService.getAll();
        console.log("Respuesta del servidor para las clasificaciones:", clasificacionesRes);

        if (!riesgoRes.data) {
          throw new Error(`No se encontraron datos para el riesgo con ID: ${formattedId}`);
        }

        setRiesgo(riesgoRes.data);
        setClasificaciones(clasificacionesRes.data);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError(err.response?.data?.detail || err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Obtener clase CSS según la clasificación del riesgo
  const getClasificacionClass = (zonaRiesgo) => {
    if (!zonaRiesgo) return '';

    switch (zonaRiesgo.toLowerCase()) {
      case 'baja':
      case 'bajo':
        return 'riesgo-bajo';
      case 'moderada':
      case 'moderado':
        return 'riesgo-moderado';
      case 'alta':
      case 'alto':
        return 'riesgo-alto';
      case 'extrema':
      case 'extremo':
        return 'riesgo-extremo';
      default:
        return '';
    }
  };

  if (loading) return <Loading />;

  if (error) {
    console.error("Error mostrado al usuario:", error);
    return (
      <div>
        <ErrorMessage message={error} />
        <div className="mt-3">
          <Link to="/matriz-riesgos" className="btn btn-secondary">
            Volver a la Matriz de Riesgos
          </Link>
        </div>
      </div>
    );
  }

  if (!riesgo) {
    console.error("No se encontró el riesgo con ID:", id);
    return (
      <div>
        <ErrorMessage message="No se encontró el riesgo solicitado" />
        <div className="mt-3">
          <Link to="/matriz-riesgos" className="btn btn-secondary">
            Volver a la Matriz de Riesgos
          </Link>
        </div>
      </div>
    );
  }

  console.log("Datos del riesgo a mostrar:", riesgo);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Detalle del Riesgo #{riesgo.id}</h1>
        <div>
          <Link to={`/editar-riesgo/${riesgo.id}`} className="btn btn-primary me-2">
            Editar
          </Link>
          <Link to="/matriz-riesgos" className="btn btn-secondary">
            Volver
          </Link>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Header as="h5">Información del Activo</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Código:</strong> {riesgo.codigo}</p>
              <p><strong>Riesgo:</strong> {riesgo.riesgo}</p>
              <p><strong>Tipo de Activo:</strong> {riesgo.tipo_activo || 'No especificado'}</p>
              <p><strong>Propietario:</strong> {riesgo.propietario || 'No especificado'}</p>
            </Col>
            <Col md={6}>
              <p><strong>Proceso:</strong> {riesgo.proceso || 'No especificado'}</p>
              <p><strong>Descripción:</strong> {riesgo.descripcion || 'No especificada'}</p>
              <p><strong>Fecha:</strong> {riesgo.fecha ? new Date(riesgo.fecha).toLocaleDateString() : 'No especificada'}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header as="h5">Información del Riesgo</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Tipo de Riesgo:</strong> {riesgo.tipo_riesgo || 'No especificado'}</p>
              <p><strong>Causas:</strong> {riesgo.causas || 'No especificadas'}</p>
              <p><strong>Efectos:</strong> {riesgo.efectos || 'No especificados'}</p>
              <p><strong>Activos Afectados:</strong> {riesgo.activos_afectados || 'No especificados'}</p>
            </Col>
            <Col md={6}>
              <p><strong>Criticidad del Activo:</strong> {riesgo.criticidad_activo || 'No especificada'}</p>
              <p><strong>Confidencialidad:</strong> {riesgo.riesgo_c ? 'Sí' : 'No'}</p>
              <p><strong>Integridad:</strong> {riesgo.riesgo_i ? 'Sí' : 'No'}</p>
              <p><strong>Disponibilidad:</strong> {riesgo.riesgo_d ? 'Sí' : 'No'}</p>
              <p><strong>Tipo de Impacto:</strong> {riesgo.tipo_impacto || 'No especificado'}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header as="h5">Evaluación del Riesgo</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body className="text-center">
                  <h6>Probabilidad</h6>
                  <h2>{riesgo.probabilidad_valor}</h2>
                  <p>{riesgo.probabilidad_desc}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className="text-center">
                  <h6>Impacto</h6>
                  <h2>{riesgo.impacto_valor}</h2>
                  <p>{riesgo.impacto_desc}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className={`text-center ${getClasificacionClass(riesgo.zona_riesgo)}`}>
                  <h6>Nivel de Riesgo</h6>
                  <h2>{riesgo.nivel_riesgo?.toFixed(2)}</h2>
                  <p>{riesgo.zona_riesgo}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header as="h5">Tratamiento del Riesgo</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Controles Existentes:</strong> {riesgo.controles_existentes || 'No especificados'}</p>
              <p><strong>Tipo de Control:</strong> {riesgo.tipo_control || 'No especificado'}</p>
              <p><strong>Opción de Tratamiento:</strong> {riesgo.opcion_tratamiento || 'No especificada'}</p>
              <p><strong>¿Se Acepta?:</strong> {riesgo.se_acepta ? 'Sí' : 'No'}</p>
            </Col>
            <Col md={6}>
              <p><strong>Calificación del Control:</strong> {riesgo.calificacion_control || 'No especificada'}</p>
              <p><strong>Promedio Controles Preventivos:</strong> {riesgo.promedio_controles_preventivos?.toFixed(2) || 'No calculado'}</p>
              <p><strong>Promedio Controles Correctivos:</strong> {riesgo.promedio_controles_correctivos?.toFixed(2) || 'No calculado'}</p>
              <p>
                <strong>Estado:</strong>{' '}
                <Badge bg={
                  riesgo.estado_implementacion === 'Implementado' ? 'success' :
                  riesgo.estado_implementacion === 'En Proceso' ? 'warning' : 'danger'
                }>
                  {riesgo.estado_implementacion || 'Pendiente'}
                </Badge>
              </p>
            </Col>
          </Row>

          <h6 className="mt-4 mb-3">Plan de Tratamiento</h6>
          <p>{riesgo.tratamiento || 'No se ha definido un plan de tratamiento.'}</p>

          <Row className="mt-3">
            <Col md={6}>
              <p><strong>Responsable:</strong> {riesgo.responsable_control || 'No asignado'}</p>
            </Col>
            <Col md={6}>
              <p><strong>Tiempo de Implementación:</strong> {riesgo.tiempo_implementacion || 'No definido'}</p>
            </Col>
          </Row>

          <h6 className="mt-4 mb-3">Seguimiento</h6>
          <p><strong>Mensual:</strong> {riesgo.seguimiento_mensual ? 'Sí' : 'No'}</p>
          <p><strong>Semestral:</strong> {riesgo.seguimiento_semestral ? 'Sí' : 'No'}</p>
          <p><strong>Anual:</strong> {riesgo.seguimiento_anual ? 'Sí' : 'No'}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VerRiesgo;
