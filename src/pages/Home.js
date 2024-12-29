import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para redirigir a otra página
import '../Styles/Home.css';

function Home() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <span>MeOrganizo</span>
        </div>
        <ul className="nav-list">
          <li className="nav-item"><a href="#historial">Historial</a></li>
          <li className="nav-item"><a href="#cuenta">Cuenta</a></li>
          <li className="nav-item"><a href="#como-usar">Cómo Usar</a></li>
        </ul>
      </nav>

      <div className="content">
        <h1>Bienvenido a la página de inicio</h1>
        <p>Esta es la primera página que se muestra al iniciar la aplicación.</p>
        
        {/* Tabla de datos */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Fecha</th>
              <th>Sueldo</th>
              <th>Total</th>
              <th>Descuento</th>
              <th>Ahorro</th>
              <th>Inversiones</th>
              <th>Gastos Personales</th>
              <th>Ver detalles</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enero</td>
              <td>dd/mm/yyyy</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td><a href="#detalles">Ver detalles</a></td>
            </tr>
            {/* Agregar más filas si es necesario */}
          </tbody>
        </table>

        {/* Botón para redirigir a la página AgregarMes */}
        <div className="add-month-button">
          <Link to="/agregar-mes">
            <button>Añadir Mes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
