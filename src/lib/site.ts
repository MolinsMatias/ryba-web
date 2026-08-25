// Datos centrales de RYBA SpA. Cambia el número y los productos aquí.
export const WHATSAPP_NUMBER = "56952063672"; // formato internacional sin "+"

export function whatsappLink(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export const empresa = {
  mision:
    "Entregar soluciones integrales para la industria de la construcción mediante la venta y arriendo de equipos, maquinaria y herramientas, complementados con servicios especializados, ofreciendo productos confiables, atención personalizada y una respuesta oportuna que permita a nuestros clientes ejecutar sus proyectos de manera segura, eficiente y rentable.",
  vision:
    "Ser una empresa líder y referente en Chile en la venta, arriendo y servicios para la construcción, reconocida por la calidad de nuestros equipos, la excelencia de nuestro servicio, la confianza de nuestros clientes y nuestra capacidad para entregar soluciones innovadoras que contribuyan al crecimiento y éxito en sus proyectos.",
};

export type Servicio = {
  titulo: string;
  descripcion: string;
};

export const servicios: Servicio[] = [
  {
    titulo: "Mantenimiento",
    descripcion:
      "Preventivo y correctivo en terreno o taller, con repuestos originales y registro de cada intervención.",
  },
  {
    titulo: "Montaje",
    descripcion:
      "Izaje y montaje de estructuras y equipos industriales con planificación, rigging y personal certificado.",
  },
  {
    titulo: "Fletes",
    descripcion:
      "Traslado de maquinaria y carga sobredimensionada con camas bajas, permisos y cobertura nacional.",
  },
];

export type Equipo = {
  id: string;
  nombre: string;
  categoria: string;
  specs: [string, string];
};

export const catalogo: Equipo[] = [
  {
    id: "producto-1",
    nombre: "Producto 1",
    categoria: "Excavación",
    specs: ["Capacidad operativa 20 t", "Alcance de brazo 9,5 m"],
  },
  {
    id: "producto-2",
    nombre: "Producto 2",
    categoria: "Carga",
    specs: ["Balde de 2,5 m³", "Motor 173 HP"],
  },
  {
    id: "producto-3",
    nombre: "Producto 3",
    categoria: "Elevación",
    specs: ["Carga máxima 3.500 kg", "Altura de izaje 6 m"],
  },
  {
    id: "producto-4",
    nombre: "Producto 4",
    categoria: "Compactación",
    specs: ["Rodillo doble 1,7 m", "Fuerza centrífuga 60 kN"],
  },
  {
    id: "producto-5",
    nombre: "Producto 5",
    categoria: "Accesos",
    specs: ["Plataforma tijera 12 m", "Capacidad 300 kg"],
  },
  {
    id: "producto-6",
    nombre: "Producto 6",
    categoria: "Transporte",
    specs: ["Cama baja 3 ejes", "Capacidad 40 t"],
  },
];
