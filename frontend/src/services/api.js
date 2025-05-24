import axios from 'axios';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Contexto
export const contextoService = {
  getAll: (params) => api.get('/contextos/', { params }),
  getById: (id) => api.get(`/contextos/${id}`),
  create: (data) => api.post('/contextos/', data),
  update: (id, data) => api.put(`/contextos/${id}`, data),
  delete: (id) => api.delete(`/contextos/${id}`),
};

// Servicios para Riesgo Variable
export const riesgoVariableService = {
  getAll: (params) => api.get('/riesgos-variables/', { params }),
  getById: (id) => api.get(`/riesgos-variables/${id}`),
  create: (data) => api.post('/riesgos-variables/', data),
  update: (id, data) => api.put(`/riesgos-variables/${id}`, data),
  delete: (id) => api.delete(`/riesgos-variables/${id}`),
};

// Servicios para Causas
export const causasService = {
  getAll: (params) => api.get('/causas/', { params }),
  getById: (id) => api.get(`/causas/${id}`),
  create: (data) => api.post('/causas/', data),
  update: (id, data) => api.put(`/causas/${id}`, data),
  delete: (id) => api.delete(`/causas/${id}`),
};

// Servicios para Valor Activo
export const valorActivoService = {
  getAll: (params) => api.get('/valores-activos/', { params }),
  getById: (id) => api.get(`/valores-activos/${id}`),
  create: (data) => api.post('/valores-activos/', data),
  update: (id, data) => api.put(`/valores-activos/${id}`, data),
  delete: (id) => api.delete(`/valores-activos/${id}`),
};

// Servicios para Impacto
export const impactoService = {
  getAll: (params) => api.get('/impactos/', { params }),
  getById: (id) => api.get(`/impactos/${id}`),
  create: (data) => api.post('/impactos/', data),
  update: (id, data) => api.put(`/impactos/${id}`, data),
  delete: (id) => api.delete(`/impactos/${id}`),
};

// Servicios para Probabilidad
export const probabilidadService = {
  getAll: (params) => api.get('/probabilidades/', { params }),
  getById: (id) => api.get(`/probabilidades/${id}`),
  create: (data) => api.post('/probabilidades/', data),
  update: (id, data) => api.put(`/probabilidades/${id}`, data),
  delete: (id) => api.delete(`/probabilidades/${id}`),
};

// Servicios para Clasificación de Riesgo
export const clasificacionRiesgoService = {
  getAll: (params) => api.get('/clasificaciones-riesgo/', { params }),
  getById: (id) => api.get(`/clasificaciones-riesgo/${id}`),
  create: (data) => api.post('/clasificaciones-riesgo/', data),
  update: (id, data) => api.put(`/clasificaciones-riesgo/${id}`, data),
  delete: (id) => api.delete(`/clasificaciones-riesgo/${id}`),
};

// Servicios para Tipo de Control
export const tipoControlService = {
  getAll: (params) => api.get('/tipos-control/', { params }),
  getById: (id) => api.get(`/tipos-control/${id}`),
  create: (data) => api.post('/tipos-control/', data),
  update: (id, data) => api.put(`/tipos-control/${id}`, data),
  delete: (id) => api.delete(`/tipos-control/${id}`),
};

// Servicios para Matriz de Riesgos
export const matrizRiesgosService = {
  getAll: (params) => {
    console.log("Solicitando todos los riesgos con parámetros:", params);
    return api.get('/matriz-riesgos/', { params });
  },
  getById: (id) => {
    console.log("Solicitando riesgo con ID:", id);
    if (!id) {
      console.error("ID no válido:", id);
      return Promise.reject(new Error("ID no válido"));
    }
    return api.get(`/matriz-riesgos/${id}`);
  },
  create: (data) => {
    console.log("Creando nuevo riesgo con datos:", data);
    return api.post('/matriz-riesgos/', data);
  },
  update: (id, data) => {
    console.log("Actualizando riesgo con ID:", id, "y datos:", data);

    // Crear una copia de los datos para no modificar el objeto original
    const dataToSend = { ...data };

    // Asegurarnos de que estado_implementacion tenga un valor válido
    if (!dataToSend.estado_implementacion) {
      dataToSend.estado_implementacion = 'Pendiente';
    }

    console.log("Datos a enviar:", dataToSend);
    return api.put(`/matriz-riesgos/${id}`, dataToSend);
  },
  delete: (id) => {
    console.log("Eliminando riesgo con ID:", id);
    return api.delete(`/matriz-riesgos/${id}`);
  },
};
