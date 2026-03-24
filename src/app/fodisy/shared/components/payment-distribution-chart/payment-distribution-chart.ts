import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

type Slice = { label: string; value: number; color: string };

@Component({
  selector: 'app-payment-distribution-chart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './payment-distribution-chart.html',
  styleUrl: './payment-distribution-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDistributionChart {
  // Mock distribution — will be replaced with backend analytics later.
  readonly slices: Slice[] = [
    { label: 'MPESA', value: 55, color: 'rgba(112,255,188,0.95)' },
    { label: 'Cash', value: 25, color: 'rgba(0,224,255,0.95)' },
    { label: 'Bank', value: 15, color: 'rgba(124,92,255,0.95)' },
    { label: 'Cheque', value: 5, color: 'rgba(255,190,120,0.95)' },
  ];

  readonly total = computed(() => this.slices.reduce((a, s) => a + s.value, 0));
  readonly arcs = computed(() => {
    const total = this.total();
    let acc = 0;
    return this.slices.map((s) => {
      const start = (acc / total) * 360;
      acc += s.value;
      const end = (acc / total) * 360;
      return { ...s, start, end };
    });
  });
}

