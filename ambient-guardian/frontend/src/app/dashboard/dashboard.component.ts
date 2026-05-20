import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { AiInsightsComponent } from '../components/ai-insights/ai-insights.component';
import { AlertsPanelComponent } from '../components/alerts-panel/alerts-panel.component';
import { FloorMapComponent } from '../components/floor-map/floor-map.component';
import { RiskCardComponent } from '../components/risk-card/risk-card.component';
import { SensorTimelineComponent } from '../components/sensor-timeline/sensor-timeline.component';
import { ApiService } from '../services/api.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RiskCardComponent,
    FloorMapComponent,
    AiInsightsComponent,
    AlertsPanelComponent,
    SensorTimelineComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly websocket = inject(WebsocketService);

  snapshot: any = null;
  loading = true;

  ngOnInit(): void {
    this.api.getSnapshot().subscribe({
      next: (data) => {
        if (!data.message) {
          this.snapshot = data;
          this.loading = false;
        }
      },
      error: () => {
        this.loading = false;
      }
    });

    this.websocket.messages$.subscribe((payload) => {
      this.snapshot = payload;
      this.loading = false;
    });
  }
}
