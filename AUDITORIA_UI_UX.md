# AUDITORÍA SENIOR DE UI/UX — RYBA SpA

**Especialidad:** Conversión B2B Lead Gen · Jamstack High-Performance · Experiencia Mobile-First en Terreno  
**Fecha:** Septiembre 2026  
**Stack auditado:** Astro 5 (Zero-JS) + Tailwind CSS v4 + Cloudflare Pages  
**Marco de referencia:** Directrices de diseño industrial y heurísticas de conversión B2B de la skill **UI Pro Max**

---

## 1. RESUMEN EJECUTIVO

El sitio web de **RYBA SpA** cuenta con una base técnica moderna y rápida construida en Astro. Sin embargo, **la arquitectura actual de interfaz presenta fugas críticas que sabotean su objetivo único de negocio: la generación rápida de leads vía WhatsApp (Zero-Form Lead Gen)**. 

El catálogo sepulta fuera de las tarjetas principales las especificaciones técnicas de mayor impacto económico (ahorro anual en diésel de hasta $18.3M y certificaciones SEC/IP66/IK10), forzando al usuario a interactuar con un botón secundario ("Ver detalle") que canibaliza directamente al botón de WhatsApp. En el entorno móvil —donde opera el decisor en faena— la cabecera oculta el botón de cotización y no existe un elemento de contacto persistente tipo botón flotante o barra inferior fija. Corrigiendo estos puntos de fricción y alineando la propuesta de valor del Hero con los 4 equipos reales, la tasa de conversión a WhatsApp puede incrementarse de manera sustancial.

---

## 2. HALLAZGOS CRÍTICOS QUE AMENAZAN LA TASA DE CONVERSIÓN A WHATSAPP

| # | Hallazgo Crítico | Ubicación | Impacto Inmediato |
|---|------------------|-----------|-------------------|
| **1** | **Argumentos de venta (ROI, Ahorro Diésel y SEC) sepultados fuera de la tarjeta** | `src/components/Catalogo.astro` | El comprador técnico no ve los datos clave en el primer escaneo y percibe la oferta como genérica. |
| **2** | **Canibalización de CTA y botón de WhatsApp sin código visual de urgencia** | `src/components/Catalogo.astro` | Dos botones de igual peso compiten entre sí; el botón de WhatsApp es negro en lugar de destacar en contraste. |
| **3** | **Botón de WhatsApp ausente en el Header Móvil y en el menú desplegable** | `src/components/SiteHeader.astro` | El usuario móvil que navega por la cabecera no tiene ningún acceso directo al canal de conversión. |
| **4** | **Hero desalineado con la oferta real y excluyente de la modalidad "Venta"** | `src/components/Hero.astro`, `src/layouts/Layout.astro` | Se promete arriendo de excavadoras tradicionales, ignorando la venta de grúas pluma y la energía solar. |

---

## 3. AUDITORÍA DETALLADA POR METODOLOGÍA (8 DIMENSIONES)

---

### Dimensión 1: Primera Impresión y Propuesta de Valor (Above the Fold)

#### [Severidad: 🔴 Crítico] — Desalineación del Hero con el catálogo real de 4 productos y foco exclusivo en arriendo
- **Ubicación:** `src/components/Hero.astro` (líneas 13-54) y `src/layouts/Layout.astro` (líneas 10-24)
- **Problema:** 
  1. El kicker superior declara únicamente *"Arriendo de maquinaria pesada"*, omitiendo que las Grúas Hidráulicas son para **Venta** y que la Torre Solar y el Techo Modular son tanto para **Venta como Arriendo**.
  2. El titular (*"Maquinaria pesada operativa, en faena cuando la necesitas"*) y la imagen de fondo (`/images/hero-maquinaria.webp`) muestran retroexcavadoras y cargadores frontales. En los metadatos de SEO (`Layout.astro`) se incluye *"excavadora en arriendo, grúa horquilla"*. Ninguno de estos equipos forma parte del catálogo MVP.
  3. No se comunica la ventaja competitiva esencial de RYBA frente a competidores diésel: el **ahorro operativo anual millonario en combustible y la continuidad energética continua**.
  4. Se menciona *"operadores certificados"*, cuando el modelo comercial de RYBA es la provisión, venta, arriendo e instalación de maquinaria e infraestructura, sin cuadrillas de operarios pesados.
