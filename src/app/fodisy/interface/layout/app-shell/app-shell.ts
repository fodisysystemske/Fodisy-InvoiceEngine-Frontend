import { PosModal } from '../../../pos/pos-modal';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from '../topbar/topbar';
import { Sidebar } from '../sidebar/sidebar';
import { Rightpanel } from '../rightpanel/rightpanel';
import { Footerbar } from '../footerbar/footerbar';
constructor(private supabaseService: SupabaseService) {}

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [RouterOutlet, Topbar, Sidebar, Rightpanel, Footerbar, PosModal],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
  export class AppShell {
    posModalOpen = false;

    openPosModal() {
      this.posModalOpen = true;
    }

    closePosModal() {
      this.posModalOpen = false;
    }
  }
