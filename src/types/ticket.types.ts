export interface Ticket {
  id: string
  placa: string
  fecha: string
  horaIngreso: string
  horaSalida: string
  valor: string
  createdAt: string
}

export interface TicketDraft {
  placa: string
  fecha: string
  horaIngreso: string
}
