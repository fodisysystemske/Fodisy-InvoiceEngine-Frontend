import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

type Point = { month: string; value: number };

@Component({
  selector: 'app-revenue-overview-chart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './revenue-overview-chart.html',
  styleUrl: './revenue-overview-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevenueOverviewChart {
  // Mock data for now — will be replaced by backend analytics later.
  readonly data: Point[] = [
    { month: 'Jan', value: 280000 },
    { month: 'Feb', value: 360000 },
    { month: 'Mar', value: 410000 },
    { month: 'Apr', value: 390000 },
    { month: 'May', value: 520000 },
    { month: 'Jun', value: 610000 },
  ];

  readonly max = computed(() => Math.max(...this.data.map((d) => d.value), 1));
  readonly points = computed(() => {
    // Normalize to a 0..100 coordinate system for SVG viewBox.
    const max = this.max();
    return this.data.map((d, i) => {
      const x = 10 + i * (80 / (this.data.length - 1));
      const y = 85 - (d.value / max) * 60;
      return { ...d, x, y };
    });
  });

  readonly polyline = computed(() => this.points().map((p) => `${p.x},${p.y}`).join(' '));
}

