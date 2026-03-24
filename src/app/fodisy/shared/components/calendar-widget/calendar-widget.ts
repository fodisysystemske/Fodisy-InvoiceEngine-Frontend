import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-widget',
  templateUrl: './calendar-widget.html',
  styleUrls: ['./calendar-widget.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CalendarWidgetComponent {
  @Input() markedDates: { [date: string]: { color: string; activity: string } } = {};
  @Output() dateSelected = new EventEmitter<string>();

  today = new Date();
  selectedMonth = this.today.getMonth();
  selectedYear = this.today.getFullYear();
  selectedDate: string | null = null;

  get daysInMonth(): number {
    return new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
  }

  get firstDay(): number {
    return new Date(this.selectedYear, this.selectedMonth, 1).getDay();
  }

  get monthDates(): Array<{ date: string; color?: string; activity?: string }> {
    const days = [];
    for (let i = 1; i <= this.daysInMonth; i++) {
      const dateStr = `${this.selectedYear}-${(this.selectedMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const mark = this.markedDates[dateStr];
      days.push({ date: dateStr, color: mark?.color, activity: mark?.activity });
    }
    return days;
  }

  selectDate(date: string) {
    this.selectedDate = date;
    this.dateSelected.emit(date);
  }

  prevMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
  }

  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
  }
}
