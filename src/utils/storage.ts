import { defaultSettings } from '../data/defaultSettings'
import type { GarageSettings } from '../types/settings.types'
import type { Ticket } from '../types/ticket.types'

const TICKETS_KEY = 'garage-aimar:tickets'
const TICKET_COUNTER_KEY = 'garage-aimar:ticket-counter'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value, null, 2))
}

export function getTickets(): Ticket[] {
  return readJson<Ticket[]>(TICKETS_KEY, [])
}

export function saveTickets(tickets: Ticket[]): void {
  writeJson(TICKETS_KEY, tickets)
}

export function addTicket(ticket: Ticket): void {
  saveTickets([ticket, ...getTickets()])
}

export function deleteTicket(id: string): void {
  saveTickets(getTickets().filter((ticket) => ticket.id !== id))
}

export function clearTickets(): void {
  localStorage.removeItem(TICKETS_KEY)
}

export function getSettings(): GarageSettings {
  return defaultSettings
}

export function nextTicketId(): string {
  const current = Number(sessionStorage.getItem(TICKET_COUNTER_KEY) ?? '0')
  const next = Number.isFinite(current) ? current + 1 : 1

  sessionStorage.setItem(TICKET_COUNTER_KEY, String(next))
  return `TCK-${String(next).padStart(4, '0')}`
}

export function getSessionTicketCount(): number {
  const current = Number(sessionStorage.getItem(TICKET_COUNTER_KEY) ?? '0')
  return Number.isFinite(current) ? current : 0
}

export function resetSessionTicketCount(): void {
  sessionStorage.removeItem(TICKET_COUNTER_KEY)
}