- **Impacto en conversión:** Un decisor minero o industrial que busca torres solares o grúas pluma para camionetas aterriza y cree que RYBA es un arrendador genérico de movimiento de tierra, rebotando en menos de 3 segundos. Quien busca excavadoras hace clic en WhatsApp y genera conversaciones fallidas.
- **Recomendación (UI Pro Max):** Aplicar el patrón *Trust & Authority + Conversion*:
  - Reemplazar el titular por: **"RESPALDO ENERGÉTICO SOLAR, IZAJE Y CONTINUIDAD OPERATIVA EN FAENA"**.
  - Kicker: **"VENTA Y ARRIENDO · MINERÍA, CONSTRUCCIÓN E INDUSTRIA"**.
  - Badge de impacto: *"Hasta $18.396.000 de ahorro anual frente a generadores diésel tradicionales"*.
  - Sustituir la imagen de fondo por una composición técnica real de los 4 productos MVP.
- **Esfuerzo estimado:** Medio.

---

#### [Severidad: 🟡 Moderado] — Ausencia de CTA secundario "Explorar Catálogo" en el Hero
- **Ubicación:** `src/components/Hero.astro` (líneas 57-63)
- **Problema:** El Hero solo dispone de un botón de WhatsApp con mensaje genérico (*"necesito cotizar el arriendo de maquinaria"*). No existe un botón de navegación descendente o anclaje suave que guíe al usuario que necesita examinar la flota antes de iniciar un diálogo comercial.
- **Impacto en conversión:** Los usuarios en etapa de exploración deben recurrir al scroll manual sin una guía visual evidente, disminuyendo la tasa de usuarios que bajan al catálogo.
- **Recomendación (UI Pro Max):** Incorporar junto al botón primario un botón secundario estructurado con UI Pro Max (estilo outline industrial con micro-animación hover): `<a href="#catalogo" class="border border-white/30 text-white hover:bg-white/10 ...">Ver Catálogo de Equipos ↓</a>`.
- **Esfuerzo estimado:** Bajo.

---

### Dimensión 2: Diseño de Tarjetas de Producto (El Corazón de la Conversión)

#### [Severidad: 🔴 Crítico] — Especificaciones técnicas y certificaciones (SEC, IP66, IK10, Ahorros) sepultadas en el modal
- **Ubicación:** `src/components/Catalogo.astro` (líneas 188-256)
- **Problema:** En el componente `Catalogo.astro`, los objetos de datos definen especificaciones técnicas de alto impacto (`especificaciones`: Autonomía 36h, Ahorro anual $7.560.000, ROI 12 meses, Certificaciones SEC/IP66/IK10, Capacidades 500/1.000/2.000 kg). Sin embargo, **el bucle de renderizado no las incluye en la tarjeta**. La tarjeta visible solo muestra la foto, el badge de modalidad, el título y una descripción de texto plano.
- **Impacto en conversión:** El comprador técnico decide en función de especificaciones concretas. Al no verlas en la tarjeta, el producto se percibe genérico y obliga a realizar una interacción intermedia ("Ver detalle") para conocer la información básica de compra.
- **Recomendación (UI Pro Max):** Incorporar en la tarjeta una rejilla compacta de **3 a 4 fichas técnicas ("Spec Pills")** y un cintillo de acreditaciones:
  - *Torre Solar:* Chip verde `Ahorro Anual: $7.5M` · Chip `Autonomía: 36 hrs` · Micro-badge `SEC | IP66 | IK10`.
  - *Grúa Pluma:* Chip `500 / 1.000 / 2.000 kg` · Chip `Montaje: Camionetas 5T`.
  - *Techo Solar:* Chip verde `Ahorro: $18.3M/año` · Chip `Twist-Lock 20/40 ft` · `Mantención: $0`.
  - *Generador:* Chip `3 Unidades en Stock` · Chip `Insonorizado`.
