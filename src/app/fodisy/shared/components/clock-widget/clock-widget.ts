import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-clock-widget',
  standalone: true,
  templateUrl: './clock-widget.html',
  styleUrl: './clock-widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockWidget implements OnInit, OnDestroy {
  private rafId: number | null = null;
  private readonly nowMs = signal<number>(Date.now());

  readonly hours = computed(() => {
    const d = new Date(this.nowMs());
    return d.getHours();
  });

  readonly minutes = computed(() => {
    const d = new Date(this.nowMs());
    return d.getMinutes();
  });

  readonly seconds = computed(() => {
    const d = new Date(this.nowMs());
    return d.getSeconds();
  });

  readonly hourAngle = computed(() => {
    const d = new Date(this.nowMs());
    const h = d.getHours() % 12;
    const m = d.getMinutes();
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    return h * 30 + m * 0.5 + s * (0.5 / 60);
  });

  readonly minuteAngle = computed(() => {
    const d = new Date(this.nowMs());
    const m = d.getMinutes();
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    return m * 6 + s * 0.1;
  });

  readonly secondAngle = computed(() => {
    const d = new Date(this.nowMs());
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    return s * 6;
  });

  ngOnInit(): void {
    const tick = () => {
      this.nowMs.set(Date.now());
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
}

