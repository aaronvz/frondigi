import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {ReferenciaApaInterface} from "../../../../models/referencia-apa-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ReferenciaApaService} from "../../../../services/referencia-apa.service";
import {
  EstrategiaDifusionDivulgacionEditComponent
} from "../estrategia-difusion-divulgacion/estrategia-difusion-divulgacion-edit/estrategia-difusion-divulgacion-edit.component";
import {EstrategiaDifusionDivulgacionInterface} from "../../../../models/estrategia-difusion-divulgacion-interface";
import {FormacionAcademicaInterface} from "../../../../models/formacion-academica-interface";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";
import {ReferenciaApaEditComponent} from "./referencia-apa-edit/referencia-apa-edit.component";

@Component({
  selector: 'app-referencia-apa',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './referencia-apa.component.html',
  styleUrl: './referencia-apa.component.scss'
})
export class ReferenciaApaComponent implements OnInit{
  @Input() formatoDIGIDosId!:number

  registers: ReferenciaApaInterface[] = []
  register: ReferenciaApaInterface
  displayedColumns: string[] = ['id', 'nombre', 'opciones'];

  constructor(private dialog: MatDialog,
              private referenciaApaService: ReferenciaApaService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.referenciaApaService.all(this.formatoDIGIDosId)
      .subscribe(
        (response): void => {
          if(response.ok){
            this.registers = response.data
          }
        }
      )
  }

  doCreate(): void {
    const dialogRef: MatDialogRef<ReferenciaApaEditComponent> = this.dialog.open(ReferenciaApaEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 1, formatoDIGIDosId: this.formatoDIGIDosId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onEditar(element: ReferenciaApaInterface):void{
    const dialogRef: MatDialogRef<ReferenciaApaEditComponent> = this.dialog.open(ReferenciaApaEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 2, formatoDIGIDosId: this.formatoDIGIDosId, id: element.id},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onBorrar(element: ReferenciaApaInterface):void{
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.referenciaApaService.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }

}
