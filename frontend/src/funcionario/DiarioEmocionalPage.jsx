import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, ListGroup, Modal } from 'react-bootstrap';
import axios from 'axios';

const DiarioEmocionalPage = () => {
    const [formData, setFormData] = useState({
        fechaAnotacion: '',
        emociones: '',
        comentario: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [anotaciones, setAnotaciones] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [emotionToDelete, setEmotionToDelete] = useState(null);

    useEffect(() => {
        const fetchEmociones = async () => {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            try {
                const response = await axios.get('/api/diario-emocional', {
                    headers: { 'Authorization': `Bearer ${token}` },
                    withCredentials: true,
                });
                setAnotaciones(response.data);
            } catch (err) {
                setError(`Error al cargar el diario emocional: ${err.message}`);

            } finally {
                setLoading(false);
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

        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:3001/api/diario-emocional', formData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.status === 201) {
                setSuccess('Emoción registrada exitosamente.');
                setAnotaciones([...anotaciones, response.data]);
                setFormData({ fechaAnotacion: '', emociones: '', comentario: '' });
            }
        } catch (err) {
            setError('Error al registrar la emoción. Intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (fechaAnotacion) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`/api/diario-emocional/${fechaAnotacion}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.status === 200) {
                setSuccess('Emoción eliminada exitosamente.');
                setAnotaciones(anotaciones.filter(anotacion => anotacion.fechaAnotacion !== fechaAnotacion));
            }
        } catch (err) {
            setError('Error al eliminar la emoción. Intenta de nuevo más tarde.');
        } finally {
            setLoading(false);
            setShowConfirmModal(false);
        }
    };

    const handleShowConfirmModal = (fechaAnotacion) => {
        setEmotionToDelete(fechaAnotacion);
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
                                name="fechaAnotacion"
                                value={formData.fechaAnotacion}
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
                                name="emociones"
                                value={formData.emociones}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccionar...</option>
                                <option value="feliz">Feliz 😊</option>
                                <option value="triste">Triste 😢</option>
                                <option value="aburrido">Aburrido 😐</option>
                                <option value="estresado">Estresado 😩</option>
                                <option value="divertido">Divertido 😂</option>
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
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Emoción'}
                </Button>
            </Form>

            <h2 className="mt-4">Emociones Registradas</h2>
            <ListGroup>
                {anotaciones.map((anotacion, index) => (
                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        <span>
                            <strong>{anotacion.fechaAnotacion}</strong>: {anotacion.emociones} - {anotacion.comentario}
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
