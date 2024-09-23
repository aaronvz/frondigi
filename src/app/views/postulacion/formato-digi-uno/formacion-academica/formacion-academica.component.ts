import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {FormacionAcademicaInterface} from "../../../../models/formacion-academica-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {FormacionAcademicaService} from "../../../../services/formacion-academica.service";
import {FormacionAcademicaEditComponent} from "./formacion-academica-edit/formacion-academica-edit.component";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'app-formacion-academica',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './formacion-academica.component.html',
  styleUrl: './formacion-academica.component.scss'
})
export class FormacionAcademicaComponent implements OnInit{
  @Input() equipoInvestigacionId!: number

  registers: FormacionAcademicaInterface[] = []
  register: FormacionAcademicaInterface
  displayedColumns: string[] = ['id', 'gradoAcademicoNombre', 'titulo', 'opciones'];

  constructor(private dialog: MatDialog,
              private formacionAcademicaService: FormacionAcademicaService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.formacionAcademicaService.getAll(this.equipoInvestigacionId)
      .subscribe(
        (response): void => {
          if(response.ok){
            this.registers = response.data
          }
        }
      )
  }

  doCreate(): void {
    const dialogRef: MatDialogRef<FormacionAcademicaEditComponent> = this.dialog.open(FormacionAcademicaEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 1, equipoInvestigacionId: this.equipoInvestigacionId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onEditar(element: FormacionAcademicaInterface):void{

    const dialogRef: MatDialogRef<FormacionAcademicaEditComponent> = this.dialog.open(FormacionAcademicaEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 2, equipoInvestigacionId: this.equipoInvestigacionId, id: element.id},
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
        this.formacionAcademicaService.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }

}
