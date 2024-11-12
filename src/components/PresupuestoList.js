import React from 'react';
import jsPDF from 'jspdf';

const PresupuestoList = ({ presupuestos, onEliminarPresupuesto }) => {
  const handleEliminar = (index) => {
    onEliminarPresupuesto(index);
  };

  const handleImprimir = (presupuesto) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Presupuesto", 10, 10);
    doc.text(`Cliente: ${presupuesto.cliente}`, 10, 20);
    doc.text(`Descripción: ${presupuesto.descripcion}`, 10, 30);
    doc.text(`Monto: $${presupuesto.monto}`, 10, 40);
    doc.text(`Cantidad: ${presupuesto.cantidad}`, 10, 50);
    doc.text(`Fecha: ${new Date(presupuesto.fecha).toLocaleDateString()}`, 10, 60);

    doc.save(`presupuesto_${presupuesto.cliente}.pdf`);
  };

  return (
    <div>
      <h2>Listado de Presupuestos</h2>
      <ul>
        {presupuestos.map((presupuesto, index) => (
          <li key={index} style={styles.item}>
            <p>Cliente: {presupuesto.cliente}</p>
            <p>Descripción: {presupuesto.descripcion}</p>
            <p>Monto: {presupuesto.monto}</p>
            <p>Cantidad: {presupuesto.cantidad}</p>
            <p>Fecha: {new Date(presupuesto.fecha).toLocaleDateString()}</p>

            {/* Botón para eliminar */}
            <button 
              onClick={() => handleEliminar(index)} 
              style={styles.deleteBtn}
            >
              Eliminar
            </button>

            {/* Botón para imprimir */}
            <button 
              onClick={() => handleImprimir(presupuesto)} 
              style={styles.imprimirBtn}
            >
              Imprimir Presupuesto
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  item: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '10px',
  },
  imprimirBtn: {
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '10px',
  }
};

export default PresupuestoList;
