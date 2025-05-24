import { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip
} from 'recharts';
import { matrizRiesgosService, clasificacionRiesgoService } from '../services/api';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import PageHeader from '../components/common/PageHeader';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [riesgos, setRiesgos] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    porNivel: {},
    porEstado: {},
    porTipo: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [riesgosRes, clasificacionesRes] = await Promise.all([
          matrizRiesgosService.getAll(),
          clasificacionRiesgoService.getAll()
        ]);

        setRiesgos(riesgosRes.data);
        setClasificaciones(clasificacionesRes.data);

        // Calcular estadísticas
        const total = riesgosRes.data.length;

        // Riesgos por zona de riesgo (nivel)
        const porNivel = riesgosRes.data.reduce((acc, riesgo) => {
          const zona = riesgo.zona_riesgo || 'No especificado';
          acc[zona] = (acc[zona] || 0) + 1;
          return acc;
        }, {});

        // Riesgos por estado de implementación
        const porEstado = riesgosRes.data.reduce((acc, riesgo) => {
          const estado = riesgo.estado_implementacion || 'Pendiente';
          acc[estado] = (acc[estado] || 0) + 1;
          return acc;
        }, {});

        // Riesgos por tipo de activo
        const porTipo = riesgosRes.data.reduce((acc, riesgo) => {
          const tipo = riesgo.tipo_activo || riesgo.activo_tipo || 'Sin especificar';
          acc[tipo] = (acc[tipo] || 0) + 1;
          return acc;
        }, {});

        setEstadisticas({
          total,
          porNivel,
          porEstado,
          porTipo
        });
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  // Colores para gráficos
  const COLORS_NIVEL = {
    'Bajo': '#28a745',
    'Medio': '#ffc107',
    'Alto': '#fd7e14',
    'Crítico': '#dc3545',
    'BAJA': '#28a745',
    'MEDIA': '#ffc107',
    'ALTA': '#fd7e14',
    'CRITICA': '#dc3545'
  };

  const COLORS_ESTADO = {
    'Implementado': '#28a745',
    'En Proceso': '#ffc107',
    'Pendiente': '#dc3545'
  };

  // Preparar datos para gráficos
  const dataNivel = Object.entries(estadisticas.porNivel).map(([nivel, cantidad]) => ({
    name: nivel,
    value: cantidad,
    color: COLORS_NIVEL[nivel] || '#6c757d'
  }));

  const dataEstado = Object.entries(estadisticas.porEstado).map(([estado, cantidad]) => ({
    name: estado,
    value: cantidad,
    color: COLORS_ESTADO[estado] || '#6c757d'
  }));

  const dataTipo = Object.entries(estadisticas.porTipo).map(([tipo, cantidad], index) => ({
    name: tipo,
    value: cantidad,
    color: `hsl(${(index * 60) % 360}, 70%, 50%)` // Generar colores dinámicamente
  }));

  // Obtener color según la clasificación
  const getColorByClasificacion = (nombre) => {
    return COLORS_NIVEL[nombre] || '#f8f9fa';
  };

  // Obtener color según el estado
  const getColorByEstado = (estado) => {
    return COLORS_ESTADO[estado] || '#f8f9fa';
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Resumen ejecutivo de la gestión de riesgos organizacionales"
        icon="📊"
        gradient={true}
      >
        <Button as={Link} to="/crear-riesgo" variant="success" size="lg">
          ➕ Nuevo Riesgo
        </Button>
      </PageHeader>

      {riesgos.length === 0 ? (
        <Alert variant="info" className="text-center">
          <div className="mb-3" style={{ fontSize: '3rem' }}>📋</div>
          <h4>¡Comienza tu gestión de riesgos!</h4>
          <p>No hay riesgos registrados aún. Crea tu primer riesgo para comenzar.</p>
          <Button as={Link} to="/crear-riesgo" variant="primary" size="lg">
            ➕ Crear el primer riesgo
          </Button>
        </Alert>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={3}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Número total de riesgos identificados en la organización</Tooltip>}
              >
                <Card className="text-center dashboard-card h-100 border-0" style={{ cursor: 'help' }}>
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>📊</div>
                    <Card.Title className="h5 text-muted mb-2">Total de Riesgos</Card.Title>
                    <h2 className="display-4 fw-bold mb-0" style={{ color: 'var(--primary-600)' }}>
                      {estadisticas.total}
                    </h2>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>

            <Col md={3}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Riesgos que requieren atención inmediata por su alto nivel de criticidad</Tooltip>}
              >
                <Card className="text-center dashboard-card h-100 border-0" style={{ cursor: 'help' }}>
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>⚠️</div>
                    <Card.Title className="h5 text-muted mb-2">Riesgos Críticos/Altos</Card.Title>
                    <h2 className="display-4 fw-bold mb-0" style={{ color: 'var(--danger-600)' }}>
                      {(estadisticas.porNivel['Alto'] || 0) + (estadisticas.porNivel['Crítico'] || 0)}
                    </h2>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>

            <Col md={3}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Controles que han sido completamente implementados y están funcionando</Tooltip>}
              >
                <Card className="text-center dashboard-card h-100 border-0" style={{ cursor: 'help' }}>
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>✅</div>
                    <Card.Title className="h5 text-muted mb-2">Controles Implementados</Card.Title>
                    <h2 className="display-4 fw-bold mb-0" style={{ color: 'var(--success-600)' }}>
                      {estadisticas.porEstado['Implementado'] || 0}
                    </h2>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>

            <Col md={3}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Controles que aún no han sido implementados y requieren acción</Tooltip>}
              >
                <Card className="text-center dashboard-card h-100 border-0" style={{ cursor: 'help' }}>
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ fontSize: '3rem' }}>⏳</div>
                    <Card.Title className="h5 text-muted mb-2">Controles Pendientes</Card.Title>
                    <h2 className="display-4 fw-bold mb-0" style={{ color: 'var(--warning-600)' }}>
                      {estadisticas.porEstado['Pendiente'] || 0}
                    </h2>
                  </Card.Body>
                </Card>
              </OverlayTrigger>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card className="mb-4 dashboard-card border-0">
                <Card.Header className="border-0 bg-transparent">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Distribución de riesgos según su nivel de criticidad</Tooltip>}
                  >
                    <h5 className="mb-0 d-flex align-items-center" style={{ cursor: 'help' }}>
                      📈 <span className="ms-2">Riesgos por Nivel</span>
                      <span className="ms-2 text-muted">ℹ️</span>
                    </h5>
                  </OverlayTrigger>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dataNivel}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {dataNivel.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mb-4 dashboard-card border-0">
                <Card.Header className="border-0 bg-transparent">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Estado actual de implementación de los controles de riesgo</Tooltip>}
                  >
                    <h5 className="mb-0 d-flex align-items-center" style={{ cursor: 'help' }}>
                      🎯 <span className="ms-2">Estado de Implementación</span>
                      <span className="ms-2 text-muted">ℹ️</span>
                    </h5>
                  </OverlayTrigger>
                </Card.Header>
                <Card.Body>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataEstado}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" name="Cantidad">
                        {dataEstado.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card className="dashboard-card border-0">
                <Card.Header className="border-0 bg-transparent">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Distribución de riesgos según el tipo de activo afectado</Tooltip>}
                  >
                    <h5 className="mb-0 d-flex align-items-center" style={{ cursor: 'help' }}>
                      🏢 <span className="ms-2">Riesgos por Tipo de Activo</span>
                      <span className="ms-2 text-muted">ℹ️</span>
                    </h5>
                  </OverlayTrigger>
                </Card.Header>
                <Card.Body>
                  {Object.keys(estadisticas.porTipo).length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={Object.entries(estadisticas.porTipo).map(([tipo, cantidad]) => ({
                          name: tipo,
                          value: Number(cantidad)
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value, name) => [value, 'Cantidad de Riesgos']}
                          labelFormatter={(label) => `Tipo de Activo: ${label}`}
                        />
                        <Legend />
                        <Bar
                          dataKey="value"
                          name="Cantidad de Riesgos"
                          fill="#007bff"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="text-center text-muted py-5">
                      <div style={{ fontSize: '3rem' }} className="mb-3">📊</div>
                      <h5 className="mb-3">No hay datos de tipos de activo</h5>
                      <p className="mb-3">
                        Los riesgos registrados no tienen información específica sobre tipos de activo.
                      </p>
                      <p className="small">
                        💡 <strong>Sugerencia:</strong> Al crear nuevos riesgos, asegúrate de especificar el tipo de activo
                        para obtener análisis más detallados.
                      </p>
                      {estadisticas.total > 0 && (
                        <div className="mt-3">
                          <small className="text-muted">
                            Total de riesgos registrados: <strong>{estadisticas.total}</strong>
                          </small>
                        </div>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Sección de acciones rápidas */}
          <Row className="mt-5">
            <Col md={12}>
              <Card className="dashboard-card border-0">
                <Card.Header className="border-0 bg-transparent">
                  <h5 className="mb-0 d-flex align-items-center">
                    🚀 <span className="ms-2">Acciones Rápidas</span>
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Row className="g-4">
                    <Col md={4}>
                      <div className="d-grid">
                        <Button
                          as={Link}
                          to="/crear-riesgo"
                          variant="success"
                          size="lg"
                          className="h-100 d-flex flex-column align-items-center justify-content-center p-4"
                        >
                          <div style={{ fontSize: '2rem' }} className="mb-2">➕</div>
                          <span>Nuevo Riesgo</span>
                        </Button>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="d-grid">
                        <Button
                          as={Link}
                          to="/matriz-riesgos"
                          variant="primary"
                          size="lg"
                          className="h-100 d-flex flex-column align-items-center justify-content-center p-4"
                        >
                          <div style={{ fontSize: '2rem' }} className="mb-2">📋</div>
                          <span>Ver Matriz</span>
                        </Button>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="d-grid">
                        <Button
                          as={Link}
                          to="/configuracion"
                          variant="secondary"
                          size="lg"
                          className="h-100 d-flex flex-column align-items-center justify-content-center p-4"
                        >
                          <div style={{ fontSize: '2rem' }} className="mb-2">⚙️</div>
                          <span>Configuración</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Dashboard;
