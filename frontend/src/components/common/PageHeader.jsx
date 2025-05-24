import React from 'react';
import { Row, Col } from 'react-bootstrap';

const PageHeader = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  gradient = false,
  className = "" 
}) => {
  const headerClass = gradient 
    ? "page-header-gradient" 
    : "page-header";

  return (
    <div className={`${headerClass} ${className}`}>
      <Row className="align-items-center">
        <Col>
          <div className="d-flex align-items-center mb-2">
            {icon && (
              <div className="page-header-icon me-3">
                {icon}
              </div>
            )}
            <div>
              <h1 className="page-title mb-0">
                {title}
              </h1>
              {subtitle && (
                <p className="page-subtitle mb-0 mt-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </Col>
        {children && (
          <Col xs="auto">
            <div className="page-header-actions">
              {children}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default PageHeader;