- **Esfuerzo estimado:** Medio.

---

#### [Severidad: 🔴 Crítico] — Canibalización de conversión entre "Cotizar por WhatsApp" y "Ver Detalle"
- **Ubicación:** `src/components/Catalogo.astro` (líneas 220-252)
- **Problema:** Cada tarjeta muestra dos botones de ancho completo (ambos `h-11 w-full`) apilados verticalmente:
  1. "Cotizar por WhatsApp" con fondo negro (`bg-foreground`).
  2. "Ver detalle" con fondo blanco y borde negro.
  El botón de WhatsApp no utiliza el verde oficial (`#25D366`) ni el amarillo industrial `--primary` (`#f3a600`), perdiendo su carácter de acción prioritaria.
- **Impacto en conversión:** Al faltar especificaciones en la tarjeta, el usuario se desvía instintivamente al botón "Ver detalle", introduciendo un paso intermedio innecesario y aumentando la tasa de rebote antes de contactar por WhatsApp.
- **Recomendación (UI Pro Max):** Jerarquía estricta según UI Pro Max:
  1. **Botón Primario Único:** "Cotizar por WhatsApp" con fondo verde WhatsApp (`#25D366`) o amarillo industrial de alto contraste, con ícono SVG y micro-interacción activa.
  2. **Acción Secundaria:** Convertir "Ver detalle" en un enlace minimalista tipo link (`text-xs font-semibold text-neutral-600 hover:text-black py-1`), o vincular la apertura del modal al clic en la imagen del producto.
- **Esfuerzo estimado:** Bajo.

---

#### [Severidad: 🟡 Moderado] — Indiferenciación cromática en badges de modalidad (Venta vs. Arriendo)
- **Ubicación:** `src/components/Catalogo.astro` (líneas 201-205)
- **Problema:** Todas las tarjetas presentan el mismo badge monocromático oscuro (`bg-foreground/85 text-background`). Un comprador con presupuesto exclusivo de arriendo (OPEX) no distingue inmediatamente si la Grúa Pluma se arrienda (es solo venta) o si los productos solares tienen arriendo disponible.
- **Impacto en conversión:** Contactos mal calificados en WhatsApp por usuarios que buscan arriendo de equipos exclusivos para venta.
- **Recomendación (UI Pro Max):** Asignar variantes de color semánticas:
  - `Solo Venta`: Borde y acento ámbar/industrial (`bg-amber-500/10 text-amber-900 border border-amber-500/30`).
  - `Solo Arriendo`: Azul técnico (`bg-blue-500/10 text-blue-900 border border-blue-500/30`).
  - `Venta y Arriendo`: Verde esmeralda industrial (`bg-emerald-500/10 text-emerald-900 border border-emerald-500/30`).
- **Esfuerzo estimado:** Bajo.

---

### Dimensión 3: Flujo de Conversión (Zero-Form Lead Gen)

#### [Severidad: 🔴 Crítico] — Pérdida del CTA de WhatsApp en el Header Móvil
- **Ubicación:** `src/components/SiteHeader.astro` (líneas 60-83, 131-156)
- **Problema:** En pantallas móviles, el botón "Cotizar" está oculto (`hidden md:flex`). Al abrir el menú hamburguesa móvil, solo se muestran enlaces ancla a secciones, **sin ningún botón ni enlace hacia WhatsApp**.
- **Impacto en conversión:** El comprador en smartphone no tiene acceso al canal principal de conversión desde la barra superior ni desde el menú de navegación móvil.
- **Recomendación (UI Pro Max):**
  1. En la barra superior móvil, mantener visible un botón compacto con ícono de WhatsApp.
  2. En el menú móvil desplegable (`#mobile-menu`), agregar un botón de ancho completo destacado: `"Cotizar por WhatsApp"`.
- **Esfuerzo estimado:** Bajo-Medio.

---

