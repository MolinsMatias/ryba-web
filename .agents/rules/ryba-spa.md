---
trigger: always_on
---

# Documentación del Proyecto MVP - RYBA SpA

## 1. Resumen del Negocio

**RYBA SpA** es una empresa B2B orientada al sector industrial, minería y construcción. Su propuesta de valor se centra en entregar soluciones integrales mediante la venta y arriendo de maquinaria pesada, infraestructura y equipos de respaldo energético.

El enfoque comercial no es solo proveer la máquina, sino garantizar **continuidad operativa** y **ahorro de costos** en faena, complementando los equipos con servicios de traslado, montaje y mantenimiento.

---

## 2. Catálogo de Equipos y Servicios (Alcance MVP)

El MVP se enfoca exclusivamente en los siguientes **4 equipos principales**:

- **Generador Eléctrico:** Arriendo. (3 unidades). Respaldo de energía insonorizado para faenas.
- **Grúas Hidráulicas (Tipo Pluma):** Venta. Capacidades de 500kg, 1.000kg y 2.000kg. Montaje en camionetas de 5T.
- **Torre de Iluminación Solar:** Venta y Arriendo. Mástil de 7m, 36h de autonomía. Enfoque en ahorro de diésel.
- **Techo para Contenedor (Modular Solar Roof):** Venta y Arriendo. Estructura para contenedores de 20/40 pies.

**Servicios Complementarios:**

- Mantenimiento preventivo y correctivo.
- Fletes y traslados a lo largo de Chile.
- Montaje e instalación en terreno.

---

## 3. Stack Tecnológico y Arquitectura

El proyecto está construido bajo una arquitectura **Jamstack** enfocada en el máximo rendimiento (carga en milisegundos), SEO técnico y cero costos recurrentes de servidor.

- **Framework:** Astro (Generación de sitios estáticos, zero-JS por defecto).
- **Estilos:** Tailwind CSS (Diseño responsivo / Mobile-first, utilidades directas en el HTML).
- **Base de Datos:** Local JSON (Archivos estáticos en el Frontmatter para renderizado dinámico de tarjetas mediante `.map()`).
- **Íconos:** Lucide-Astro / SVG nativo.
- **Control de Versiones:** Git & GitHub.
- **Despliegue y Hosting:** Cloudflare Pages (CI/CD automatizado, CDN global, hosting gratuito).
- **Dominio:** Gestión externa a través de NIC Chile (`.cl`).

---

## 4. Estrategia de Conversión y Flujo de Usuario

El objetivo único de la plataforma es la **generación rápida de leads (Lead Gen)**.

- **Sin formularios complejos:** Se eliminan los formularios de contacto tradicionales para reducir la fricción.
- **Cotización directa:** Cada tarjeta de producto incluye un botón de conversión principal que redirige a la API de WhatsApp (`wa.me`) con un mensaje pre-poblado identificando la máquina de interés.
- **Argumentos de Venta (Copywriting):** Las etiquetas de los productos solares destacan el ahorro operativo anual frente a alternativas diésel, el retorno de inversión (ROI) y sus certificaciones (SEC, IP66, IK10).

---

## 5. Identidad Visual y Directrices de Desarrollo (UI/UX)

Diseño de una sola página (One-Page) con estilo corporativo "Heavy Duty", limpio y optimizado para la lectura en dispositivos móviles en terreno.

- **Instrucción para Agente de IA:** Para la generación de código visual, estructuración de componentes y mejoras de diseño, **siempre que sea posible se debe utilizar la skill "UI Pro Max"**. Esto asegurará un estándar de alta fidelidad, interfaces modernas y una experiencia de usuario (UX) pulida y orientada a la conversión.
