import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, Chart, PointElement } from 'chart.js';
const ValuacionRiesgo = () => {




    Chart.register(
        CategoryScale,
        LinearScale,
        LineElement,
        PointElement,
        Title,
        Tooltip,
        Legend
      );
      
      const data = {
        labels: Array.from({length: 1600}, (_, i) => `Mes ${i + 1}`),
        datasets: [
          {
            label: 'Valor de la opción',
            data: Array.from({length: 1600}, (_,i) => i+1),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      };
      
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Valor de la Opción por Mes'
          }
        },
      };
      
  

  const [parametros, setParametros] = useState({
    strike: '',
    fechaExpiracion: '',
    tipo: '',
    riesgo: '',
  });
  const [precio, setPrecio] = useState('');
  const [riesgoEWMA, setRiesgoEWMA] = useState('');
  const [otroRiesgo1, setOtroRiesgo1] = useState('');
  const [otroRiesgo2, setOtroRiesgo2] = useState('');
  const [otroRiesgo3, setOtroRiesgo3] = useState('');

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
      // Aquí deberías calcular el riesgo EWMA y los otros tipos de riesgo
      // y establecer sus valores en los estados correspondientes.
    } catch (error) {
      console.error('Error al obtener el precio', error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card card-body">
            <h3 className="text-center mb-4">Valoración de Riesgo</h3>
            <div className="form-group mb-3">
              <input
                name="Accion"
                value={parametros.strike}
                onChange={handleInputChange}
                placeholder="Nombre de la acción en yahoo finance"
                type="number"
                className="form-control"
              />
            </div>

           

            <div className="form-group mb-3">
              <input
                name="fechaInicio"
                value={parametros.fechaInicio}
                onChange={handleInputChange}
                placeholder="Fecha de inicio de la toma"
                type="date"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Calcular Riesgos de la acción</button>
            {precio && <p className="alert alert-success mt-4">Precio de la Opción: {precio}</p>}
          </form>
        </div>
      </div>

      <div className="row mt-5">
      <div className="row mt-5">
    <div className="col-md-6">
        <Line data={data} options={options} />
        </div>
        </div>

        <div className="col-md-4">
          {/* Recuadros de riesgo */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Riesgo EWMA</h5>
              <p className="card-text">{riesgoEWMA}</p>
            </div>
          </div>
          <div className="card md-4">
            <div className="card-body">
              <h5 className="card-title">Otro Riesgo 1</h5>
              <p className="card-text">30%</p>
            </div>
          </div>
          <div className="card md-4">
            <div className="card-body">
              <h5 className="card-title">Otro Riesgo 2</h5>
              <p className="card-text">12%</p>
            </div>
          </div>
          <div className="card md-4">
            <div className="card-body">
              <h5 className="card-title">Otro Riesgo 3</h5>
              <p className="card-text">2.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ValuacionRiesgo;
