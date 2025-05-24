import ConfiguracionBase from './ConfiguracionBase';
import { tipoControlService } from '../../services/api';

const ConfiguracionTipoControl = () => {
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Nombre', key: 'nombre' }
  ];

  const formFields = [
    {
      name: 'nombre',
      label: 'Nombre',
      validation: { required: 'El nombre es requerido' }
    }
  ];

  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.nombre}</td>
    </>
  );

  // No necesitamos transformar los datos
  const transformFormData = (data) => {
    return data;
  };

  return (
    <ConfiguracionBase
      title="Tipo de Control"
      service={tipoControlService}
      columns={columns}
      formFields={formFields}
      renderRow={renderRow}
      transformFormData={transformFormData}
    />
  );
};

export default ConfiguracionTipoControl;
