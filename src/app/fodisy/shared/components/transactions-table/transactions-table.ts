import { DatePipe, CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TxStatus = 'Completed' | 'Pending' | 'Confirmed';
type TxMethod = 'MPESA' | 'CASH' | 'BANK';

type TransactionRow = {
  id: string;
  date: string; // ISO
  invoiceNumber: string;
  client: string;
  amount: number;
  status: TxStatus;
  method: TxMethod;
  isLocked: boolean;
};

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, DatePipe, CurrencyPipe],
  templateUrl: './transactions-table.html',
  styleUrl: './transactions-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTable {
  readonly q = signal<string>('');
  readonly rows = signal<TransactionRow[]>([
    {
      id: 'TRX-1024',
      date: '2026-03-12T09:21:00Z',
      invoiceNumber: 'INV-1007',
      client: 'Tech Supplies Ltd',
      amount: 1800,
      status: 'Completed',
      method: 'MPESA',
      isLocked: true,
    },
    {
      id: 'TRX-1023',
      date: '2026-03-12T08:02:00Z',
      invoiceNumber: 'INV-1005',
      client: 'Global Solutions',
      amount: 3200,
      status: 'Pending',
      method: 'BANK',
      isLocked: false,
    },
    {
      id: 'TRX-1022',
      date: '2026-03-11T14:12:00Z',
      invoiceNumber: 'INV-1003',
      client: 'Karen Retail',
      amount: 950,
      status: 'Confirmed',
      method: 'CASH',
      isLocked: false,
    },
    {
      id: 'TRX-1021',
      date: '2026-03-11T10:33:00Z',
      invoiceNumber: 'INV-1001',
      client: 'Quick Services Inc',
      amount: 2500,
      status: 'Confirmed',
      method: 'MPESA',
      isLocked: false,
    },
  ]);

  readonly selectedId = signal<string | null>(null);

  readonly filtered = computed(() => {
    const query = this.q().trim().toLowerCase();
    const data = this.rows();
    if (!query) return data;
    return data.filter((r) => {
      const hay = `${r.id} ${r.invoiceNumber} ${r.client} ${r.status} ${r.method}`.toLowerCase();
      return hay.includes(query);
    });
  });

  readonly selected = computed(() => {
    const id = this.selectedId();
    if (!id) return null;
    return this.rows().find((r) => r.id === id) ?? null;
  });

  readonly canEdit = computed(() => {
    const row = this.selected();
    if (!row) return false;
    if (row.isLocked) return false;
    return row.status !== 'Completed';
  });

  readonly canDelete = computed(() => {
    const row = this.selected();
    if (!row) return false;
    if (row.isLocked) return false;
    return row.status === 'Pending';
  });

  readonly trackById = (_: number, r: TransactionRow) => r.id;

  select(row: TransactionRow): void {
    this.selectedId.set(row.id);
  }

  clearSelection(): void {
    this.selectedId.set(null);
  }

  add(): void {
    // UI shell only for now (API wiring comes later).
    // In production this would open a modal / route for creating a transaction/payment.
    alert('Add flow will be wired to backend next.');
  }

  edit(): void {
    if (!this.canEdit()) return;
    alert('Edit flow will be wired to backend next.');
  }

  remove(): void {
    if (!this.canDelete()) return;
    alert('Delete flow will be wired to backend next.');
  }
}

