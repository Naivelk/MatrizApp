import ConfiguracionBase from './ConfiguracionBase';
import { clasificacionRiesgoService } from '../../services/api';

const ConfiguracionClasificacionRiesgo = () => {
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Nivel', key: 'nivel' },
    { header: 'Límite Inferior', key: 'limite_inferior' },
    { header: 'Límite Superior', key: 'limite_superior' },
    { header: 'Respuesta', key: 'respuesta' }
  ];

  const formFields = [
    {
      name: 'nivel',
      label: 'Nivel',
      validation: { required: 'El nivel es requerido' }
    },
    {
      name: 'limite_inferior',
      label: 'Límite Inferior',
      type: 'number',
      validation: {
        required: 'El límite inferior es requerido',
        min: { value: 0, message: 'El límite inferior debe ser al menos 0' }
      }
    },
    {
      name: 'limite_superior',
      label: 'Límite Superior',
      type: 'number',
      validation: {
        required: 'El límite superior es requerido',
        min: { value: 0, message: 'El límite superior debe ser al menos 0' }
      }
    },
    {
      name: 'respuesta',
      label: 'Respuesta',
      validation: { required: 'La respuesta es requerida' }
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      type: 'textarea'
    },
    {
      name: 'tratamiento',
      label: 'Tratamiento',
      type: 'textarea'
    },
    {
      name: 'rol',
      label: 'Rol',
      type: 'text'
    }
  ];

  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.nivel}</td>
      <td>{item.limite_inferior}</td>
      <td>{item.limite_superior}</td>
      <td>{item.respuesta}</td>
    </>
  );

  // Transformar los datos del formulario
  const transformFormData = (data) => {
    return {
      ...data,
      limite_inferior: parseInt(data.limite_inferior),
      limite_superior: parseInt(data.limite_superior)
    };
  };

  return (
    <ConfiguracionBase
      title="Clasificación de Riesgo"
      service={clasificacionRiesgoService}
      columns={columns}
      formFields={formFields}
      renderRow={renderRow}
      transformFormData={transformFormData}
    />
  );
};

export default ConfiguracionClasificacionRiesgo;
