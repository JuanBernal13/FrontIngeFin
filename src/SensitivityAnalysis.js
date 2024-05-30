import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './SensitivityAnalysis.css';

const SensitivityAnalysis = () => {
    const [codigoAccion, setCodigoAccion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [confianzaInicial, setConfianzaInicial] = useState(0.95);
    const [confianzaFinal, setConfianzaFinal] = useState(0.99);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5003/analisis_sensibilidad', {
                params: {
                    codigoAccion,
                    fechaInicio,
                    fechaFinal,
                    confianzaInicial,
                    confianzaFinal
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error al realizar el análisis de sensibilidad:', error);
        }
    };

    const data = {
        labels: result ? result.confianza : [],
        datasets: [
            {
                label: 'VaR Anualizado',
                data: result ? result.var : [],
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
                text: 'Análisis de Sensibilidad del VaR Anualizado'
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Nivel de Confianza'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'VaR Anualizado'
                }
            }
        }
    };

    return (
        <div className="sensitivity-container">
            <h1>Análisis de Sensibilidad del VaR</h1>
            <form onSubmit={handleSubmit} className="sensitivity-form-container">
                <div className="sensitivity-form-group">
                    <label>Código de la Acción:</label>
                    <input
                        type="text"
                        value={codigoAccion}
                        onChange={(e) => setCodigoAccion(e.target.value)}
                        required
                    />
                </div>
                <div className="sensitivity-form-group">
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />
                </div>
                <div className="sensitivity-form-group">
                    <label>Fecha Final:</label>
                    <input
                        type="date"
                        value={fechaFinal}
                        onChange={(e) => setFechaFinal(e.target.value)}
                        required
                    />
                </div>
                <div className="sensitivity-form-group">
                    <label>Confianza Inicial:</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={confianzaInicial}
                        onChange={(e) => setConfianzaInicial(e.target.value)}
                        required
                    />
                </div>
                <div className="sensitivity-form-group">
                    <label>Confianza Final:</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="1"
                        value={confianzaFinal}
                        onChange={(e) => setConfianzaFinal(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="sensitivity-btn btn btn-primary">Realizar Análisis</button>
            </form>
            {result && (
                <div className="sensitivity-result-container">
                    <h2>Resultado del Análisis de Sensibilidad</h2>
                    <Line data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default SensitivityAnalysis;
