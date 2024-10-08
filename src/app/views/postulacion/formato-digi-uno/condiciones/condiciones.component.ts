import {Component, Inject, OnInit} from '@angular/core';
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormacionAcademicaService} from "../../../../services/formacion-academica.service";
import {GradoAcademicoService} from "../../../../services/grado-academico.service";
import {FormatoDigiUnoService} from "../../../../services/formato-digi-uno.service";
@Component({
  selector: 'app-condiciones',
  standalone: true,
    imports: [
      CommonModule,
      CommonMaterialModule
    ],
  templateUrl: './condiciones.component.html',
  styleUrl: './condiciones.component.scss'
})
export class CondicionesComponent implements OnInit{

  formulario: FormGroup
  role:number
  acepta: boolean

  constructor(public dialogRef: MatDialogRef<CondicionesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private formatoDigiUnoService: FormatoDigiUnoService
  ) {
    this.role = this.data.role
    this.formulario = this.getForm()
    this.acepta = false
  }
  ngOnInit(): void {
  }

  getForm():FormGroup{
    return this.fb.group({
      aceptaCondiciones:[],
    })
  }

  doCerrar():void{
    this.dialogRef.close();
  }

  doAceptar():void{
    if(this.formulario.valid){
      // this.formacionAcademicaService.add(this.data.equipoInvestigacionId, this.formulario.value).subscribe(response => {
      //   if(response.ok)
      //     this.dialogRef.close()
      // })
    }
    this.acepta = true;
    this.dialogRef.close()
  }

  doRechazar():void{
    this.dialogRef.close()
  }

}