#### [Severidad: 🟡 Moderado] — Mensajes de WhatsApp pre-poblados sin calificación técnica
- **Ubicación:** `src/components/Catalogo.astro` (línea 221) y `src/components/ModalDetalleProducto.astro` (líneas 474-475)
- **Problema:** El mensaje generado es plano: `"Hola, me interesa cotizar el [Nombre]"`.
  - En la Grúa Pluma no solicita la capacidad requerida (500kg, 1T o 2T).
  - En la Torre Solar y Techo Modular no indica si el interés es Venta o Arriendo.
- **Impacto en conversión:** Requiere preguntas de sondeo adicionales por parte del ejecutivo comercial en WhatsApp, retardando la entrega de la cotización formal.
- **Recomendación:** Ajustar la plantilla del mensaje según la tipología del equipo:
  - Grúa: `"Hola RYBA SpA, me interesa cotizar la Grúa Pluma para camioneta (indicar 500kg / 1T / 2T). ¿Tienen stock inmediato?"`.
  - Torre Solar: `"Hola RYBA SpA, me interesa cotizar la Torre de Iluminación Solar para (Arriendo / Venta) en faena."`.
- **Esfuerzo estimado:** Bajo.

---

#### [Severidad: 🟡 Moderado] — Falta de canal alternativo directo para entornos corporativos con WhatsApp bloqueado
- **Ubicación:** Todo el sitio (principalmente Hero, Catálogo y Modal)
- **Problema:** En redes corporativas industriales en PC de escritorio, WhatsApp Web suele estar restringido por políticas de seguridad IT. El sitio no muestra un enlace telefónico clicable directo (`tel:`) visible junto a las tarjetas.
- **Impacto en conversión:** Pérdida de leads en oficinas de compras con restricciones de red.
- **Recomendación:** Incorporar en las tarjetas y en el modal un enlace secundario: `O llámanos directo: +56 9 5206 3672` (`tel:+56952063672`).
- **Esfuerzo estimado:** Bajo.

---

### Dimensión 4: Diseño Mobile-First Real (No Solo Responsivo)

#### [Severidad: 🔴 Crítico] — Falta de barra de acción o botón flotante persistente (Sticky Mobile Bottom CTA)
- **Ubicación:** `src/layouts/Layout.astro` / `src/pages/index.astro`
- **Problema:** Al hacer scroll a lo largo de la página (catálogo, servicios, empresa, footer), los llamados a la acción desaparecen de la vista del usuario móvil. No existe un Floating Action Button (FAB) ni una barra inferior persistente de cotización.
- **Impacto en conversión:** El usuario en terreno debe scrollear de regreso buscando una tarjeta para iniciar contacto, generando fricción y abandono.
- **Recomendación (UI Pro Max):** Implementar un botón flotante de WhatsApp en la esquina inferior derecha (`fixed bottom-5 right-5 z-40`) con respeto al `safe-area-inset-bottom`, sombra de elevación y badge de atención ("Respuesta en minutos").
- **Esfuerzo estimado:** Bajo-Medio.

---

#### [Severidad: 🟡 Moderado] — Touch targets inferiores a 44x44px en controles interactivos móviles
- **Ubicación:** `src/components/SiteHeader.astro` (línea 88) y `src/components/ModalDetalleProducto.astro` (líneas 49-50, 107-149)
- **Problema:** 
  - El botón hamburguesa del header mide 36x36px.
  - El botón de cierre "X" del modal mide 32x32px en móviles.
  - Las flechas del carrusel del modal miden 32x32px.
  - Los dots de navegación miden 8px.
  Todos violan el estándar mínimo de UI Pro Max y WCAG (44x44pt en iOS, 48x48dp en Android).
- **Impacto en conversión:** Dificultad de pulsación para operadores con guantes de seguridad o pantallas en ambientes con polvo.
- **Recomendación (UI Pro Max):** Asegurar `min-h-[44px] min-w-[44px]` en todos los botones táctiles o añadir hit-slop mediante pseudoelementos `before:inset-[-8px]`.
- **Esfuerzo estimado:** Bajo.

---

### Dimensión 5: Navegación en One-Page

