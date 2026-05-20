import { defaultSettings } from '../data/defaultSettings'
import type { GarageSettings } from '../types/settings.types'
import type { Ticket } from '../types/ticket.types'

const TICKETS_KEY = 'garage-aimar:tickets'

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
  const highest = getTickets().reduce((max, ticket) => {
    const number = Number(ticket.id.replace('TCK-', ''))
    return Number.isFinite(number) ? Math.max(max, number) : max
  }, 0)

  return `TCK-${String(highest + 1).padStart(4, '0')}`
}
