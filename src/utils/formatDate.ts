export function todayForInput(): string {
  return new Date().toISOString().slice(0, 10)
}

export function timeForInput(): string {
  return new Date().toTimeString().slice(0, 5)
}

export function formatDateForTicket(value: string): string {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  return year && month && day ? `${day}/${month}/${year}` : value
}
