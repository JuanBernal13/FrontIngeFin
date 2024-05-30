import React, { useState } from 'react';
import './ZeroCostDollar.css';
import axios from 'axios';

const ZeroCostCollar = () => {
    const [stockPrice, setStockPrice] = useState('');
    const [putStrikePrice, setPutStrikePrice] = useState('');
    const [callStrikePrice, setCallStrikePrice] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [codigoAccion, setCodigoAccion] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:5002/calcular_estrategia', {
                params: {
                    stockPrice,
                    putStrikePrice,
                    callStrikePrice,
                    expirationDate,
                    codigoAccion
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error al calcular la estrategia:', error);
        }
    };

    return (
        <div className="zero-cost-container">
            <h1>Estrategia Zero-Cost Collar</h1>
            <form onSubmit={handleSubmit} className="zero-cost-form-container">
                <div className="zero-cost-form-group">
                    <label>Precio de la Acción:</label>
                    <input
                        type="number"
                        value={stockPrice}
                        onChange={(e) => setStockPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="zero-cost-form-group">
                    <label>Precio de Ejercicio del Put:</label>
                    <input
                        type="number"
                        value={putStrikePrice}
                        onChange={(e) => setPutStrikePrice(e.target.value)}
                        required
                    />
                </div>
                <div className="zero-cost-form-group">
                    <label>Precio de Ejercicio del Call:</label>
                    <input
                        type="number"
                        value={callStrikePrice}
                        onChange={(e) => setCallStrikePrice(e.target.value)}
                        required
                    />
                </div>
                <div className="zero-cost-form-group">
                    <label>Fecha de Vencimiento:</label>
                    <input
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                </div>
                <div className="zero-cost-form-group">
                    <label>Código de la Acción:</label>
                    <input
                        type="text"
                        value={codigoAccion}
                        onChange={(e) => setCodigoAccion(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="zero-cost-btn btn btn-primary">Calcular Estrategia</button>
            </form>
            {result && (
                <div className="zero-cost-result-container">
                    <h2>Resultado de la Estrategia</h2>
                    <p>Precio de la Acción: ${result.stockPrice}</p>
                    <p>Precio de Ejercicio del Put: ${result.putStrikePrice}</p>
                    <p>Precio de Ejercicio del Call: ${result.callStrikePrice}</p>
                    <p>Fecha de Vencimiento: {result.expirationDate}</p>
                    <p>Prima del Put: ${result.putPremium}</p>
                    <p>Prima del Call: ${result.callPremium}</p>
                    <p>Prima Neta: ${result.netPremium}</p>
                </div>
            )}
        </div>
    );
};

export default ZeroCostCollar;