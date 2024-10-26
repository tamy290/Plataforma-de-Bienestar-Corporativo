import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './auth/Registro';
import Login from './auth/Login';
import Header from './shared/Header';
import Footer from './shared/Footer';
import NotFound from './shared/NotFound';
import DashboardFuncionario from './funcionario/DashboardEmpleado';
import FichaSaludPage from './funcionario/FichaSaludPage';
import DiarioEmocionalPage from './funcionario/DiarioEmocionalPage';
import ProgresoPage from './funcionario/ProgresoPage';
import NotificacionesPage from './funcionario/NotificacionesPage';
import DashboardPsicólogo from './Psicólogo/DashboardPsicólogo';
import FichaSaludFuncionario from './Psicólogo/FichaSaludFuncionario';
import HistorialFuncionario from './Psicólogo/HistorialFuncionario';
import ReportesBienestar from './Psicólogo/ReportesBienestar';

const App = () => {
    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className="container mt-4 flex-grow-1">
                    <Routes>
                        <Route path="/" element={<h2>Bienvenido a la Plataforma de Bienestar Corporativo</h2>} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<DashboardFuncionario />} />
                        <Route path="/ficha-salud" element={<FichaSaludPage/>}/>
                        <Route path="/diario-emocional" element={<DiarioEmocionalPage />} />
                        <Route path="/progreso" element={<ProgresoPage/>}/>
                        <Route path="/notificaciones" element={<NotificacionesPage />}/>
                        <Route path="/psicologo/dashboard" element={<DashboardPsicólogo/>}/>
                        <Route path="/psicologo/ficha-salud" element={<FichaSaludFuncionario />} />
                        <Route path="/psicologo/historial-funcionario" element={<HistorialFuncionario/>}/>
                        <Route path="/psicologo/reportes-bienestar" element={<ReportesBienestar />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer /> 
            </div>
        </Router>
    );
};

export default App;
