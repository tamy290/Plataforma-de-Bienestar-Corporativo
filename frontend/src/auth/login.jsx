// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = {
            email,
            contraseña
        };

        try {
            // Aquí puedes manejar el inicio de sesión, enviando los datos al servidor
            const response = await fetch('/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Encabezado JSON
                },
                credentials: 'include', // Permite el envío y recepción de cookies
                body: JSON.stringify(formData), // Convertir el objeto a JSON
            });

            // Verificar si la respuesta fue exitosa
            if (response.ok) {
                const data = await response.json(); // Leer el cuerpo de la respuesta
                // Redirige según el rol
                navigate(data.redirectPath);

                // Manejo de respuesta exitosa
                console.log('Inicio de sesión exitoso');
                // Resetear el formulario
                setEmail('');
                setContraseña('');
            } else {
                // Manejar errores
                const errorData = await response.json(); // Leer el cuerpo de error
                throw new Error(errorData.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <h2>Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
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
                <Button variant="primary" type="submit">
                    Iniciar Sesión
                </Button>
            </Form>
        </Container>
    );
};

export default Login;