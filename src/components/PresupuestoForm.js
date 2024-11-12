import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './PresupuestoForm.css';

const PresupuestoForm = ({ onCrearPresupuesto }) => {
  const [cliente, setCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [productos, setProductos] = useState([]);

  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [productoCantidad, setProductoCantidad] = useState("1");  
  const [productoPreparacion, setProductoPreparacion] = useState("ninguno");  

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

  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
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

  const agregarProducto = () => {
    const producto = listaProductos.find((prod) => prod.nombre === productoSeleccionado);
    if (producto && productoCantidad) {
      setProductos([
        ...productos,
        {
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: parseInt(productoCantidad),
          preparacion: productoPreparacion === "ninguno" ? "" : productoPreparacion,
        },
      ]);
    } else {
      alert("Por favor selecciona un producto, preparación y cantidad.");
    }
  };

  const eliminarProducto = (index) => {
    const productosActualizados = productos.filter((_, i) => i !== index);
    setProductos(productosActualizados);
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");
    doc.setFontSize(14);

    doc.text("Presupuesto", 10, 10);
    doc.text(`Cliente: ${cliente}`, 10, 20);
    doc.text(`Descripción: ${descripcion}`, 10, 30);
    doc.text(`Fecha: ${new Date(fecha).toLocaleDateString()}`, 10, 40);

    let yOffset = 50;
    productos.forEach((producto) => {
      const preparacionText = producto.preparacion ? ` - ${producto.preparacion}` : "";
      doc.text(
        `${producto.nombre}${preparacionText} - ${producto.cantidad} x $${producto.precio} = $${producto.precio * producto.cantidad}`,
        10,
        yOffset
      );
      yOffset += 10;
    });

    doc.text(`Total: $${calcularTotal()}`, 10, yOffset + 10);
    doc.save("presupuesto.pdf");
  };

  return (
    <div className="presupuesto-container">
      <h2 className="presupuesto-title">Generar Presupuesto</h2>
      <form onSubmit={handleSubmit} className="presupuesto-form">
        
        <label htmlFor="cliente">Nombre del Cliente:</label>
        <input 
          type="text" 
          id="cliente" 
          value={cliente} 
          onChange={(e) => setCliente(e.target.value)} 
          placeholder="Ingrese el nombre del cliente" 
          required 
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese la descripción del presupuesto"
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
        
        <div className="productos-container">
          <label htmlFor="productoSeleccionado">Producto:</label>
          <select 
            id="productoSeleccionado" 
            value={productoSeleccionado} 
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un producto</option>
            {listaProductos.map((producto, index) => (
              <option key={index} value={producto.nombre}>
                {producto.nombre} - ${producto.precio} 
              </option>
            ))}
          </select>

          <label htmlFor="productoCantidad">Cantidad:</label>
          <select 
            id="productoCantidad" 
            value={productoCantidad} 
            onChange={(e) => setProductoCantidad(e.target.value)}
          >
            <option value="1">x1</option>
            <option value="5">x5</option>
            <option value="10">x10</option>
            <option value="15">x15</option>
            <option value="20">x20</option>
            <option value="25">x25</option>
            <option value="30">x30</option>
            <option value="35">x35</option>
            <option value="40">x40</option>
            <option value="45">x45</option>
            <option value="50">x50</option>
          </select>

          <label htmlFor="productoPreparacion">Preparación:</label>
          <select
            id="productoPreparacion"
            value={productoPreparacion}
            onChange={(e) => setProductoPreparacion(e.target.value)}
          >
            <option value="ninguno">Ninguno</option>
            <option value="horno">Horno</option>
            <option value="frita">Frita</option>
            <option value="criolla">Criolla</option>
            <option value="criolla">Ricota</option>
            <option value="criolla">Verdura</option>
            <option value="criolla">Pollo</option>
          </select>

          <button 
            type="button" 
            onClick={agregarProducto}
            className="agregar-producto-btn"
          >
            Agregar Producto
          </button>
        </div>

        <div className="productos-lista">
          <h4>Productos Agregados:</h4>
          <ul>
  {productos.map((producto, index) => (
    <li key={index}>
      {producto.nombre} - ${producto.precio.toLocaleString()} x{producto.cantidad} = ${(producto.precio * producto.cantidad).toLocaleString()}
      <button 
        type="button" 
        onClick={() => eliminarProducto(index)}
        className="eliminar-producto-btn"
      >
        Eliminar
      </button>
         </li>
      ))}
   </ul>
        </div>

        <div className="total-presupuesto">
          <h3>Total: ${calcularTotal().toLocaleString()}</h3>
         </div>

        <button type="submit" className="presupuesto-btn">
          Crear Presupuesto
        </button>

        <button 
          type="button" 
          onClick={generarPDF} 
          className="presupuesto-btn"
        >
          Imprimir PDF
        </button>
      </form>
    </div>
  );
};

export default PresupuestoForm;
