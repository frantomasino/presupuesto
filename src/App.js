import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  
import PresupuestoForm from './components/PresupuestoForm';
import PresupuestoList from './components/PresupuestoList';

const App = () => {
  const [presupuestos, setPresupuestos] = useState([]);

  // Función para agregar un presupuesto
  const agregarPresupuesto = (nuevoPresupuesto) => {
    setPresupuestos([...presupuestos, nuevoPresupuesto]);
  };

  // Función para eliminar un presupuesto
  const eliminarPresupuesto = (index) => {
    const nuevosPresupuestos = presupuestos.filter((_, i) => i !== index);
    setPresupuestos(nuevosPresupuestos);
  };

  return (
    <Router>
      <div>
        {/* Navbar está fuera de las rutas para que siempre se vea */}
        <Navbar />
        
        <div className="content">
          <Routes>
            <Route 
              path="/"
              element={<PresupuestoForm onCrearPresupuesto={agregarPresupuesto} />}
            />
            <Route 
              path="/listado"
              element={<PresupuestoList presupuestos={presupuestos} onEliminarPresupuesto={eliminarPresupuesto} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
