import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  contextoService,
  riesgoVariableService,
  valorActivoService,
  impactoService,
  probabilidadService,
  tipoControlService,
  matrizRiesgosService
} from '../../services/api';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const RiesgoForm = ({ riesgoId = null }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contextos, setContextos] = useState([]);
  const [riesgosVariables, setRiesgosVariables] = useState([]);
  const [valoresActivos, setValoresActivos] = useState([]);
  const [impactos, setImpactos] = useState([]);
  const [probabilidades, setProbabilidades] = useState([]);
  const [tiposControl, setTiposControl] = useState([]);
  const [causas, setCausas] = useState([{ descripcion: '', factor: '' }]);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          contextosRes,
          riesgosVariablesRes,
          valoresActivosRes,
          impactosRes,
          probabilidadesRes,
          tiposControlRes
        ] = await Promise.all([
          contextoService.getAll(),
          riesgoVariableService.getAll(),
          valorActivoService.getAll(),
          impactoService.getAll(),
          probabilidadService.getAll(),
          tipoControlService.getAll()
        ]);

        setContextos(contextosRes.data);
        setRiesgosVariables(riesgosVariablesRes.data);
        setValoresActivos(valoresActivosRes.data);
        setImpactos(impactosRes.data);
        setProbabilidades(probabilidadesRes.data);
        setTiposControl(tiposControlRes.data);

        // Si estamos editando, cargar los datos del riesgo
        if (riesgoId) {
          const riesgoRes = await matrizRiesgosService.getById(riesgoId);
          const riesgo = riesgoRes.data;

          // Establecer los valores en el formulario
          Object.keys(riesgo).forEach(key => {
            if (key !== 'causas') {
              setValue(key, riesgo[key]);
            }
          });

          // Establecer las causas
          if (riesgo.causas && riesgo.causas.length > 0) {
            setCausas(riesgo.causas);
          }
        }
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [riesgoId, setValue]);

  // Manejar el envío del formulario
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Preparar los datos con las causas
      const formData = {
        ...data,
        causas: causas.filter(causa => causa.descripcion.trim() !== '')
      };

      if (riesgoId) {
        await matrizRiesgosService.update(riesgoId, formData);
      } else {
        await matrizRiesgosService.create(formData);
      }

      navigate('/matriz-riesgos');
    } catch (err) {
      setError(err.message || 'Error al guardar el riesgo');
      setLoading(false);
    }
  };

  // Manejar las causas
  const handleAddCausa = () => {
    setCausas([...causas, { descripcion: '', factor: '' }]);
  };

  const handleRemoveCausa = (index) => {
    const newCausas = [...causas];
    newCausas.splice(index, 1);
    setCausas(newCausas);
  };

  const handleCausaChange = (index, field, value) => {
    const newCausas = [...causas];
    newCausas[index][field] = value;
    setCausas(newCausas);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Card className="mb-4">
        <Card.Header as="h5">Información del Activo</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="contexto_id">
                <Form.Label>Contexto</Form.Label>
                <Form.Select
                  {...register('contexto_id', { required: 'El contexto es requerido' })}
                  isInvalid={!!errors.contexto_id}
                >
                  <option value="">Seleccione un contexto</option>
                  {contextos.map(contexto => (
                    <option key={contexto.id} value={contexto.id}>
                      {contexto.institucion} - {contexto.proceso}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.contexto_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="riesgo_variable_id">
                <Form.Label>Riesgo Variable</Form.Label>
                <Form.Select
                  {...register('riesgo_variable_id', { required: 'El riesgo variable es requerido' })}
                  isInvalid={!!errors.riesgo_variable_id}
                >
                  <option value="">Seleccione un riesgo variable</option>
                  {riesgosVariables.map(riesgo => (
                    <option key={riesgo.id} value={riesgo.id}>
                      {riesgo.riesgo} - {riesgo.tipo}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.riesgo_variable_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="activo_nombre">
                <Form.Label>Nombre del Activo</Form.Label>
                <Form.Control
                  type="text"
                  {...register('activo_nombre', { required: 'El nombre del activo es requerido' })}
                  isInvalid={!!errors.activo_nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.activo_nombre?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="activo_tipo">
                <Form.Label>Tipo de Activo</Form.Label>
                <Form.Control
                  type="text"
                  {...register('activo_tipo')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="activo_descripcion">
                <Form.Label>Descripción del Activo</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('activo_descripcion')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="activo_propietario">
                <Form.Label>Propietario del Activo</Form.Label>
                <Form.Control
                  type="text"
                  {...register('activo_propietario')}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="activo_ubicacion">
                <Form.Label>Ubicación del Activo</Form.Label>
                <Form.Control
                  type="text"
                  {...register('activo_ubicacion')}
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
            <Col md={4}>
              <Form.Group controlId="valor_activo_id">
                <Form.Label>Valor del Activo</Form.Label>
                <Form.Select
                  {...register('valor_activo_id', { required: 'El valor del activo es requerido' })}
                  isInvalid={!!errors.valor_activo_id}
                >
                  <option value="">Seleccione un valor</option>
                  {valoresActivos.map(valor => (
                    <option key={valor.id} value={valor.id}>
                      {valor.nivel} - {valor.descripcion} (C:{valor.confidencialidad}, I:{valor.integridad}, D:{valor.disponibilidad})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.valor_activo_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="impacto_id">
                <Form.Label>Impacto</Form.Label>
                <Form.Select
                  {...register('impacto_id', { required: 'El impacto es requerido' })}
                  isInvalid={!!errors.impacto_id}
                >
                  <option value="">Seleccione un impacto</option>
                  {impactos.map(impacto => (
                    <option key={impacto.id} value={impacto.id}>
                      {impacto.nivel} - {impacto.descripcion}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.impacto_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="probabilidad_id">
                <Form.Label>Probabilidad</Form.Label>
                <Form.Select
                  {...register('probabilidad_id', { required: 'La probabilidad es requerida' })}
                  isInvalid={!!errors.probabilidad_id}
                >
                  <option value="">Seleccione una probabilidad</option>
                  {probabilidades.map(probabilidad => (
                    <option key={probabilidad.id} value={probabilidad.id}>
                      {probabilidad.nivel} - {probabilidad.descripcion}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.probabilidad_id?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <h6 className="mt-4 mb-3">Causas del Riesgo</h6>
          {causas.map((causa, index) => (
            <Row key={index} className="mb-3">
              <Col md={6}>
                <Form.Group controlId={`causa_descripcion_${index}`}>
                  <Form.Label>Descripción de la Causa</Form.Label>
                  <Form.Control
                    type="text"
                    value={causa.descripcion}
                    onChange={(e) => handleCausaChange(index, 'descripcion', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId={`causa_factor_${index}`}>
                  <Form.Label>Factor</Form.Label>
                  <Form.Control
                    type="text"
                    value={causa.factor}
                    onChange={(e) => handleCausaChange(index, 'factor', e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveCausa(index)}
                  className="mb-3"
                  disabled={causas.length === 1}
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddCausa} className="mb-3">
            Agregar Causa
          </Button>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header as="h5">Tratamiento del Riesgo</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="tipo_control_id">
                <Form.Label>Tipo de Control</Form.Label>
                <Form.Select
                  {...register('tipo_control_id')}
                >
                  <option value="">Seleccione un control</option>
                  {tiposControl.map(control => (
                    <option key={control.id} value={control.id}>
                      {control.nombre} - {control.tipo} (Efectividad: {control.efectividad}%)
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="control_descripcion">
                <Form.Label>Descripción del Control</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register('control_descripcion')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="plan_tratamiento">
                <Form.Label>Plan de Tratamiento</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('plan_tratamiento')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="responsable_tratamiento">
                <Form.Label>Responsable del Tratamiento</Form.Label>
                <Form.Control
                  type="text"
                  {...register('responsable_tratamiento')}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="fecha_implementacion">
                <Form.Label>Fecha de Implementación</Form.Label>
                <Form.Control
                  type="date"
                  {...register('fecha_implementacion')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="estado_implementacion">
                <Form.Label>Estado de Implementación</Form.Label>
                <Form.Select
                  {...register('estado_implementacion')}
                >
                  <option value="">Seleccione un estado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Implementado">Implementado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="observaciones">
                <Form.Label>Observaciones</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register('observaciones')}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={() => navigate('/matriz-riesgos')}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {riesgoId ? 'Actualizar' : 'Crear'} Riesgo
        </Button>
      </div>
    </Form>
  );
};

export default RiesgoForm;
