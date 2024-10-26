import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand 
                style={{ 
                    fontFamily: 'Montserrat, sans-serif', 
                    fontWeight: 'bold', 
                    backgroundColor: '#F5F5F5',  // Fondo suave
                    padding: '5px 10px', // Espaciado interno para mejor apariencia
                    borderRadius: '5px'  // Bordes redondeados para un estilo más amigable
                }}
            >
                <span style={{ color: '#4CAF50' }}>Vita</span>
                <span style={{ color: '#009688' }}>Lab</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Link to="/login">
                        <Button variant="outline-primary" className="me-2">Iniciar Sesión</Button>
                    </Link>
                    <Link to="/registro">
                        <Button variant="outline-primary">Registrarse</Button>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;


