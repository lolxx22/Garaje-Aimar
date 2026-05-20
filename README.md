# Garage Aimar - Parking Ticket

Sistema web profesional para generar, guardar e imprimir tickets de ingreso para un garaje/parqueadero. Esta construido con HTML5, CSS3, TypeScript y Vite, sin backend ni base de datos tradicional.

## Funcionalidades

- Formulario simple para ingresar solo la placa.
- Fecha y hora de ingreso generadas automaticamente desde el sistema.
- Cada recarga de la pagina inicia el contador y los tickets desde cero.
- Conversion automatica de placa a mayusculas.
- Validaciones claras para campos obligatorios.
- Vista previa del ticket en formato termico/POS.
- Impresion con `window.print()` y CSS `@media print`.
- Impresion exclusiva del ticket, sin formulario ni botones.
- Tickets guardados internamente como JSON en `localStorage`.
- Durante la sesion, el almacenamiento conserva automaticamente los ultimos 20 tickets y elimina los mas antiguos.
- Tarjeta fija con la informacion de Garage Aimar.
- Dashboard oscuro, responsive y moderno.

## AutoSkills

Antes de ajustar o extender el diseno frontend se recomienda ejecutar:

```bash
npx autoskills@latest
```

Selecciona las skills:

- `frontend-design`
- `accessibility`
- `seo`

El proyecto aplica buenas practicas asociadas: estructura semantica, estados visibles, contraste alto, etiquetas accesibles, meta descripcion y experiencia responsive.

## Estructura

```text
parking-ticket/
├── public/
│   └── logo.png
├── src/
│   ├── assets/
│   ├── styles/
│   │   ├── main.css
│   │   └── print.css
│   ├── components/
│   │   ├── ticketPreview.ts
│   │   ├── ticketForm.ts
│   │   └── settingsPanel.ts
│   ├── types/
│   │   ├── ticket.types.ts
│   │   └── settings.types.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   ├── print.ts
│   │   ├── formatDate.ts
│   │   └── validators.ts
│   ├── data/
│   │   └── defaultSettings.ts
│   ├── app.ts
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Carpetas

- `src/components`: renderizado de formulario, vista previa e informacion del garaje.
- `src/styles`: estilos visuales del dashboard y reglas optimizadas de impresion POS.
- `src/types`: contratos TypeScript para tickets y datos del garaje.
- `src/utils`: localStorage, impresion, fechas y validaciones.
- `src/data`: informacion predeterminada de Garage Aimar.
- `public`: archivos estaticos como logo.

## Instalacion

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Compilar para produccion

```bash
npm run build
```

## Flujo de uso

1. Abre la pagina.
2. Ingresa la placa del vehiculo.
3. Haz clic en `Generar ticket`.
4. Revisa la vista previa.
5. Imprime el ticket.
6. El ticket queda guardado internamente en `localStorage`.

## JSON guardado

Cada ticket se guarda en `localStorage` con esta estructura:

```json
{
  "id": "TCK-0001",
  "placa": "GSW-3241",
  "fecha": "19/05/2026",
  "horaIngreso": "15:28",
  "horaSalida": "",
  "valor": "",
  "createdAt": "2026-05-19T15:28:00.000Z"
}
```

## Impresion POS

La impresion esta configurada en `src/styles/print.css` para imprimir solo `#print-area` en formato termico de 58mm.
