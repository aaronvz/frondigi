import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {CronogramaInterface} from "../../../../models/cronograma-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {CronogramaService} from "../../../../services/cronograma.service";
import {CronogramaEditComponent} from "./cronograma-edit/cronograma-edit.component";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'app-cronograma',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './cronograma.component.html',
  styleUrl: './cronograma.component.scss'
})
export class CronogramaComponent implements  OnInit{
  @Input() formatoDIGIDosId!:number

  registers: CronogramaInterface[] = []
  register: CronogramaInterface
  displayedColumns: string[] = ['id', 'descripcion', 'fechaInicio', 'fechaFin', 'opciones'];

  constructor(private dialog: MatDialog,
              private cronogramaService: CronogramaService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.cronogramaService.all(this.formatoDIGIDosId)
      .subscribe(response => {
          if(response.ok){
            this.registers = response.data
          }
        }
      )
  }

  doCreate(): void {
    const dialogRef: MatDialogRef<CronogramaEditComponent> = this.dialog.open(CronogramaEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Cronograma de ejecución', role: 1, formatoDIGIDosId: this.formatoDIGIDosId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onEditar(element: CronogramaInterface):void{
    const dialogRef: MatDialogRef<CronogramaEditComponent> = this.dialog.open(CronogramaEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Cronograma de ejecución', role: 2, formatoDIGIDosId: this.formatoDIGIDosId, id: element.id},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onBorrar(element: CronogramaInterface):void{
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cronogramaService.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }



}
