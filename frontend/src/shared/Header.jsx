import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';


const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
        < Navbar bg="success" expand="lg" className="shadow-sm" style={{ width: '1350px', height: '100px' }} >
            <Navbar.Brand 
                style={{ 
                    fontFamily: 'Montserrat, sans-serif', 
                    fontWeight: 'bold', 
                    color: '#4CAF50' 
                }}
            >
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto py-2 px-2"> {/* para agregar padding vertical y horizontal */}
                    {isAuthenticated ? (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="light" className="me-2">Iniciar Sesión</Button>
                            </Link>
                            <Link to="/registro">
                                <Button variant="light">Registrarse</Button>
                            </Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
};

export default Header;

