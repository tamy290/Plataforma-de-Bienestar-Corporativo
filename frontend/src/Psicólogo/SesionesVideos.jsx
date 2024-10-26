import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Form, Button, Alert } from 'react-bootstrap';

const SesionesVideo = () => {
    const [sesiones, setSesiones] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulación de carga de sesiones
        const fetchSesiones = async () => {
            // Aquí podrías hacer una solicitud a tu backend para obtener las sesiones programadas.
            setLoading(false);
            // Ejemplo de sesiones
            setSesiones([
                { id: 1, titulo: 'Sesión de Bienestar', fecha: '2024-10-30', hora: '10:00', enlace: 'https://zoom.us/j/123456789' },
            ]);
        };

        fetchSesiones();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple
        if (!titulo || !fecha || !hora) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        // Generar un enlace de Zoom simple (ejemplo)
        const enlaceZoom = `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`;

        // Agregar la nueva sesión a la lista
        const nuevaSesion = {
            id: sesiones.length + 1,
            titulo,
            fecha,
            hora,
            enlace: enlaceZoom,
        };

        setSesiones([...sesiones, nuevaSesion]);
        setTitulo('');
        setFecha('');
        setHora('');
        setError(null);
    };

    return (
        <Container>
            <h1>Sesiones de Video</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitulo">
                    <Form.Label>Título de la Sesión</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa el título de la sesión"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formFecha">
                    <Form.Label>Fecha de la Sesión</Form.Label>
                    <Form.Control
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formHora">
                    <Form.Label>Hora de la Sesión</Form.Label>
                    <Form.Control
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Programar Sesión
                </Button>
            </Form>
            <h2 className="mt-4">Sesiones Programadas</h2>
            {loading ? (
                <p>Cargando sesiones...</p>
            ) : (
                <ListGroup>
                    {sesiones.length === 0 ? (
                        <p>No hay sesiones programadas.</p>
                    ) : (
                        sesiones.map((sesion) => (
                            <ListGroup.Item key={sesion.id}>
                                <strong>{sesion.titulo}</strong> - {sesion.fecha} a las {sesion.hora}
                                <br />
                                <a href={sesion.enlace} target="_blank" rel="noopener noreferrer">Unirse a la sesión</a>
                            </ListGroup.Item>
                        ))
                    )}
                </ListGroup>
            )}
        </Container>
    );
};

export default SesionesVideo;
