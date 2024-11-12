let presupuestos = [];

export const agregarPresupuesto = (presupuesto) => {
  presupuestos.push(presupuesto);
  return presupuestos;
};

export const obtenerPresupuestos = () => {
  return presupuestos;
};
