import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './auth/Registro';
import Login from './auth/Login';
import Header from './shared/Header';

const App = () => {
    return (
        <Router>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h2>Bienvenido a la Plataforma de Bienestar Corporativo</h2>} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;




