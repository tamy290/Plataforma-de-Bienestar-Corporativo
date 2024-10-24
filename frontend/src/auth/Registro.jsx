import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [rol, setRol] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validar contraseñas
        if (contraseña !== confirmarContraseña) { 
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validar el formato del email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Por favor, ingresa un correo electrónico válido');
            return;
        }

        // Validar la contraseña
        if (contraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        formData.append('email', email);
        formData.append('contraseña', contraseña);
        formData.append('rol', rol);

        try {
            const response = await fetch('/api/registro', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }

            // Confirmar registro exitoso
            console.log('Registro exitoso');
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
                        <option value="psicologa">Psicóloga</option>
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
