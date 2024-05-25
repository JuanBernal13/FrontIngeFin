import React, { useState } from 'react';
import './blog.css';

const Blog = () => {
    const [accion, setAccion] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [historial, setHistorial] = useState([]);
    const [filtroAccion, setFiltroAccion] = useState('');
    const [filtroCalificacion, setFiltroCalificacion] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const fechaActual = new Date().toISOString().split('T')[0];
        const nuevaEntrada = { accion, calificacion, descripcion, fecha: fechaActual };
        setHistorial([...historial, nuevaEntrada]);
        // Limpiar el formulario
        setAccion('');
        setCalificacion('');
        setDescripcion('');
    };

    const entradasFiltradas = historial.filter((entrada) => {
        return (
            (filtroAccion === '' || entrada.accion.includes(filtroAccion)) &&
            (filtroCalificacion === '' || entrada.calificacion.includes(filtroCalificacion)) &&
            (filtroFecha === '' || entrada.fecha.includes(filtroFecha))
        );
    });

    return (
        <div className="blog-container">
            <h1>Registro de Acciones</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Nombre de la Acción:</label>
                    <input
                        type="text"
                        value={accion}
                        onChange={(e) => setAccion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Calificación:</label>
                    <input
                        type="text"
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Registrar Acción</button>
            </form>
            <h2>Filtrar Historial</h2>
            <div className="form-group">
                <label>Filtrar por Nombre de la Acción:</label>
                <input
                    type="text"
                    value={filtroAccion}
                    onChange={(e) => setFiltroAccion(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Filtrar por Calificación:</label>
                <input
                    type="text"
                    value={filtroCalificacion}
                    onChange={(e) => setFiltroCalificacion(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Filtrar por Fecha:</label>
                <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                />
            </div>
            <h2>Historial</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de la Acción</th>
                        <th>Calificación</th>
                        <th>Descripción</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {entradasFiltradas.map((entrada, index) => (
                        <tr key={index}>
                            <td>{entrada.accion}</td>
                            <td>{entrada.calificacion}</td>
                            <td>{entrada.descripcion}</td>
                            <td>{entrada.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Blog;
