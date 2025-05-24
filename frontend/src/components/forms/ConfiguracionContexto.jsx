import ConfiguracionBase from './ConfiguracionBase';
import { contextoService } from '../../services/api';

const ConfiguracionContexto = () => {
  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Institución', key: 'institucion' },
    { header: 'Proceso', key: 'proceso' },
    { header: 'Líder', key: 'lider' }
  ];

  const formFields = [
    {
      name: 'institucion',
      label: 'Institución',
      validation: {
        required: 'La institución es requerida',
        minLength: { value: 3, message: 'La institución debe tener al menos 3 caracteres' }
      }
    },
    {
      name: 'proceso',
      label: 'Proceso',
      validation: {
        required: 'El proceso es requerido',
        minLength: { value: 3, message: 'El proceso debe tener al menos 3 caracteres' }
      }
    },
    {
      name: 'lider',
      label: 'Líder'
    },
    {
      name: 'fecha',
      label: 'Fecha',
      type: 'date'
    },
    {
      name: 'objetivo',
      label: 'Objetivo',
      type: 'textarea'
    },
    {
      name: 'alcance',
      label: 'Alcance',
      type: 'textarea'
    },
    {
      name: 'enfoque_metodologico',
      label: 'Enfoque Metodológico',
      type: 'textarea'
    },
    {
      name: 'criterios_valoracion',
      label: 'Criterios de Valoración',
      type: 'textarea'
    },
    {
      name: 'criterios_probabilidad',
      label: 'Criterios de Probabilidad',
      type: 'textarea'
    }
  ];

  const renderRow = (item) => (
    <>
      <td>{item.id}</td>
      <td>{item.institucion || '-'}</td>
      <td>{item.proceso || '-'}</td>
      <td>{item.lider || '-'}</td>
    </>
  );

  return (
    <ConfiguracionBase
      title="Contexto"
      service={contextoService}
      columns={columns}
      formFields={formFields}
      renderRow={renderRow}
    />
  );
};

export default ConfiguracionContexto;
