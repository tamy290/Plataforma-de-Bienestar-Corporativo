import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, ListGroup, Modal } from 'react-bootstrap';
import axios from 'axios';

const DiarioEmocionalPage = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    emoji: '',
    comentario: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [emociones, setEmociones] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [emotionToDelete, setEmotionToDelete] = useState(null);

  // Cargar emociones 
  useEffect(() => {
    const fetchEmociones = async () => {
      try {
        const response = await axios.get('https://localhost:3001/api/diario-emocional');
        setEmociones(response.data);
      } catch (err) {
        setError('Error al cargar las emociones. Intenta de nuevo más tarde.');
      }
    };

    fetchEmociones();
  }, []);

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
      const response = await axios.post('https://localhost:3001/api/diario-emocional', formData);

      if (response.status === 201) {
        setSuccess('Emoción registrada exitosamente.');
        setEmociones([...emociones, formData]);
        setFormData({ fecha: '', emoji: '', comentario: '' });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message); // Mensaje de error de validación
      } else {
        setError('Error al registrar la emoción. Intenta de nuevo más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fecha) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.delete(`https://localhost:3001/api/diario-emocional/${fecha}`);

      if (response.status === 200) {
        setSuccess('Emoción eliminada exitosamente.');
        setEmociones(emociones.filter(em => em.fecha !== fecha));
      }
    } catch (err) {
      setError('Error al eliminar la emoción. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
      setShowConfirmModal(false); // Cerrar el modal de confirmación
    }
  };

  const handleShowConfirmModal = (fecha) => {
    setEmotionToDelete(fecha);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setEmotionToDelete(null);
  };

  return (
    <Container>
      <h1>Diario Emocional</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="emoji">
              <Form.Label>Selecciona tu emoción</Form.Label>
              <Form.Control
                as="select"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="😊">Feliz 😊</option>
                <option value="😢">Triste 😢</option>
                <option value="😐">Aburrido 😐</option>
                <option value="😩">Estresado 😩</option>
                <option value="😂">Divertido 😂</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="comentario">
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="comentario"
            value={formData.comentario}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Emoción'}
        </Button>
      </Form>

      <h2 className="mt-4">Emociones Registradas</h2>
      <ListGroup>
        {emociones.map((em, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
            <span>
              <strong>{em.fecha}</strong>: {em.emoji} - {em.comentario}
            </span>
            <Button variant="danger" onClick={() => handleShowConfirmModal(em.fecha)}>
              Eliminar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal de Confirmación */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar esta emoción registrada?</p>
          <p><strong>Fecha:</strong> {emotionToDelete}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(emotionToDelete)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DiarioEmocionalPage;
