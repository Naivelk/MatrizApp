-- Agregar la columna estado_implementacion a la tabla matriz_riesgos
ALTER TABLE matriz_riesgos ADD COLUMN IF NOT EXISTS estado_implementacion TEXT;

-- Actualizar los registros existentes para establecer un valor predeterminado
UPDATE matriz_riesgos SET estado_implementacion = 'Pendiente' WHERE estado_implementacion IS NULL;
