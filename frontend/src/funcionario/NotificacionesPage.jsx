import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const NotificacionesPage = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //obtener notificaciones desde la API
    const fetchNotificaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/notificaciones');
        setNotificaciones(response.data);
      } catch (error) {
        setError('Hubo un problema al cargar las notificaciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <Container>
      <h1>Notificaciones</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : notificaciones.length > 0 ? (
        <ListGroup>
          {notificaciones.map((notificacion, index) => (
            <ListGroup.Item key={index}>
              <h5>{notificacion.titulo}</h5>
              <p>{notificacion.mensaje}</p>
              <small>{new Date(notificacion.fecha).toLocaleString()}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No tienes notificaciones en este momento.</p>
      )}
    </Container>
  );
};

export default NotificacionesPage;
