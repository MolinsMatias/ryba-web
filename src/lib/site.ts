// Datos centrales de RYBA Equipos. Cambia el número y los productos aquí.
export const WHATSAPP_NUMBER = "56952063672"; // formato internacional sin "+"

export function whatsappLink(mensaje: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

export const empresa = {
  nombre: "RYBA Equipos",
  razonSocial: "RYBA Equipos SpA",
  tagline: "Venta, arriendo y servicios de equipos para faena",
  mision:
    "Entregar soluciones integrales para la industria de la construcción, minería y energía mediante la venta y arriendo de equipos, complementados con servicios técnicos especializados, ofreciendo continuidad operativa, atención personalizada y respuesta ágil en terreno.",
  vision:
    "Ser una empresa referente en Chile en la provisión de equipos de respaldo energético, izaje e infraestructura modular, reconocida por la calidad operativa, ahorro de costos en faena y el compromiso con nuestros clientes.",
};

export type Servicio = {
  titulo: string;
  descripcion: string;
  mensajeWhatsapp: string;
};

export const servicios: Servicio[] = [
  {
    titulo: "Mantenimiento",
    descripcion:
      "Preventivo y correctivo en terreno o taller, garantizando continuidad operativa de los equipos con repuestos originales y registro de cada intervención.",
    mensajeWhatsapp:
      "Hola Rodrigo, deseo cotizar el servicio de mantenimiento para equipos en faena.",
  },
  {
    titulo: "Fletes",
    descripcion:
      "Logística y traslado de maquinaria y equipos a lo largo de todo Chile con camas bajas, permisos especiales y monitoreo permanente.",
    mensajeWhatsapp:
      "Hola Rodrigo, deseo cotizar un servicio de flete/traslado de equipos y maquinaria.",
  },
  {
    titulo: "Montaje e Instalación",
    descripcion:
      "Montaje e instalación de galpones medianos y estructuras modulares en faena con cuadrilla especializada, rigging y personal certificado.",
    mensajeWhatsapp:
      "Hola Rodrigo, deseo cotizar el montaje e instalación de galpones medianos / estructuras modulares en faena.",
  },
];

export interface Especificacion {
  label: string;
  valor: string;
  icono?:
    | "capacidad"
    | "potencia"
    | "peso"
    | "ano"
    | "autonomia"
    | "ahorro"
    | "certificacion"
    | "montaje"
    | string;
}

export interface Disponibilidad {
  estado: string;
  detalle: string;
}

export type ModalidadEquipo = "Arriendo" | "Venta" | "Venta y Arriendo";

export interface VarianteCapacidad {
  id: string; // "500kg", "1000kg", "2000kg"
  nombre_tab: string; // "500 kg", "1.000 kg (1T)", "2.000 kg (2T)"
  subtitulo?: string;
  mensaje_whatsapp: string;
  imagenes: string[];
  especificaciones: Especificacion[];
}

export interface Equipo {
  id: string;
  nombre: string;
  descripcion_corta: string;
  modalidad: ModalidadEquipo;
  tipo_modalidad: "arriendo" | "venta" | "mixto";
  ahorro_destacado?: {
    monto: string;
    subtitulo: string;
  };
  bullets_clave: string[];
  certificaciones_chips?: string[];
  mensaje_whatsapp: string;
  imagenes: string[];
  especificaciones: Especificacion[];
  variantes?: VarianteCapacidad[];
}

export const catalogo: Equipo[] = [
  {
    id: "generador-electrico",
    nombre: "Generador Eléctrico",
    descripcion_corta:
      "Respaldo de energía insonorizado para faenas y obras. Disponibilidad inmediata y energía continua en terreno.",
    modalidad: "Arriendo",
    tipo_modalidad: "arriendo",
    bullets_clave: [
      "Generación y respaldo de energía continua en faena",
      "Gabinete insonorizado para operación continua",
      "Soporte y mantenimiento preventivo en terreno",
    ],
    mensaje_whatsapp:
      "Hola Rodrigo, me interesa cotizar el arriendo del Generador Eléctrico para faena. ¿Tienen disponibilidad inmediata?",
    imagenes: [
      "/images/catalogo/generador-electrico/generador-rojo.webp",
      "/images/catalogo/generador-electrico/generador-rojo-lateral.webp",
      "/images/catalogo/generador-electrico/generador-azul1.webp",
      "/images/catalogo/generador-electrico/generador-azul2.webp",
    ],
    certificaciones_chips: ["Insonorizado", "Diésel", "380V / 220V"],
    especificaciones: [
      {
        label: "Conexión",
        valor: "Trifásico / Monofásico (380V - 220V)",
        icono: "potencia",
      },
      {
        label: "Régimen",
        valor: "Operación continua para faena",
        icono: "capacidad",
      },
      { label: "Gabinete", valor: "Insonorizado Heavy Duty", icono: "peso" },
      {
        label: "Mantenimiento",
        valor: "Respaldo preventivo en terreno",
        icono: "montaje",
      },
    ],
  },
  {
    id: "grua-hidraulica",
    nombre: "Grúas óleo hidráulicas",
    descripcion_corta:
      "Capacidades de 500kg, 1.000kg y 2.000kg. Montaje rápido y directo sobre camiones o camionetas de 5T.",
    modalidad: "Venta",
    tipo_modalidad: "venta",
    bullets_clave: [
      "Capacidades de 500, 1.000 y 2.000 kg",
      "Montaje directo sobre camionetas o camiones 5T",
      "Winche eléctrico con accionamiento 12V / 24V",
    ],
    certificaciones_chips: ["Montaje 5T", "Giro 360°"],
    mensaje_whatsapp:
      "Hola Rodrigo, me interesa cotizar la compra de Grúas Hidráulicas Tipo Pluma. ¿Me pueden enviar valores para las capacidades de 500kg, 1T y 2T?",
    imagenes: [
      "/images/catalogo/grua-hidraulica/500kg/foto-de-portada.webp",
      "/images/catalogo/grua-hidraulica/1000kg/foto-en-camioneta-1.webp",
      "/images/catalogo/grua-hidraulica/500kg/foto-en-camioneta.webp",
      "/images/catalogo/grua-hidraulica/1000kg/foto-en-camioneta-2.webp",
      "/images/catalogo/grua-hidraulica/1000kg/foto-de-funcionalidad.webp",
      "/images/catalogo/grua-hidraulica/2000kg/foto-de-contexto-estilo-de-vida.webp",
      "/images/catalogo/grua-hidraulica/1000kg/detalle-de-winche-y-cabezal-de-pluma.webp",
      "/images/catalogo/grua-hidraulica/500kg/detalle-de-montaje-y-base-chico.webp",
      "/images/catalogo/grua-hidraulica/1000kg/detalle-de-montaje-y-base-grande.webp",
      "/images/catalogo/grua-hidraulica/1000kg/perspectiva-alternativa-vista-completa.webp",
      "/images/catalogo/grua-hidraulica/1000kg/foto-de-detalle-close-up-tecnica.webp",
      "/images/catalogo/grua-hidraulica/1000kg/foto-de-escala-o-dimensiones.webp",
    ],
    especificaciones: [
      {
        label: "Capacidad de levante",
        valor: "500 / 1.000 / 2.000 kg",
        icono: "capacidad",
      },
      {
        label: "Montaje compatible",
        valor: "Directo sobre camiones o camionetas de 5T",
        icono: "montaje",
      },
      {
        label: "Operación",
        valor: "Mando a distancia / Botonera",
        icono: "potencia",
      },
      { label: "Brazo", valor: "Telescópico ajustable", icono: "peso" },
    ],
    variantes: [
      {
        id: "500kg",
        nombre_tab: "500 kg",
        subtitulo: "Versión ligera para pickup y faena liviana",
        mensaje_whatsapp:
          "Hola Rodrigo, me interesa cotizar la Grúa Hidráulica Tipo Pluma capacidad 500 kg para camioneta/camión.",
        imagenes: [
          "/images/catalogo/grua-hidraulica/500kg/foto-de-portada.webp",
          "/images/catalogo/grua-hidraulica/500kg/foto-en-camioneta.webp",
          "/images/catalogo/grua-hidraulica/500kg/detalle-de-montaje-y-base-chico.webp",
          "/images/catalogo/grua-hidraulica/500kg/perspectiva-alternativa-vista-completa.webp",
          "/images/catalogo/grua-hidraulica/500kg/foto-de-detalle-close-up-tecnica.webp",
          "/images/catalogo/grua-hidraulica/500kg/foto-de-escala-o-dimensiones.webp",
        ],
        especificaciones: [
          {
            label: "Capacidad de levante",
            valor: "500 kg (0.5 Ton)",
            icono: "capacidad",
          },
          {
            label: "Montaje compatible",
            valor: "Camionetas pickup y camiones livianos 5T",
            icono: "montaje",
          },
          {
            label: "Accionamiento",
            valor: "Winche eléctrico 12V / 24V",
            icono: "potencia",
          },
          {
            label: "Brazo",
            valor: "Telescópico manual ajustable",
            icono: "peso",
          },
        ],
      },
      {
        id: "1000kg",
        nombre_tab: "1.000 kg (1T)",
        subtitulo: "Versión intermedia estándar",
        mensaje_whatsapp:
          "Hola Rodrigo, me interesa cotizar la Grúa Hidráulica Tipo Pluma capacidad 1.000 kg (1 Ton) para faena.",
        imagenes: [
          "/images/catalogo/grua-hidraulica/1000kg/foto-en-camioneta-1.webp",
          "/images/catalogo/grua-hidraulica/1000kg/foto-en-camioneta-2.webp",
          "/images/catalogo/grua-hidraulica/1000kg/foto-de-funcionalidad.webp",
          "/images/catalogo/grua-hidraulica/1000kg/detalle-de-winche-y-cabezal-de-pluma.webp",
          "/images/catalogo/grua-hidraulica/1000kg/detalle-de-montaje-y-base-grande.webp",
          "/images/catalogo/grua-hidraulica/1000kg/perspectiva-alternativa-vista-completa.webp",
          "/images/catalogo/grua-hidraulica/1000kg/foto-de-detalle-close-up-tecnica.webp",
          "/images/catalogo/grua-hidraulica/1000kg/foto-de-escala-o-dimensiones.webp",
        ],
        especificaciones: [
          {
            label: "Capacidad de levante",
            valor: "1.000 kg (1.0 Ton)",
            icono: "capacidad",
          },
          {
            label: "Montaje compatible",
            valor: "Directo sobre chasis pickup o camión 5T",
            icono: "montaje",
          },
          {
            label: "Accionamiento",
            valor: "Winche eléctrico Heavy Duty",
            icono: "potencia",
          },
          {
            label: "Giro de pluma",
            valor: "360° continuo",
            icono: "certificacion",
          },
        ],
      },
      {
        id: "2000kg",
        nombre_tab: "2.000 kg (2T)",
        subtitulo: "Versión reforzada para faena pesada",
        mensaje_whatsapp:
          "Hola Rodrigo, me interesa cotizar la Grúa Hidráulica Tipo Pluma capacidad 2.000 kg (2 Ton) para faena.",
        imagenes: [
          "/images/catalogo/grua-hidraulica/2000kg/foto-de-contexto-estilo-de-vida.webp",
        ],
        especificaciones: [
          {
            label: "Capacidad de levante",
            valor: "2.000 kg (2.0 Ton)",
            icono: "capacidad",
          },
          {
            label: "Montaje compatible",
            valor: "Camiones 5T / Chasis estructural reforzado",
            icono: "montaje",
          },
          {
            label: "Estructura",
            valor: "Acero de alta resistencia Heavy Duty",
            icono: "peso",
          },
          {
            label: "Operación",
            valor: "Botonera / Mando a distancia",
            icono: "potencia",
          },
        ],
      },
    ],
  },
  {
    id: "torre-iluminacion-solar",
    nombre: "Torre de Iluminación Solar",
    descripcion_corta:
      "Mástil retráctil de 7 metros movible en 360°. Ahorro anual de $7.560.000 en diésel y retorno en 12 meses.",
    modalidad: "Venta y Arriendo",
    tipo_modalidad: "mixto",
    ahorro_destacado: {
      monto: "$7.560.000 / año",
      subtitulo: "ROI 12 Meses",
    },
    bullets_clave: [
      "36 horas de autonomía continua (100% solar)",
      "Mástil retráctil de 7m con giro 360°",
      "Cero gasto en diésel y cero emisión de CO₂",
    ],
    certificaciones_chips: ["SEC", "IP66", "IK10", "IEC 61439"],
    mensaje_whatsapp:
      "Hola Rodrigo, me interesa cotizar la Torre de Iluminación Solar (Venta / Arriendo) y conocer el cálculo de ahorro frente a torres diésel.",
    imagenes: [
      "/images/catalogo/torre-iluminacion-solar/titulo-vision-frontal-y-producto-heroe.webp",
      "/images/catalogo/torre-iluminacion-solar/contexto-de-uso-y-preparacion.webp",
      "/images/catalogo/torre-iluminacion-solar/demostracion-de-poder-y-funcionalidad.webp",
      "/images/catalogo/torre-iluminacion-solar/detalle-tecnico-y-panel-de-control.webp",
      "/images/catalogo/torre-iluminacion-solar/perfil-de-despliegue-y-dimensiones.webp",
      "/images/catalogo/torre-iluminacion-solar/rendimiento-y-cobertura-de-area.webp",
      "/images/catalogo/torre-iluminacion-solar/whatsapp-image-2026-09-04-at-115830-3.webp",
    ],
    especificaciones: [
      { label: "Autonomía", valor: "36 horas continuas", icono: "autonomia" },
      { label: "Ahorro anual en diésel", valor: "$7.560.000", icono: "ahorro" },
      { label: "Retorno de inversión", valor: "12 meses", icono: "ahorro" },
      {
        label: "Certificaciones",
        valor: "IP66, IK10, SEC, IEC 61439",
        icono: "certificacion",
      },
      {
        label: "Mástil",
        valor: "7m vertical telescópico con rotación 360°",
        icono: "montaje",
      },
    ],
  },
  {
    id: "modular-solar-roof",
    nombre: "Modular Solar Roof",
    descripcion_corta:
      "Estructura modular para contenedores de 20 o 40 pies con fijación twist-lock. Ahorro anual de $18.396.000 en diésel y $0 en mantención.",
    modalidad: "Venta y Arriendo",
    tipo_modalidad: "mixto",
    ahorro_destacado: {
      monto: "$18.396.000 / año",
      subtitulo: "$0 Mantención",
    },
    bullets_clave: [
      "24 horas de autonomía continua en faena",
      "Fijación rápida twist-lock para contenedores 20 y 40 ft",
      "Ahorro de combustible garantizado y $0 mantención",
    ],
    certificaciones_chips: ["SEC", "IP67", "IK10", "IEC 61439"],
    mensaje_whatsapp:
      "Hola Rodrigo, me interesa cotizar el Modular Solar Roof para contenedor de [20 / 40] pies (Venta / Arriendo).",
    imagenes: [
      "/images/catalogo/modular-solar-roof/producto-heroe-vision-final-de-la-solucion-portada.webp",
      "/images/catalogo/modular-solar-roof/detalle-posterior-y-accesos.webp",
      "/images/catalogo/modular-solar-roof/escala-y-dimensiones-laterales.webp",
      "/images/catalogo/modular-solar-roof/funcionalidad-tecnica-sistema-energetico-integrado.webp",
    ],
    especificaciones: [
      { label: "Autonomía", valor: "24 horas continuas", icono: "autonomia" },
      {
        label: "Ahorro anual en diésel",
        valor: "$18.396.000",
        icono: "ahorro",
      },
      { label: "Costo mantención", valor: "$0", icono: "ahorro" },
      {
        label: "Certificaciones",
        valor: "IP67, IK10, SEC, IEC 61439",
        icono: "certificacion",
      },
      {
        label: "Compatibilidad",
        valor: "Contenedores marítimos estándar 20 y 40 pies",
        icono: "montaje",
      },
    ],
  },
];
