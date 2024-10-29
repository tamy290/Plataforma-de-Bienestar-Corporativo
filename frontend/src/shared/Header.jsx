import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
    const navigate = useNavigate();

    // Verifica si hay un token en el almacenamiento local
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        // Elimina el token para cerrar la sesión
        localStorage.removeItem('token');
        // Redirige al usuario a la página de inicio de sesión
        navigate('/login');
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand 
                style={{ 
                    fontFamily: 'Montserrat, sans-serif', 
                    fontWeight: 'bold', 
                    backgroundColor: '#F5F5F5',
                    padding: '5px 10px',
                    borderRadius: '5px'
                }}
            >
                <span style={{ color: '#4CAF50' }}>Vita</span>
                <span style={{ color: '#009688' }}>Lab</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {isAuthenticated ? (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline-primary" className="me-2">Iniciar Sesión</Button>
                            </Link>
                            <Link to="/registro">
                                <Button variant="outline-primary">Registrarse</Button>
                            </Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;



