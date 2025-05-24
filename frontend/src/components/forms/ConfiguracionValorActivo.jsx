import ConfiguracionBase from './ConfiguracionBase';
import { valorActivoService } from '../../services/api';

const ConfiguracionValorActivo = () => {
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Nivel', key: 'nivel' },
    { header: 'Descripción', key: 'descripcion' },
    { header: 'Confidencialidad', key: 'confidencialidad' },
    { header: 'Integridad', key: 'integridad' },
    { header: 'Disponibilidad', key: 'disponibilidad' },
    { header: 'Valor Total', key: 'valor_total' }
  ];
  
  const formFields = [
    {
      name: 'nivel',
      label: 'Nivel',
      type: 'number',
      validation: { 
        required: 'El nivel es requerido',
        min: { value: 1, message: 'El nivel debe ser al menos 1' },
        max: { value: 5, message: 'El nivel debe ser máximo 5' }
      }
    },
    {
      name: 'descripcion',
      label: 'Descripción',
      validation: { required: 'La descripción es requerida' }
    },
    {
      name: 'confidencialidad',
      label: 'Confidencialidad',
      type: 'number',
      validation: { 
        required: 'La confidencialidad es requerida',
        min: { value: 0, message: 'La confidencialidad debe ser al menos 0' },
        max: { value: 5, message: 'La confidencialidad debe ser máximo 5' }
      }
    },
    {
      name: 'integridad',
      label: 'Integridad',
      type: 'number',
      validation: { 
        required: 'La integridad es requerida',
        min: { value: 0, message: 'La integridad debe ser al menos 0' },
        max: { value: 5, message: 'La integridad debe ser máximo 5' }
      }
    },
    {
      name: 'disponibilidad',
      label: 'Disponibilidad',
      type: 'number',
      validation: { 
        required: 'La disponibilidad es requerida',
        min: { value: 0, message: 'La disponibilidad debe ser al menos 0' },
        max: { value: 5, message: 'La disponibilidad debe ser máximo 5' }
      }
    }
  ];
  
  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.nivel}</td>
      <td>{item.descripcion}</td>
      <td>{item.confidencialidad}</td>
      <td>{item.integridad}</td>
      <td>{item.disponibilidad}</td>
      <td>{item.valor_total?.toFixed(2)}</td>
    </>
  );
  
  // Transformar los datos del formulario para calcular el valor total
  const transformFormData = (data) => {
    const confidencialidad = parseFloat(data.confidencialidad);
    const integridad = parseFloat(data.integridad);
    const disponibilidad = parseFloat(data.disponibilidad);
    
    return {
      ...data,
      nivel: parseInt(data.nivel),
      confidencialidad,
      integridad,
      disponibilidad,
      valor_total: (confidencialidad + integridad + disponibilidad) / 3
    };
  };
  
  return (
    <ConfiguracionBase
      title="Valor de Activo"
      service={valorActivoService}
      columns={columns}
      formFields={formFields}
      renderRow={renderRow}
      transformFormData={transformFormData}
    />
  );
};

export default ConfiguracionValorActivo;
