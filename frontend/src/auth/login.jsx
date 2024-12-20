import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carga
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Iniciar carga

        const formData = {
            email,
            contraseña
        };

        try {
            // Realizamos la solicitud de inicio de sesión
            const response = await fetch('/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', //  envío y recepción de cookies
                body: JSON.stringify(formData), // Convertimos los datos en JSON
            });

            // Verificar si la respuesta fue exitosa
            if (response.ok) {
                const data = await response.json();

                // Redirige según el rol del usuario
                navigate(data.redirectPath);
                console.log('Inicio de sesión exitoso');
                
                // Resetear el formulario
                setEmail('');
                setContraseña('');
            } else {
                // Manejar errores si la respuesta no fue exitosa
                const errorData = await response.json(); // Leer el cuerpo del error
                throw new Error(errorData.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            setError('Error de conexión con el servidor'); // Mostrar el mensaje de error
        } finally {
            setLoading(false); // Detener la carga
        }
    };

    return (
        <Container>
            <h2>Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>} {/* Mostrar errores */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Iniciar Sesión'}
                </Button>
            </Form>
        </Container>
    );
};

export default Login;  

