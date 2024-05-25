from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy.stats import norm

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

def black_scholes(S, K, T, r, sigma, option_type):
    """
    Calcula el precio de una opción usando el modelo Black-Scholes.

    :param S: Precio actual del activo subyacente
    :param K: Precio de ejercicio
    :param T: Tiempo hasta la expiración (en años)
    :param r: Tasa libre de riesgo
    :param sigma: Volatilidad del activo subyacente
    :param option_type: Tipo de opción ('call' o 'put')
    :return: Precio de la opción
    """
    d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    if option_type == 'call':
        price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    elif option_type == 'put':
        price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    else:
        raise ValueError("El tipo de opción debe ser 'call' o 'put'")

    return price

@app.route('/calcular_precio', methods=['GET'])
def calcular_precio():
    S = float(request.args.get('precio_actual'))
    K = float(request.args.get('strike'))
    T = float(request.args.get('tiempo_expiracion'))
    r = float(request.args.get('tasa_riesgo'))
    sigma = float(request.args.get('volatilidad'))
    option_type = request.args.get('tipo')

    precio = black_scholes(S, K, T, r, sigma, option_type)
    return jsonify({'precio': precio})

if __name__ == '__main__':
    app.run(debug=True)
