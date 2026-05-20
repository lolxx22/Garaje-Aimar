import type { Ticket } from '../types/ticket.types'
import { escapeHtml } from '../utils/escapeHtml'

export function renderTicketHistory(tickets: Ticket[]): string {
  const rows = tickets.length
    ? tickets.map((ticket) => `
      <tr>
        <td>${escapeHtml(ticket.id)}</td>
        <td><strong>${escapeHtml(ticket.placa)}</strong></td>
        <td>${escapeHtml(ticket.fecha)}</td>
        <td>${escapeHtml(ticket.horaIngreso)}</td>
        <td class="table-actions">
          <button class="link-btn" data-action="view" data-id="${escapeHtml(ticket.id)}" aria-label="Ver ticket ${escapeHtml(ticket.id)}">Ver</button>
          <button class="link-btn" data-action="reprint" data-id="${escapeHtml(ticket.id)}" aria-label="Reimprimir ticket ${escapeHtml(ticket.id)}">Reimprimir</button>
          <button class="link-btn danger" data-action="delete" data-id="${escapeHtml(ticket.id)}" aria-label="Eliminar ticket ${escapeHtml(ticket.id)}">Eliminar</button>
        </td>
      </tr>
    `).join('')
    : '<tr><td colspan="5" class="empty-state">Todavía no hay tickets generados.</td></tr>'

  return `
    <section class="card history-card" aria-labelledby="history-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">LocalStorage JSON</span>
          <h2 id="history-title">Historial de tickets</h2>
        </div>
        <span class="status-pill">${tickets.length} guardados</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Ticket</th><th>Placa</th><th>Fecha</th><th>Hora</th><th>Acciones</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `
}
