// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            // Aquí puedes manejar el inicio de sesión, enviando los datos al servidor
            const response = await fetch('/api/login', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error en el inicio de sesión');
            }

            // Manejo de respuesta exitosa
            console.log('Inicio de sesión exitoso');
            // Resetear el formulario
            setEmail('');
            setPassword('');
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

export default Login;