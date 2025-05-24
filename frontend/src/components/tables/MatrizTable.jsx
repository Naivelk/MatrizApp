import { useState } from 'react';
import { Table, Button, Badge, Form, Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { exportToExcel, exportToPDF } from '../../services/exportService';

const MatrizTable = ({ riesgos, clasificaciones, onDelete }) => {
  const [filtros, setFiltros] = useState({
    activo: '',
    tipo: '',
    clasificacion: '',
    responsable: '',
    estado: ''
  });

  // Obtener valores únicos para los filtros
  const tiposActivo = [...new Set(riesgos.map(r => r.tipo_activo).filter(Boolean))];
  const responsables = [...new Set(riesgos.map(r => r.propietario).filter(Boolean))];
  // Obtener estados válidos: solo Pendiente, En Proceso, Implementado
  const estados = ['Pendiente', 'En Proceso', 'Implementado'];

  // Aplicar filtros
  const riesgosFiltrados = riesgos.filter(riesgo => {
    // Usar el campo estado_implementacion
    const estadoReal = riesgo.estado_implementacion || 'Pendiente';

    return (
      (filtros.activo === '' || (riesgo.riesgo && riesgo.riesgo.toLowerCase().includes(filtros.activo.toLowerCase()))) &&
      (filtros.tipo === '' || riesgo.tipo_activo === filtros.tipo) &&
      (filtros.clasificacion === '' || riesgo.zona_riesgo === filtros.clasificacion) &&
      (filtros.responsable === '' || riesgo.propietario === filtros.responsable) &&
      (filtros.estado === '' || estadoReal === filtros.estado)
    );
  });

  // Manejar cambios en los filtros
  const handleFiltroChange = (campo, valor) => {
    setFiltros({
      ...filtros,
      [campo]: valor
    });
  };

  // Obtener clase CSS según la clasificación del riesgo
  const getClasificacionClass = (zonaRiesgo) => {
    if (!zonaRiesgo) return '';

    const zonaLower = zonaRiesgo.toLowerCase();

    if (zonaLower.includes('baja') || zonaLower.includes('bajo')) {
      return 'riesgo-bajo';
    } else if (zonaLower.includes('media') || zonaLower.includes('moderado') || zonaLower.includes('moderada')) {
      return 'riesgo-moderado';
    } else if (zonaLower.includes('alta') || zonaLower.includes('alto')) {
      return 'riesgo-alto';
    } else if (zonaLower.includes('extrema') || zonaLower.includes('extremo')) {
      return 'riesgo-extremo';
    }

    return '';
  };

  // Exportar datos
  const handleExportExcel = () => {
    const dataToExport = riesgosFiltrados.map(riesgo => {
      // Determinar el estado de implementación
      const estado = riesgo.estado_implementacion || 'Pendiente';

      return {
        ID: riesgo.id,
        Activo: riesgo.riesgo || '',
        Tipo: riesgo.tipo_activo || '',
        Propietario: riesgo.propietario || '',
        Amenaza: riesgo.tipo_riesgo || '',
        Vulnerabilidad: riesgo.descripcion || '',
        Probabilidad: riesgo.probabilidad_valor || riesgo.probabilidad_desc || '',
        Impacto: riesgo.impacto_valor || riesgo.impacto_desc || '',
        'Nivel Riesgo': riesgo.nivel_riesgo?.toFixed(2) || '',
        Clasificación: riesgo.zona_riesgo || '',
        Control: riesgo.tipo_control || '',
        'Riesgo Residual': riesgo.nivel_riesgo?.toFixed(2) || '',
        'Clasificación Residual': riesgo.zona_riesgo || '',
        'Plan Tratamiento': riesgo.tratamiento || '',
        Responsable: riesgo.propietario || '',
        Estado: estado
      };
    });

    console.log("Datos a exportar a Excel:", dataToExport);
    exportToExcel(dataToExport, 'Matriz_Riesgos');
  };

  const handleExportPDF = () => {
    console.log("Datos a exportar a PDF:", riesgosFiltrados);
    try {
      // Preparar los datos en el formato esperado por la función exportToPDF
      const dataToExport = riesgosFiltrados.map(riesgo => {
        // Determinar el estado de implementación
        const estado = riesgo.estado_implementacion || 'Pendiente';

        return {
          ID: riesgo.id,
          Activo: riesgo.riesgo || '',
          Tipo: riesgo.tipo_activo || '',
          Propietario: riesgo.propietario || '',
          Amenaza: riesgo.tipo_riesgo || '',
          Vulnerabilidad: riesgo.descripcion || '',
          Probabilidad: riesgo.probabilidad_valor || riesgo.probabilidad_desc || '',
          Impacto: riesgo.impacto_valor || riesgo.impacto_desc || '',
          'Nivel Riesgo': riesgo.nivel_riesgo?.toFixed(2) || '',
          Clasificación: riesgo.zona_riesgo || '',
          Control: riesgo.tipo_control || '',
          'Riesgo Residual': riesgo.nivel_riesgo?.toFixed(2) || '',
          'Clasificación Residual': riesgo.zona_riesgo || '',
          'Plan Tratamiento': riesgo.tratamiento || '',
          Responsable: riesgo.propietario || '',
          Estado: estado
        };
      });

      console.log("Datos formateados para PDF:", dataToExport);
      exportToPDF(dataToExport, 'Matriz_Riesgos');
    } catch (error) {
      console.error("Error al exportar a PDF:", error);
      alert("Error al generar el PDF. Por favor, revise la consola para más detalles.");
    }
  };

  return (
    <div>
      <Row className="mb-2">
        <Col md={8}>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>Use estos filtros para encontrar riesgos específicos. Los filtros se aplican en tiempo real y puede combinar múltiples criterios.</Tooltip>}
          >
            <h6 style={{ cursor: 'help', color: '#6c757d' }}>🔍 Filtros de Búsqueda ℹ️</h6>
          </OverlayTrigger>
        </Col>
        <Col md={4} className="text-end">
          <div className="d-flex align-items-center justify-content-end">
            <span className="me-3 text-muted">
              Mostrando {riesgosFiltrados.length} de {riesgos.length} riesgos
            </span>
            {(filtros.activo || filtros.tipo || filtros.clasificacion || filtros.responsable || filtros.estado) && (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Limpiar todos los filtros aplicados</Tooltip>}
              >
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setFiltros({
                    activo: '',
                    tipo: '',
                    clasificacion: '',
                    responsable: '',
                    estado: ''
                  })}
                >
                  🗑️ Limpiar Filtros
                </Button>
              </OverlayTrigger>
            )}
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={2}>
          <Form.Group controlId="filtroActivo">
            <Form.Label>
              🎯 Activo
              {filtros.activo && <Badge bg="primary" className="ms-1">Activo</Badge>}
            </Form.Label>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Busque por nombre del activo. La búsqueda es en tiempo real.</Tooltip>}
            >
              <Form.Control
                type="text"
                value={filtros.activo}
                onChange={(e) => handleFiltroChange('activo', e.target.value)}
                placeholder="Buscar por activo..."
                style={{ cursor: 'help' }}
              />
            </OverlayTrigger>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="filtroTipo">
            <Form.Label>
              📁 Tipo de Activo
              {filtros.tipo && <Badge bg="info" className="ms-1">Filtrado</Badge>}
            </Form.Label>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Filtre por tipo de activo. Mostrando {tiposActivo.length} tipos disponibles.</Tooltip>}
            >
              <Form.Select
                value={filtros.tipo}
                onChange={(e) => handleFiltroChange('tipo', e.target.value)}
                style={{ cursor: 'help' }}
              >
                <option value="">Todos ({tiposActivo.length})</option>
                {tiposActivo.map((tipo, index) => {
                  const count = riesgos.filter(r => r.tipo_activo === tipo).length;
                  return (
                    <option key={index} value={tipo}>{tipo} ({count})</option>
                  );
                })}
              </Form.Select>
            </OverlayTrigger>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="filtroClasificacion">
            <Form.Label>
              ⚠️ Clasificación
              {filtros.clasificacion && <Badge bg="warning" className="ms-1">Filtrado</Badge>}
            </Form.Label>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Filtre por nivel de riesgo (Bajo, Medio, Alto, Crítico)</Tooltip>}
            >
              <Form.Select
                value={filtros.clasificacion}
                onChange={(e) => handleFiltroChange('clasificacion', e.target.value)}
                style={{ cursor: 'help' }}
              >
                <option value="">Todas</option>
                {[...new Set(riesgos.map(r => r.zona_riesgo).filter(Boolean))].map((zona, index) => {
                  const count = riesgos.filter(r => r.zona_riesgo === zona).length;
                  return (
                    <option key={index} value={zona}>
                      {zona} ({count})
                    </option>
                  );
                })}
              </Form.Select>
            </OverlayTrigger>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="filtroResponsable">
            <Form.Label>
              👤 Responsable
              {filtros.responsable && <Badge bg="success" className="ms-1">Filtrado</Badge>}
            </Form.Label>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Filtre por responsable del riesgo. Mostrando {responsables.length} responsables.</Tooltip>}
            >
              <Form.Select
                value={filtros.responsable}
                onChange={(e) => handleFiltroChange('responsable', e.target.value)}
                style={{ cursor: 'help' }}
              >
                <option value="">Todos ({responsables.length})</option>
                {responsables.map((responsable, index) => {
                  const count = riesgos.filter(r => r.propietario === responsable).length;
                  return (
                    <option key={index} value={responsable}>{responsable} ({count})</option>
                  );
                })}
              </Form.Select>
            </OverlayTrigger>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="filtroEstado">
            <Form.Label>
              🎯 Estado
              {filtros.estado && <Badge bg="danger" className="ms-1">Filtrado</Badge>}
            </Form.Label>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Filtre por estado de implementación del control</Tooltip>}
            >
              <Form.Select
                value={filtros.estado}
                onChange={(e) => handleFiltroChange('estado', e.target.value)}
                style={{ cursor: 'help' }}
              >
                <option value="">Todos</option>
                <option value="Pendiente">
                  🔴 Pendiente ({riesgos.filter(r => (r.estado_implementacion || 'Pendiente') === 'Pendiente').length})
                </option>
                <option value="En Proceso">
                  🟡 En Proceso ({riesgos.filter(r => r.estado_implementacion === 'En Proceso').length})
                </option>
                <option value="Implementado">
                  🟢 Implementado ({riesgos.filter(r => r.estado_implementacion === 'Implementado').length})
                </option>
              </Form.Select>
            </OverlayTrigger>
          </Form.Group>
        </Col>
        <Col md={2} className="d-flex align-items-end">
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Exportar matriz de riesgos a Excel con colores según estado de implementación</Tooltip>}
            >
              <Button variant="success" onClick={handleExportExcel} className="me-2">
                📊 Excel
              </Button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Exportar matriz de riesgos a PDF para reportes oficiales</Tooltip>}
            >
              <Button variant="danger" onClick={handleExportPDF}>
                📄 PDF
              </Button>
            </OverlayTrigger>
          </div>
        </Col>
      </Row>

      {/* Mostrar filtros activos */}
      {(filtros.activo || filtros.tipo || filtros.clasificacion || filtros.responsable || filtros.estado) && (
        <Row className="mb-3">
          <Col md={12}>
            <Card className="bg-light">
              <Card.Body className="py-2">
                <div className="d-flex align-items-center flex-wrap">
                  <span className="me-2 text-muted">
                    <strong>Filtros activos:</strong>
                  </span>
                  {filtros.activo && (
                    <Badge bg="primary" className="me-2 mb-1">
                      Activo: "{filtros.activo}"
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 ms-1 text-white"
                        onClick={() => handleFiltroChange('activo', '')}
                        style={{ textDecoration: 'none' }}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filtros.tipo && (
                    <Badge bg="info" className="me-2 mb-1">
                      Tipo: {filtros.tipo}
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 ms-1 text-white"
                        onClick={() => handleFiltroChange('tipo', '')}
                        style={{ textDecoration: 'none' }}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filtros.clasificacion && (
                    <Badge bg="warning" className="me-2 mb-1">
                      Clasificación: {filtros.clasificacion}
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 ms-1 text-dark"
                        onClick={() => handleFiltroChange('clasificacion', '')}
                        style={{ textDecoration: 'none' }}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filtros.responsable && (
                    <Badge bg="success" className="me-2 mb-1">
                      Responsable: {filtros.responsable}
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 ms-1 text-white"
                        onClick={() => handleFiltroChange('responsable', '')}
                        style={{ textDecoration: 'none' }}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                  {filtros.estado && (
                    <Badge bg="danger" className="me-2 mb-1">
                      Estado: {filtros.estado}
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 ms-1 text-white"
                        onClick={() => handleFiltroChange('estado', '')}
                        style={{ textDecoration: 'none' }}
                      >
                        ×
                      </Button>
                    </Badge>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <div className="table-container">
        <Table striped bordered hover responsive className="matriz-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Activo</th>
              <th>Tipo</th>
              <th>Amenaza</th>
              <th>Vulnerabilidad</th>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Probabilidad de ocurrencia del riesgo (1-5)</Tooltip>}
              >
                <th style={{ cursor: 'help' }}>Prob. ℹ️</th>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Nivel de impacto si ocurre el riesgo (1-5)</Tooltip>}
              >
                <th style={{ cursor: 'help' }}>Impacto ℹ️</th>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Nivel de riesgo calculado (Probabilidad × Impacto)</Tooltip>}
              >
                <th style={{ cursor: 'help' }}>Nivel Riesgo ℹ️</th>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Clasificación del riesgo según su nivel (Bajo, Medio, Alto, Crítico)</Tooltip>}
              >
                <th style={{ cursor: 'help' }}>Clasificación ℹ️</th>
              </OverlayTrigger>
              <th>Control</th>
              <th>Riesgo Residual</th>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div>
                      <strong>Estado de implementación:</strong><br/>
                      🔴 Pendiente: Control no implementado<br/>
                      🟡 En Proceso: Control en implementación<br/>
                      🟢 Implementado: Control completamente implementado
                    </div>
                  </Tooltip>
                }
              >
                <th style={{ cursor: 'help' }}>Estado ℹ️</th>
              </OverlayTrigger>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {riesgosFiltrados.length > 0 ? (
              riesgosFiltrados.map(riesgo => (
                <tr key={riesgo.id}>
                  <td>
                    {riesgo.id}
                    {console.log("ID del riesgo en la tabla:", riesgo.id, "Tipo:", typeof riesgo.id)}
                  </td>
                  <td>{riesgo.riesgo}</td>
                  <td>{riesgo.tipo_activo}</td>
                  <td>{riesgo.tipo_riesgo}</td>
                  <td>{riesgo.descripcion}</td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Probabilidad: {riesgo.probabilidad_desc || 'No especificada'}</Tooltip>}
                  >
                    <td style={{ cursor: 'help' }}>{riesgo.probabilidad_valor || riesgo.probabilidad_desc || '-'}</td>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Impacto: {riesgo.impacto_desc || 'No especificado'}</Tooltip>}
                  >
                    <td style={{ cursor: 'help' }}>{riesgo.impacto_valor || riesgo.impacto_desc || '-'}</td>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Cálculo: {riesgo.probabilidad_valor || 0} × {riesgo.impacto_valor || 0} = {riesgo.nivel_riesgo?.toFixed(2) || 0}</Tooltip>}
                  >
                    <td style={{ cursor: 'help', fontWeight: 'bold' }}>{riesgo.nivel_riesgo?.toFixed(2)}</td>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Zona de riesgo basada en el nivel calculado</Tooltip>}
                  >
                    <td className={getClasificacionClass(riesgo.zona_riesgo)} style={{ cursor: 'help' }}>
                      {riesgo.zona_riesgo || '-'}
                    </td>
                  </OverlayTrigger>
                  <td>{riesgo.tipo_control}</td>
                  <td className={getClasificacionClass(riesgo.zona_riesgo)}>
                    {riesgo.nivel_riesgo?.toFixed(2)}
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          {riesgo.estado_implementacion === 'Implementado'
                            ? 'Control completamente implementado y funcionando'
                            : riesgo.estado_implementacion === 'En Proceso'
                            ? 'Control en proceso de implementación'
                            : 'Control pendiente de implementación - Requiere atención'}
                        </Tooltip>
                      }
                    >
                      <Badge
                        bg={
                          riesgo.estado_implementacion === 'Implementado' ? 'success' :
                          riesgo.estado_implementacion === 'En Proceso' ? 'warning' : 'danger'
                        }
                        style={{ cursor: 'help' }}
                      >
                        {riesgo.estado_implementacion === 'Implementado' ? '🟢' :
                         riesgo.estado_implementacion === 'En Proceso' ? '🟡' : '🔴'} {riesgo.estado_implementacion || 'Pendiente'}
                      </Badge>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <Link
                      to={`/ver-riesgo/${encodeURIComponent(riesgo.id)}`}
                      className="btn btn-info btn-sm me-1"
                      onClick={(e) => {
                        console.log("Clic en Ver riesgo con ID:", riesgo.id);
                        console.log("URL generada:", `/ver-riesgo/${encodeURIComponent(riesgo.id)}`);

                        // Si el ID no es válido, prevenir la navegación
                        if (!riesgo.id) {
                          e.preventDefault();
                          console.error("ID no válido:", riesgo.id);
                          alert("Error: ID de riesgo no válido");
                        }
                      }}
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/editar-riesgo/${encodeURIComponent(riesgo.id)}`}
                      className="btn btn-primary btn-sm me-1"
                      onClick={(e) => {
                        console.log("Clic en Editar riesgo con ID:", riesgo.id);
                        console.log("URL generada:", `/editar-riesgo/${encodeURIComponent(riesgo.id)}`);

                        // Si el ID no es válido, prevenir la navegación
                        if (!riesgo.id) {
                          e.preventDefault();
                          console.error("ID no válido:", riesgo.id);
                          alert("Error: ID de riesgo no válido");
                        }
                      }}
                    >
                      Editar
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        console.log("Clic en Eliminar riesgo con ID:", riesgo.id);
                        onDelete(riesgo.id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">No se encontraron registros</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MatrizTable;
