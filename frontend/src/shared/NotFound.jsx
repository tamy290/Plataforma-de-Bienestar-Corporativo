import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container>
            <Alert variant="danger">
                <Alert.Heading>Página no encontrada</Alert.Heading>
                <p>
                    Lo sentimos, la página que buscas no existe.
                </p>
            </Alert>
        </Container>
    );
};

export default NotFound;
