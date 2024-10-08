import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ObjetivoEspecificoMetodosComponent} from "../objetivo-especifico-metodos.component";
import {ObjetivoEspecificoService} from "../../../../../services/objetivo-especifico.service";

@Component({
  selector: 'app-objetivo-especifico-metodos-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './objetivo-especifico-metodos-edit.component.html',
  styleUrl: './objetivo-especifico-metodos-edit.component.scss'
})
export class ObjetivoEspecificoMetodosEditComponent implements OnInit {

  formulario: FormGroup
  role:number

  getForm():FormGroup{
    return this.fb.group({
      metodoTecnica:[],
      aporteTransferenciaConocimiento:[]
    })
  }

  constructor(public dialogRef: MatDialogRef<ObjetivoEspecificoMetodosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private objetivoEspecificoService: ObjetivoEspecificoService
  ) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  doCerrar():void{
    this.dialogRef.close();
  }
  doAceptar():void{
    if(this.formulario.valid){
      this.objetivoEspecificoService.add(this.formulario.value).subscribe((response:any) => {
        if(response.ok){
          this.dialogRef.close()
        }
      })
    }
  }

  doActualizar():void{
    if(this.formulario.valid){
      this.objetivoEspecificoService.set(this.data.id,this.formulario.value).subscribe((response:any) => {
        if(response.ok)
          this.dialogRef.close()
      })
    }
  }

  ngOnInit(): void {
    this.get()
  }

  get():void{
    if(this.data.role == 2){
      this.objetivoEspecificoService.get(this.data.id).subscribe(response => {
        if(response.ok){
          this.formulario.patchValue(response.data)
        }
      })
    }
  }

}
