import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CronogramaService} from "../../../../../services/cronograma.service";

@Component({
  selector: 'app-cronograma-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './cronograma-edit.component.html',
  styleUrl: './cronograma-edit.component.scss'
})
export class CronogramaEditComponent implements OnInit {

  formulario: FormGroup
  role:number

  constructor(public dialogRef: MatDialogRef<CronogramaEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private cronogramaService: CronogramaService
  ) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  ngOnInit(): void {
    this.get()
  }

  get():void{
    if(this.role == 2){
      this.cronogramaService.get(this.data.id).subscribe(response => {
        if(response.ok){
          this.formulario.patchValue(response.data)
        }
      })
    }
  }

  getForm():FormGroup{
    return this.fb.group({
      descripcion:[],
      fechaInicio:[],
      fechaFin:[],
      formatoDIGIDosId:[this.data.formatoDIGIDosId]
    })
  }

  doCerrar():void{
    this.dialogRef.close();
  }

  doAceptar():void{
    if(this.formulario.valid){
      this.cronogramaService.add(this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  doActualizar():void{
    if(this.formulario.valid){
      this.cronogramaService.set(this.data.id,this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

}
