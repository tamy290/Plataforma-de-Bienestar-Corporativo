import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Alert, Spinner, Form, Badge } from 'react-bootstrap';
import axios from 'axios';

const HistorialFuncionario = () => {
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');

  // Fetch del historial desde el backend
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await axios.get('https://localhost:3001/api/psicologa/historial');
        setHistorial(response.data);
      } catch (err) {
        setError('No se pudo cargar el historial. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  // Filtrado de historial
  const historialFiltrado = historial.filter((item) =>
    item.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Container>
      <h1 className="mt-4">Historial del Funcionario</h1>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      
      {/* Barra de búsqueda */}
      <Form className="mb-3 mt-3">
        <Form.Control
          type="text"
          placeholder="Buscar en el historial..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </Form>

      {/* Indicador de carga */}
      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <ListGroup>
          {historialFiltrado.length > 0 ? (
            historialFiltrado.map((item, index) => (
              <ListGroup.Item key={index} className="mb-2">
                <div>
                  <Badge bg="info" className="me-2">Fecha:</Badge>
                  {new Date(item.fecha).toLocaleDateString()} {/* Formato de fecha */}
                </div>
                <div>
                  <Badge bg="secondary" className="me-2">Descripción:</Badge>
                  {item.descripcion}
                </div>
                <div>
                  <Badge bg="success" className="me-2">Estado:</Badge>
                  {item.estado}
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>
              <Alert variant="warning">No se encontraron resultados para tu búsqueda.</Alert>
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
    </Container>
  );
};

export default HistorialFuncionario;