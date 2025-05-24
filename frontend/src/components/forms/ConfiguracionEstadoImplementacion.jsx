import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ConfiguracionEstadoImplementacion = () => {
  // Estados predefinidos
  const estadosImplementacionDefault = [
    { id: 1, nombre: 'Pendiente', color: '#dc3545', descripcion: 'El control aún no ha sido implementado' },
    { id: 2, nombre: 'En Proceso', color: '#ffc107', descripcion: 'El control está en proceso de implementación' },
    { id: 3, nombre: 'Implementado', color: '#28a745', descripcion: 'El control ha sido implementado completamente' }
  ];

  // Cargar estados desde localStorage o usar los predeterminados
  const loadEstados = () => {
    const savedEstados = localStorage.getItem('estadosImplementacionColors');
    return savedEstados ? JSON.parse(savedEstados) : estadosImplementacionDefault;
  };

  const [items, setItems] = useState(loadEstados());
  const [successMessage, setSuccessMessage] = useState(null);

  // Mostrar mensaje de éxito y ocultarlo después de 3 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);



  return (
    <div>
      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Estados de Implementación</h5>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <p className="text-muted">
            Los estados de implementación determinan el progreso en la aplicación de controles para mitigar los riesgos.
            Estos estados se muestran con colores distintivos en la matriz de riesgos y en los reportes exportados.
          </p>
        </Card.Body>
      </Card>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Color</th>
            <th>Descripción</th>

          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>
                <div
                  style={{
                    backgroundColor: item.color,
                    width: '30px',
                    height: '30px',
                    borderRadius: '4px',
                    border: '1px solid #dee2e6'
                  }}
                />
              </td>
              <td>{item.descripcion}</td>

            </tr>
          ))}
        </tbody>
      </Table>


    </div>
  );
};

export default ConfiguracionEstadoImplementacion;
