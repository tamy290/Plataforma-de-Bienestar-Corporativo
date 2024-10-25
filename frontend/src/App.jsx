import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './auth/Registro';
import Login from './auth/Login';
import Header from './shared/Header';
import Footer from './shared/Footer';  // Correct import for Footer
import NotFound from './shared/NotFound';

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
                        <Route path="*" element={<NotFound />} />  {/* Adding NotFound for unmatched routes */}
                    </Routes>
                </div>
                <Footer /> 
            </div>
        </Router>
    );
};

export default App;





