import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './MonteCarloSimulation.css';

const MonteCarloSimulation = () => {
    const [codigoAccion, setCodigoAccion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [numSimulaciones, setNumSimulaciones] = useState(1000);
    const [diasProyectados, setDiasProyectados] = useState(252);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5004/simulacion_montecarlo', {
                params: {
                    codigoAccion,
                    fechaInicio,
                    fechaFinal,
                    numSimulaciones,
                    diasProyectados
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error al realizar la simulación de Monte Carlo:', error);
        }
    };

    const data = {
        labels: result ? result.fechas : [],
        datasets: result ? result.simulaciones.map((simulacion, index) => ({
            label: `Simulación ${index + 1}`,
            data: simulacion,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
            borderWidth: 1,
            fill: false
        })) : []
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Simulación de Monte Carlo'
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
                    text: 'Precio Simulado'
                }
            }
        }
    };

    return (
        <div className="montecarlo-container">
            <h1>Simulación de Monte Carlo</h1>
            <form onSubmit={handleSubmit} className="montecarlo-form-container">
                <div className="montecarlo-form-group">
                    <label>Código de la Acción:</label>
                    <input
                        type="text"
                        value={codigoAccion}
                        onChange={(e) => setCodigoAccion(e.target.value)}
                        required
                    />
                </div>
                <div className="montecarlo-form-group">
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        required
                    />
                </div>
                <div className="montecarlo-form-group">
                    <label>Fecha Final:</label>
                    <input
                        type="date"
                        value={fechaFinal}
                        onChange={(e) => setFechaFinal(e.target.value)}
                        required
                    />
                </div>
                <div className="montecarlo-form-group">
                    <label>Número de Simulaciones:</label>
                    <input
                        type="number"
                        value={numSimulaciones}
                        onChange={(e) => setNumSimulaciones(e.target.value)}
                        required
                    />
                </div>
                <div className="montecarlo-form-group">
                    <label>Días Proyectados:</label>
                    <input
                        type="number"
                        value={diasProyectados}
                        onChange={(e) => setDiasProyectados(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="montecarlo-btn btn btn-primary">Realizar Simulación</button>
            </form>
            {result && (
                <div className="montecarlo-result-container">
                    <h2>Resultado de la Simulación</h2>
                    <Line data={data} options={options} />
                </div>
            )}
        </div>
    );
};

export default MonteCarloSimulation;
