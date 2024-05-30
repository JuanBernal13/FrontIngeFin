import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './valuacionOpciones.css';

const ValuacionOpciones = () => {
  const [parametros, setParametros] = useState({
    precio_actual: '',
    strike: '',
    tiempo_expiracion: '',
    tasa_riesgo: '',
    volatilidad: '',
    tipo: ''
  });
  const [precio, setPrecio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setParametros({
      ...parametros,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/calcular_precio', { params: parametros });
      setPrecio(response.data.precio);
    } catch (error) {
      setError('Error al obtener el precio. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card card-body custom-card">
            <h3 className="text-center mb-4">Valoración de Opciones</h3>
            <div className="form-group mb-3">
              <input
                name="precio_actual"
                value={parametros.precio_actual}
                onChange={handleInputChange}
                placeholder="Precio actual"
                type="number"
                className="form-control"
                step="0.01"
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="strike"
                value={parametros.strike}
                onChange={handleInputChange}
                placeholder="Precio de ejercicio"
                type="number"
                className="form-control"
                step="0.01"
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="tiempo_expiracion"
                value={parametros.tiempo_expiracion}
                onChange={handleInputChange}
                placeholder="Tiempo hasta la expiración (años)"
                type="number"
                className="form-control"
                step="0.01"
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="tasa_riesgo"
                value={parametros.tasa_riesgo}
                onChange={handleInputChange}
                placeholder="Tasa libre de riesgo"
                type="number"
                className="form-control"
                step="0.01"
                required
              />
            </div>
            <div className="form-group mb-3">
              <input
                name="volatilidad"
                value={parametros.volatilidad}
                onChange={handleInputChange}
                placeholder="Volatilidad"
                type="number"
                className="form-control"
                step="0.01"
                required
              />
            </div>
            <div className="form-group mb-3">
              <select
                name="tipo"
                value={parametros.tipo}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Selecciona el tipo</option>
                <option value="call">Call</option>
                <option value="put">Put</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Calculando...' : 'Calcular Precio'}
            </button>
            {precio && <p className="alert alert-success mt-4">Precio de la Opción: {precio}$</p>}
            {error && <p className="alert alert-danger mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ValuacionOpciones;
