import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptors/auth.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// @ts-ignore
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';


export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxMask(),
    //provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors(
      [authInterceptor]
    )),
    provideRouter(routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
      withHashLocation()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(), provideAnimationsAsync(),
    {provide: MAT_DATE_LOCALE, useValue: 'gt-GT'},
  ]
};
