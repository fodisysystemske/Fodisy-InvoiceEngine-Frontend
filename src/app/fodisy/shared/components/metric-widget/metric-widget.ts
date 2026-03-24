import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type MetricAccent = 'cyan' | 'violet' | 'green' | 'amber';

@Component({
  selector: 'app-metric-widget',
  standalone: true,
  imports: [NgIf],
  templateUrl: './metric-widget.html',
  styleUrl: './metric-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricWidget {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string;
  @Input() subtitle?: string;
  @Input() accent: MetricAccent = 'cyan';
  @Input() icon?: string;
}

