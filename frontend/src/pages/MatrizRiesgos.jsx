import { useState, useEffect } from 'react';
import { Button, Modal, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { matrizRiesgosService, clasificacionRiesgoService } from '../services/api';
import MatrizTable from '../components/tables/MatrizTable';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import IndustryTemplateSelector from '../components/templates/IndustryTemplateSelector';
import PageHeader from '../components/common/PageHeader';

const MatrizRiesgos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [riesgos, setRiesgos] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [riesgoToDelete, setRiesgoToDelete] = useState(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [riesgosRes, clasificacionesRes] = await Promise.all([
          matrizRiesgosService.getAll(),
          clasificacionRiesgoService.getAll()
        ]);

        setRiesgos(riesgosRes.data);
        setClasificaciones(clasificacionesRes.data);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    setRiesgoToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await matrizRiesgosService.delete(riesgoToDelete);
      setRiesgos(riesgos.filter(riesgo => riesgo.id !== riesgoToDelete));
      setShowDeleteModal(false);
      setRiesgoToDelete(null);
    } catch (err) {
      setError(err.message || 'Error al eliminar el riesgo');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = async (selectedRisks, template) => {
    setLoading(true);
    try {
      const createdRisks = [];

      for (const risk of selectedRisks) {
        const riskData = {
          riesgo: risk.name,
          descripcion: risk.description,
          tipo_riesgo: risk.category,
          probabilidad_valor: risk.probability,
          impacto_valor: risk.impact,
          tipo_activo: 'Sistema',
          propietario: 'Por asignar',
          proceso: template.name,
          controles_existentes: risk.controls.join(', '),
          tratamiento: `Template aplicado: ${template.name}`,
          estado_implementacion: 'Pendiente'
        };

        const response = await matrizRiesgosService.create(riskData);
        createdRisks.push(response.data);
      }

      // Recargar la lista de riesgos
      const riesgosRes = await matrizRiesgosService.getAll();
      setRiesgos(riesgosRes.data);

      alert(`Se han creado ${createdRisks.length} riesgos basados en el template de ${template.name}`);
    } catch (err) {
      setError(err.message || 'Error al aplicar el template');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader
        title="Matriz de Riesgos"
        subtitle="Gestiona y evalúa los riesgos de tu organización"
        icon="🛡️"
      >
        <ButtonGroup>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Usar templates predefinidos por industria</Tooltip>}
          >
            <Button
              variant="outline-primary"
              onClick={() => setShowTemplateSelector(true)}
              className="d-flex align-items-center gap-2"
            >
              📋 <span>Templates</span>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Crear un nuevo riesgo manualmente</Tooltip>}
          >
            <Button
              as={Link}
              to="/crear-riesgo"
              variant="success"
              className="d-flex align-items-center gap-2"
            >
              ➕ <span>Crear Nuevo Riesgo</span>
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </PageHeader>

      <MatrizTable
        riesgos={riesgos}
        clasificaciones={clasificaciones}
        onDelete={handleDeleteClick}
      />

      {/* Modal de confirmación para eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar este riesgo? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Selector de Templates por Industria */}
      <IndustryTemplateSelector
        show={showTemplateSelector}
        onHide={() => setShowTemplateSelector(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
};

export default MatrizRiesgos;
