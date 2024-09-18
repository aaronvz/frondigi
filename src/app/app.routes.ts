import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import {LoginComponent} from "./views/pages/login/login.component";
import {activacionUrlGuard} from "./guard/activacion-url.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
        canActivate: [activacionUrlGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('./views/admin/routes').then((m) => m.routes),
        canActivate: [activacionUrlGuard]
      },
      {
        path: 'postulacion',
        loadChildren: () => import('./views/postulacion/routes').then((m) => m.routes),
        canActivate: [activacionUrlGuard]
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
