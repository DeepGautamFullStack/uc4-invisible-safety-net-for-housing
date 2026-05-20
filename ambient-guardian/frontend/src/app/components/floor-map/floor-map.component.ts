import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-floor-map',
  standalone: true,
  template: `
    <article class="card">
      <p class="label">Impacted Zone</p>
      <h3>{{ zone || 'Unknown zone' }}</h3>
      <p class="scenario">Scenario: {{ scenario || 'normal' }}</p>
      <div class="map">
        <span class="cell">Lobby</span>
        <span class="cell">Floor 2</span>
        <span class="cell active">{{ zone || 'Monitoring' }}</span>
        <span class="cell">Server Room</span>
      </div>
    </article>
  `,
  styles: [`
    .card{background:var(--panel);border:1px solid var(--border);border-radius:24px;padding:24px;min-height:220px}
    .label{margin:0;color:var(--muted);text-transform:uppercase;font-size:12px;letter-spacing:.12em}
    h3{margin:12px 0 4px;font-size:28px}
    .scenario{color:var(--muted)}
    .map{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:16px}
    .cell{padding:14px;border-radius:14px;background:var(--panel-alt)}
    .active{background:linear-gradient(135deg,#0f8c6b,#52b38d);color:white}
  `]
})
export class FloorMapComponent {
  @Input() zone = '';
  @Input() scenario = '';
}
