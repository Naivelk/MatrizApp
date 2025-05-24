import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
// Importar jspdf-autotable correctamente
import autoTable from 'jspdf-autotable';

// Función para exportar a Excel (HTML que se abre en Excel)
export const exportToExcel = (data, fileName) => {
  // Crear una tabla HTML con estilos
  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:x="urn:schemas-microsoft-com:office:excel"
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Matriz de Riesgos</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #E0E0E0; font-weight: bold; text-align: center; }
          .pendiente { background-color: #FFCCCC !important; mso-pattern:auto none; } /* Rojo pastel */
          .en-proceso { background-color: #FFFFCC !important; mso-pattern:auto none; } /* Amarillo pastel */
          .implementado { background-color: #CCFFCC !important; mso-pattern:auto none; } /* Verde pastel */
          .titulo { font-size: 18px; font-weight: bold; text-align: center; padding: 10px; background-color: #D9EAD3; }
          .subtitulo { font-size: 12px; text-align: center; padding: 5px; }
          .leyenda { font-size: 12px; font-weight: bold; padding: 5px; }
          .leyenda-item { padding: 5px; margin: 2px; }
          .centrado { text-align: center; }
          .negrita { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="titulo">Matriz de Riesgos</div>
        <div class="subtitulo">Fecha de exportación: ${new Date().toLocaleDateString()}</div>
        <br>
        <div class="leyenda">Los colores indican el estado de implementación:</div>
        <div class="leyenda-item pendiente">- Rojo: Pendiente</div>
        <div class="leyenda-item en-proceso">- Amarillo: En Proceso</div>
        <div class="leyenda-item implementado">- Verde: Implementado</div>
        <br>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Activo</th>
              <th>Tipo</th>
              <th>Amenaza</th>
              <th>Vulnerabilidad</th>
              <th>Probabilidad</th>
              <th>Impacto</th>
              <th>Nivel Riesgo</th>
              <th>Clasificación</th>
              <th>Control</th>
              <th>Riesgo Residual</th>
              <th>Clasificación Residual</th>
              <th>Plan Tratamiento</th>
              <th>Responsable</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
  `;

  // Añadir filas con datos y colores según el estado
  data.forEach(item => {
    let rowClass = '';
    if (item.Estado === 'Pendiente') {
      rowClass = 'pendiente';
    } else if (item.Estado === 'En Proceso') {
      rowClass = 'en-proceso';
    } else if (item.Estado === 'Implementado') {
      rowClass = 'implementado';
    }

    html += `
      <tr class="${rowClass}">
        <td class="centrado">${item.ID || ''}</td>
        <td class="negrita">${item.Activo || ''}</td>
        <td>${item.Tipo || ''}</td>
        <td>${item.Amenaza || ''}</td>
        <td>${item.Vulnerabilidad || ''}</td>
        <td class="centrado">${item.Probabilidad || ''}</td>
        <td class="centrado">${item.Impacto || ''}</td>
        <td class="centrado">${item['Nivel Riesgo'] || ''}</td>
        <td>${item.Clasificación || ''}</td>
        <td>${item.Control || ''}</td>
        <td class="centrado">${item['Riesgo Residual'] || ''}</td>
        <td>${item['Clasificación Residual'] || ''}</td>
        <td>${item['Plan Tratamiento'] || ''}</td>
        <td>${item.Responsable || ''}</td>
        <td class="negrita">${item.Estado || ''}</td>
      </tr>
    `;
  });

  html += `
          </tbody>
        </table>
      </body>
    </html>
  `;

  // Crear un blob con el HTML
  const blob = new Blob([html], { type: 'application/vnd.ms-excel' });

  // Crear un enlace para descargar el archivo
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xls`;

  // Simular un clic en el enlace para iniciar la descarga
  document.body.appendChild(link);
  link.click();

  // Limpiar
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

// Función para exportar a PDF
export const exportToPDF = (data, fileName) => {
  try {
    console.log("Iniciando exportación a PDF con datos:", data);

    // Crear un nuevo documento PDF en orientación horizontal
    const doc = new jsPDF('landscape');

    // Título
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text('Matriz de Riesgos', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });

    // Fecha de generación
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha de exportación: ${new Date().toLocaleDateString()}`, doc.internal.pageSize.getWidth() / 2, 22, { align: 'center' });

    // Leyenda de colores
    doc.setFontSize(9);
    doc.text('Los colores indican el estado de implementación:', 14, 30);

    // Rojo - Pendiente
    doc.setFillColor(255, 204, 204);
    doc.rect(14, 33, 8, 4, 'F');
    doc.text('Pendiente', 24, 36);

    // Amarillo - En Proceso
    doc.setFillColor(255, 255, 204);
    doc.rect(50, 33, 8, 4, 'F');
    doc.text('En Proceso', 60, 36);

    // Verde - Implementado
    doc.setFillColor(204, 255, 204);
    doc.rect(90, 33, 8, 4, 'F');
    doc.text('Implementado', 100, 36);

    // Definir las columnas para la tabla
    const columns = [
      { header: 'ID', dataKey: 'ID' },
      { header: 'Activo', dataKey: 'Activo' },
      { header: 'Tipo', dataKey: 'Tipo' },
      { header: 'Amenaza', dataKey: 'Amenaza' },
      { header: 'Vulnerabilidad', dataKey: 'Vulnerabilidad' },
      { header: 'Prob.', dataKey: 'Probabilidad' },
      { header: 'Impacto', dataKey: 'Impacto' },
      { header: 'Nivel Riesgo', dataKey: 'Nivel Riesgo' },
      { header: 'Clasificación', dataKey: 'Clasificación' },
      { header: 'Control', dataKey: 'Control' },
      { header: 'Riesgo Residual', dataKey: 'Riesgo Residual' },
      { header: 'Estado', dataKey: 'Estado' }
    ];

    // Preparar los datos para la tabla
    const rows = data.map(item => {
      return {
        ID: item.ID || '',
        Activo: item.Activo || '',
        Tipo: item.Tipo || '',
        Amenaza: item.Amenaza || '',
        Vulnerabilidad: item.Vulnerabilidad || '',
        Probabilidad: item.Probabilidad || '',
        Impacto: item.Impacto || '',
        'Nivel Riesgo': item['Nivel Riesgo'] || '',
        Clasificación: item.Clasificación || '',
        Control: item.Control || '',
        'Riesgo Residual': item['Riesgo Residual'] || '',
        Estado: item.Estado || 'Pendiente'
      };
    });

    // Generar la tabla
    autoTable(doc, {
      columns: columns,
      body: rows,
      startY: 40,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [52, 73, 94],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        ID: { halign: 'center' },
        Activo: { fontStyle: 'bold' },
        Probabilidad: { halign: 'center' },
        Impacto: { halign: 'center' },
        'Nivel Riesgo': { halign: 'center' },
        'Riesgo Residual': { halign: 'center' },
        Estado: { halign: 'center', fontStyle: 'bold' }
      },
      // Aplicar colores según el estado
      didParseCell: function(data) {
        if (data.section === 'body') {
          const estado = data.row.raw.Estado;
          if (estado === 'Pendiente') {
            data.cell.styles.fillColor = [255, 204, 204];
          } else if (estado === 'En Proceso') {
            data.cell.styles.fillColor = [255, 255, 204];
          } else if (estado === 'Implementado') {
            data.cell.styles.fillColor = [204, 255, 204];
          }
        }
      },
      // Añadir pie de página
      didDrawPage: function(data) {
        // Número de página
        doc.setFontSize(8);
        doc.text(`Página ${doc.internal.getNumberOfPages()}`,
                data.settings.margin.left,
                doc.internal.pageSize.getHeight() - 10);

        // Fecha y hora
        doc.text(`Generado el ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`,
                doc.internal.pageSize.getWidth() - data.settings.margin.right,
                doc.internal.pageSize.getHeight() - 10,
                { align: 'right' });
      }
    });

    // Guardar el PDF
    console.log("Guardando PDF...");
    doc.save(`${fileName}.pdf`);
    console.log("PDF guardado exitosamente");

  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Error al generar el PDF: " + error.message);
  }
};
