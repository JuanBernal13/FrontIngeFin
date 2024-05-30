// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ValuacionOpciones from './valuacionOpciones';
import ValuacionRiesgo1 from './valuacionRiesgo1';
import Definiciones from './definiciones';
import Blog from './blog'; 
import Presentacion from './presentacion';
import ZeroCostCollar from './zeroCostDollar';
import VaRComponent from './varComponent'; 
import SensitivityAnalysis from './SensitivityAnalysis';
import MonteCarloSimulation from './MontecarloSimulation';
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
          <Route path="/valuacion-riesgo1" element={<ValuacionRiesgo1 />} />
          <Route path="/definiciones" element={<Definiciones />} />
          <Route path="/blog" element={<Blog />} /> {/* Verifica esta línea */}
          <Route path="/presentacion" element={<Presentacion />} /> {/* Verifica esta línea */}
          <Route path="/estrategias" element={<ZeroCostCollar />} /> {/* Verifica esta línea */}
          <Route path="/varaccion" element={<VaRComponent />} /> {/* Verifica esta línea */}
          <Route path="/sensibilidad" element={<SensitivityAnalysis />} /> {/* Verifica esta línea */}
          <Route path="/montecarlo" element={<MonteCarloSimulation />} /> {/* Verifica esta línea */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
