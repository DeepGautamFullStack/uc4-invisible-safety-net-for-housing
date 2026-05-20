import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerts-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <div class="heading">
        <div>
          <p class="label">Alerts</p>
          <h3>Rule and AI triggers</h3>
        </div>
      </div>

      <div *ngIf="!alerts?.length" class="empty">No active alerts.</div>

      <div *ngFor="let alert of alerts" class="alert-row">
        <strong>{{ alert.metric }}</strong>
        <span>{{ alert.message }}</span>
        <span class="value">{{ alert.value }}</span>
      </div>
    </article>
  `,
  styles: [`
    .card{background:var(--panel);border:1px solid var(--border);border-radius:24px;padding:24px}
    .heading{margin-bottom:12px}
    .label{margin:0;color:var(--muted);text-transform:uppercase;font-size:12px;letter-spacing:.12em}
    h3{margin:12px 0 0}
    .empty{padding:18px 0;color:var(--muted)}
    .alert-row{display:grid;grid-template-columns:140px 1fr auto;gap:16px;padding:14px 0;border-top:1px solid var(--border);align-items:center}
    .value{font-weight:700;color:var(--warn)}
  `]
})
export class AlertsPanelComponent {
  @Input() alerts: any[] = [];
}
