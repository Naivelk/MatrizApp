import React, { useState } from 'react';
import { 
  Modal, 
  Button, 
  Card, 
  Row, 
  Col, 
  Badge, 
  Alert,
  Accordion,
  ListGroup
} from 'react-bootstrap';
import { getAllIndustries, getIndustryTemplate } from '../../data/industryTemplates';
import HelpTooltip from '../common/HelpTooltip';

const IndustryTemplateSelector = ({ show, onHide, onSelectTemplate }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedRisks, setSelectedRisks] = useState([]);
  const industries = getAllIndustries();

  const handleIndustrySelect = (industryKey) => {
    setSelectedIndustry(industryKey);
    setSelectedRisks([]);
  };

  const handleRiskToggle = (categoryIndex, riskIndex) => {
    const riskId = `${categoryIndex}-${riskIndex}`;
    setSelectedRisks(prev => 
      prev.includes(riskId) 
        ? prev.filter(id => id !== riskId)
        : [...prev, riskId]
    );
  };

  const handleApplyTemplate = () => {
    if (!selectedIndustry || selectedRisks.length === 0) return;

    const template = getIndustryTemplate(selectedIndustry);
    const risksToCreate = [];

    selectedRisks.forEach(riskId => {
      const [categoryIndex, riskIndex] = riskId.split('-').map(Number);
      const category = template.riskCategories[categoryIndex];
      const risk = category.risks[riskIndex];
      
      risksToCreate.push({
        ...risk,
        category: category.category,
        industry: selectedIndustry,
        frameworks: template.frameworks
      });
    });

    onSelectTemplate(risksToCreate, template);
    onHide();
  };

  const selectedTemplate = selectedIndustry ? getIndustryTemplate(selectedIndustry) : null;

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          📋 Templates por Industria
          <HelpTooltip
            content="Seleccione templates predefinidos basados en estándares internacionales y mejores prácticas de su industria."
            title="Templates por Industria"
            placement="bottom"
            variant="popover"
          />
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {!selectedIndustry ? (
          <>
            <Alert variant="info" className="mb-4">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ fontSize: '1.5rem' }}>💡</span>
                <div>
                  <strong>Templates Basados en Estándares:</strong> Cada template incluye riesgos comunes 
                  de la industria con controles sugeridos basados en frameworks reconocidos internacionalmente.
                </div>
              </div>
            </Alert>
            
            <Row>
              {industries.map((industry) => (
                <Col md={6} lg={4} key={industry.key} className="mb-3">
                  <Card 
                    className="h-100 industry-card" 
                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                    onClick={() => handleIndustrySelect(industry.key)}
                  >
                    <Card.Body className="text-center">
                      <div style={{ fontSize: '3rem' }} className="mb-3">
                        {industry.icon}
                      </div>
                      <Card.Title className="h5">{industry.name}</Card.Title>
                      <Card.Text className="text-muted small">
                        {industry.description}
                      </Card.Text>
                      <div className="mt-3">
                        {industry.frameworks.slice(0, 2).map((framework, idx) => (
                          <Badge key={idx} bg="primary" className="me-1 mb-1">
                            {framework}
                          </Badge>
                        ))}
                        {industry.frameworks.length > 2 && (
                          <Badge bg="secondary">+{industry.frameworks.length - 2}</Badge>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <>
            <div className="d-flex align-items-center mb-4">
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={() => setSelectedIndustry(null)}
                className="me-3"
              >
                ← Volver
              </Button>
              <div>
                <h4 className="mb-1">
                  {selectedTemplate.icon} {selectedTemplate.name}
                </h4>
                <p className="text-muted mb-2">{selectedTemplate.description}</p>
                <div>
                  {selectedTemplate.frameworks.map((framework, idx) => (
                    <Badge key={idx} bg="primary" className="me-1">
                      {framework}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Alert variant="success" className="mb-4">
              <strong>Seleccione los riesgos que desea importar:</strong> Puede personalizar 
              los riesgos después de importarlos.
            </Alert>

            <Accordion defaultActiveKey="0">
              {selectedTemplate.riskCategories.map((category, categoryIndex) => (
                <Accordion.Item key={categoryIndex} eventKey={categoryIndex.toString()}>
                  <Accordion.Header>
                    <strong>{category.category}</strong>
                    <Badge bg="info" className="ms-2">
                      {category.risks.length} riesgos
                    </Badge>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {category.risks.map((risk, riskIndex) => {
                        const riskId = `${categoryIndex}-${riskIndex}`;
                        const isSelected = selectedRisks.includes(riskId);
                        
                        return (
                          <ListGroup.Item 
                            key={riskIndex}
                            className={`d-flex align-items-start ${isSelected ? 'bg-light' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRiskToggle(categoryIndex, riskIndex)}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleRiskToggle(categoryIndex, riskIndex)}
                              className="me-3 mt-1"
                            />
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{risk.name}</h6>
                              <p className="mb-2 text-muted small">{risk.description}</p>
                              <div className="d-flex align-items-center mb-2">
                                <Badge bg="warning" className="me-2">
                                  Prob: {risk.probability}/5
                                </Badge>
                                <Badge bg="danger" className="me-2">
                                  Impacto: {risk.impact}/5
                                </Badge>
                                <Badge bg="info">
                                  Nivel: {(risk.probability * risk.impact).toFixed(1)}
                                </Badge>
                              </div>
                              <div>
                                <small className="text-muted">
                                  <strong>Controles sugeridos:</strong> {risk.controls.join(', ')}
                                </small>
                              </div>
                            </div>
                          </ListGroup.Item>
                        );
                      })}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </>
        )}
      </Modal.Body>
      
      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <div>
            {selectedIndustry && (
              <small className="text-muted">
                {selectedRisks.length} riesgo(s) seleccionado(s)
              </small>
            )}
          </div>
          <div>
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            {selectedIndustry && (
              <Button 
                variant="primary" 
                onClick={handleApplyTemplate}
                disabled={selectedRisks.length === 0}
              >
                Aplicar Template ({selectedRisks.length})
              </Button>
            )}
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default IndustryTemplateSelector;
