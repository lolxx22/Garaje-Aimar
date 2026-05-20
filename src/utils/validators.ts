import type { TicketDraft } from '../types/ticket.types'

export function normalizePlate(value: string): string {
  return value.trim().toUpperCase()
}

export function validateTicketDraft(draft: TicketDraft): string[] {
  const errors: string[] = []
  const plate = normalizePlate(draft.placa)

  if (!plate) errors.push('Ingresa la placa del vehículo.')
  else if (plate.length < 4) errors.push('La placa debe tener al menos 4 caracteres.')
  else if (!/^[A-Z0-9-]+$/.test(plate)) errors.push('La placa solo puede contener letras, números y guiones.')

  return errors
}
