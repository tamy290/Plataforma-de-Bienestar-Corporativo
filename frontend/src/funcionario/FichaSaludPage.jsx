import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const FichaSaludPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    genero: '',
    domicilio: '',
    telefono: '',
    correo: '',
    contactoEmergencia: '',
    alergias: '',
    medicacionActual: 'no',
    medicacionDetalle: '',
    historialEnfermedades: '',
    condicionesPreexistentes: '',
    tipoSangre: '',
    tratamientoPsicologico: 'no',
    tratamientoDetalle: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Cambia esta URL por la de tu backend
      const response = await axios.post('https://localhost:3001/api/ficha-salud', formData);

      // Si la respuesta es exitosa
      if (response.status === 200) {
        setSuccess('Ficha de salud enviada exitosamente.');
        // Limpiar el formulario si es necesario
        setFormData({
          nombre: '',
          apellido: '',
          fechaNacimiento: '',
          genero: '',
          domicilio: '',
          telefono: '',
          correo: '',
          contactoEmergencia: '',
          alergias: '',
          medicacionActual: 'no',
          medicacionDetalle: '',
          historialEnfermedades: '',
          condicionesPreexistentes: '',
          tipoSangre: '',
          tratamientoPsicologico: 'no',
          tratamientoDetalle: '',
        });
      }
    } catch (err) {
      console.error('Error al enviar la ficha de salud:', err);
      setError('Hubo un problema al enviar la ficha de salud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Ficha de Salud</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fechaNacimiento">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="genero">
              <Form.Label>Género</Form.Label>
              <Form.Control
                as="select"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="domicilio">
          <Form.Label>Domicilio</Form.Label>
          <Form.Control
            type="text"
            name="domicilio"
            value={formData.domicilio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="telefono">
          <Form.Label>Número de Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="correo">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="contactoEmergencia">
          <Form.Label>Contacto de Emergencia</Form.Label>
          <Form.Control
            type="text"
            name="contactoEmergencia"
            value={formData.contactoEmergencia}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <h2>Antecedentes Médicos</h2>

        <Form.Group controlId="alergias">
          <Form.Label>Alergias</Form.Label>
          <Form.Control
            type="text"
            name="alergias"
            value={formData.alergias}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="medicacionActual">
          <Form.Label>Medicación Actual</Form.Label>
          <Form.Check
            type="radio"
            label="Sí"
            name="medicacionActual"
            value="si"
            checked={formData.medicacionActual === 'si'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="No"
            name="medicacionActual"
            value="no"
            checked={formData.medicacionActual === 'no'}
            onChange={handleChange}
          />
          {formData.medicacionActual === 'si' && (
            <Form.Group controlId="medicacionDetalle">
              <Form.Label>Detalle de Medicación</Form.Label>
              <Form.Control
                type="text"
                name="medicacionDetalle"
                value={formData.medicacionDetalle}
                onChange={handleChange}
              />
            </Form.Group>
          )}
        </Form.Group>

        <Form.Group controlId="historialEnfermedades">
          <Form.Label>Historial de Enfermedades</Form.Label>
          <Form.Control
            type="text"
            name="historialEnfermedades"
            value={formData.historialEnfermedades}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="condicionesPreexistentes">
          <Form.Label>Condiciones Preexistentes</Form.Label>
          <Form.Control
            type="text"
            name="condicionesPreexistentes"
            value={formData.condicionesPreexistentes}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="tipoSangre">
          <Form.Label>Tipo de Sangre</Form.Label>
          <Form.Control
            type="text"
            name="tipoSangre"
            value={formData.tipoSangre}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="tratamientoPsicologico">
          <Form.Label>Tratamiento Psicológico</Form.Label>
          <Form.Check
            type="radio"
            label="Sí"
            name="tratamientoPsicologico"
            value="si"
            checked={formData.tratamientoPsicologico === 'si'}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="No"
            name="tratamientoPsicologico"
            value="no"
            checked={formData.tratamientoPsicologico === 'no'}
            onChange={handleChange}
          />
          {formData.tratamientoPsicologico === 'si' && (
            <Form.Group controlId="tratamientoDetalle">
              <Form.Label>Detalle del Tratamiento</Form.Label>
              <Form.Control
                type="text"
                name="tratamientoDetalle"
                value={formData.tratamientoDetalle}
                onChange={handleChange}
              />
            </Form.Group>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Ficha de Salud'}
        </Button>
      </Form>
    </Container>
  );
};

export default FichaSaludPage; 