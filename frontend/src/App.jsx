import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './auth/Registro';
import Login from './auth/login';
const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;


