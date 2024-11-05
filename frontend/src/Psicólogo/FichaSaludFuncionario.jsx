import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const FichaSaludFuncionario = () => {
  const [fichaSalud, setFichaSalud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFichaSalud = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/psicologo/ficha-salud');
        setFichaSalud(response.data);
      } catch (err) {
        setError('No se pudo cargar la ficha de salud del empleado.');
      } finally {
        setLoading(false);
      }
    };

    fetchFichaSalud();
  }, []);

  return (
    <Container>
      <h1>Ficha de Salud del Funcionario</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}
      {!loading && fichaSalud && (
        <ListGroup className="mt-4">
          <ListGroup.Item><strong>Nombre:</strong> {fichaSalud.nombre}</ListGroup.Item>
          <ListGroup.Item><strong>Apellido:</strong> {fichaSalud.apellido}</ListGroup.Item>
          <ListGroup.Item><strong>Fecha de Nacimiento:</strong> {fichaSalud.fechaNacimiento}</ListGroup.Item>
          <ListGroup.Item><strong>Género:</strong> {fichaSalud.genero}</ListGroup.Item>
          <ListGroup.Item><strong>Domicilio:</strong> {fichaSalud.domicilio}</ListGroup.Item>
          <ListGroup.Item><strong>Teléfono:</strong> {fichaSalud.telefono}</ListGroup.Item>
          <ListGroup.Item><strong>Correo Electrónico:</strong> {fichaSalud.correo}</ListGroup.Item>
          <ListGroup.Item><strong>Contacto de Emergencia:</strong> {fichaSalud.contactoEmergencia}</ListGroup.Item>
          <ListGroup.Item><strong>Alergias:</strong> {fichaSalud.alergias}</ListGroup.Item>
          <ListGroup.Item><strong>Medicación Actual:</strong> {fichaSalud.medicacionActual === 'si' ? 'Sí' : 'No'}</ListGroup.Item>
          {fichaSalud.medicacionActual === 'si' && (
            <ListGroup.Item><strong>Detalle de Medicación:</strong> {fichaSalud.medicacionDetalle}</ListGroup.Item>
          )}
          <ListGroup.Item><strong>Historial de Enfermedades:</strong> {fichaSalud.historialEnfermedades}</ListGroup.Item>
          <ListGroup.Item><strong>Condiciones Preexistentes:</strong> {fichaSalud.condicionesPreexistentes}</ListGroup.Item>
          <ListGroup.Item><strong>Tipo de Sangre:</strong> {fichaSalud.tipoSangre}</ListGroup.Item>
          <ListGroup.Item><strong>Tratamiento Psicológico:</strong> {fichaSalud.tratamientoPsicologico === 'si' ? 'Sí' : 'No'}</ListGroup.Item>
          {fichaSalud.tratamientoPsicologico === 'si' && (
            <ListGroup.Item><strong>Detalle del Tratamiento:</strong> {fichaSalud.tratamientoDetalle}</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default FichaSaludFuncionario;
