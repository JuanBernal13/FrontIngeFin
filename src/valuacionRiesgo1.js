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
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [parametros, setParametros] = useState({
        codigoAccion: 'NVDA',
        fechaInicio: formatDate(oneYearAgo),
        fechaFinal: formatDate(today),
        tipo: '',
        riesgo: '',
    });
    const [precio, setPrecio] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [volatilidad, setVolatilidad] = useState(0);
    const [volatilidadEWMA, setVolatilidadEWMA] = useState(0);
    const [volatilidadGARCH, setVolatilidadGARCH] = useState(0);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setParametros({
            ...parametros,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const response = await axios.get('http://localhost:5001/calcular_riesgo', { params: parametros });
            setPrecio(response.data.precios);
            setFechas(response.data.fechas);
            setVolatilidad(response.data.volatilidad);
            setVolatilidadEWMA(response.data.volatilidad_ewma);
            setVolatilidadGARCH(response.data.volatilidad_garch);
        } catch (error) {
            setError('Error al obtener los datos');
            console.error('Error al obtener los datos', error);
        }
    };

    const data = {
        labels: fechas,
        datasets: [
            {
                label: 'Precio de la acción',
                data: precio,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
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
                text: 'Precio de la acción a lo largo del tiempo'
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Fecha'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Precio'
                }
            }
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
                                    type="date"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Calcular Riesgos de la acción</button>
                            {error && <p className="alert alert-danger mt-4">{error}</p>}
                            {volatilidad > 0 && <p className="alert alert-success mt-4">Volatilidad Anualizada: {volatilidad.toFixed(4)}</p>}
                        </form>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-8">
                        <Line data={data} options={options} />
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Volatilidad Histórica</h5>
                                <p className="card-text">{volatilidad.toFixed(4)}</p>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Volatilidad EWMA</h5>
                                <p className="card-text">{volatilidadEWMA.toFixed(4)}</p>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Volatilidad GARCH(1,1)</h5>
                                <p className="card-text">{volatilidadGARCH.toFixed(4)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuacionRiesgo1;
