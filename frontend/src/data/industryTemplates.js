// Templates de riesgos por industria basados en estándares internacionales

export const industryTemplates = {
  financiera: {
    name: "Sector Financiero",
    description: "Templates basados en Basel III, PCI DSS y regulaciones financieras",
    icon: "🏦",
    frameworks: ["Basel III", "PCI DSS", "SOX", "GDPR"],
    riskCategories: [
      {
        category: "Riesgo de Crédito",
        risks: [
          {
            name: "Incumplimiento de pagos de clientes",
            description: "Riesgo de pérdidas por incumplimiento de obligaciones crediticias",
            probability: 3,
            impact: 4,
            controls: ["Análisis crediticio", "Garantías", "Seguimiento continuo"]
          },
          {
            name: "Concentración de cartera",
            description: "Riesgo por concentración excesiva en sectores o clientes",
            probability: 2,
            impact: 5,
            controls: ["Límites de exposición", "Diversificación", "Monitoreo"]
          }
        ]
      },
      {
        category: "Riesgo Operacional",
        risks: [
          {
            name: "Fraude interno",
            description: "Pérdidas por actos fraudulentos de empleados",
            probability: 2,
            impact: 4,
            controls: ["Segregación de funciones", "Auditoría interna", "Monitoreo"]
          },
          {
            name: "Fallas en sistemas de pago",
            description: "Interrupciones en sistemas críticos de procesamiento",
            probability: 3,
            impact: 5,
            controls: ["Redundancia", "Plan de contingencia", "Monitoreo 24/7"]
          }
        ]
      },
      {
        category: "Riesgo de Ciberseguridad",
        risks: [
          {
            name: "Ataques de ransomware",
            description: "Cifrado malicioso de datos críticos",
            probability: 3,
            impact: 5,
            controls: ["Backup", "Antimalware", "Capacitación", "Segmentación"]
          },
          {
            name: "Robo de datos de clientes",
            description: "Acceso no autorizado a información personal",
            probability: 4,
            impact: 5,
            controls: ["Cifrado", "Control de acceso", "DLP", "Monitoreo"]
          }
        ]
      }
    ]
  },
  
  salud: {
    name: "Sector Salud",
    description: "Templates basados en HIPAA, FDA y estándares médicos",
    icon: "🏥",
    frameworks: ["HIPAA", "FDA 21 CFR Part 11", "ISO 13485", "GDPR"],
    riskCategories: [
      {
        category: "Seguridad del Paciente",
        risks: [
          {
            name: "Errores en medicación",
            description: "Administración incorrecta de medicamentos",
            probability: 3,
            impact: 5,
            controls: ["Doble verificación", "Códigos de barras", "Capacitación"]
          },
          {
            name: "Infecciones nosocomiales",
            description: "Infecciones adquiridas en el hospital",
            probability: 4,
            impact: 4,
            controls: ["Protocolos de higiene", "Aislamiento", "Monitoreo"]
          }
        ]
      },
      {
        category: "Privacidad de Datos",
        risks: [
          {
            name: "Violación de HIPAA",
            description: "Acceso no autorizado a registros médicos",
            probability: 3,
            impact: 5,
            controls: ["Control de acceso", "Auditoría", "Cifrado", "Capacitación"]
          }
        ]
      }
    ]
  },
  
  manufactura: {
    name: "Manufactura",
    description: "Templates basados en ISO 9001, ISO 14001 y seguridad industrial",
    icon: "🏭",
    frameworks: ["ISO 9001", "ISO 14001", "OHSAS 18001", "ISO 27001"],
    riskCategories: [
      {
        category: "Seguridad Industrial",
        risks: [
          {
            name: "Accidentes laborales",
            description: "Lesiones o accidentes en el lugar de trabajo",
            probability: 3,
            impact: 4,
            controls: ["EPP", "Capacitación", "Señalización", "Mantenimiento"]
          },
          {
            name: "Fallas en maquinaria crítica",
            description: "Paradas no planificadas de equipos",
            probability: 4,
            impact: 3,
            controls: ["Mantenimiento preventivo", "Monitoreo", "Repuestos"]
          }
        ]
      },
      {
        category: "Calidad del Producto",
        risks: [
          {
            name: "Productos defectuosos",
            description: "Productos que no cumplen especificaciones",
            probability: 3,
            impact: 4,
            controls: ["Control de calidad", "Inspección", "Trazabilidad"]
          }
        ]
      }
    ]
  },
  
  tecnologia: {
    name: "Tecnología",
    description: "Templates basados en ISO 27001, NIST y mejores prácticas de TI",
    icon: "💻",
    frameworks: ["ISO 27001", "NIST Cybersecurity Framework", "COBIT", "ITIL"],
    riskCategories: [
      {
        category: "Ciberseguridad",
        risks: [
          {
            name: "Ataques DDoS",
            description: "Denegación de servicio distribuida",
            probability: 4,
            impact: 4,
            controls: ["CDN", "Rate limiting", "Monitoreo", "Plan de respuesta"]
          },
          {
            name: "Vulnerabilidades de software",
            description: "Fallas de seguridad en aplicaciones",
            probability: 4,
            impact: 3,
            controls: ["Pruebas de seguridad", "Parches", "Code review"]
          }
        ]
      },
      {
        category: "Disponibilidad",
        risks: [
          {
            name: "Caída de servicios críticos",
            description: "Interrupción de servicios esenciales",
            probability: 3,
            impact: 5,
            controls: ["Alta disponibilidad", "Backup", "Monitoreo", "SLA"]
          }
        ]
      }
    ]
  },
  
  educacion: {
    name: "Educación",
    description: "Templates basados en FERPA y estándares educativos",
    icon: "🎓",
    frameworks: ["FERPA", "COPPA", "GDPR", "ISO 27001"],
    riskCategories: [
      {
        category: "Privacidad Estudiantil",
        risks: [
          {
            name: "Violación de FERPA",
            description: "Acceso no autorizado a registros estudiantiles",
            probability: 2,
            impact: 4,
            controls: ["Control de acceso", "Capacitación", "Auditoría"]
          }
        ]
      },
      {
        category: "Continuidad Académica",
        risks: [
          {
            name: "Interrupción de clases virtuales",
            description: "Fallas en plataformas de educación en línea",
            probability: 3,
            impact: 3,
            controls: ["Redundancia", "Backup", "Plan de contingencia"]
          }
        ]
      }
    ]
  }
};

export const getIndustryTemplate = (industryKey) => {
  return industryTemplates[industryKey] || null;
};

export const getAllIndustries = () => {
  return Object.keys(industryTemplates).map(key => ({
    key,
    ...industryTemplates[key]
  }));
};
