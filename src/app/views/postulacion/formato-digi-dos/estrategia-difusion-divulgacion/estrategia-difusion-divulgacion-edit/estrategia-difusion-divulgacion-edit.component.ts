import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EstrategiaDifusionDivulgacionService} from "../../../../../services/estrategia-difusion-divulgacion.service";
import {EstrategiaDifusionDivulgacionComponent} from "../estrategia-difusion-divulgacion.component";
import {TipoDifusionInterface} from "../../../../../models/tipo-difusion-interface";
import {TipoDifusionService} from "../../../../../services/tipo-difusion.service";

@Component({
  selector: 'app-estrategia-difusion-divulgacion-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './estrategia-difusion-divulgacion-edit.component.html',
  styleUrl: './estrategia-difusion-divulgacion-edit.component.scss'
})
export class EstrategiaDifusionDivulgacionEditComponent implements OnInit {

  formulario: FormGroup
  role:number
  tipoDifusiones: TipoDifusionInterface[] = []

  getForm():FormGroup{
    return this.fb.group({
      tipoDifusionId:[],
      esSeleccionado:[true],
      formatoDIGIDosId:[this.data.formatoDIGIDosId]
    })
  }

  constructor(public dialogRef: MatDialogRef<EstrategiaDifusionDivulgacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private tipoDifusionService:TipoDifusionService,
              private estrategiaDifusionDivulgacionService: EstrategiaDifusionDivulgacionService
  ) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  doCerrar():void{
    this.dialogRef.close();
  }

  doAceptar():void{
    if(this.formulario.valid){
      this.estrategiaDifusionDivulgacionService.add(this.formulario.value).subscribe((response:any) => {
        if(response.ok){
          this.dialogRef.close()
        }
      })
    }
  }

  doActualizar():void{
    if(this.formulario.valid){
      this.estrategiaDifusionDivulgacionService.set(this.data.id,this.formulario.value).subscribe((response:any) => {
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
      this.estrategiaDifusionDivulgacionService.get(this.data.id).subscribe(resp =>{
        if(resp.ok){
          this.formulario.patchValue(resp.data)
        }
      })
    }
    this.tipoDifusionService.getAll().subscribe(response =>{
      if(response.ok){
        this.tipoDifusiones = response.data
      }
    })


  }
}
