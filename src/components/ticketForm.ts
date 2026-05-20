import { todayForInput, timeForInput } from '../utils/formatDate'

export function renderTicketForm(errors: string[] = [], message = '', canPrint = false): string {
  return `
    <section class="card" aria-labelledby="form-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Nuevo ingreso</span>
          <h2 id="form-title">Crear ticket</h2>
        </div>
        <span class="icon-badge" aria-hidden="true">P</span>
      </div>

      ${errors.length ? `<div class="alert" role="alert">${errors.map((error) => `<p>${error}</p>`).join('')}</div>` : ''}
      ${message ? `<div class="success" role="status">${message}</div>` : ''}

      <form id="ticket-form" class="ticket-form" novalidate>
        <label for="placa">Placa del vehiculo</label>
        <input id="placa" name="placa" type="text" autocomplete="off" placeholder="GSW-3241" maxlength="12" aria-describedby="plate-help" required />
        <small id="plate-help" class="field-help">Se guardara automaticamente en mayusculas.</small>
        </label>
        <div class="auto-info" aria-label="Fecha y hora automaticas">
          <div>
            <span>Fecha automatica</span>
            <strong>${todayForInput()}</strong>
          </div>
          <div>
            <span>Hora automatica</span>
            <strong>${timeForInput()}</strong>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-primary" type="submit">Generar ticket</button>
          <button class="btn btn-ghost" type="reset" id="clear-form">Limpiar formulario</button>
          <button class="btn btn-secondary" type="button" id="print-ticket" ${canPrint ? '' : 'disabled'}>Imprimir ticket</button>
        </div>
      </form>
    </section>
  `
}
