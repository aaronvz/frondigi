import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormacionAcademicaService} from "../../../../../services/formacion-academica.service";
import {GradoAcademicoInterface} from "../../../../../models/grado-academico-interface";
import {GradoAcademicoService} from "../../../../../services/grado-academico.service";

@Component({
  selector: 'app-formacion-academica-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './formacion-academica-edit.component.html',
  styleUrl: './formacion-academica-edit.component.scss'
})
export class FormacionAcademicaEditComponent implements OnInit{

  gradosAcademicos: GradoAcademicoInterface[] = []
  formulario: FormGroup
  role:number

  getForm():FormGroup{
    return this.fb.group({
      gradoAcademicoId:[],
      titulo:[]
    })
  }

  constructor(public dialogRef: MatDialogRef<FormacionAcademicaEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private formacionAcademicaService: FormacionAcademicaService,
              private gradoAcademicoService:  GradoAcademicoService
              ) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  doCerrar():void{
    this.dialogRef.close();
  }
  doAceptar():void{
    if(this.formulario.valid){
      this.formacionAcademicaService.add(this.data.equipoInvestigacionId, this.formulario.value).subscribe(response => {
        if(response.ok)
          this.dialogRef.close()
      })
    }
  }

  doActualizar():void{
    if(this.formulario.valid){
      this.formacionAcademicaService.set(this.data.id,this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  ngOnInit(): void {
    this.getCatalogos()
  }

  getCatalogos(): void{
    this.gradoAcademicoService.getAll().subscribe(response => {
      if(response.ok){
        this.gradosAcademicos = response.data
        if(this.data.role == 2){
          this.formacionAcademicaService.get(this.data.id).subscribe(resp => {
            this.formulario.patchValue(resp.data)
          })
        }
      }
    })
    // this.formacionAcademicaService.getAll(this.data.equipoInvestigacionId).subscribe(response => {
    //   if(response.ok){
    //     console.log(response.data)
    //     //this.gradosAcademicos = response.data
    //   }
    // })
  }



}
