import {Component, Inject, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule } from "../../../../common/common-material/common-material.module"
import {ObjetivoEspecificoInterface} from "../../../../models/objetivo-especifico-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {FormacionAcademicaService} from "../../../../services/formacion-academica.service";
import {GradoAcademicoService} from "../../../../services/grado-academico.service";
import {ObjetivoEspecificoService} from "../../../../services/objetivo-especifico.service";
import {
  FormacionAcademicaEditComponent
} from "../../formato-digi-uno/formacion-academica/formacion-academica-edit/formacion-academica-edit.component";
import {ObjetivoEspecificoEditComponent} from "./objetivo-especifico-edit/objetivo-especifico-edit.component";
import {FormacionAcademicaInterface} from "../../../../models/formacion-academica-interface";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'app-objetivo-especifico',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './objetivo-especifico.component.html',
  styleUrl: './objetivo-especifico.component.scss'
})
export class ObjetivoEspecificoComponent implements OnInit{
  @Input() formatoDIGIDosId!: number

  registers: ObjetivoEspecificoInterface[] = []
  register: ObjetivoEspecificoInterface
  displayedColumns: string[] = ['id', 'nombre','descripcion','opciones']

  constructor(private dialog: MatDialog,
              private objetivoEspecificoServicio: ObjetivoEspecificoService,
              private fb: FormBuilder){
    this.register = {id:0}
  }


  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.objetivoEspecificoServicio.all(this.formatoDIGIDosId).subscribe(response =>{
      if(response.ok){
        this.registers = response.data
      }
    })
  }

  doCreate(): void {
    const dialogRef: MatDialogRef<ObjetivoEspecificoEditComponent> = this.dialog.open(ObjetivoEspecificoEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 1, formatoDIGIDosId: this.formatoDIGIDosId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onEditar(element: ObjetivoEspecificoInterface):void{
    const dialogRef: MatDialogRef<ObjetivoEspecificoEditComponent> = this.dialog.open(ObjetivoEspecificoEditComponent,{
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
        this.objetivoEspecificoServicio.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }

}
