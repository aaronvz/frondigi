import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import {
  BreadcrumbRouterComponent,
  ContainerComponent, INavData,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import {ModuloService} from "../../services/modulo.service";
import {MenuService} from "../../services/menu.service";

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    IconDirective,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    BreadcrumbRouterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit{
  public navItems: INavData[] = [];
  private modulos: any[] = [];
  private menu: any[] = [];

  constructor(private moduloService: ModuloService,
              private menuService: MenuService) {

  }

  ngOnInit(): void {
    this.moduloService.all().subscribe(response  => {
      if(response.ok){
        this.modulos = response.data;
        this.menuService.all().subscribe(response => {
          this.menu = response.data;
          /*Crear la estructura del menu*/
          let menuFinal : any [] = [
            {
              name: 'Tablero de mando',
              url: '/dashboard',
              iconComponent: { name: 'cil-speedometer' }
            }
          ];
          let modulosTmp: any[] = [];
          this.modulos.forEach(modulo => {
            let componentesTmp: any[] = []
            this.menu.forEach( m => {
              if(m.moduloModuloId == modulo.id){
                componentesTmp.push({
                  name: m.componenteNombre,
                  url: m.componenteUrl,
                  icon: m.componenteIcono
                })
              }
            })
            modulosTmp.push({
              name: modulo.nombre,
              url: modulo.url,
              iconComponent: { name: modulo.icono },
              children: componentesTmp
            })
          })
          menuFinal = [...menuFinal, ...modulosTmp]
          this.navItems = menuFinal
        })
      }
    })
  }

  onScrollbarUpdate($event: any) {
    // if ($event.verticalUsed) {
    // console.log('verticalUsed', $event.verticalUsed);
    // }
  }
}
