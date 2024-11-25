import React, { useState } from "react"; // Importa React y useState
import { jsPDF } from "jspdf";           // Importa jsPDF para manejar la generación de PDF
import "./PresupuestoForm.css";          // Importa los estilos (si los tienes)

const formatearNumero = (numero) => {
  return new Intl.NumberFormat("es-AR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numero);
};

const PresupuestoForm = ({ onCrearPresupuesto }) => {
  const [cliente, setCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  const listaProductos = [
    { nombre: "Tapas para empanadas x330g ", precio: 817 },
    { nombre: "Tapas para empanadas GOLD x400g (mas gruesas)", precio: 993 },
    { nombre: "Tapas para empanadas GOURMET x400g (super crocantes)", precio: 993 },
    { nombre: "Tapas para empanadas SALVADO x330g (fuente de fibras)", precio: 817 },
    { nombre: "Tapas para pascualina x400g ", precio: 995 },
    { nombre: "Tapas para pascualina light x400g ", precio: 995 },
    { nombre: "Tapas para pascualina GOURMET x500g (super crocantes)", precio: 1273 },
    { nombre: "Tapas para pascualina SALVADO x400g (fuente de fibras)", precio: 995 },
    { nombre: "Tapas para empanadas Super x500g ", precio: 1113 },
    { nombre: "Tapas para empanadas Super Tubo x2Kg. x 4 doc", precio: 4195 },
    { nombre: "Tapas para empanadas Super Salvado x500g (consultar)", precio: 1158 },
    { nombre: "Tapas para copetin x330g ", precio: 834 },
    { nombre: "Tapas para pastel x450g ", precio: 1025 },
    { nombre: "Tapas para empanadas tipo Fatay x650g ", precio: 1686 },
    { nombre: "Tapas para Pre-pizza x580g (2u)", precio: 1923 },
    { nombre: "Ravioles x600g. x 2 planchas ", precio: 1942 },
    { nombre: "Ravioles 1kg", precio: 100 },
  ];

  const calcularTotal = () =>
    productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

  const agregarProducto = () => {
    const productoBase = listaProductos.find((prod) => prod.nombre === productoSeleccionado);
    if (productoBase) {
      setProductos([
        ...productos,
        {
          nombre: productoBase.nombre,
          precio: productoBase.precio,
          cantidad: 1, // Cantidad inicial
          preparacion: "ninguno", // Preparación inicial por defecto
        },
      ]);
    }
  };

  const actualizarProducto = (index, key, value) => {
    const productosActualizados = [...productos];
    productosActualizados[index][key] = key === "cantidad" ? parseInt(value) : value;
    setProductos(productosActualizados);
  };

  const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text("Presupuesto", 10, 10);
    doc.text(`Cliente: ${cliente}`, 10, 20);
    doc.text(`Descripción: ${descripcion}`, 10, 30);
    doc.text(`Fecha: ${new Date(fecha).toLocaleDateString()}`, 10, 40);

    let yOffset = 50;
    productos.forEach((producto) => {
      doc.text(
        `${producto.nombre} - ${producto.cantidad} x $${formatearNumero(producto.precio)} = $${formatearNumero(
          producto.cantidad * producto.precio
        )} (${producto.preparacion})`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    doc.text(`Total: $${formatearNumero(calcularTotal())}`, 10, yOffset + 10);
    doc.save("presupuesto.pdf");
  };

  const generarWhatsAppLink = () => {
    const presupuestoText = `
      Presupuesto para ${cliente}
      Descripción: ${descripcion}
      Fecha: ${new Date(fecha).toLocaleDateString()}

      Productos:
      ${productos
        .map(
          (producto) =>
            `${producto.nombre} (${producto.cantidad} x $${formatearNumero(
              producto.precio
            )}) = $${formatearNumero(producto.cantidad * producto.precio)} (${producto.preparacion})`
        )
        .join("\n")}

      Total: $${formatearNumero(calcularTotal())}
    `;
    
    // Codifica el texto para el enlace de WhatsApp
    const mensaje = encodeURIComponent(presupuestoText);

    // Reemplaza el número de teléfono con el del cliente
    const telefono = "+5491131256510"; // Número de teléfono en formato internacional (código de país + número)
    return `https://wa.me/${telefono}?text=${mensaje}`;
  };

  const enviarPorWhatsApp = () => {
    const link = generarWhatsAppLink();
    window.open(link, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoPresupuesto = {
      cliente,
      descripcion,
      fecha: new Date(fecha),
      productos,
      total: calcularTotal(),
    };

    if (onCrearPresupuesto) {
      onCrearPresupuesto(nuevoPresupuesto);
    }

    setCliente("");
    setDescripcion("");
    setFecha("");
    setProductos([]);
  };

  return (
    <div className="presupuesto-container">
      <h2>Generar Presupuesto</h2>
      <form onSubmit={handleSubmit} className="presupuesto-form">
        <label htmlFor="cliente">Nombre del Cliente:</label>
        <input
          type="text"
          id="cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <h4>Seleccionar Producto:</h4>
        <select
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un producto</option>
          {listaProductos.map((producto, index) => (
            <option key={index} value={producto.nombre}>
              {producto.nombre} - ${formatearNumero(producto.precio)}
            </option>
          ))}
        </select>

        <button type="button" onClick={agregarProducto}>
          Agregar Producto
        </button>

        <div className="productos-lista">
          <h4>Productos Agregados:</h4>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Preparación</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>
                    <select
                      value={producto.preparacion}
                      onChange={(e) =>
                        actualizarProducto(index, "preparacion", e.target.value)
                      }
                    >
                      <option value="ninguno">Ninguno</option>
                      <option value="horno">Horno</option>
                      <option value="frita">Frita</option>
                      <option value="criolla">Criolla</option>
                      <option value="ricota">Ricota</option>
                      <option value="verdura">Verdura</option>
                      <option value="pollo">Pollo</option>
                    </select>
                  </td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.precio.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>${(producto.precio * producto.cantidad).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td>
                    <button
                      onClick={() => eliminarProducto(index)}
                      className="eliminar-producto-btn"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="total-presupuesto">
          <h3>Total: ${formatearNumero(calcularTotal())}</h3>
        </div>

        <button type="submit">Crear Presupuesto</button>
        <button type="button" onClick={generarPDF}>
          Imprimir PDF
        </button>
        <button type="button" onClick={enviarPorWhatsApp}>
          Enviar por WhatsApp
        </button>
      </form>
    </div>
  );
};

export default PresupuestoForm;
