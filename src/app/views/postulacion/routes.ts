import { Routes } from '@angular/router';
import {activacionUrlGuard} from "../../guard/activacion-url.guard";

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Postulación'
    },
    children: [
      {
        path: '',
        redirectTo: 'convocatorias',
        pathMatch: 'full'
      },
      {
        path: 'convocatorias',
        loadComponent: () => import('./convocatorias/convocatorias.component').then(m => m.ConvocatoriasComponent),
        data: {
          title: 'Convocatorias'
        },
        canActivate: [activacionUrlGuard]
      },
      {
        path: 'formato-digi-uno',
        loadComponent: () => import('./formato-digi-uno/formato-digi-uno.component').then(m => m.FormatoDigiUnoComponent),
        data: {
          title: 'Formato DIGI UNO'
        },
        canActivate: [activacionUrlGuard]
      },
      {
        path: 'formato-digi-dos',
        loadComponent: () => import('./formato-digi-dos/formato-digi-dos.component').then(m => m.FormatoDigiDosComponent),
        data: {
          title: 'Formato DIGI UNO'
        },
        canActivate: [activacionUrlGuard]
      }
    ]
  }
];
