import { Routes } from '@angular/router';
import {activacionUrlGuard} from "../../guard/activacion-url.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: $localize`Dashboard`
    },
    canActivate: [activacionUrlGuard]
  }
];

