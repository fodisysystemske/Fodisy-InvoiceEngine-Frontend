import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { InventoryTable } from '../inventory-table/inventory-table';
import { TransactionsTable } from '../transactions-table/transactions-table';

type TableViewId = 'transactions' | 'inventory';

type TableView = {
  id: TableViewId;
  label: string;
  component: typeof TransactionsTable | typeof InventoryTable;
};

@Component({
  selector: 'app-table-workspace',
  standalone: true,
  imports: [NgFor, TransactionsTable, InventoryTable],
  templateUrl: './table-workspace.html',
  styleUrl: './table-workspace.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWorkspace {
  readonly views: TableView[] = [
    { id: 'transactions', label: 'Transactions', component: TransactionsTable },
    { id: 'inventory', label: 'Inventory', component: InventoryTable },
  ];

  readonly active = signal<TableViewId>('transactions');
  readonly activeLabel = computed(() => this.views.find((v) => v.id === this.active())?.label ?? 'Tables');

  setActive(id: TableViewId): void {
    this.active.set(id);
  }
}

