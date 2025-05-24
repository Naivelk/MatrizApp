import React from 'react';
import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';

const HelpTooltip = ({ 
  children, 
  content, 
  title, 
  placement = "top", 
  variant = "tooltip", // "tooltip" o "popover"
  trigger = "hover",
  className = "",
  icon = "ℹ️"
}) => {
  const renderOverlay = () => {
    if (variant === "popover") {
      return (
        <Popover id={`popover-${Math.random()}`}>
          {title && <Popover.Header as="h3">{title}</Popover.Header>}
          <Popover.Body>
            {typeof content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              content
            )}
          </Popover.Body>
        </Popover>
      );
    }
    
    return (
      <Tooltip id={`tooltip-${Math.random()}`}>
        {typeof content === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          content
        )}
      </Tooltip>
    );
  };

  return (
    <OverlayTrigger
      placement={placement}
      overlay={renderOverlay()}
      trigger={trigger}
    >
      <span className={`help-tooltip ${className}`} style={{ cursor: 'help' }}>
        {children || <span className="text-muted">{icon}</span>}
      </span>
    </OverlayTrigger>
  );
};

// Componente específico para campos de formulario
export const FormFieldHelp = ({ content, title, placement = "right" }) => (
  <HelpTooltip
    content={content}
    title={title}
    placement={placement}
    variant="popover"
    trigger={["hover", "focus"]}
    className="ms-2"
  />
);

// Componente específico para encabezados de tabla
export const TableHeaderHelp = ({ content, title, placement = "top" }) => (
  <HelpTooltip
    content={content}
    title={title}
    placement={placement}
    variant="tooltip"
    className="ms-1"
    icon="❓"
  />
);

// Componente específico para secciones
export const SectionHelp = ({ content, title, placement = "right" }) => (
  <HelpTooltip
    content={content}
    title={title}
    placement={placement}
    variant="popover"
    trigger="click"
    className="ms-2"
    icon="💡"
  />
);

export default HelpTooltip;
