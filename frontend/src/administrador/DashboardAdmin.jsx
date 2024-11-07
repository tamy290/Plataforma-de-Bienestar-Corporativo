import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const DashboardAdmin = () => {
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem('authToken');  // Para obtener el token desde localStorage
    if (!token) {
      // Si no hay token, redirigir al login
      navigate('');  
    }
  }, [navigate]);

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2>Panel de Administración</h2>
          <Card className="my-3">
            <Card.Body>
              <Card.Title>Estadísticas de Uso</Card.Title>
              <Card.Text>Visualiza las estadísticas de uso de la plataforma.</Card.Text>
              <Link to="/admin/estadisticas">
                <Button variant="primary">Ver estadísticas</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="my-3">
            <Card.Body>
              <Card.Title>Gestión de Usuarios</Card.Title>
              <Card.Text>Gestiona los usuarios de la plataforma.</Card.Text>
              <Link to="/admin/gestion-usuarios">
                <Button variant="primary">Gestionar usuarios</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="my-3">
            <Card.Body>
              <Card.Title>Seguridad de Datos</Card.Title>
              <Card.Text>Configura la seguridad de datos de la plataforma.</Card.Text>
              <Link to="/admin/seguridad-datos">
                <Button variant="primary">Configurar seguridad</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardAdmin;