import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const ProgresoPage = () => {
    const [emociones, setEmociones] = useState([]);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Emociones Registradas',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    });
    const [loading, setLoading] = useState(true);  // Estado para manejar la carga
    const [error, setError] = useState(null);       // Estado para manejar errores

    useEffect(() => {
        const fetchEmociones = async () => {
            setLoading(true);  // Inicia el estado de carga
            setError(null);     // Elimina cualquier error previo
            try {
                const response = await axios.get('https://localhost:3001/api/diario-emocional');
                setEmociones(response.data);
            } catch (err) {
                console.error('Error al cargar emociones:', err);
                setError('No se pudo cargar las emociones. Intenta de nuevo más tarde.'); // Establece mensaje de error
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchEmociones();
    }, []);

    useEffect(() => {
        if (emociones.length > 0) {
            const emocionesPorDia = Array(7).fill(0);
            emociones.forEach((emocion) => {
                const fecha = new Date(emocion.fecha);
                const dia = fecha.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
                emocionesPorDia[dia] += 1; // Incrementa el conteo 
            });

            setData((prevData) => ({
                ...prevData,
                labels: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                datasets: [{
                    ...prevData.datasets[0],
                    data: emocionesPorDia,
                }],
            }));
        }
    }, [emociones]);

    return (
        <Container>
            <h1>Progreso</h1>
            {loading ? (  // Muestra el indicador de carga
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            ) : error ? (  // Muestra mensaje de error si hay 
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <p>Aquí puedes ver tu progreso en el registro de emociones a lo largo de la semana.</p>
                    <Bar data={data} options={{
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Número de Emociones',
                                },
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Días de la Semana',
                                },
                            },
                        },
                    }} />
                </>
            )}
        </Container>
    );
};

export default ProgresoPage;