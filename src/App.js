import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usamos Routes en vez de Switch
import Home from './pages/Home';
import AgregarMes from './pages/AgregarMes';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Usamos Routes en vez de Switch */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Uso de "element" para renderizar Home */}
          <Route path="/agregar-mes" element={<AgregarMes />} /> {/* Uso de "element" para renderizar AgregarMes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
