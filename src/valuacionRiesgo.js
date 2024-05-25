import React, { useState } from 'react';
import axios from 'axios';
import styles from './riesgo.css';
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

const ValuacionRiesgo = () => {
    const [parametros, setParametros] = useState({
        codigoAccion: '',
        fechaInicio: '',
        fechaFinal: '',
        tipo: '',
        riesgo: '',
    });
    const [precio, setPrecio] = useState('');
    const [riesgoEWMA, setRiesgoEWMA] = useState('');
    const [riesgoHistorico, setRiesgoHistorico] = useState('');
    const [riesgoGarch, setRiesgoGarch] = useState('');
    const [otroRiesgo3, setOtroRiesgo3] = useState('');
    const [otroRiesgo4, setOtroRiesgo4] = useState('');

    const handleInputChange = (e) => {
        setParametros({
            ...parametros,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5001/calcular_riesgo', { params: parametros });
            setPrecio(response.data.precio);
           
        } catch (error) {
            console.error('Error al obtener el precio', error);
        }
    };

    const data = {
        labels: Array.from({ length: 1600 }, (_, i) => `Dia ${i + 1}`),
        datasets: [
            {
                label: 'Valor de la opción',
                data: Array.from({ length: 1600 }, (_, i) => i + 1),
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
                            {precio && <p className="alert alert-success mt-4">Precio de la Opción: {precio}</p>}
                        </form>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-6">
                        <Line data={data} options={options} />
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Riesgo Histórico</h5>
                                <p className="card-text">{riesgoHistorico}</p>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Riesgo EWMA</h5>
                                <p className="card-text">{riesgoEWMA}</p>
                            </div>
                        </div>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Riesgo GARCH</h5>
                                <p className="card-text">{riesgoGarch}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuacionRiesgo;
