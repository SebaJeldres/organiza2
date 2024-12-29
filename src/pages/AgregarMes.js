import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para redirigir a otra página
import '../Styles/AgregarMes.css';

function AgregarMes() {
  // Estados para los ingresos
  const [ingresos, setIngresos] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);

  // Estados para los pagos pendientes
  const [nombrePago, setNombrePago] = useState('');
  const [montoPago, setMontoPago] = useState(0);
  const [pagosPendientes, setPagosPendientes] = useState([]);

  // Estados para los bonos u otros ingresos
  const [nombreBono, setNombreBono] = useState('');
  const [montoBono, setMontoBono] = useState(0);
  const [bonosIngresos, setBonosIngresos] = useState([]);

  // Estado para los cálculos
  const [restante, setRestante] = useState(0);
  const [distribucion, setDistribucion] = useState('');

  // Estados para los valores de distribución
  const [gastos, setGastos] = useState(0);
  const [ahorro, setAhorro] = useState(0);
  const [inversion, setInversion] = useState(0);

  // Estados para el mes y la fecha de creación
  const [mes, setMes] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState(new Date().toLocaleDateString());

  // Función para calcular el total de ingresos
  const handleIngresosChange = () => {
    // Sumar sueldo a los ingresos totales
    const total = parseFloat(ingresos) + bonosIngresos.reduce((acc, bono) => acc + bono.monto, 0);
    setTotalIngresos(total);
    // Recalcular el total restante
    const totalPagos = pagosPendientes.reduce((acc, pago) => acc + pago.monto, 0);
    setRestante(total - totalPagos);
  };

  // Función para manejar los pagos pendientes
  const handlePagoChange = () => {
    // Agregar el nuevo pago a la lista de pagos pendientes
    const nuevoPago = { nombre: nombrePago, monto: parseFloat(montoPago) };
    setPagosPendientes([...pagosPendientes, nuevoPago]);

    // Recalcular el total de pagos
    const totalPagos = pagosPendientes.reduce((acc, pago) => acc + pago.monto, 0) + parseFloat(montoPago);

    // Calcular el total restante (Ingresos + Bonos - Pagos Pendientes)
    const totalBonos = bonosIngresos.reduce((acc, bono) => acc + bono.monto, 0);
    setRestante(totalIngresos + totalBonos - totalPagos);

    // Limpiar campos de pago
    setNombrePago('');
    setMontoPago(0);
  };

  // Función para manejar los bonos u otros ingresos
  const handleBonoChange = () => {
    const nuevoBono = { nombre: nombreBono, monto: parseFloat(montoBono) };
    setBonosIngresos([...bonosIngresos, nuevoBono]);

    // Recalcular el total de ingresos (sueldo + bonos)
    const totalBonos = bonosIngresos.reduce((acc, bono) => acc + bono.monto, 0) + parseFloat(montoBono);
    const nuevoTotalIngresos = parseFloat(ingresos) + totalBonos;
    setTotalIngresos(nuevoTotalIngresos);

    // Recalcular el total restante después de agregar un bono
    const totalPagos = pagosPendientes.reduce((acc, pago) => acc + pago.monto, 0);
    setRestante(nuevoTotalIngresos - totalPagos);

    // Limpiar campos de bono
    setNombreBono('');
    setMontoBono(0);
  };

  // Función para manejar la distribución de lo restante
  const handleDistribucionChange = (valor) => {
    setDistribucion(valor);
    let gastos = 0, ahorro = 0, inversion = 0;
    if (valor === '50-30-20') {
      gastos = restante * 0.5;
      ahorro = restante * 0.3;
      inversion = restante * 0.2;
    } else if (valor === '60-40') {
      gastos = restante * 0.6;
      ahorro = restante * 0.4;
    }
    setGastos(gastos);
    setAhorro(ahorro);
    setInversion(inversion);
  };

  return (
    <div>
      {/* Header de navegación */}
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

      <div className="agregar-mes">
        <h1>Agregar un Mes</h1>

        {/* Sección de Mes y Fecha de Creación */}
        <div className="mes-fecha-container">
          <label>
            Mes:
            <input
              type="text"
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              placeholder="Ejemplo: Enero"
            />
          </label>
          <label>
            Fecha de Creación:
            <input
              type="text"
              value={fechaCreacion}
              readOnly
            />
          </label>
        </div>

        <p>Por favor, ingresa el monto de tus ingresos para el mes.</p>

        {/* Sección de Ingresos */}
        <div className="section-container">
          <h2>Ingresos del mes</h2>
          <table>
            <tbody>
              <tr>
                <th>Sueldo</th>
                <td>
                  <input
                    type="number"
                    value={ingresos}
                    onChange={(e) => setIngresos(e.target.value)}
                    onBlur={handleIngresosChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Total de ingresos</th>
                <td>${totalIngresos}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sección de Bonos u Otros Ingresos */}
        <div className="bonos-container">
          <h3>Bonos u Otros Ingresos</h3>
          <table>
            <tbody>
              <tr>
                <th>Nombre del bono</th>
                <td>
                  <input
                    type="text"
                    value={nombreBono}
                    onChange={(e) => setNombreBono(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Monto del bono</th>
                <td>
                  <input
                    type="number"
                    value={montoBono}
                    onChange={(e) => setMontoBono(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button onClick={handleBonoChange}>Agregar Bono</button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Mostrar los bonos ingresados */}
          <h4>Bonos Agregados</h4>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {bonosIngresos.map((bono, index) => (
                <tr key={index}>
                  <td>{bono.nombre}</td>
                  <td>${bono.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mostrar el total de ingresos (sueldo + bonos) */}
          <h4>Total de ingresos (Sueldo + Bonos)</h4>
          <p>${totalIngresos}</p>
        </div>

        {/* Sección de Pagos Pendientes */}
        <div className="pagos-container">
          <h3>Pagos pendientes</h3>
          <table>
            <tbody>
              <tr>
                <th>Nombre del pago</th>
                <td>
                  <input
                    type="text"
                    value={nombrePago}
                    onChange={(e) => setNombrePago(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Monto del pago</th>
                <td>
                  <input
                    type="number"
                    value={montoPago}
                    onChange={(e) => setMontoPago(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button onClick={handlePagoChange}>Agregar pago pendiente</button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Mostrar los pagos pendientes */}
          <h4>Pagos Pendientes</h4>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              {pagosPendientes.map((pago, index) => (
                <tr key={index}>
                  <td>{pago.nombre}</td>
                  <td>${pago.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mostrar el total restante después de los pagos */}
          <h4>Total Restante (Ingresos + Bonos - Pagos Pendientes)</h4>
          <p>${restante}</p>
        </div>

        {/* Sección de Distribución de lo restante */}
        <div className="distribucion-container">
          <h3>Distribuir lo restante</h3>
          <table>
            <tbody>
              <tr>
                <th>
                  <label>
                    <input type="radio" name="distribucion" value="50-30-20" onChange={(e) => handleDistribucionChange(e.target.value)} />
                    Distribución 50/30/20
                  </label>
                </th>
              </tr>
              <tr>
                <th>
                  <label>
                    <input type="radio" name="distribucion" value="60-40" onChange={(e) => handleDistribucionChange(e.target.value)} />
                    Distribución 60/40
                  </label>
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Resultados */}
        <div className="resultados">
          <h3>Resultados</h3>
          <table>
            <tbody>
              <tr>
                <th>Gastos</th>
                <td>${gastos}</td>
              </tr>
              <tr>
                <th>Ahorro</th>
                <td>${ahorro}</td>
              </tr>
              <tr>
                <th>Inversiones</th>
                <td>${inversion}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Botón Finalizar */}
        <button className="finalizar">Finalizar</button>
      </div>
    </div>
  );
}

export default AgregarMes;
