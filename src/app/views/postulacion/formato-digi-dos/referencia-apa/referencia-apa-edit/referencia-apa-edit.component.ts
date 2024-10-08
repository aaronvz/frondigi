import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  ObjetivoEspecificoMetodosComponent
} from "../../objetivo-especifico-metodos/objetivo-especifico-metodos.component";
import {ObjetivoEspecificoService} from "../../../../../services/objetivo-especifico.service";
import {ReferenciaApaService} from "../../../../../services/referencia-apa.service";

@Component({
  selector: 'app-referencia-apa-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './referencia-apa-edit.component.html',
  styleUrl: './referencia-apa-edit.component.scss'
})
export class ReferenciaApaEditComponent implements OnInit {

  formulario: FormGroup
  role:number

  constructor(public dialogRef: MatDialogRef<ObjetivoEspecificoMetodosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private referenciaApaService: ReferenciaApaService
  ) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  getForm():FormGroup{
    return this.fb.group({
      nombre:[],
      formatoDIGIDosId:[this.data.formatoDIGIDosId]
    })
  }

  doCerrar():void{
    this.dialogRef.close();
  }
  doAceptar():void{
    if(this.formulario.valid){
      this.referenciaApaService.add(this.formulario.value).subscribe((response:any) => {
        if(response.ok){
          this.dialogRef.close()
        }
      })
    }
  }

  doActualizar():void{
    if(this.formulario.valid){
      this.referenciaApaService.set(this.data.id,this.formulario.value).subscribe((response:any) => {
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
      this.referenciaApaService.get(this.data.id).subscribe(response =>{
        if(response.ok){
          this.formulario.patchValue(response.data)
        }
      })
    }
  }

}
