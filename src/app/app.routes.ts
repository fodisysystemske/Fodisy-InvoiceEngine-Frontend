import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./fodisy/interface/layout/workspace/workspace').then(m => m.Workspace),
		pathMatch: 'full',
	},
	{
		path: 'pos',
		loadComponent: () => import('./fodisy/pos/pos-window').then(m => m.PosWindow),
	},
];