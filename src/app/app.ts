import { Component, signal } from '@angular/core';
import { AppShell } from './fodisy/interface/layout/app-shell/app-shell';

@Component({
  selector: 'app-root',
  imports: [AppShell],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('enterprise-invoice-frontend');
}
