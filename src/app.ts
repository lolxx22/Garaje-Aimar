import { renderSettingsPanel } from './components/settingsPanel'
import { renderTicketForm } from './components/ticketForm'
import { renderTicketPreview } from './components/ticketPreview'
import type { GarageSettings } from './types/settings.types'
import type { Ticket, TicketDraft } from './types/ticket.types'
import { formatDateForTicket, timeForInput, todayForInput } from './utils/formatDate'
import { printTicket } from './utils/print'
import { addTicket, getSettings, getTickets, nextTicketId } from './utils/storage'
import { normalizePlate, validateTicketDraft } from './utils/validators'

export class GarageAimarApp {
  private root: HTMLElement
  private tickets: Ticket[] = []
  private settings: GarageSettings = getSettings()
  private selectedTicket: Ticket | null = null
  private errors: string[] = []
  private message = ''

  constructor(selector: string) {
    const root = document.querySelector<HTMLElement>(selector)
    if (!root) throw new Error(`No se encontro el contenedor ${selector}`)
    this.root = root
    this.load()
    this.render()
  }

  private load(): void {
    this.tickets = getTickets()
    this.selectedTicket = this.tickets[0] ?? null
  }

  private render(): void {
    document.documentElement.style.setProperty('--ticket-width', this.settings.ticketWidth)

    this.root.innerHTML = `
      <main class="app-shell">
        <header class="hero-panel">
          <div class="brand-block">
            <img class="brand-logo" src="${import.meta.env.BASE_URL}logo.svg" alt="Logo de Garage Aimar" width="72" height="72" />
            <div>
              <span class="eyebrow"></span>
              <h1>Garage Aimar</h1>
              <p class="hero-tagline">Protección y seguridad para tu vehículo, 24/7.</p>
              <p>Genera, guarda e imprime tus tickets de manera segura.</p>
            </div>
          </div>
          <div class="hero-stat" aria-label="Tickets guardados">
            <strong>${this.tickets.length}</strong>
            <span>tickets ingresados</span>
          </div>
        </header>

        <div class="layout-grid">
          <div class="left-stack">
            ${renderTicketForm(this.errors, this.message, Boolean(this.selectedTicket))}
            ${renderSettingsPanel(this.settings)}
          </div>
          ${renderTicketPreview(this.selectedTicket, this.settings)}
        </div>
      </main>
    `

    this.bindEvents()
  }

  private bindEvents(): void {
    const form = document.querySelector<HTMLFormElement>('#ticket-form')
    const plateInput = document.querySelector<HTMLInputElement>('#placa')
    const printButton = document.querySelector<HTMLButtonElement>('#print-ticket')

    plateInput?.addEventListener('input', () => {
      plateInput.value = plateInput.value.toUpperCase()
    })

    form?.addEventListener('submit', (event) => {
      event.preventDefault()
      this.createTicket(new FormData(form))
    })

    form?.addEventListener('reset', () => {
      this.errors = []
      setTimeout(() => this.render(), 0)
    })

    printButton?.addEventListener('click', () => {
      if (this.selectedTicket) printTicket()
    })

  }

  private createTicket(data: FormData): void {
    const draft: TicketDraft = {
      placa: normalizePlate(String(data.get('placa') ?? '')),
      fecha: todayForInput(),
      horaIngreso: timeForInput(),
    }

    this.errors = validateTicketDraft(draft)
    if (this.errors.length) {
      this.message = ''
      this.render()
      return
    }

    const ticket: Ticket = {
      id: nextTicketId(),
      placa: draft.placa,
      fecha: formatDateForTicket(draft.fecha),
      horaIngreso: draft.horaIngreso,
      createdAt: new Date(`${draft.fecha}T${draft.horaIngreso}:00`).toISOString(),
    }

    addTicket(ticket)
    this.errors = []
    this.message = `Ticket ${ticket.id} generado correctamente.`
    this.load()
    this.selectedTicket = ticket
    this.render()
  }

}
