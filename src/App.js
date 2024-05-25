// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ValuacionOpciones from './valuacionOpciones';
import ValuacionRiesgo from './valuacionRiesgo';
import Definiciones from './definiciones';

import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/valuacion-opciones" element={<ValuacionOpciones />} />
          <Route path="/valuacion-riesgo" element={<ValuacionRiesgo />} />
          <Route path="/definiciones" element={<Definiciones />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
