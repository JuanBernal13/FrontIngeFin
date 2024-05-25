from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import numpy as np
import pandas as pd
from arch import arch_model

app = Flask(__name__)
CORS(app, resources={r"/calcular_riesgo": {"origins": "*"}})  # Permitir acceso desde cualquier origen

def calcular_volatilidad_precios(precios):
    retornos = np.log(precios / precios.shift(1))
    volatilidad = retornos.std() * np.sqrt(252)  # Anualizar la volatilidad
    return volatilidad, retornos

def calcular_volatilidad_ewma(retornos, window=252, lambda_param=0.94):
    variance = [retornos[:window].var()]
    for i in range(window, len(retornos)):
        variance.append(lambda_param * variance[-1] + (1 - lambda_param) * retornos[i-window:i].var())
    std = pd.Series(np.sqrt(variance) * np.sqrt(252))
    return std.iloc[-1]

def calcular_volatilidad_garch(retornos):
    model = arch_model(retornos.dropna(), vol='Garch', p=1, q=1)
    model_fit = model.fit(disp="off")
    garch_volatility = model_fit.conditional_volatility[-1] * np.sqrt(252)
    return garch_volatility

@app.route('/calcular_riesgo', methods=['GET'])
def calcular_riesgo():
    codigo = request.args.get('codigoAccion')
    fecha_inicio = request.args.get('fechaInicio')
    fecha_final = request.args.get('fechaFinal')

    print(f"Procesando petición para {codigo} desde {fecha_inicio} hasta {fecha_final}")

    data = yf.download(codigo, start=fecha_inicio, end=fecha_final)
    precios = data['Adj Close']

    volatilidad, retornos = calcular_volatilidad_precios(precios)
    volatilidad_ewma = calcular_volatilidad_ewma(retornos)
    volatilidad_garch = calcular_volatilidad_garch(retornos)

    response = {
        'volatilidad': volatilidad,
        'volatilidad_ewma': volatilidad_ewma,
        'volatilidad_garch': volatilidad_garch,
        'precios': precios.tolist(),
        'fechas': precios.index.strftime('%Y-%m-%d').tolist()
    }

    print("Respuesta:", response)
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
