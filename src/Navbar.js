import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white" style={navStyle}>
      <div className="container-fluid" style={containerStyle}>
        <Link className="navbar-brand" to="/" style={brandStyle}>Proyecto Ingenieria Financiera</Link>
        <div className="collapse navbar-collapse" id="navbarNav" style={collapseStyle}>
          <ul className="navbar-nav" style={ulStyle}>
            <li className="nav-item" style={liStyle}>
              <Link className="nav-link" to="/" style={linkStyle}>Inicio</Link>
            </li>
            <li className="nav-item" style={liStyle}>
              <Link className="nav-link" to="/valuacion-opciones" style={linkStyle}>Valuacion Opciones</Link>
            </li>
            <li className="nav-item" style={liStyle}>
              <Link className="nav-link" to="/valuacion-riesgo1" style={linkStyle}>Valuacion Riesgo</Link>
            </li>
            
            <li className="nav-item" style={liStyle}>
              <Link className="nav-link" to="/blog" style={linkStyle}>Blog</Link>
            </li>

            <li className="nav-item" style={liStyle}>
              <Link className="nav-link" to="/presentacion" style={linkStyle}><b> Presentacion!</b></Link>
            </li>

            
            <li className="nav-item" style={liStyle}>
              <Link className="nav-link" to="/definiciones" style={linkStyle}><b> Diccionario financiero!</b></Link>
            </li>

            
          </ul>
        </div>
      </div>
    </nav>
  );
};

const navStyle = {
  backgroundColor: 'white',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const brandStyle = {
  flex: '1',
};

const collapseStyle = {
  flex: '2',
};

const ulStyle = {
  display: 'flex',
  listStyle: 'none',
  padding: '0',
};

const liStyle = {
  margin: '0 10px',
};

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
};

export default Navbar;
