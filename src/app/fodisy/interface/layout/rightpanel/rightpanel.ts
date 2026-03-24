import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarWidgetComponent } from '../../../shared/components/calendar-widget/calendar-widget';

@Component({
  selector: 'app-rightpanel',
  standalone: true,
  imports: [CommonModule, CalendarWidgetComponent],
  templateUrl: './rightpanel.html',
  styleUrl: './rightpanel.scss',
})
export class Rightpanel {
  markedDates = {
    '2026-03-14': { color: '#6c63ff', activity: 'Received 14 HP laptops' },
    '2026-03-15': { color: '#ffb300', activity: 'Transaction: Invoice #1023 paid' },
    '2026-03-16': { color: '#00e0ff', activity: 'Inventory restocked: 20 printers' },
  };

  tasksDone = [
    { label: 'Reconciled payments', date: '2026-03-12' },
    { label: 'Updated inventory', date: '2026-03-11' },
    { label: 'Processed MPESA batch', date: '2026-03-10' },
    { label: 'Generated monthly report', date: '2026-03-09' },
    { label: 'Checked audit log', date: '2026-03-08' },
    { label: 'Verified cash receipts', date: '2026-03-07' },
  ];
  tasksAhead = [
    { label: 'Send invoice reminders', date: '2026-03-15' },
    { label: 'Review pending invoices', date: '2026-03-16' },
    { label: 'Update inventory records', date: '2026-03-17' },
    { label: 'Schedule payment reconciliation', date: '2026-03-18' },
    { label: 'Prepare quarterly analytics', date: '2026-03-19' },
    { label: 'Backup database', date: '2026-03-20' },
  ];
  taskTab: 'done' | 'ahead' = 'done';

  onDateSelected(date: string) {
    // TODO: Connect to table workspace to filter by date
    // For now, just log or handle as needed
    console.log('Selected date:', date);
  }

  setTaskTab(tab: 'done' | 'ahead') {
    this.taskTab = tab;
  }
}
