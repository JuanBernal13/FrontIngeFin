from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/calcular_riesgo": {"origins": "*"}})  # Permitir acceso desde cualquier origen

def calcular_volatilidad_precios(precios):
    retornos = np.log(precios / precios.shift(1))
    volatilidad = retornos.std() * np.sqrt(252)  # Anualizar la volatilidad
    return volatilidad

@app.route('/calcular_riesgo', methods=['GET'])
def calcular_riesgo():
    codigo = request.args.get('codigoAccion')
    fecha_inicio = request.args.get('fechaInicio')
    fecha_final = request.args.get('fechaFinal')

    print(f"Procesando petición para {codigo} desde {fecha_inicio} hasta {fecha_final}")

    data = yf.download(codigo, start=fecha_inicio, end=fecha_final)
    precios = data['Adj Close']

    volatilidad = calcular_volatilidad_precios(precios)

    response = {
        'volatilidad': volatilidad,
        'precios': precios.tolist(),
        'fechas': precios.index.strftime('%Y-%m-%d').tolist()
    }

    print("Respuesta:", response)
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
