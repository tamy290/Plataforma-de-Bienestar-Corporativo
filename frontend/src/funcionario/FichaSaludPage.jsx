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
    // Cargar la ficha de salud del usuario
    const fetchHealthRecord = async () => {
      try {
        const response = await axios.get('/api/ficha-salud');
        const data = response.data;
  
        if (!data || Object.keys(data).length === 0) {
          setFichaCompleta(false);
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
            tratamientoDetalle: ''
          });
        } else {
          setFichaCompleta(true);
          setFormData(data);
        }
      } catch (err) {
        console.error('Error al obtener la ficha de salud', err);
        setError('Hubo un problema al obtener la ficha de salud');
      }
    };
  
    fetchHealthRecord();
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
                <option value="">Selecciona género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
            <Form.Group controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
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
          </Col>
        </Row>
        <Row>
  <Col md={6}>
    <Form.Group controlId="alergias">
      <Form.Label>Alergias</Form.Label>
      <Form.Control
        type="text"
        name="alergias"
        value={formData.alergias}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group controlId="medicacionActual">
      <Form.Label>¿Estás tomando medicación actual?</Form.Label>
      <Form.Control
        as="select"
        name="medicacionActual"
        value={formData.medicacionActual}
        onChange={handleChange}
      >
        <option value="no">No</option>
        <option value="si">Sí</option>
      </Form.Control>
    </Form.Group>
  </Col>
</Row>

{formData.medicacionActual === 'si' && (
  <Row>
    <Col md={12}>
      <Form.Group controlId="medicacionDetalle">
        <Form.Label>Detalle de la Medicación</Form.Label>
        <Form.Control
          type="text"
          name="medicacionDetalle"
          value={formData.medicacionDetalle}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
  </Row>
)}

<Row>
  <Col md={6}>
    <Form.Group controlId="historialEnfermedades">
      <Form.Label>Historial de Enfermedades</Form.Label>
      <Form.Control
        type="text"
        name="historialEnfermedades"
        value={formData.historialEnfermedades}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group controlId="condicionesPreexistentes">
      <Form.Label>Condiciones Preexistentes</Form.Label>
      <Form.Control
        type="text"
        name="condicionesPreexistentes"
        value={formData.condicionesPreexistentes}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <Form.Group controlId="tipoSangre">
      <Form.Label>Tipo de Sangre</Form.Label>
      <Form.Control
        as="select"
        name="tipoSangre"
        value={formData.tipoSangre}
        onChange={handleChange}
      >
        <option value="">Selecciona tipo de sangre</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </Form.Control>
    </Form.Group>
  </Col>
  <Col md={6}>
    <Form.Group controlId="tratamientoPsicologico">
      <Form.Label>¿Estás recibiendo tratamiento psicológico?</Form.Label>
      <Form.Control
        as="select"
        name="tratamientoPsicologico"
        value={formData.tratamientoPsicologico}
        onChange={handleChange}
      >
        <option value="no">No</option>
        <option value="si">Sí</option>
      </Form.Control>
    </Form.Group>
  </Col>
</Row>

{formData.tratamientoPsicologico === 'si' && (
  <Row>
    <Col md={12}>
      <Form.Group controlId="tratamientoDetalle">
        <Form.Label>Detalle de Tratamiento Psicológico</Form.Label>
        <Form.Control
          type="text"
          name="tratamientoDetalle"
          value={formData.tratamientoDetalle}
          onChange={handleChange}
        />
      </Form.Group>
    </Col>
  </Row>
)}

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Ficha'}
        </Button>
      </Form>
    </Container>
  );
};

export default FichaSaludPage;

