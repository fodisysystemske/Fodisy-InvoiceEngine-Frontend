import { Component, Output, EventEmitter } from '@angular/core';
import { ClockWidget } from '../../../shared/components/clock-widget/clock-widget';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ClockWidget],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
  export class Sidebar {
    @Output() posModalTrigger = new EventEmitter<void>();
  }
