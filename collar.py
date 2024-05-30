from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import numpy as np
from scipy.optimize import minimize
import pandas as pd
app = Flask(__name__)
CORS(app, resources={r"/calcular_estrategia": {"origins": "*"}})  
def obtener_volatilidad(codigo_accion, fecha_inicio, fecha_final):
    data = yf.download(codigo_accion, start=fecha_inicio, end=fecha_final)
    precios = data['Adj Close']
    retornos = np.log(precios / precios.shift(1)).dropna()
    volatilidad = retornos.std() * np.sqrt(252)  
    return volatilidad

@app.route('/calcular_estrategia', methods=['GET'])
def calcular_estrategia():
    stock_price = float(request.args.get('stockPrice'))
    put_strike_price = float(request.args.get('putStrikePrice'))
    call_strike_price = float(request.args.get('callStrikePrice'))
    expiration_date = request.args.get('expirationDate')
    codigo_accion = request.args.get('codigoAccion')

    fecha_inicio = (pd.to_datetime(expiration_date) - pd.DateOffset(years=1)).strftime('%Y-%m-%d')
    fecha_final = expiration_date

    volatilidad = obtener_volatilidad(codigo_accion, fecha_inicio, fecha_final)

    # Suposiciones para el cálculo de las primas
    risk_free_rate = 0.01  # Tasa libre de riesgo anual
    T = (pd.to_datetime(expiration_date) - pd.Timestamp.today()).days / 365.0  # Tiempo hasta la expiración en años

    def black_scholes_price(S, K, T, r, sigma, option_type="call"):
        from scipy.stats import norm
        d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)
        if option_type == "call":
            price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
        else:
            price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        return price

    # Calcular las primas usando Black-Scholes
    call_premium = black_scholes_price(stock_price, call_strike_price, T, risk_free_rate, volatilidad, "call")
    put_premium = black_scholes_price(stock_price, put_strike_price, T, risk_free_rate, volatilidad, "put")

    # Optimización para encontrar una configuración de Zero-Cost Collar
    def objective(x):
        call_premium = black_scholes_price(stock_price, x[0], T, risk_free_rate, volatilidad, "call")
        put_premium = black_scholes_price(stock_price, x[1], T, risk_free_rate, volatilidad, "put")
        return abs(call_premium - put_premium)

    bounds = [(0.5 * stock_price, 1.5 * stock_price), (0.5 * stock_price, 1.5 * stock_price)]
    result = minimize(objective, [call_strike_price, put_strike_price], bounds=bounds, method='L-BFGS-B')

    optimized_call_strike = result.x[0]
    optimized_put_strike = result.x[1]
    optimized_call_premium = black_scholes_price(stock_price, optimized_call_strike, T, risk_free_rate, volatilidad, "call")
    optimized_put_premium = black_scholes_price(stock_price, optimized_put_strike, T, risk_free_rate, volatilidad, "put")

    response = {
        'stockPrice': stock_price,
        'putStrikePrice': optimized_put_strike,
        'callStrikePrice': optimized_call_strike,
        'expirationDate': expiration_date,
        'putPremium': optimized_put_premium,
        'callPremium': optimized_call_premium,
        'netPremium': optimized_call_premium - optimized_put_premium
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5002)
