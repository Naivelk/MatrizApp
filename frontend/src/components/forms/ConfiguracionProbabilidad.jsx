import ConfiguracionBase from './ConfiguracionBase';
import { probabilidadService } from '../../services/api';

const ConfiguracionProbabilidad = () => {
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Nivel', key: 'nivel' },
    { header: 'Valor', key: 'valor' },
    { header: 'Descripción', key: 'descripcion' }
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
      name: 'descripcion',
      label: 'Descripción',
      validation: { required: 'La descripción es requerida' }
    },
    {
      name: 'frecuencia',
      label: 'Frecuencia'
    }
  ];

  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.nivel}</td>
      <td>{item.valor}</td>
      <td>{item.descripcion}</td>
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
      title="Probabilidad"
      service={probabilidadService}
      columns={columns}
      formFields={formFields}
      renderRow={renderRow}
      transformFormData={transformFormData}
    />
  );
};

export default ConfiguracionProbabilidad;
