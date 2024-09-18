import {CommonModule} from "@angular/common";
import {Component, Inject, OnInit} from '@angular/core';
import { CommonMaterialModule } from "../../../../common/common-material/common-material.module";
import {ConvocatoriaService} from "../../../../services/convocatoria.service";
import {TipoConvocatoriaInterface} from "../../../../models/tipo-convocatoria.interface";
import {ResponseInterface} from "../../../../models/response.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {TipoConvocatoriaService} from "../../../../services/tipo-convocatoria.service";

@Component({
  selector: 'app-convocatoria-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './convocatoria-edit.component.html',
  styleUrl: './convocatoria-edit.component.scss'
})
export class ConvocatoriaEditComponent implements OnInit {

  tipoConvocatoriaItems: TipoConvocatoriaInterface[] = []
  group: FormGroup

  constructor(public dialogRef: MatDialogRef<ConvocatoriaEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private tipoConvocatoriaService: TipoConvocatoriaService,
              private fb: FormBuilder,
              private convocatoriaService: ConvocatoriaService) {
    this.group = this.getForm()
  }

  ngOnInit(): void {
    this.tipoConvocatoriaService.all().subscribe(
      (resp: ResponseInterface<TipoConvocatoriaInterface[]>): void => {
        this.tipoConvocatoriaItems = resp.data
        if(this.data.role == 2){
          this.convocatoriaService.get(this.data.id).subscribe(
            (resp: ResponseInterface<any>): void =>{
              this.group.patchValue(resp.data)
          })
        }
      }
    )
  }

  getForm():FormGroup{
    return this.fb.group({
      nombre:[],
      ano:[],
      descripcion:[],
      fechaInicio:[],
      fechaFin:[],
      horaInicio:[],
      horaFin:[],
      tipoConvocatoriaId:[]
    })
  }

  close(): void {
    this.dialogRef.close();
    console.log("Nuevo botón de cierre.")
  }


  acceptUpdate(): void{
    if(this.group.valid){
      this.convocatoriaService.set(this.data.id, this.group.value).subscribe(
        (resp: ResponseInterface<any>): void => {
          this.dialogRef.close();
        }
      )
    }
  }

  accept(): void {

    if(this.data.role == 1){
      if(this.group.valid){
        this.convocatoriaService.add(this.group.value).subscribe(
          (resp: ResponseInterface<number>): void => {
            this.dialogRef.close()
          }
        )
      }
    }

    if(this.data.role == 2){
      if(this.group.valid){
        this.convocatoriaService.set(this.data.id, this.group.value).subscribe(
          (resp: ResponseInterface<any>): void => {
            this.dialogRef.close()
          }
        )
      }
    }

  }
}
