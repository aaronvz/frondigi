import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  RowComponent
} from "@coreui/angular";

const modules: any[] = [
  CommonModule,
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  RowComponent
]

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class CommonCoreuiModule { }