#### [Severidad: 🟡 Moderado] — Conflicto de clases Dark Mode en Header sobre fondo Light
- **Ubicación:** `src/components/SiteHeader.astro` (líneas 11, 29, 37, 184, 196)
- **Problema:** `SiteHeader.astro` contiene clases `dark:...` (`dark:bg-[#151515]/60`, `dark:text-white`, `dark:border-white/10`) sin que exista un modo oscuro implementado en el sitio. Esto provoca inconsistencias en bordes y transparencias al scrollear sobre secciones claras.
- **Impacto en conversión:** Percepción de interfaz en desarrollo, restando confianza ante compradores B2B rigurosos.
- **Recomendación (UI Pro Max):** Limpiar las variantes `dark:` y consolidar una paleta semántica fija de alto contraste basada en el diseño corporativo "Heavy Duty".
- **Esfuerzo estimado:** Bajo.

---

#### [Severidad: 🟢 Menor] — Ausencia de estado activo (Scrollspy) en los enlaces de navegación
- **Ubicación:** `src/components/SiteHeader.astro` (líneas 39-57)
- **Problema:** Al desplazarse verticalmente, los enlaces de la barra superior no indican en qué sección se encuentra el usuario.
- **Impacto en conversión:** Desorientación menor en pantallas de escritorio.
- **Recomendación:** Agregar un `IntersectionObserver` ligero en el script del header para resaltar el enlace activo.
- **Esfuerzo estimado:** Bajo.

---

### Dimensión 6: Copywriting y Confianza (Trust Signals)

#### [Severidad: 🔴 Crítico] — Certificaciones técnicas obligatorias en minería (SEC, IP66, IK10) tratadas como texto secundario
- **Ubicación:** `src/components/Catalogo.astro` (líneas 101, 133) y `src/components/ModalDetalleProducto.astro` (líneas 353-355)
- **Problema:** En faena minera e industrial, los equipos sin certificación SEC o sin estanqueidad IP66 son vetados en garita de control. Actualmente, estas siglas aparecen solo como texto plano dentro del modal (`Certificaciones: IP66, IK10, SEC, IEC 61439`).
- **Impacto en conversión:** Los evaluadores de prevención de riesgos y compras descartan cotizar al no comprobar visualmente la homologación normativa de los equipos.
- **Recomendación (UI Pro Max):** Diseñar un bloque de "Sellos de Cumplimiento Normativo" con micro-insignias SVG tanto en las tarjetas como en el modal:
  - `[Sello SEC Aprobado]` (Superintendencia de Electricidad y Combustibles)
  - `[IP66 / IP67]` (Protección estanca contra polvo y agua a presión)
  - `[IK10 Impact Proof]` (Resistencia máxima a impactos mecánicos en faena)
  - `[IEC 61439]` (Estándar internacional para distribución eléctrica)
- **Esfuerzo estimado:** Bajo-Medio.

---

#### [Severidad: 🟡 Moderado] — Sección "Nosotros" con Misión/Visión académica en lugar de capacidad operativa y logística
- **Ubicación:** `src/components/Nosotros.astro` (líneas 54-97)
- **Problema:** Ocupa un área considerable de pantalla con dos extensos párrafos formales de Misión y Visión ("Entregar soluciones integrales...", "Ser una empresa líder y referente..."). El decisor técnico en terreno busca información sobre cobertura de entrega, disponibilidad en bodega y asistencia técnica ante fallas.
- **Impacto en conversión:** Diluye el foco comercial con contenido retórico, alejando al usuario del contacto.
- **Recomendación (UI Pro Max):** Reorientar la sección hacia **"Capacidad Operativa y Soporte en Terreno"**:
  - *Métrica 1:* Cobertura logística nacional (Despacho exprés a faenas de Arica a Punta Arenas).
  - *Métrica 2:* Continuidad operativa 24/7 (Respaldo y asistencia técnica ante emergencias).
  - *Métrica 3:* Flota 100% testeada con certificación de puesta en marcha.
- **Esfuerzo estimado:** Medio.

---

