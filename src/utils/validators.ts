import type { TicketDraft } from '../types/ticket.types'

export function normalizePlate(value: string): string {
  return value.trim().toUpperCase()
}

export function validateTicketDraft(draft: TicketDraft): string[] {
  const errors: string[] = []

  if (!normalizePlate(draft.placa)) errors.push('Ingresa la placa del vehiculo.')

  return errors
}
