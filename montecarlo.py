from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/simulacion_montecarlo": {"origins": "*"}})

def simulacion_montecarlo(precios, num_simulaciones=1000, dias_proyectados=252):
    retornos = np.log(precios / precios.shift(1)).dropna()
    media_retornos = retornos.mean()
    var_retornos = retornos.var()

    simulaciones = []
    for _ in range(num_simulaciones):
        precios_simulados = [precios.iloc[-1]]
        for _ in range(dias_proyectados):
            precios_simulados.append(precios_simulados[-1] * np.exp(media_retornos + var_retornos**0.5 * np.random.normal()))
        simulaciones.append(precios_simulados)
    
    fechas_futuras = pd.date_range(start=precios.index[-1], periods=dias_proyectados+1, freq='B')
    simulaciones_df = pd.DataFrame(simulaciones).T
    simulaciones_df.index = fechas_futuras
    return simulaciones_df

@app.route('/simulacion_montecarlo', methods=['GET'])
def simulacion_montecarlo_endpoint():
    codigo = request.args.get('codigoAccion')
    fecha_inicio = request.args.get('fechaInicio')
    fecha_final = request.args.get('fechaFinal')
    num_simulaciones = int(request.args.get('numSimulaciones', 1000))
    dias_proyectados = int(request.args.get('diasProyectados', 252))

    data = yf.download(codigo, start=fecha_inicio, end=fecha_final)
    precios = data['Adj Close']

    simulaciones = simulacion_montecarlo(precios, num_simulaciones, dias_proyectados)
    response = {
        'fechas': simulaciones.index.strftime('%Y-%m-%d').tolist(),
        'simulaciones': simulaciones.values.tolist()
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5004)
