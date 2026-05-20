import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  template: `
    <article class="card">
      <p class="label">AI Insight</p>
      <p class="copy">{{ explanation || 'Waiting for live AI reasoning...' }}</p>
      <p class="meta">Detector: {{ anomaly?.source || 'n/a' }}</p>
      <p class="meta">Confidence: {{ anomaly?.confidence ?? '--' }}</p>
    </article>
  `,
  styles: [`
    .card{background:var(--panel);border:1px solid var(--border);border-radius:24px;padding:24px;min-height:220px}
    .label{margin:0;color:var(--muted);text-transform:uppercase;font-size:12px;letter-spacing:.12em}
    .copy{margin:16px 0 18px;line-height:1.5}
    .meta{margin:6px 0;color:var(--muted)}
  `]
})
export class AiInsightsComponent {
  @Input() explanation = '';
  @Input() anomaly: any;
}
