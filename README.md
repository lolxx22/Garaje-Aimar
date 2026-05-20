# Garage Aimar - Parking Ticket

Sistema web profesional para generar, guardar e imprimir tickets de ingreso para un garaje/parqueadero. Está construido con HTML5, CSS3, TypeScript y Vite, sin backend ni base de datos tradicional.

## Funcionalidades

- Formulario simple para ingresar solo la placa.
- Fecha y hora de ingreso generadas automáticamente desde el sistema.
- El contador de tickets se mantiene entre recargas de la página.
- Conversión automática de placa a mayúsculas.
- Validaciones claras para campos obligatorios.
- Vista previa del ticket en formato térmico/POS.
- Impresión con `window.print()` y CSS `@media print`.
- Impresión exclusiva del ticket, sin formulario ni botones.
- Tickets guardados internamente como JSON en `localStorage`.
- Tarjeta fija con la información de Garage Aimar.
- Dashboard oscuro, responsive y moderno.

## AutoSkills

Antes de ajustar o extender el diseño frontend se recomienda ejecutar:

```bash
npx autoskills@latest
```

Selecciona las skills:

- `frontend-design`
- `accessibility`
- `seo`

El proyecto aplica buenas prácticas asociadas: estructura semántica, estados visibles, contraste alto, etiquetas accesibles, meta descripción y experiencia responsive.

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
│   └── index.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Carpetas

- `src/components`: renderizado de formulario, vista previa e información del garaje.
- `src/styles`: estilos visuales del dashboard y reglas optimizadas de impresión POS.
- `src/types`: contratos TypeScript para tickets y datos del garaje.
- `src/utils`: localStorage, impresión, fechas y validaciones.
- `src/data`: información predeterminada de Garage Aimar.
- `public`: archivos estáticos como logo.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

## Compilar para producción

```bash
npm run build
```

## Flujo de uso

1. Abre la página.
2. Ingresa la placa del vehículo.
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
  "createdAt": "2026-05-19T15:28:00.000Z"
}
```

## Impresión POS

La impresión está configurada en `src/styles/print.css` para imprimir solo `#print-area` en formato térmico de 80mm.
