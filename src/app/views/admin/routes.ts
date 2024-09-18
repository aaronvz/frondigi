import { Routes } from '@angular/router';
import {activacionUrlGuard} from "../../guard/activacion-url.guard";

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administración'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./usuarios/usuarios.component').then(m => m.UsuariosComponent),
        data: {
          title: 'Usuarios internos'
        },
        canActivate: [activacionUrlGuard]
      },
      {
        path: 'usuarios-externos',
        loadComponent: () => import('./usuarios-externos/usuarios-externos.component').then(m => m.UsuariosExternosComponent),
        data: {
          title: 'Usuarios externos'
        },
        canActivate: [activacionUrlGuard]
      }
    ]
  }
];
