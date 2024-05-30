from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/analisis_sensibilidad": {"origins": "*"}})

def calcular_var(precios, confianza=0.95, periodo=252):
    retornos = np.log(precios / precios.shift(1)).dropna()
    var_diario = np.percentile(retornos, (1 - confianza) * 100)
    var_anualizado = var_diario * np.sqrt(periodo)
    return var_anualizado

@app.route('/analisis_sensibilidad', methods=['GET'])
def analisis_sensibilidad():
    codigo = request.args.get('codigoAccion')
    fecha_inicio = request.args.get('fechaInicio')
    fecha_final = request.args.get('fechaFinal')
    confianza_inicial = float(request.args.get('confianzaInicial', 0.95))
    confianza_final = float(request.args.get('confianzaFinal', 0.99))
    
    data = yf.download(codigo, start=fecha_inicio, end=fecha_final)
    precios = data['Adj Close']

    confidencias = np.linspace(confianza_inicial, confianza_final, num=10)
    var_values = [calcular_var(precios, confianza=confianza) for confianza in confidencias]

    response = {
        'confianza': confidencias.tolist(),
        'var': var_values
    }

    return jsonify(response)    

if __name__ == '__main__':
    app.run(debug=True, port=5003)
