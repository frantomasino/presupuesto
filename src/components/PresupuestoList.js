import React from 'react';
import jsPDF from 'jspdf';

const PresupuestoList = ({ presupuestos }) => {
  const calcularTotal = (productos) => {
    return productos.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
  };

  return (
    <div>
      <h2>Listado de Presupuestos</h2>
      {presupuestos.map((presupuesto, index) => (
        <div key={index} style={styles.item}>
          <p>Cliente: {presupuesto.cliente}</p>
          <p>Descripción: {presupuesto.descripcion}</p>
          <p>Fecha: {new Date(presupuesto.fecha).toLocaleDateString()}</p>

          {/* Tabla de productos */}
          <h4>Productos:</h4>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Descripción</th>
                <th style={styles.th}>Cantidad</th>
                <th style={styles.th}>Precio Unitario</th>
                <th style={styles.th}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {presupuesto.productos.map((producto, prodIndex) => (
                <tr key={prodIndex}>
                  <td style={styles.td}>{producto.nombre}</td>
                  <td style={styles.td}>{producto.cantidad}</td>
                  <td style={styles.td}>${producto.precio.toLocaleString()}</td>
                  <td style={styles.td}>
                    ${(producto.cantidad * producto.precio).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
                  Total:
                </td>
                <td style={styles.td}>
                  ${calcularTotal(presupuesto.productos).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ))}
    </div>
  );
};

const styles = {
  item: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default PresupuestoList;
