import { Component } from '@angular/core';

@Component({
  selector: 'app-footerbar',
  standalone: true,
  imports: [],
  templateUrl: './footerbar.html',
  styleUrl: './footerbar.scss',
})
export class Footerbar {
  loginTime: string;

  constructor() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    // Format: March 13 06:44 PM
    this.loginTime = `${now.toLocaleString('en-US', { month: 'long' })} ${now.getDate()} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  }
}
