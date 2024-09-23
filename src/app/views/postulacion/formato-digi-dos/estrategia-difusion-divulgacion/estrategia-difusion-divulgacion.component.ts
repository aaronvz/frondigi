import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {EstrategiaDifusionDivulgacionInterface} from "../../../../models/estrategia-difusion-divulgacion-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {EstrategiaDifusionDivulgacionService} from "../../../../services/estrategia-difusion-divulgacion.service";

import {
  EstrategiaDifusionDivulgacionEditComponent
} from "./estrategia-difusion-divulgacion-edit/estrategia-difusion-divulgacion-edit.component";
import {FormacionAcademicaInterface} from "../../../../models/formacion-academica-interface";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";
@Component({
  selector: 'app-estrategia-difusion-divulgacion',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './estrategia-difusion-divulgacion.component.html',
  styleUrl: './estrategia-difusion-divulgacion.component.scss'
})
export class EstrategiaDifusionDivulgacionComponent implements OnInit{
  @Input() formatoDIGIDosId!:number

  registers: EstrategiaDifusionDivulgacionInterface[] = []
  register: EstrategiaDifusionDivulgacionInterface
  displayedColumns: string[] = ['id', 'nombre', 'esSeleccionado', 'opciones'];

  constructor(private dialog: MatDialog,
              private estrategiaDifusionDivulgacionService: EstrategiaDifusionDivulgacionService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.estrategiaDifusionDivulgacionService.all(this.formatoDIGIDosId)
      .subscribe(
        (response): void => {
          if(response.ok){
            this.registers = response.data
          }
        }
      )
  }

  doCreate(): void {
    const dialogRef: MatDialogRef<EstrategiaDifusionDivulgacionEditComponent> = this.dialog.open(EstrategiaDifusionDivulgacionEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 1, formatoDIGIDosId: this.formatoDIGIDosId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onEditar(element: EstrategiaDifusionDivulgacionInterface):void{
    const dialogRef: MatDialogRef<EstrategiaDifusionDivulgacionEditComponent> = this.dialog.open(EstrategiaDifusionDivulgacionEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 2, formatoDIGIDosId: this.formatoDIGIDosId, id: element.id},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onBorrar(element: FormacionAcademicaInterface):void{
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.estrategiaDifusionDivulgacionService.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }


}
