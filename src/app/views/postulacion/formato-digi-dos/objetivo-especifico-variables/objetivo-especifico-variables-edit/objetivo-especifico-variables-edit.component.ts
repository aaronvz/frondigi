import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ObjetivoEspecificoService} from "../../../../../services/objetivo-especifico.service";
import {ObjetivoEspecificoVariablesComponent} from "../objetivo-especifico-variables.component";


@Component({
  selector: 'app-objetivo-especifico-variables-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './objetivo-especifico-variables-edit.component.html',
  styleUrl: './objetivo-especifico-variables-edit.component.scss'
})
export class ObjetivoEspecificoVariablesEditComponent implements OnInit {

  formulario: FormGroup
  role:number

  constructor(public dialogRef: MatDialogRef<ObjetivoEspecificoVariablesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private objetivoEspecificoService: ObjetivoEspecificoService
  ) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  ngOnInit(): void {
    this.get()
  }

  get():void{
    if(this.role == 2){
      this.objetivoEspecificoService.get(this.data.id).subscribe(response => {
        if(response.ok){
          this.formulario.patchValue(response.data)
        }
      })
    }
  }

  getForm():FormGroup{
    return this.fb.group({
      variable:[],
      instrumentos:[],
      unidadMedida:[]
    })
  }

  doCerrar():void{
    this.dialogRef.close();
  }

  doAceptar():void{
    if(this.formulario.valid){
      this.objetivoEspecificoService.add(this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  doActualizar():void{
    if(this.formulario.valid){
      this.objetivoEspecificoService.set(this.data.id,this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }


}
