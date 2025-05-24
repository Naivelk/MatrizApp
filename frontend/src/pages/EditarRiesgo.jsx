import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { matrizRiesgosService } from '../services/api';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const EditarRiesgo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [riesgo, setRiesgo] = useState({});
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRiesgo = async () => {
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
        const response = await matrizRiesgosService.getById(formattedId);
        console.log("Respuesta del servidor para el riesgo:", response);

        if (!response.data) {
          throw new Error(`No se encontraron datos para el riesgo con ID: ${formattedId}`);
        }

        setRiesgo(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError(err.response?.data?.detail || err.message || 'Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchRiesgo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Intentando actualizar el riesgo con ID:", id);

      // Formatear el ID si es necesario (por ejemplo, si es un UUID)
      let formattedId = id;

      // Si el ID tiene un formato incorrecto, intentar corregirlo
      if (id.includes('%')) {
        formattedId = decodeURIComponent(id);
        console.log("ID decodificado para actualización:", formattedId);
      }

      // Crear una copia de los datos para no modificar el objeto original
      const dataToSend = { ...formData };

      // Asegurarnos de que estado_implementacion tenga un valor válido
      if (!dataToSend.estado_implementacion ||
          (dataToSend.estado_implementacion !== 'Pendiente' &&
           dataToSend.estado_implementacion !== 'En Proceso' &&
           dataToSend.estado_implementacion !== 'Implementado')) {
        dataToSend.estado_implementacion = 'Pendiente';
      }

      console.log("Datos a enviar:", dataToSend);
      console.log("Estado de implementación a enviar:", dataToSend.estado_implementacion);

      await matrizRiesgosService.update(formattedId, dataToSend);
      setSuccess(true);
      setLoading(false);
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/matriz-riesgos');
      }, 2000);
    } catch (err) {
      console.error("Error al actualizar el riesgo:", err);
      setError(err.response?.data?.detail || err.message || 'Error al actualizar el riesgo');
      setLoading(false);
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Editar Riesgo #{id}</h1>
        <Link to="/matriz-riesgos" className="btn btn-secondary">
          Volver
        </Link>
      </div>

      {success && (
        <Alert variant="success" className="mb-4">
          Riesgo actualizado correctamente. Redirigiendo...
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <Card.Header as="h5">Información del Activo</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="codigo">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    name="codigo"
                    value={formData.codigo || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha"
                    value={formData.fecha ? formData.fecha.substring(0, 10) : ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="riesgo">
                  <Form.Label>Riesgo</Form.Label>
                  <Form.Control
                    type="text"
                    name="riesgo"
                    value={formData.riesgo || ''}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tipo_activo">
                  <Form.Label>Tipo de Activo</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipo_activo"
                    value={formData.tipo_activo || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="propietario">
                  <Form.Label>Propietario</Form.Label>
                  <Form.Control
                    type="text"
                    name="propietario"
                    value={formData.propietario || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="proceso">
                  <Form.Label>Proceso</Form.Label>
                  <Form.Control
                    type="text"
                    name="proceso"
                    value={formData.proceso || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={formData.descripcion || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header as="h5">Información del Riesgo</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="tipo_riesgo">
                  <Form.Label>Tipo de Riesgo</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipo_riesgo"
                    value={formData.tipo_riesgo || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="criticidad_activo">
                  <Form.Label>Criticidad del Activo</Form.Label>
                  <Form.Control
                    type="text"
                    name="criticidad_activo"
                    value={formData.criticidad_activo || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="riesgo_c">
                  <Form.Check
                    type="checkbox"
                    label="Confidencialidad"
                    name="riesgo_c"
                    checked={formData.riesgo_c || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="riesgo_i">
                  <Form.Check
                    type="checkbox"
                    label="Integridad"
                    name="riesgo_i"
                    checked={formData.riesgo_i || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="riesgo_d">
                  <Form.Check
                    type="checkbox"
                    label="Disponibilidad"
                    name="riesgo_d"
                    checked={formData.riesgo_d || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="causas">
                  <Form.Label>Causas</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="causas"
                    value={formData.causas || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="efectos">
                  <Form.Label>Efectos</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="efectos"
                    value={formData.efectos || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="activos_afectados">
                  <Form.Label>Activos Afectados</Form.Label>
                  <Form.Control
                    type="text"
                    name="activos_afectados"
                    value={formData.activos_afectados || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header as="h5">Evaluación del Riesgo</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="probabilidad_valor">
                  <Form.Label>Valor de Probabilidad</Form.Label>
                  <Form.Control
                    type="number"
                    name="probabilidad_valor"
                    value={formData.probabilidad_valor || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="probabilidad_desc">
                  <Form.Label>Descripción de Probabilidad</Form.Label>
                  <Form.Control
                    type="text"
                    name="probabilidad_desc"
                    value={formData.probabilidad_desc || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="impacto_valor">
                  <Form.Label>Valor de Impacto</Form.Label>
                  <Form.Control
                    type="number"
                    name="impacto_valor"
                    value={formData.impacto_valor || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="impacto_desc">
                  <Form.Label>Descripción de Impacto</Form.Label>
                  <Form.Control
                    type="text"
                    name="impacto_desc"
                    value={formData.impacto_desc || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nivel_riesgo">
                  <Form.Label>Nivel de Riesgo</Form.Label>
                  <Form.Control
                    type="number"
                    name="nivel_riesgo"
                    value={formData.probabilidad_valor * formData.impacto_valor}
                    readOnly
                    style={{
                      backgroundColor: 'var(--bs-secondary-bg)',
                      color: 'var(--bs-body-color)',
                      opacity: 0.8
                    }}
                  />
                  <Form.Text className="text-muted">
                    <strong>Calculado automáticamente</strong> (Probabilidad × Impacto).
                    Este valor se genera en la base de datos y no necesita ser modificado.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="zona_riesgo">
                  <Form.Label>Zona de Riesgo</Form.Label>
                  <Form.Control
                    type="text"
                    name="zona_riesgo"
                    value={formData.zona_riesgo || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header as="h5">Tratamiento del Riesgo</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="controles_existentes">
                  <Form.Label>Controles Existentes</Form.Label>
                  <Form.Control
                    type="text"
                    name="controles_existentes"
                    value={formData.controles_existentes || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tipo_control">
                  <Form.Label>Tipo de Control</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipo_control"
                    value={formData.tipo_control || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="se_acepta">
                  <Form.Check
                    type="checkbox"
                    label="¿Se Acepta?"
                    name="se_acepta"
                    checked={formData.se_acepta || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="opcion_tratamiento">
                  <Form.Label>Opción de Tratamiento</Form.Label>
                  <Form.Control
                    type="text"
                    name="opcion_tratamiento"
                    value={formData.opcion_tratamiento || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="tratamiento">
                  <Form.Label>Plan de Tratamiento</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="tratamiento"
                    value={formData.tratamiento || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="responsable_control">
                  <Form.Label>Responsable</Form.Label>
                  <Form.Control
                    type="text"
                    name="responsable_control"
                    value={formData.responsable_control || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tiempo_implementacion">
                  <Form.Label>Tiempo de Implementación</Form.Label>
                  <Form.Control
                    type="text"
                    name="tiempo_implementacion"
                    value={formData.tiempo_implementacion || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="seguimiento_mensual">
                  <Form.Check
                    type="checkbox"
                    label="Seguimiento Mensual"
                    name="seguimiento_mensual"
                    checked={formData.seguimiento_mensual || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="seguimiento_semestral">
                  <Form.Check
                    type="checkbox"
                    label="Seguimiento Semestral"
                    name="seguimiento_semestral"
                    checked={formData.seguimiento_semestral || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="seguimiento_anual">
                  <Form.Check
                    type="checkbox"
                    label="Seguimiento Anual"
                    name="seguimiento_anual"
                    checked={formData.seguimiento_anual || false}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="estado_implementacion">
                  <Form.Label>Estado de Implementación</Form.Label>
                  <Form.Select
                    name="estado_implementacion"
                    value={formData.estado_implementacion || ''}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Implementado">Implementado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end mb-4">
          <Button variant="secondary" className="me-2" onClick={() => navigate('/matriz-riesgos')}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            Guardar Cambios
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditarRiesgo;
