import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const ValuacionRiesgo1 = () => {
    const [parametros, setParametros] = useState({
        codigoAccion: '',
        fechaInicio: '',
        fechaFinal: ''
    });
    const [volatilidad, setVolatilidad] = useState('');
    const [precios, setPrecios] = useState([]);
    const [fechas, setFechas] = useState([]);

    const handleInputChange = (e) => {
        setParametros({
            ...parametros,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5000/calcular_riesgo', { params: parametros });
            setVolatilidad(response.data.volatilidad);
            setPrecios(response.data.precios);
            setFechas(response.data.fechas);
        } catch (error) {
            console.error('Error al obtener los datos', error);
        }
    };

    const data = {
        labels: fechas,
        datasets: [
            {
                label: 'Precios Ajustados',
                data: precios,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
                text: 'Precios Ajustados y Volatilidad'
            }
        },
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
                                    name="codigoAccion"
                                    value={parametros.codigoAccion}
                                    onChange={handleInputChange}
                                    placeholder="Código de la acción en Yahoo Finance"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <p>Fecha de inicio de la toma</p>
                                <input
                                    name="fechaInicio"
                                    value={parametros.fechaInicio}
                                    onChange={handleInputChange}
                                    placeholder="Fecha de inicio de la toma"
                                    type="date"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-3">
                                <p>Fecha final de la toma</p>
                                <input
                                    name="fechaFinal"
                                    value={parametros.fechaFinal}
                                    onChange={handleInputChange}
                                    placeholder="Fecha final"
                                    type="date"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Calcular Riesgos de la acción</button>
                            {volatilidad && <p className="alert alert-success mt-4">Volatilidad: {volatilidad}</p>}
                        </form>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-6">
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuacionRiesgo1;
