import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Alert, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';

const ReportesBienestar = () => {
    const [reportes, setReportes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nuevoReporte, setNuevoReporte] = useState({ titulo: '', descripcion: '' });

    // Fetch para generar reportes desde el backend
    useEffect(() => {
        const fetchReportes = async () => {
            try {
                const response = await axios.get('https://localhost:3001/api/psicologo/reportes-bienestar');
                setReportes(response.data);
            } catch (err) {
                setError('No se pudieron cargar los reportes. Intenta nuevamente más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchReportes();
    }, []);

    // Generar un nuevo reporte
    const generarReporte = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3001/api/psicolog0/reportes-bienestar/generar', {
                titulo: nuevoReporte.titulo,
                descripcion: nuevoReporte.descripcion,
                fecha: new Date().toISOString() // Asumiendo que el backend espera una fecha en formato ISO
            });
            setReportes((prev) => [...prev, response.data]); // Agregar el nuevo reporte a la lista
            setNuevoReporte({ titulo: '', descripcion: '' }); // Limpiar el formulario
        } catch (err) {
            setError('No se pudo generar el reporte. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    // Manejo de cambios en el formulario de nuevo reporte
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoReporte((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Container>
            <h1 className="mt-4">Reportes de Bienestar</h1>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      /*generar un nuevo reporte */
            <div className="mb-4">
                <h5>Generar Nuevo Reporte</h5>
                <input
                    type="text"
                    name="titulo"
                    value={nuevoReporte.titulo}
                    onChange={handleChange}
                    placeholder="Título del Reporte"
                    className="form-control mb-2"
                />
                <textarea
                    name="descripcion"
                    value={nuevoReporte.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción del Reporte"
                    className="form-control mb-2"
                    rows="3"
                />
                <Button variant="success" onClick={generarReporte} disabled={loading || !nuevoReporte.titulo || !nuevoReporte.descripcion}>
                    {loading ? 'Generando...' : 'Generar Reporte'}
                </Button>
            </div>

      /* Indicador de carga */
            {loading && (
                <div className="d-flex justify-content-center mt-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </Spinner>
                </div>
            )}

      /* Lista de reportes */
            {!loading && (
                <ListGroup>
                    {reportes.length > 0 ? (
                        reportes.map((reporte, index) => (
                            <ListGroup.Item key={index} className="mb-2">
                                <h5>{reporte.titulo}</h5>
                                <p>{reporte.descripcion}</p>
                                <small>Fecha: {new Date(reporte.fecha).toLocaleDateString()}</small>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>
                            <Alert variant="warning">No se encontraron reportes de bienestar.</Alert>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            )}
        </Container>
    );
};

export default ReportesBienestar;
