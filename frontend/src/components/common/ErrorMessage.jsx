import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error</Alert.Heading>
      <p>{message || 'Ha ocurrido un error inesperado.'}</p>
    </Alert>
  );
};

export default ErrorMessage;
