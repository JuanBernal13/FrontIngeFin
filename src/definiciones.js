import React from 'react';
import styles from './Definitions.module.css';

const Definitions = () => {
    const concepts = [
        { title: 'Riesgo', definition: 'Probabilidad de pérdida.' },
        { title: 'EWMA', definition: 'Método de cálculo de volatilidad basado en eventis previos.' },
        { title: 'Movimiento Browniano', definition: 'Modelo de movimiento aleatorio.' },
        { title: 'Probabilidad de Riesgo Neutral', definition: 'Probabilidad ajustada por riesgo.' },
        { title: 'Probabilidad Real', definition: 'Probabilidad basada en eventos reales.' },
        { title: 'Tipos de Riesgo', definition: 'Riesgo de mercado, crédito, operativo.' },
        { title: 'Black-Scholes', definition: 'Modelo de valoración de opciones.' },
        { title: 'VaR', definition: 'Máxima pérdida esperada.' },
        { title: 'CVaR', definition: 'Pérdida esperada en el peor caso.' },
        { title: 'Riesgo de Mercado', definition: 'Pérdidas por cambios de mercado.' },
        { title: 'Riesgo de Crédito', definition: 'Incapacidad de cumplir obligaciones.' },
        { title: 'Riesgo Operacional', definition: 'Fallos en procesos o sistemas.' },
        { title: 'Riesgo de Liquidez', definition: 'Dificultad para convertir activos en efectivo.' },
        { title: 'Riesgo Sistémico', definition: 'Riesgo de colapso financiero.' },
        { title: 'Riesgo No Sistémico', definition: 'Riesgo específico de un activo.' },
        { title: 'Delta', definition: 'Sensibilidad al precio del activo.' },
        { title: 'Gamma', definition: 'Tasa de cambio de Delta.' },
        { title: 'Vega', definition: 'Sensibilidad a la volatilidad.' },
        { title: 'Theta', definition: 'Sensibilidad al paso del tiempo.' },
        { title: 'Rho', definition: 'Sensibilidad a la tasa de interés.' },
        { title: 'Call', definition: 'Opción de comprar un activo.' },
        { title: 'Put', definition: 'Opción de vender un activo.' },
        { title: 'Valor Intrínseco', definition: 'Diferencia entre el precio del activo y el precio de ejercicio.' },
        { title: 'Valor Temporal', definition: 'Valor de una opción antes de su vencimiento.' }
    ];

    return (
        <div className={styles.definitionsContainer}>
            <h1>Definiciones</h1>
            <div className={styles.cardContainer}>
                {concepts.map((concept, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardFront}>
                                <h2>{concept.title}</h2>
                            </div>
                            <div className={styles.cardBack}>
                                <p>{concept.definition}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Definitions;
