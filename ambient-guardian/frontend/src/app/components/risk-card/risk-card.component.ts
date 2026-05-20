import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-risk-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <p class="label">Current Risk</p>
      <h2>{{ risk?.score ?? '--' }}</h2>
      <p class="level" [class.warn]="risk?.level !== 'normal'">{{ risk?.level || 'unknown' }}</p>
      <div class="metrics" *ngIf="sensorPacket">
        <span>{{ sensorPacket.temperatureC }} C</span>
        <span>{{ sensorPacket.humidity }} % humidity</span>
        <span>{{ sensorPacket.co2Ppm }} ppm CO2</span>
      </div>
    </article>
  `,
  styles: [`
    .card{background:var(--panel);border:1px solid var(--border);border-radius:24px;padding:24px;min-height:220px}
    .label{margin:0;color:var(--muted);text-transform:uppercase;font-size:12px;letter-spacing:.12em}
    h2{margin:12px 0 4px;font-size:64px}
    .level{margin:0;text-transform:capitalize;font-weight:700}
    .warn{color:var(--warn)}
    .metrics{display:grid;gap:8px;margin-top:20px;color:var(--muted)}
  `]
})
export class RiskCardComponent {
  @Input() risk: any;
  @Input() sensorPacket: any;
}
