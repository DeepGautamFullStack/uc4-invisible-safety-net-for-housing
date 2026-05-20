import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sensor-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card">
      <p class="label">Live Sensor Snapshot</p>
      <div class="timeline" *ngIf="sensorPacket">
        <div class="metric">
          <span>Temperature</span>
          <strong>{{ sensorPacket.temperatureC }} C</strong>
        </div>
        <div class="metric">
          <span>Humidity</span>
          <strong>{{ sensorPacket.humidity }} %</strong>
        </div>
        <div class="metric">
          <span>CO2</span>
          <strong>{{ sensorPacket.co2Ppm }} ppm</strong>
        </div>
        <div class="metric">
          <span>PM2.5</span>
          <strong>{{ sensorPacket.pm25 }}</strong>
        </div>
        <div class="metric">
          <span>Noise</span>
          <strong>{{ sensorPacket.noiseDb }} dB</strong>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .card{background:var(--panel);border:1px solid var(--border);border-radius:24px;padding:24px}
    .label{margin:0 0 16px;color:var(--muted);text-transform:uppercase;font-size:12px;letter-spacing:.12em}
    .timeline{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px}
    .metric{padding:18px;border-radius:16px;background:var(--panel-alt)}
    .metric span{display:block;color:var(--muted);margin-bottom:8px}
  `]
})
export class SensorTimelineComponent {
  @Input() sensorPacket: any;
}
