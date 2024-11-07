import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeguridadDatos = () => {
  const [securitySettings, setSecuritySettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar configuraciones de seguridad desde el backend
  useEffect(() => {
    const fetchSecuritySettings = async () => {
      setLoading(true); // Inicia el estado de carga
      const token = localStorage.getItem('authToken');  // Obtiene el token desde localStorage
      if (!token) {
        setError('No se encontró el token');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/admin/seguridad-datos', {
          headers: { 'Authorization':'Bearer ${token}'},  // Agrega el token Bearer
          withCredentials: true,
        });
        setSecuritySettings(response.data); // Actualiza el estado con la configuración de seguridad
      } catch (error) {
        setError('Error al cargar las configuraciones de seguridad');
        console.error('Error al cargar configuraciones de seguridad:', error);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchSecuritySettings(); // Llama a la función para cargar la configuración de seguridad
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  const handlePasswordChange = async (newPassword) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No se encontró el token');
      return;
    }

    try {
      const response = await axios.put('/api/admin/cambiar-password', { password: newPassword }, {
        headers: { 'Authorization':'Bearer ${token} '},
        withCredentials: true,
      });
      alert('Contraseña actualizada exitosamente');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setError('No se pudo actualizar la contraseña');
    }
  };

  if (loading) return <div>Cargando configuraciones de seguridad...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Seguridad de Datos</h2>
      <p>Configura las opciones de seguridad de la plataforma para proteger los datos sensibles.</p>

      {/* Mostrar configuraciones de seguridad */}
      {securitySettings ? (
        <div>
          <h3>Configuraciones Actuales</h3>
          <ul>
            <li>Autenticación de dos factores: {securitySettings.twoFactorEnabled ? 'Activada' : 'Desactivada'}</li>
            <li>Encriptación de contraseñas: {securitySettings.passwordEncryption ? 'Activada' : 'Desactivada'}</li>
            <li>Fecha última actualización de contraseña: {new Date(securitySettings.lastPasswordUpdate).toLocaleDateString()}</li>
          </ul>

          {/* Opción para cambiar la contraseña */}
          <div>
            <h3>Cambiar Contraseña</h3>
            <input 
              type="password" 
              placeholder="Nueva contraseña" 
              onChange={(e) => setNewPassword(e.target.value)} 
            />
            <button onClick={() => handlePasswordChange(newPassword)}>Actualizar Contraseña</button>
          </div>
        </div>
      ) : (
        <p>No se encontraron configuraciones de seguridad.</p>
      )}
    </div>
  );
};

export default SeguridadDatos;