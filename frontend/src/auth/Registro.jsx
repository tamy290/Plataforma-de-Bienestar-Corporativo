import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [rol, setRol] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Validar contraseñas
        if (contraseña !== confirmarContraseña) { 
            setError('Las contraseñas no coinciden');
            return;
        }

        // Valida el formato del email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido');
            return;
        }

        // Valida la contraseña
        if (contraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const formData = {
            nombre,
            apellido,
            email,
            contraseña,
            rol,
        };

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
               
                setSuccessMessage(data.message);

                // Guarda el token en el localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify({
                    nombre: data.nombre,
                    apellido: data.apellido,
                    rol: data.rol,
                }));

                // Redirigir según el rol
                navigate(data.redirectPath);
            }

            if (!response.ok) {
                throw new Error(data.message || 'Error en el registro');
            }

            // Resetear el formulario
            setNombre('');
            setApellido('');
            setEmail('');
            setContraseña('');
            setConfirmarContraseña(''); 
            setRol('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <h2>Registro</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formApellido">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formRol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control
                        as="select"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="funcionario">Funcionario</option>
                        <option value="psicologo">Psicologo</option>
                        <option value="admin">Admin</option>
                    </Form.Control>
                </Form.Group>
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
                <Form.Group controlId="formContraseña">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="Ingresa tu contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)} 
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formConfirmarContraseña">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="Confirma tu contraseña"
                        value={confirmarContraseña}
                        onChange={(e) => setConfirmarContraseña(e.target.value)} 
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>
        </Container>
    );
};

export default Registro;
