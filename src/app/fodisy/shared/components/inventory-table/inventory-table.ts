import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type StockState = 'OK' | 'Low' | 'Out';

type InventoryRow = {
  sku: string;
  name: string;
  category: string;
  lastUpdated: string; // ISO
  unitPrice: number;
  inStock: number;
  reorderLevel: number;
  state: StockState;
};

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './inventory-table.html',
  styleUrl: './inventory-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryTable {
  readonly q = signal<string>('');
  readonly rows = signal<InventoryRow[]>([
    {
      sku: 'SKU-AX12',
      name: 'Printer Paper A4 (500)',
      category: 'Office',
      lastUpdated: '2026-03-12T07:10:00Z',
      unitPrice: 650,
      inStock: 120,
      reorderLevel: 40,
      state: 'OK',
    },
    {
      sku: 'SKU-KR07',
      name: 'Thermal Receipt Rolls',
      category: 'POS',
      lastUpdated: '2026-03-11T12:55:00Z',
      unitPrice: 180,
      inStock: 18,
      reorderLevel: 25,
      state: 'Low',
    },
    {
      sku: 'SKU-NW03',
      name: 'Network Switch (8-port)',
      category: 'Hardware',
      lastUpdated: '2026-03-10T15:42:00Z',
      unitPrice: 4200,
      inStock: 0,
      reorderLevel: 4,
      state: 'Out',
    },
  ]);

  readonly selectedSku = signal<string | null>(null);

  readonly filtered = computed(() => {
    const query = this.q().trim().toLowerCase();
    const data = this.rows();
    if (!query) return data;
    return data.filter((r) => {
      const hay = `${r.sku} ${r.name} ${r.category} ${r.state}`.toLowerCase();
      return hay.includes(query);
    });
  });

  readonly trackBySku = (_: number, r: InventoryRow) => r.sku;

  select(r: InventoryRow): void {
    this.selectedSku.set(r.sku);
  }

  clearSelection(): void {
    this.selectedSku.set(null);
  }

  add(): void {
    alert('Add inventory flow will be wired to backend next.');
  }

  edit(): void {
    if (!this.selectedSku()) return;
    alert('Update inventory flow will be wired to backend next.');
  }
}

