import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './VaRComponent.css';

const VaRComponent = () => {
    const [codigoAccion, setCodigoAccion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [confianza, setConfianza] = useState(0.95);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5003/calcular_var', {
                params: {
                    codigoAccion,
                    fechaInicio,
                    fechaFinal,
                    confianza
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error al calcular el VaR:', error);
        }
    };

    const data = {
        labels: result ? result.fechas : [],
        datasets: [
            {
                label: 'Retornos',
                data: result ? result.retornos : [],
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
                text: 'Retornos de la Acción'
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
                    text: 'Retorno'
                }
            }
        }
    };

    return (
        <div className="var-container">
            <h1>Calcular VaR</h1>
            <form onSubmit={handleSubmit} className="var-form-container">
                <div className="var-form-group">
                    <label>Código de la Acción:</label>
                    <input
                        type="text"
                        value={codigoAccion}
                        onChange={(e) => setCodigoAccion(e.target.value)}
                        required
                    />
                </div>
                <div className="var-form-group">
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />
                </div>
                <div className="var-form-group">
                    <label>Fecha Final:</label>
                    <input
                        type="date"
                        value={fechaFinal}
                        onChange={(e) => setFechaFinal(e.target.value)}
                        required
                    />
                </div>
                <div className="var-form-group">
                    <label>Confianza:</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={confianza}
                        onChange={(e) => setConfianza(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="var-btn btn btn-primary">Calcular VaR</button>
            </form>
            {result && (
                <div className="var-result-container">
                    <h2>Resultado del VaR</h2>
                    <p>VaR Anualizado: {result.var.toFixed(4)}</p>
                    <Line data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default VaRComponent;
