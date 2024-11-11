import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [rol, setRol] = useState('');
    const [error, setError] = useState('');
    const [foto, setFoto] = useState(null); // Estado para la foto
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    // Verificar si hay un token en localStorage
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

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

        const formData = {
            nombre,
            apellido,
            email,
            contraseña,
            rol,
            foto, // Agregar foto al formulario
        };

        try {
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro');
            }

            const data = await response.json();
            // Guardamos el token en el localStorage al registrar al usuario
            localStorage.setItem('authToken', data.token);
            setIsAuthenticated(true);
            navigate(data.redirectPath || '/dashboard');

            // Limpiar los campos
            setNombre('');
            setApellido('');
            setEmail('');
            setContraseña('');
            setConfirmarContraseña('');
            setRol('');
            setFoto(null); // Limpiar la foto
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    // Función para manejar el cambio de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoto(reader.result); // Guardar la imagen en base64
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        // Eliminar el token de localStorage
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        // Redirigir al login
        navigate('/login');  
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
                        <option value="psicologo">Psicólogo</option>
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
                        autoComplete="new-password"
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
                        autoComplete="new-password"
                    />
                </Form.Group>

                {/* Campo para cargar la foto */}
                <Form.Group controlId="formFoto">
                    <Form.Label>Sube tu foto</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Form>

            {/* Mostrar el nombre y foto si el usuario está autenticado */}
            {isAuthenticated && (
                <div className="mt-3">
                    <h3>Bienvenido, {nombre} {apellido}</h3>
                    {foto ? (
                        <Image src={foto} alt="Foto de perfil" roundedCircle width={100} height={100} />
                    ) : (
                        <div>No se ha subido una foto</div>
                    )}
                    <Button variant="danger" onClick={handleLogout} className="mt-3">
                        Cerrar sesión
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default Registro;



