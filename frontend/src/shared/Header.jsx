import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Plataforma de Bienestar Corporativo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="/login">
                        <Button variant="outline-primary" className="mr-2">Iniciar Sesión</Button>
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
