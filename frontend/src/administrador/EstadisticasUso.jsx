import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EstadisticasUso = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true); // inicia el estado de carga
            const token = localStorage.getItem('authToken');  // para obtener el token desde localStorage
            if (!token) {
                console.error('No se encontró el token');
                setLoading(false); // Finaliza el estado de carga si no hay token
                return;
            }

            try {
                const response = await axios.get('/api/admin/estadisticas-uso', {
                    headers: { 'Authorization': `Bearer ${token}`},  // Agrega el token Bearer en el encabezado Autorización
                    withCredentials: true,
                });
                setStats(response.data); //para actualizar el estado con las estadísticas
            } catch (error) {
                console.error('Error al cargar las estadísticas:', error);
            } finally {
                setLoading(false); // finaliza el estado de carga
            }
        };

        fetchStats(); // para llamar  a la función para obtener las estadísticas
    }, []);  // el array vacío asegura que se ejecute una sola vez al montar el componente

    if (loading) return <div>Cargando estadísticas...</div>;

    return (
        <div>
            <h2>Estadísticas de Uso</h2>
            {stats ? <pre>{JSON.stringify(stats, null, 2)}</pre> : <p>No se encontraron estadísticas.</p>}
        </div>
    );
};

export default EstadisticasUso;