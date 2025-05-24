import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import MatrizRiesgos from './pages/MatrizRiesgos';
import CrearRiesgo from './pages/CrearRiesgo';
import EditarRiesgo from './pages/EditarRiesgo';
import Configuracion from './pages/Configuracion';
import VerRiesgo from './pages/VerRiesgo';
// import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';

function App() {
  // Activar atajos de teclado - temporalmente deshabilitado
  // useKeyboardShortcuts();

  return (
    <ThemeProvider>
      <div className="min-vh-100">
        <Navigation />
        <Container className="py-4 fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/matriz-riesgos" element={<MatrizRiesgos />} />
            <Route path="/crear-riesgo" element={<CrearRiesgo />} />
            <Route path="/editar-riesgo/:id" element={<EditarRiesgo />} />
            <Route path="/ver-riesgo/:id" element={<VerRiesgo />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
