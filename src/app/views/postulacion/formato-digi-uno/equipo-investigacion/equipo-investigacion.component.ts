import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {EquipoInvestigacionInterface} from "../../../../models/equipo-investigacion-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EquipoInvestigacionService} from "../../../../services/equipo-investigacion.service";
import {FormBuilder} from "@angular/forms";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";
import {
  FormacionAcademicaEditComponent
} from "../formacion-academica/formacion-academica-edit/formacion-academica-edit.component";
import {EquipoInvestigacionEditComponent} from "./equipo-investigacion-edit/equipo-investigacion-edit.component";

@Component({
  selector: 'app-equipo-investigacion',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './equipo-investigacion.component.html',
  styleUrl: './equipo-investigacion.component.scss'
})
export class EquipoInvestigacionComponent implements OnInit{
  @Input() formatoDIGIUnoId!: number

  registers:EquipoInvestigacionInterface[] = []
  register:EquipoInvestigacionInterface

  displayedColumns2: string[] = ['id', 'nombres', 'apellidos', 'orcid', 'horasContratadas','horasSolicitadas','acciones']

  constructor(private dialog: MatDialog,
              private equipoInvestigacionService: EquipoInvestigacionService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  all(): void {
    this.equipoInvestigacionService.all(this.formatoDIGIUnoId).subscribe(response => {
      if(response.ok){
        this.registers = response.data
      }
    })
  }

  doCrear():void {
    const dialogRef: MatDialogRef<EquipoInvestigacionEditComponent> = this.dialog.open(EquipoInvestigacionEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 1, formatoDIGIUnoId: this.formatoDIGIUnoId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  ngOnInit(): void {
    this.all()
  }

  onEditar(element:EquipoInvestigacionInterface):void{
    const dialogRef: MatDialogRef<EquipoInvestigacionEditComponent> = this.dialog.open(EquipoInvestigacionEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 2, formatoDIGIUnoId: this.formatoDIGIUnoId, id: element.id},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onBorrar(element:EquipoInvestigacionInterface):void{
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.equipoInvestigacionService.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }
}