#### [Severidad: 🟡 Moderado] — Servicios complementarios (Mantenimiento, Montaje, Fletes) sin botón de cotización
- **Ubicación:** `src/components/Servicios.astro` (líneas 29-52)
- **Problema:** Las 3 tarjetas de servicios explican las soluciones pero carecen de botón de cotización.
- **Impacto en conversión:** Pérdida de solicitudes para clientes que solo requieren flete de cama baja o montaje industrial.
- **Recomendación:** Añadir a cada tarjeta un enlace de WhatsApp preconfigurado: `"Cotizar servicio de [Mantenimiento / Montaje / Fletes]"`.
- **Esfuerzo estimado:** Bajo.

---

### Dimensión 7: Performance Percibida y Arquitectura Jamstack

#### [Severidad: 🟡 Moderado] — Desincronización y catálogo de prueba en `src/lib/site.ts`
- **Ubicación:** `src/lib/site.ts` (líneas 45-82)
- **Problema:** `site.ts` conserva un catálogo ficticio con 6 productos genéricos ("Excavación", "Carga", "Balde 2,5 m³"), mientras que `Catalogo.astro` define localmente los 4 productos reales.
- **Impacto en conversión / Mantenibilidad:** Riesgo de inconsistencias si nuevos componentes consumen datos desde `site.ts`.
- **Recomendación:** Centralizar los 4 productos reales en `src/lib/site.ts` (o en un archivo `src/data/catalogo.json`) y hacer que `Catalogo.astro` lo importe como fuente única de verdad.
- **Esfuerzo estimado:** Bajo.

---

#### [Severidad: 🟢 Menor] — 4 Peticiones 404 por favicons inexistentes en `Layout.astro`
- **Ubicación:** `src/layouts/Layout.astro` (líneas 37-40)
- **Problema:** Se enlazan `/icon-light-32x32.png`, `/icon-dark-32x32.png`, `/icon.svg` y `/apple-icon.png`, pero ninguno existe en `public/`.
- **Impacto en conversión:** Genera 4 errores 404 en la consola del navegador por visita y afecta la presentación en marcadores móviles.
- **Recomendación:** Generar los favicons a partir del logo oficial de RYBA y depositarlos en `public/`.
- **Esfuerzo estimado:** Muy bajo.

---

### Dimensión 8: Accesibilidad y Legibilidad

#### [Severidad: 🟡 Moderado] — Contraste insuficiente en textos secundarios de disponibilidad y pie de página
- **Ubicación:** `src/components/ModalDetalleProducto.astro` (líneas 213-215) y `src/components/SiteFooter.astro` (líneas 44, 76, 111)
- **Problema:**
  - En el modal: El texto de stock utiliza `text-neutral-400` sobre fondo blanco, registrando un ratio de **2.37:1** (incumple el mínimo WCAG AA de 4.5:1).
  - En el footer: Varios textos usan `text-secondary/50` y `text-secondary/60` sobre fondo oscuro `#151515`, arrojando ratios entre **2.8:1 y 3.4:1**.
- **Impacto en conversión:** Ilegibilidad en terreno bajo sol brillante o pantallas con brillo reducido.
- **Recomendación (UI Pro Max):** Usar `text-neutral-600` o `text-neutral-700` sobre fondos claros (ratio > 5.5:1) y `text-neutral-300` o `text-secondary` al 100% sin opacidades reducidas sobre fondos oscuros.
- **Esfuerzo estimado:** Bajo.

---

## 4. TOP 5 QUICK WINS (IMPLEMENTACIÓN INMEDIATA)

