import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ValuacionOpciones = () => {
  const [parametros, setParametros] = useState({
    strike: '',
    fechaExpiracion: '',
    tipo: ''
  });
  const [precio, setPrecio] = useState('');

  const handleInputChange = (e) => {
    setParametros({
      ...parametros,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('URL_DE_TU_API', { params: parametros });
      setPrecio(response.data.precio);
    } catch (error) {
      console.error('Error al obtener el precio', error);
    }
  };

return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={handleSubmit} className="card card-body">
                    <h3 className="text-center mb-4">Valoración de Opciones</h3>
                    <div className="form-group mb-3">
                        <input
                            name="strike"
                            value={parametros.strike}
                            onChange={handleInputChange}
                            placeholder="Precio de ejercicio"
                            type="number"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group mb-3">
                        <input
                            name="riesgo"
                            value={parametros.riesgo}
                            onChange={handleInputChange}
                            placeholder="Riesgo anual conocido de la accion"
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            name="fechaExpiracion"
                            value={parametros.fechaExpiracion}
                            onChange={handleInputChange}
                            placeholder="Fecha de expiración"
                            type="Number"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group mb-3">
                        <select name="tipo" value={parametros.tipo} onChange={handleInputChange} className="form-control">
                            <option value="">Selecciona el tipo</option>
                            <option value="call">Call</option>
                            <option value="put">Put</option>
                        </select>
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100">Calcular Precio</button>
                    { <p className="alert alert-success mt-4">Precio de la Opción: {1.6}</p>}
                </form>
            </div>
        </div>
    </div>
);
};

export default ValuacionOpciones;
