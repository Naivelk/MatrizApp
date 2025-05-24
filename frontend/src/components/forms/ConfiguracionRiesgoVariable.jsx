import ConfiguracionBase from './ConfiguracionBase';
import { riesgoVariableService } from '../../services/api';

const ConfiguracionRiesgoVariable = () => {
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Tipo', key: 'tipo' },
    { header: 'Amenaza', key: 'amenaza' },
    { header: 'Vulnerabilidad', key: 'vulnerabilidad' },
    { header: 'Riesgo', key: 'riesgo' }
  ];
  
  const formFields = [
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'Estratégico', label: 'Estratégico' },
        { value: 'Operativo', label: 'Operativo' },
        { value: 'Financiero', label: 'Financiero' },
        { value: 'Cumplimiento', label: 'Cumplimiento' },
        { value: 'Tecnológico', label: 'Tecnológico' },
        { value: 'Seguridad Digital', label: 'Seguridad Digital' }
      ],
      validation: { required: 'El tipo es requerido' }
    },
    {
      name: 'amenaza',
      label: 'Amenaza',
      validation: { required: 'La amenaza es requerida' }
    },
    {
      name: 'vulnerabilidad',
      label: 'Vulnerabilidad',
      validation: { required: 'La vulnerabilidad es requerida' }
    },
    {
      name: 'riesgo',
      label: 'Riesgo',
      validation: { required: 'El riesgo es requerido' }
    },
    {
      name: 'consecuencias',
      label: 'Consecuencias',
      type: 'textarea'
    }
  ];
  
  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.tipo}</td>
      <td>{item.amenaza}</td>
      <td>{item.vulnerabilidad}</td>
      <td>{item.riesgo}</td>
    </>
  );
  
  return (
    <ConfiguracionBase
      title="Riesgo Variable"
      service={riesgoVariableService}
      columns={columns}
      formFields={formFields}
      renderRow={renderRow}
    />
  );
};

export default ConfiguracionRiesgoVariable;
