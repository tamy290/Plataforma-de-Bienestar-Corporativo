import React, { useState, useEffect } from 'react';
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
  const [fichaCompleta, setFichaCompleta] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchFichaSalud = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/ficha', { withCredentials: true });
        if (response.data) {
          setFormData(response.data);
          setFichaCompleta(true);
        }
      } catch (err) {
        console.error('Error al cargar la ficha de salud:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFichaSalud();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(
        '/api/ficha',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSuccess('Ficha de salud enviada exitosamente.');
        setFichaCompleta(true);
      }
    } catch (err) {
      console.error('Error al enviar la ficha de salud:', err);
      setError('Hubo un problema al enviar la ficha de salud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // Restablecer el formulario con los datos existentes
    setFichaCompleta(false);
  };

  if (fichaCompleta) {
    return (
      <Container>
        <h2>Resumen del Historial Médico</h2>
        <ul>
          <li><strong>Nombre:</strong> {formData.nombre}</li>
          <li><strong>Apellido:</strong> {formData.apellido}</li>
          <li><strong>Fecha de Nacimiento:</strong> {formData.fechaNacimiento}</li>
          <li><strong>Género:</strong> {formData.genero}</li>
          <li><strong>Domicilio:</strong> {formData.domicilio}</li>
          <li><strong>Teléfono:</strong> {formData.telefono}</li>
          <li><strong>Correo Electrónico:</strong> {formData.correo}</li>
          <li><strong>Contacto de Emergencia:</strong> {formData.contactoEmergencia}</li>
          <li><strong>Alergias:</strong> {formData.alergias}</li>
          <li><strong>Medicación Actual:</strong> {formData.medicacionActual === 'si' ? 'Sí' : 'No'}</li>
          {formData.medicacionActual === 'si' && (
            <li><strong>Detalle de la Medicación:</strong> {formData.medicacionDetalle}</li>
          )}
          <li><strong>Historial de Enfermedades:</strong> {formData.historialEnfermedades}</li>
          <li><strong>Condiciones Preexistentes:</strong> {formData.condicionesPreexistentes}</li>
          <li><strong>Tipo de Sangre:</strong> {formData.tipoSangre}</li>
          <li><strong>Tratamiento Psicológico:</strong> {formData.tratamientoPsicologico === 'si' ? 'Sí' : 'No'}</li>
          {formData.tratamientoPsicologico === 'si' && (
            <li><strong>Detalle de Tratamiento:</strong> {formData.tratamientoDetalle}</li>
          )}
        </ul>
        <Button variant="primary" onClick={handleEdit}>
          Editar Ficha
        </Button>
      </Container>
    );
  }

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
            required
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
            required
          />
        </Form.Group>

        <Form.Group controlId="condicionesPreexistentes">
          <Form.Label>Condiciones Preexistentes</Form.Label>
          <Form.Control
            type="text"
            name="condicionesPreexistentes"
            value={formData.condicionesPreexistentes}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="tipoSangre">
          <Form.Label>Tipo de Sangre</Form.Label>
          <Form.Control
            type="text"
            name="tipoSangre"
            value={formData.tipoSangre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="tratamientoPsicologico">
            <Form.Label>¿Recibe Tratamiento Psicológico?</Form.Label>
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
          </Form.Group>

          {formData.tratamientoPsicologico === 'si' && (
            <Form.Group controlId="tratamientoDetalle">
              <Form.Label>Detalle de Tratamiento</Form.Label>
              <Form.Control
                type="text"
                name="tratamientoDetalle"
                value={formData.tratamientoDetalle}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Ficha'}
          </Button>
        </Form>
      </Container>
  );
};

export default FichaSaludPage; 