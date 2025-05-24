import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { matrizRiesgosService } from '../services/api';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

const CrearRiesgo = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    fecha: new Date().toISOString().substring(0, 10), // Formato YYYY-MM-DD
    riesgo: '',
    tipo_activo: '',
    propietario: '',
    proceso: '',
    descripcion: '',
    tipo_riesgo: '',
    criticidad_activo: '',
    riesgo_c: false,
    riesgo_i: false,
    riesgo_d: false,
    causas: '',
    efectos: '',
    activos_afectados: '',
    probabilidad_valor: 1,
    probabilidad_desc: '',
    impacto_valor: 1,
    impacto_desc: '',
    nivel_riesgo: 1,
    zona_riesgo: '',
    controles_existentes: '',
    tipo_control: '',
    se_acepta: false,
    opcion_tratamiento: '',
    tratamiento: '',
    responsable_control: '',
    tiempo_implementacion: '',
    seguimiento_mensual: false,
    seguimiento_semestral: false,
    seguimiento_anual: false,
    estado_implementacion: 'Pendiente'
  });

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
      // Asegurarse de que la fecha sea una cadena de texto en formato ISO
      let fechaFormateada = formData.fecha;
      if (fechaFormateada && typeof fechaFormateada !== 'string') {
        fechaFormateada = fechaFormateada.toISOString().substring(0, 10);
      }

      // Datos simplificados para el backend
      const dataToSend = {
        codigo: formData.codigo,
        fecha: fechaFormateada, // Asegurarse de que sea una cadena de texto
        riesgo: formData.riesgo,
        descripcion: formData.descripcion,
        tipo_activo: formData.tipo_activo,
        propietario: formData.propietario,
        proceso: formData.proceso,
        tipo_riesgo: formData.tipo_riesgo,
        causas: formData.causas,
        efectos: formData.efectos,
        probabilidad_valor: parseInt(formData.probabilidad_valor) || 1,
        probabilidad_desc: formData.probabilidad_desc,
        impacto_valor: parseInt(formData.impacto_valor) || 1,
        impacto_desc: formData.impacto_desc,
        zona_riesgo: formData.zona_riesgo || "BAJA", // Zona de riesgo (BAJA, MEDIA, ALTA)
        tratamiento: formData.tratamiento,
        tipo_control: formData.tipo_control,
        responsable_control: formData.responsable_control,
        riesgo_c: formData.riesgo_c ? 'Sí' : 'No',
        riesgo_i: formData.riesgo_i ? 'Sí' : 'No',
        riesgo_d: formData.riesgo_d ? 'Sí' : 'No',
        se_acepta: formData.se_acepta,
        estado_implementacion: formData.estado_implementacion || "Pendiente" // Estado de implementación
      };

      console.log("Datos a enviar:", dataToSend);

      // Realizar la llamada al backend para guardar los datos
      await matrizRiesgosService.create(dataToSend);
      setSuccess(true);
      setLoading(false);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/matriz-riesgos');
      }, 2000);
    } catch (err) {
      console.error("Error completo:", err);
      setError('Error al crear el riesgo: ' + (err.response?.data?.detail || err.message || 'Error desconocido'));
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Crear Nuevo Riesgo</h1>
        <Link to="/matriz-riesgos" className="btn btn-secondary">
          Volver
        </Link>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4">
          Riesgo creado correctamente. Redirigiendo...
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
                    value={formData.codigo}
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
                    value={formData.fecha}
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
                    value={formData.riesgo}
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
                    value={formData.tipo_activo}
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
                    value={formData.propietario}
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
                    value={formData.proceso}
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
                    value={formData.descripcion}
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
                    value={formData.tipo_riesgo}
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
                    value={formData.criticidad_activo}
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
                    checked={formData.riesgo_c}
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
                    checked={formData.riesgo_i}
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
                    checked={formData.riesgo_d}
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
                    value={formData.causas}
                    onChange={handleChange}
                    placeholder="Describa las causas del riesgo"
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
                    value={formData.efectos}
                    onChange={handleChange}
                    placeholder="Describa los efectos del riesgo"
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
                    value={formData.activos_afectados}
                    onChange={handleChange}
                    placeholder="Activos que podrían verse afectados"
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
                    value={formData.probabilidad_valor}
                    onChange={handleChange}
                    min="1"
                    max="5"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="probabilidad_desc">
                  <Form.Label>Descripción de Probabilidad</Form.Label>
                  <Form.Control
                    type="text"
                    name="probabilidad_desc"
                    value={formData.probabilidad_desc}
                    onChange={handleChange}
                    placeholder="Ej: Raro, Improbable, Posible, Probable, Casi Seguro"
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
                    value={formData.impacto_valor}
                    onChange={handleChange}
                    min="1"
                    max="5"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="impacto_desc">
                  <Form.Label>Descripción de Impacto</Form.Label>
                  <Form.Control
                    type="text"
                    name="impacto_desc"
                    value={formData.impacto_desc}
                    onChange={handleChange}
                    placeholder="Ej: Insignificante, Menor, Moderado, Mayor, Catastrófico"
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
                    Este valor se genera en la base de datos y no necesita ser ingresado.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="zona_riesgo">
                  <Form.Label>Zona de Riesgo</Form.Label>
                  <Form.Control
                    type="text"
                    name="zona_riesgo"
                    value={formData.zona_riesgo}
                    onChange={handleChange}
                    placeholder="Ej: Bajo, Moderado, Alto, Extremo"
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
                    value={formData.controles_existentes}
                    onChange={handleChange}
                    placeholder="Controles que ya existen para mitigar el riesgo"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tipo_control">
                  <Form.Label>Tipo de Control</Form.Label>
                  <Form.Control
                    type="text"
                    name="tipo_control"
                    value={formData.tipo_control}
                    onChange={handleChange}
                    placeholder="Ej: Preventivo, Detectivo, Correctivo"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="se_acepta">
                  <Form.Check
                    type="checkbox"
                    label="¿Se Acepta el Riesgo?"
                    name="se_acepta"
                    checked={formData.se_acepta}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="opcion_tratamiento">
                  <Form.Label>Opción de Tratamiento</Form.Label>
                  <Form.Select
                    name="opcion_tratamiento"
                    value={formData.opcion_tratamiento}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Evitar">Evitar</option>
                    <option value="Reducir">Reducir</option>
                    <option value="Transferir">Transferir</option>
                    <option value="Aceptar">Aceptar</option>
                  </Form.Select>
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
                    value={formData.tratamiento}
                    onChange={handleChange}
                    placeholder="Describa el plan para tratar el riesgo"
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
                    value={formData.responsable_control}
                    onChange={handleChange}
                    placeholder="Persona o área responsable"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tiempo_implementacion">
                  <Form.Label>Tiempo de Implementación</Form.Label>
                  <Form.Control
                    type="text"
                    name="tiempo_implementacion"
                    value={formData.tiempo_implementacion}
                    onChange={handleChange}
                    placeholder="Ej: 3 meses, 1 año"
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
                    checked={formData.seguimiento_mensual}
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
                    checked={formData.seguimiento_semestral}
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
                    checked={formData.seguimiento_anual}
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
                    value={formData.estado_implementacion || 'Pendiente'}
                    onChange={handleChange}
                  >
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
            Crear Riesgo
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CrearRiesgo;
