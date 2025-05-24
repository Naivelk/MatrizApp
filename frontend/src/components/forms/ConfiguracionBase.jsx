import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

const ConfiguracionBase = ({
  title,
  service,
  columns,
  formFields,
  renderRow,
  initialFormValues = {},
  transformFormData = (data) => data,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Cargar datos
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await service.getAll();
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || `Error al cargar los ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mostrar mensaje de éxito y ocultarlo después de 3 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Abrir modal para crear
  const handleCreate = () => {
    setEditingItem(null);
    reset(initialFormValues);
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEdit = (item) => {
    setEditingItem(item);
    reset(item);
    setShowModal(true);
  };

  // Abrir modal para eliminar
  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  // Guardar (crear o actualizar)
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const transformedData = transformFormData(data);

      if (editingItem) {
        await service.update(editingItem.id, transformedData);
        setSuccessMessage(`${title} actualizado correctamente`);
      } else {
        await service.create(transformedData);
        setSuccessMessage(`${title} creado correctamente`);
      }

      setShowModal(false);
      fetchData();
    } catch (err) {
      setError(err.message || `Error al guardar el ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  // Confirmar eliminación
  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await service.delete(itemToDelete.id);
      setSuccessMessage(`${title} eliminado correctamente`);
      setShowDeleteModal(false);
      fetchData();
    } catch (err) {
      setError(err.message || `Error al eliminar el ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && items.length === 0) return <Loading />;

  return (
    <div>
      {error && <ErrorMessage message={error} />}

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>{title}</h5>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                {renderRow(item)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No hay registros
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingItem ? `Editar ${title}` : `Crear ${title}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formFields.map((field) => (
              <Form.Group key={field.name} className="mb-3" controlId={field.name}>
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'select' ? (
                  <Form.Select
                    {...register(field.name, field.validation)}
                    isInvalid={!!errors[field.name]}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                ) : field.type === 'textarea' ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register(field.name, field.validation)}
                    isInvalid={!!errors[field.name]}
                  />
                ) : field.type === 'color' ? (
                  <Form.Control
                    type="color"
                    {...register(field.name, field.validation)}
                    isInvalid={!!errors[field.name]}
                  />
                ) : (
                  <Form.Control
                    type={field.type || 'text'}
                    {...register(field.name, field.validation)}
                    isInvalid={!!errors[field.name]}
                  />
                )}
                <Form.Control.Feedback type="invalid">
                  {errors[field.name]?.message}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar este {title.toLowerCase()}? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm} disabled={loading}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfiguracionBase;
