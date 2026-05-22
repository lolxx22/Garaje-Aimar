export function todayForInput(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function timeForInput(): string {
  return new Date().toTimeString().slice(0, 5)
}

export function formatDateForTicket(value: string): string {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  return year && month && day ? `${day}/${month}/${year}` : value
}
