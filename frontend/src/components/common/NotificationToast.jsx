import React, { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const NotificationToast = ({ 
  show, 
  onClose, 
  title, 
  message, 
  variant = 'success', 
  delay = 5000,
  position = 'top-end' 
}) => {
  const [showToast, setShowToast] = useState(show);

  useEffect(() => {
    setShowToast(show);
  }, [show]);

  const handleClose = () => {
    setShowToast(false);
    if (onClose) onClose();
  };

  const getIcon = () => {
    switch (variant) {
      case 'success':
        return '✅';
      case 'error':
      case 'danger':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getBgClass = () => {
    switch (variant) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
      case 'danger':
        return 'bg-danger text-white';
      case 'warning':
        return 'bg-warning text-dark';
      case 'info':
        return 'bg-info text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  return (
    <ToastContainer position={position} className="p-3" style={{ zIndex: 9999 }}>
      <Toast 
        show={showToast} 
        onClose={handleClose} 
        delay={delay} 
        autohide={delay > 0}
        className={`${getBgClass()} border-0 shadow`}
      >
        <Toast.Header className={`${getBgClass()} border-0`}>
          <span className="me-2">{getIcon()}</span>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        {message && (
          <Toast.Body>
            {message}
          </Toast.Body>
        )}
      </Toast>
    </ToastContainer>
  );
};

// Hook para manejar notificaciones
export const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (title, message, variant = 'success', delay = 5000) => {
    setNotification({
      show: true,
      title,
      message,
      variant,
      delay,
      id: Date.now()
    });
  };

  const hideNotification = () => {
    setNotification(prev => prev ? { ...prev, show: false } : null);
  };

  const NotificationComponent = () => {
    if (!notification) return null;

    return (
      <NotificationToast
        show={notification.show}
        onClose={hideNotification}
        title={notification.title}
        message={notification.message}
        variant={notification.variant}
        delay={notification.delay}
      />
    );
  };

  return {
    showNotification,
    hideNotification,
    NotificationComponent
  };
};

export default NotificationToast;
