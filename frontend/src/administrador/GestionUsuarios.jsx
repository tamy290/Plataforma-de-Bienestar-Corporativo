import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestionUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // inicia el estado de carga
            const token = localStorage.getItem('authToken');  //paran obtener el token desde localStorage
            if (!token) {
                console.error('No se encontró el token');
                setLoading(false); // finaliza el estado de carga si no hay token
                return;
            }

            try {
                const response = await axios.get('/api/admin/gestion-usuarios', {
                    headers: { 'Authorization': `Bearer ${token}` },
                    withCredentials: true,  // para asegurar que las cookies se envíen con la solicitud
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error); // Maneja el error si falla la solicitud
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };

        fetchUsers(); // Llama a la función para obtener los usuarios
    }, []);  // El array vacío asegura que se ejecute una sola vez al montar el componente

    const deleteUser = async (userId) => {
        const token = localStorage.getItem('authToken');  // Obtiene el token desde localStorage
        if (!token) {
            console.error('No se encontró el token');
            return;
        }

        try {
            await axios.delete('api/admin/gestion-usuarios/${userId}', {
                headers: { 'Authorization': `Bearer ${token}`, },  // Agrega el token Bearer en el encabezado Authorization
                withCredentials: true,
            });
            setUsers(users.filter(user => user.id !== userId)); // Elimina el usuario de la lista de usuarios
        } catch (error) {
            console.error('Error al eliminar usuario:', error); // Maneja el error si falla la eliminación
        }
    };

    if (loading) return <div>Cargando...</div>; // Muestra un mensaje mientras los usuarios se cargan

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionUsuarios;