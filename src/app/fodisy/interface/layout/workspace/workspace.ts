import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { MetricWidget } from '../../../shared/components/metric-widget/metric-widget';
import { TableWorkspace } from '../../../shared/components/table-workspace/table-workspace';
import { PaymentDistributionChart } from '../../../shared/components/payment-distribution-chart/payment-distribution-chart';
import { RevenueOverviewChart } from '../../../shared/components/revenue-overview-chart/revenue-overview-chart';
constructor(private supabaseService: SupabaseService) {}

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MetricWidget, TableWorkspace, RevenueOverviewChart, PaymentDistributionChart],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  selectedInvoiceIndex: number | null = null;
  editingInvoice: any = null;
  editInvoiceForm: FormGroup | null = null;
  selectInvoice(inv: any, i: number) {
    this.selectedInvoiceIndex = (this.selectedInvoiceIndex === i) ? null : i;
    if (this.selectedInvoiceIndex !== null) {
      this.loadInvoiceDetails(inv);
    } else {
      this.editingInvoice = null;
      this.editInvoiceForm = null;
    }
  }
  loadInvoiceDetails(inv: any) {
    if (!inv || !inv.invoice_number) return;
    const id = inv.id || inv.invoice_number.replace(/[^\d]/g, '');
    this.http.get(`http://localhost:5000/api/invoices/balance/${id}`, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    }).subscribe((balance: any) => {
      this.editingInvoice = { ...inv, ...balance };
      this.editInvoiceForm = this.fb.group({
        customer_name: [inv.customer_name, Validators.required],
        customer_email: [inv.customer_email],
        total_amount: [inv.total_amount],
        payment_status: [balance.payment_status],
        is_locked: [balance.is_locked]
      });
    });
  }
  enableEditInvoice() {
    if (!this.editingInvoice || this.editingInvoice.is_locked) return;
    this.editInvoiceForm?.enable();
  }
  saveEditInvoice() {
    if (!this.editInvoiceForm?.valid || !this.editingInvoice) return;
    const id = this.editingInvoice.id || this.editingInvoice.invoice_number.replace(/[^\d]/g, '');
    this.http.put(`http://localhost:5000/api/invoices/${id}`, this.editInvoiceForm.value, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    }).subscribe({
      next: () => {
        alert('Invoice updated and locked!');
        this.editInvoiceForm?.disable();
        this.loadInvoices();
      },
      error: () => {
        alert('Error updating invoice.');
      }
    });
  }
  lockInvoice() {
    if (!this.editingInvoice) return;
    const id = this.editingInvoice.id || this.editingInvoice.invoice_number.replace(/[^\d]/g, '');
    this.http.post(`http://localhost:5000/api/invoices/lock/${id}`, {}, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    }).subscribe({
      next: () => {
        alert('Invoice locked!');
        this.editInvoiceForm?.disable();
        this.loadInvoices();
      },
      error: () => {
        alert('Error locking invoice.');
      }
    });
  }

      viewInvoicePDF(inv: any) {
        if (!inv || !inv.invoice_number) return;
        const id = inv.id || inv.invoice_number.replace(/[^\d]/g, '');
        if (!this.authToken) {
          this.authToken = prompt('Enter admin Bearer token:');
          if (!this.authToken) {
            alert('Bearer token is required to view PDF.');
            return;
          }
        }
        const url = `http://localhost:5000/api/invoices/pdf/${id}`;
        this.http.get(url, {
          headers: { Authorization: `Bearer ${this.authToken}` },
          responseType: 'blob'
        }).subscribe(blob => {
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        }, err => {
          alert('Failed to fetch PDF. ' + (err?.error?.error || err.message || 'Unknown error'));
        });
      }

      printInvoicePDF(inv: any) {
        if (!inv || !inv.invoice_number) return;
        const id = inv.id || inv.invoice_number.replace(/[^\d]/g, '');
        if (!this.authToken) {
          this.authToken = prompt('Enter admin Bearer token:');
          if (!this.authToken) {
            alert('Bearer token is required to print PDF.');
            return;
          }
        }
        const url = `http://localhost:5000/api/invoices/pdf/${id}`;
        this.http.get(url, {
          headers: { Authorization: `Bearer ${this.authToken}` },
          responseType: 'blob'
        }).subscribe(blob => {
          const fileURL = window.URL.createObjectURL(blob);
          const printWindow = window.open(fileURL, '_blank');
          if (printWindow) {
            printWindow.onload = () => printWindow.print();
          }
        }, err => {
          alert('Failed to fetch PDF. ' + (err?.error?.error || err.message || 'Unknown error'));
        });
      }
    invoiceSearch: string = '';
  showInvoiceForm = false;
  showManageInvoices = false;
  invoiceForm: FormGroup;
  invoices: any[] = [];

  filteredInvoices() {
    if (!this.invoiceSearch?.trim()) return this.invoices;
    const search = this.invoiceSearch.trim().toLowerCase();
    return this.invoices.filter(inv =>
      (inv.invoice_number + '').toLowerCase().includes(search) ||
      (inv.customer_name + '').toLowerCase().includes(search) ||
      (inv.status + '').toLowerCase().includes(search) ||
      (inv.created_at + '').toLowerCase().includes(search) ||
      (inv.total_amount + '').toLowerCase().includes(search)
    );
  }
  authToken: string | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.invoiceForm = this.fb.group({
      customer_name: ['', Validators.required],
      customer_email: [''],
      customer_phone: [''],
      payment_method: ['CASH'],
      notes: [''],
      items: this.fb.array([
        this.fb.group({
          product_name: ['', Validators.required],
          quantity: [1, [Validators.required, Validators.min(1)]],
          unit_price: [0, [Validators.required, Validators.min(0)]]
        })
      ])
    });
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }
  addItem() {
    this.items.push(this.fb.group({
      product_name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit_price: [0, [Validators.required, Validators.min(0)]]
    }));
  }
  removeItem(i: number) {
    if (this.items.length > 1) this.items.removeAt(i);
  }
  toggleInvoiceForm() {
    this.showInvoiceForm = !this.showInvoiceForm;
    this.showManageInvoices = false;
  }
  toggleManageInvoices() {
    this.showManageInvoices = !this.showManageInvoices;
    this.showInvoiceForm = false;
    if (this.showManageInvoices) this.loadInvoices();
  }
  loadInvoices() {
    // Only prompt for token if not already set
    if (!this.authToken) {
      this.authToken = prompt('Enter admin Bearer token:');
    }
    if (!this.authToken) {
      alert('Bearer token is required to view invoices.');
      return;
    }
    this.http.get<any[]>('http://localhost:5000/api/invoices/', {
      headers: { Authorization: `Bearer ${this.authToken}` }
    }).subscribe({
      next: data => {
        // Debug: log the data received
        console.log('Invoices loaded:', data);
        // Map fields to ensure compatibility with table and selection
        this.invoices = (data || []).map(inv => ({
          id: inv.id || inv.invoice_id || inv.invoice_number || '',
          invoice_number: inv.invoice_number || inv.invoice_no || inv.id || '',
          customer_name: inv.customer_name || inv.customer || '',
          total_amount: inv.total_amount || inv.amount || 0,
          status: inv.status || inv.payment_status || '',
          created_at: inv.created_at || inv.date || inv.timestamp || ''
        }));
        this.cdr.detectChanges();
      },
      error: err => {
        this.invoices = [];
        // Show detailed error for debugging
        alert('Failed to load invoices.\n' + (err?.error?.error || err.message || 'Unknown error'));
      }
    });
  }
  // ...existing code...

  // ...existing code...

  // ...existing code...

  submitInvoice() {
    if (this.invoiceForm.valid) {
      if (!this.authToken) {
        this.authToken = prompt('Enter admin Bearer token:');
      }
      this.http.post('/api/invoices', this.invoiceForm.value, {
        headers: { Authorization: `Bearer ${this.authToken}` }
      }).subscribe({
        next: () => {
          alert('Invoice saved to database!');
          this.invoiceForm.reset();
          this.items.clear();
          this.addItem();
          this.showInvoiceForm = false;
          this.loadInvoices();
        },
        error: () => {
          alert('Error saving invoice.');
        }
      });
    }
  }
}
