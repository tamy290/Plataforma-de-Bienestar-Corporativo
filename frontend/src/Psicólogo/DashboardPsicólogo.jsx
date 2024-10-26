import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardPsicólogo = () => {
  return (
    <Container>
      <h1>Dashboard Psicólogo</h1>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Ficha de Salud del Funcionario</Card.Title>
              <Card.Text>Accede a la información completa de salud de los funcionarios.</Card.Text>
              <Link to="/psicologo/ficha-salud">
                <Button variant="primary">Ver Ficha de Salud</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Historial de Funcionarios</Card.Title>
              <Card.Text>Consulta el historial de bienestar y emocional de los funcionarios.</Card.Text>
              <Link to="/psicologo/historial-empleado">
                <Button variant="primary">Ver Historial</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Reportes de Bienestar</Card.Title>
              <Card.Text>Genera y consulta reportes de bienestar de los funcionarios.</Card.Text>
              <Link to="/psicologo/reportes-bienestar">
                <Button variant="primary">Ver Reportes</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Sesiones de Video</Card.Title>
              <Card.Text>Accede a las sesiones de video programadas con los funcionarios.</Card.Text>
              <Link to="/psicologo/sesiones-video">
                <Button variant="primary">Ver Sesiones</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Talleres de Bienestar</Card.Title>
              <Card.Text>Organiza y consulta talleres de bienestar para los funcionarios.</Card.Text>
              <Link to="/psicologo/talleres-bienestar">
                <Button variant="primary">Ver Talleres</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPsicólogo;