import type { GarageSettings } from '../types/settings.types'
import type { Ticket } from '../types/ticket.types'
import { escapeHtml } from '../utils/escapeHtml'

export function renderTicketPreview(ticket: Ticket | null, settings: GarageSettings): string {
  const empty = '<span class="ticket-empty">Pendiente</span>'
  const widthClass = 'ticket-80'
  const logoUrl = `${import.meta.env.BASE_URL}logo.svg`

  return `
    <section class="card preview-card" aria-labelledby="preview-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Vista previa</span>
          <h2 id="preview-title">Ticket de ingreso</h2>
        </div>
        <span class="status-pill">${settings.ticketWidth}</span>
      </div>

      <div id="print-area" class="ticket-shell ${widthClass}" aria-live="polite">
        <article class="thermal-ticket">
          <header class="ticket-header">
            <img class="ticket-logo" src="${logoUrl}" alt="" aria-hidden="true" />
            <h3>${escapeHtml(settings.garageName)}</h3>
            <p>${escapeHtml(settings.address)}</p>
            <p>Cel: ${escapeHtml(settings.phone)}</p>
          </header>

          <div class="ticket-line"></div>
          <div class="ticket-plate-block">
            <span>PLACA</span>
            <strong>${ticket ? escapeHtml(ticket.placa) : empty}</strong>
          </div>
          <div class="ticket-line"></div>

          <div class="ticket-row"><strong>FECHA:</strong><span>${ticket ? escapeHtml(ticket.fecha) : empty}</span></div>
          <div class="ticket-row"><strong>HORA DE INGRESO:</strong><span>${ticket ? escapeHtml(ticket.horaIngreso) : empty}</span></div>
          <div class="rates">
            <h4>HORA/FRACCION</h4>
            <div class="rates-grid">
              <div><span>Moto</span><strong>$1.00</strong></div>
              <div><span>Carro pequeño</span><strong>$1.50</strong></div>
              <div><span>Carro grande</span><strong>$2.00</strong></div>
              <div><span>Camion</span><strong>$5.00</strong></div>
            </div>
          </div>

          <div class="ticket-line"></div>
          <p class="warning">Ticket extraviado: multa de $5.00.</p>
          <p class="warning">Para retirar el vehículo debe presentar matrícula y cédula.</p>
          <p class="notice">No nos responsabilizamos por objetos extraviados.</p>
          <p class="thanks">Gracias por su visita.</p>
          <small>${ticket ? escapeHtml(ticket.id) : 'TCK-0000'}</small>
        </article>
      </div>
    </section>
  `
}
