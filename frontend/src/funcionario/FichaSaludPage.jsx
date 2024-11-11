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
        {/* Datos personales */}
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
        {/* Otros campos aquí... */}
        
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Ficha'}
        </Button>
      </Form>
    </Container>
  );
};

export default FichaSaludPage;
