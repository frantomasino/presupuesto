import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de tener esto

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/" style={styles.link}>Generador de Presupuestos</Link>
        </li>
        <li style={styles.li}>
          <Link to="/listado" style={styles.link}>Listado de Presupuestos</Link>
        </li>
      </ul>
    </nav>
  );
};

// Estilos básicos para el navbar (puedes modificarlos)
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  ul: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  },
  li: {
    margin: '0 20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