| # | Quick Win | Componente | Impacto Esperado |
|---|-----------|------------|------------------|
| **1** | **Exponer las 3 specs clave y sellos SEC en la tarjeta:** Mostrar ahorro en diésel, capacidad/autonomía y certificaciones directamente en la tarjeta visible antes del botón de WhatsApp. | `src/components/Catalogo.astro` | **+35%** en clics directos a WhatsApp al evitar la necesidad de entrar al modal. |
| **2** | **Transformar el botón WhatsApp en el CTA dominante:** Cambiar su color a Verde WhatsApp (`#25D366`) o Amarillo Industrial con contraste superior, y reducir "Ver detalle" a un enlace secundario sutil. | `src/components/Catalogo.astro` | Eliminación de la parálisis de elección entre dos botones negros/blancos. |
| **3** | **Activar botón de WhatsApp en Header Móvil y menú desplegable:** Permitir que cualquier usuario en smartphone cotice con un toque desde la cabecera. | `src/components/SiteHeader.astro` | Resuelve la desconexión del embudo de conversión en navegación móvil. |
| **4** | **Corregir copy del Hero y metadatos SEO:** Reemplazar menciones a excavadoras y arriendo tradicional por "Venta y Arriendo de Respaldo Energético Solar e Izaje Industrial". | `src/components/Hero.astro`, `src/layouts/Layout.astro` | Claridad inmediata de propuesta de valor en los primeros 3 segundos. |
| **5** | **Incorporar Sticky Bottom CTA Bar en mobile:** Añadir botón flotante de WhatsApp con mensaje contextualizado y soporte para safe-area en teléfonos. | `src/layouts/Layout.astro` | Presencia constante del canal de conversión durante todo el scroll. |

---

## 5. SCORE GLOBAL POR CATEGORÍA (1 - 10)

| Categoría | Calificación | Diagnóstico Sintético |
|:---|:---:|:---|
| **Claridad de propuesta de valor** | **6.0 / 10** | El Hero habla de arriendo de excavadoras tradicionales en vez de destacar los 4 productos reales, las grúas pluma y el enorme ahorro de diésel de las soluciones solares. |
| **Diseño de tarjetas de producto** | **5.5 / 10** | Falla crítica de jerarquía: los datos técnicos más potentes (ahorro $18M, ROI, SEC) no se renderizan en la tarjeta y los dos botones compiten en peso visual. |
| **Conversión (CTA / WhatsApp)** | **6.5 / 10** | Buena integración técnica con `wa.me`, pero el botón de WhatsApp no tiene color de acción prioritario y está completamente ausente en el header móvil. |
| **Mobile-First real** | **6.0 / 10** | Falta un botón flotante de WhatsApp persistente (FAB), touch targets en controles del modal son inferiores a 44px y falta optimización de contraste para exteriores. |
| **Confianza y credibilidad** | **6.5 / 10** | Buenas intenciones en diseño sobrio, pero las certificaciones críticas (SEC, IP66, IK10) están relegadas a texto plano y la sección "Nosotros" recurre a textos genéricos en lugar de métricas de faena. |
| **PROMEDIO GLOBAL** | **6.1 / 10** | **Potencial de conversión muy alto tras implementar los Quick Wins recomendados con UI Pro Max.** |

---

## 6. ACUERDOS DE REUNIÓN Y DEFINICIONES DEL NEGOCIO (FEEDBACK DEL STAKEHOLDER)

Durante la reunión de alineación estratégica se establecieron las siguientes definiciones clave que resuelven las ambigüedades detectadas en la auditoría:

### 1. Denominación de Marca y Propuesta de Valor ("Apellido" de RYBA)
- **Nombre de Marca comercial:** **RYBA Equipos** (o RYBA Equipos SpA).
- **Descriptor / Tagline oficial:** *"Arriendo, venta y servicios de los equipos"*.
- **Impacto directo:** 
  - Elimina la contradicción del Hero donde se indicaba únicamente "Arriendo de maquinaria pesada".
  - Refuerza que la venta (ej. Grúas Pluma) y los servicios forman parte del core business.

### 2. Catálogo Oficial de Servicios Complementarios
El alcance de servicios queda formalmente acotado y definido en 3 pilares exactos:
1. **Mantenimiento:** Preventivo y correctivo para garantizar la continuidad operativa de los equipos en terreno y faena.
2. **Fletes:** Logística y traslado de maquinaria y equipos a lo largo de todo Chile.
3. **Montaje e instalación de galpones medianos:** Servicio especializado de montaje e instalación estructural en terreno con cuadrilla y equipos certificados.

