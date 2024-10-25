import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const DashboardFuncionario = () => {
    return (
        <Container className="mt-4">
            <h1 className="text-center mb-4">Dashboard del Funcionario</h1>
            <Row>
                <Col md={6} lg={3}>
                    <Card className="mb-4 shadow-sm"> 
                        <Card.Body>
                            <Card.Title>Salud</Card.Title>
                            <Card.Text>Accede a tu ficha de salud.</Card.Text>
                            <Link to="/ficha-salud">
                                <Button variant="primary">Ver Ficha de Salud</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>Diario Emocional</Card.Title>
                            <Card.Text>Registra tu estado emocional diario.</Card.Text>
                            <Link to="/diario-emocional">
                                <Button variant="primary">Ir al Diario</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>Progreso</Card.Title>
                            <Card.Text>Consulta tu progreso de bienestar.</Card.Text>
                            <Link to="/progreso">
                                <Button variant="primary">Ver Progreso</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Body>
                            <Card.Title>Notificaciones</Card.Title>
                            <Card.Text>Mira tus notificaciones.</Card.Text>
                            <Link to="/notificaciones">
                                <Button variant="primary">Ver Notificaciones</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardFuncionario;
