import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from './auth/Registro';


const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Registro />} />
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;



