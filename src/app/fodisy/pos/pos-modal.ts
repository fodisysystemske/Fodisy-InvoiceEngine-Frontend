import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pos-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos-modal.html',
  styleUrls: ['./pos-modal.scss'],
})
export class PosModal {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  cashPaid: number = 0;

  updateChange() {
    // This method is just to trigger Angular change detection for the template
    this.cashPaid = Number(this.cashPaid) || 0;
  }

  search = '';
  scannedItems: Array<{ code: string; name: string; price: number; qty: number }> = [
    { code: '1001', name: 'HP Laptop', price: 65000, qty: 1 },
    { code: '1002', name: 'Printer', price: 12000, qty: 2 },
    { code: '1003', name: 'USB Cable', price: 500, qty: 3 },
    { code: '1004', name: 'Desk Chair', price: 7000, qty: 1 },
    { code: '1005', name: 'Monitor', price: 18000, qty: 1 },
    { code: '1006', name: 'Mouse', price: 1200, qty: 2 },
    { code: '1007', name: 'Keyboard', price: 2500, qty: 1 },
    { code: '1008', name: 'Notebook', price: 200, qty: 5 },
    { code: '1009', name: 'Pen', price: 50, qty: 10 },
    { code: '1010', name: 'Desk Lamp', price: 3000, qty: 1 },
    { code: '1011', name: 'Paper Ream', price: 600, qty: 3 },
    { code: '1012', name: 'Stapler', price: 400, qty: 1 },
    { code: '1013', name: 'Calculator', price: 1500, qty: 1 },
    { code: '1014', name: 'Whiteboard', price: 3500, qty: 1 },
    { code: '1015', name: 'Projector', price: 45000, qty: 1 },
  ];
  products = [
    { code: '1001', name: 'HP Laptop', price: 65000 },
    { code: '1002', name: 'Printer', price: 12000 },
    { code: '1003', name: 'USB Cable', price: 500 },
    { code: '1004', name: 'Desk Chair', price: 7000 },
    { code: '1005', name: 'Monitor', price: 18000 },
    { code: '1006', name: 'Mouse', price: 1200 },
    { code: '1007', name: 'Keyboard', price: 2500 },
    { code: '1008', name: 'Notebook', price: 200 },
    { code: '1009', name: 'Pen', price: 50 },
    { code: '1010', name: 'Desk Lamp', price: 3000 },
    { code: '1011', name: 'Paper Ream', price: 600 },
    { code: '1012', name: 'Stapler', price: 400 },
    { code: '1013', name: 'Calculator', price: 1500 },
    { code: '1014', name: 'Whiteboard', price: 3500 },
    { code: '1015', name: 'Projector', price: 45000 },
  ];

  get total() {
    return this.scannedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
  get tax() {
    return Math.round(this.total * 0.16);
  }
  get grandTotal() {
    return this.total + this.tax;
  }

  addProduct(query: string) {
    if (!query) return;
    const found = this.products.find(p => p.code === query.trim() || p.name.toLowerCase() === query.trim().toLowerCase());
    if (found) {
      const existing = this.scannedItems.find(i => i.code === found.code);
      if (existing) {
        existing.qty++;
      } else {
        this.scannedItems.push({ ...found, qty: 1 });
      }
    }
    this.search = '';
  }

  removeItem(code: string) {
    this.scannedItems = this.scannedItems.filter(i => i.code !== code);
  }

  nullTransaction() {
    this.scannedItems = [];
  }

  checkout() {
    alert('MPESA STK push initiated.');
  }
}
