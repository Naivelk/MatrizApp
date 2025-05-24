import ConfiguracionBase from './ConfiguracionBase';
import { impactoService } from '../../services/api';

const ConfiguracionImpacto = () => {
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Nivel', key: 'nivel' },
    { header: 'Valor', key: 'valor' }
  ];

  const formFields = [
    {
      name: 'nivel',
      label: 'Nivel',
      validation: {
        required: 'El nivel es requerido',
        minLength: { value: 1, message: 'El nivel debe tener al menos 1 carácter' }
      }
    },
    {
      name: 'valor',
      label: 'Valor',
      type: 'number',
      validation: {
        required: 'El valor es requerido',
        min: { value: 1, message: 'El valor debe ser al menos 1' },
        max: { value: 5, message: 'El valor debe ser máximo 5' }
      }
    },
    {
      name: 'financiero',
      label: 'Impacto Financiero',
      type: 'textarea'
    },
    {
      name: 'continuidad_operativa',
      label: 'Continuidad Operativa',
      type: 'textarea'
    },
    {
      name: 'imagen',
      label: 'Imagen',
      type: 'textarea'
    },
    {
      name: 'legal',
      label: 'Impacto Legal',
      type: 'textarea'
    }
  ];

  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.nivel}</td>
      <td>{item.valor}</td>
    </>
  );

  // Transformar los datos del formulario
  const transformFormData = (data) => {
    return {
      ...data,
      valor: parseInt(data.valor)
    };
  };

  return (
    <ConfiguracionBase
      title="Impacto"
      service={impactoService}
      columns={columns}
      formFields={formFields}
      renderRow={renderRow}
      transformFormData={transformFormData}
    />
  );
};

export default ConfiguracionImpacto;
