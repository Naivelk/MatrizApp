import { Navbar, Nav, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

const Navigation = () => {
  const { isDark } = useTheme();

  return (
    <Navbar bg={isDark ? "dark" : "dark"} variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🛡️ Matriz de Riesgos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-medium">
              📊 Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/matriz-riesgos" className="fw-medium">
              📋 Matriz de Riesgos
            </Nav.Link>
            <Nav.Link as={Link} to="/crear-riesgo" className="fw-medium">
              ➕ Crear Riesgo
            </Nav.Link>
            <Nav.Link as={Link} to="/configuracion" className="fw-medium">
              ⚙️ Configuración
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item className="d-flex align-items-center me-3">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Presiona <kbd>?</kbd> para ver atajos de teclado</Tooltip>}
              >
                <small className="text-muted">
                  ⌨️ <kbd>?</kbd>
                </small>
              </OverlayTrigger>
            </Nav.Item>
            <Nav.Item className="d-flex align-items-center">
              <ThemeToggle />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
