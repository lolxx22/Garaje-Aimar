import type { GarageSettings } from '../types/settings.types'
import { escapeHtml } from '../utils/escapeHtml'

export function renderSettingsPanel(settings: GarageSettings): string {
  return `
    <section class="card info-card" aria-labelledby="garage-info-title">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Datos fijos</span>
          <h2 id="garage-info-title">Información del garaje</h2>
        </div>
      </div>
      <div class="garage-info">
        <strong>${escapeHtml(settings.garageName)}</strong>
        <span>${escapeHtml(settings.address)}</span>
        <span>Cel: ${escapeHtml(settings.phone)}</span>
      </div>
    </section>
  `
}
