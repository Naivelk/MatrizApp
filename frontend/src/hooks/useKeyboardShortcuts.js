import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Solo activar si no estamos en un input, textarea o elemento editable
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.contentEditable === 'true'
      ) {
        return;
      }

      // Verificar si se presiona Ctrl/Cmd
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;

      // Atajos con Ctrl/Cmd
      if (isCtrlOrCmd) {
        switch (event.key.toLowerCase()) {
          case 'h':
            event.preventDefault();
            navigate('/');
            break;
          case 'm':
            event.preventDefault();
            navigate('/matriz-riesgos');
            break;
          case 'n':
            event.preventDefault();
            navigate('/crear-riesgo');
            break;
          case 'k':
            event.preventDefault();
            navigate('/configuracion');
            break;
          case 'shift':
            // Ctrl+Shift+T para cambiar tema
            if (event.shiftKey && event.key === 'T') {
              event.preventDefault();
              toggleTheme();
            }
            break;
          default:
            break;
        }
      }

      // Atajos sin modificadores
      switch (event.key) {
        case '?':
          event.preventDefault();
          showShortcutsHelp();
          break;
        case 'Escape':
          // Cerrar modales o limpiar filtros
          const modals = document.querySelectorAll('.modal.show');
          if (modals.length > 0) {
            const lastModal = modals[modals.length - 1];
            const closeButton = lastModal.querySelector('.btn-close, [data-bs-dismiss="modal"]');
            if (closeButton) {
              closeButton.click();
            }
          }
          break;
        default:
          break;
      }
    };

    const showShortcutsHelp = () => {
      const shortcuts = [
        { key: 'Ctrl+H', description: 'Ir al Dashboard' },
        { key: 'Ctrl+M', description: 'Ir a Matriz de Riesgos' },
        { key: 'Ctrl+N', description: 'Crear Nuevo Riesgo' },
        { key: 'Ctrl+K', description: 'Ir a Configuración' },
        { key: 'Ctrl+Shift+T', description: 'Cambiar Tema (Claro/Oscuro)' },
        { key: '?', description: 'Mostrar esta ayuda' },
        { key: 'Esc', description: 'Cerrar modales' }
      ];

      // Mostrar ayuda simple con alert por ahora
      const helpText = shortcuts
        .map(shortcut => `${shortcut.key}: ${shortcut.description}`)
        .join('\n');

      alert(`⌨️ Atajos de Teclado:\n\n${helpText}`);
    };

    // Agregar event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, toggleTheme]);

  return null;
};

export default useKeyboardShortcuts;
