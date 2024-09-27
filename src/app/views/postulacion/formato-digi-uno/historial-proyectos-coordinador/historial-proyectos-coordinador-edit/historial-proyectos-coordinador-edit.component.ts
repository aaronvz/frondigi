import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HistorialProyectosCoordinadorService} from "../../../../../services/historial-proyectos-coordinador.service";

@Component({
  selector: 'app-historial-proyectos-coordinador-editor',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './historial-proyectos-coordinador-edit.component.html',
  styleUrl: './historial-proyectos-coordinador-edit.component.scss'
})
export class HistorialProyectosCoordinadorEditComponent {

  role:number
  formulario: FormGroup

  constructor(public dialogRef: MatDialogRef<HistorialProyectosCoordinadorEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private historiaProyectosCoordinadorService: HistorialProyectosCoordinadorService,
              private fb: FormBuilder) {
    this.role = this.data.role
    this.formulario = this.getForm()
    this.doEdit()
  }

  doEdit():void{
    if(this.data.role == 2){
      this.historiaProyectosCoordinadorService.get(this.data.id).subscribe(response => {
        if(response.ok){
          this.formulario.patchValue(response.data)
        }
      })
    }
  }

  doCerrar():void{
    this.dialogRef.close();
  }

  doAceptar():void{
    if(this.formulario.valid){
      this.historiaProyectosCoordinadorService.add(this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  doActualizar():void {
    if(this.formulario.valid){
      this.historiaProyectosCoordinadorService.set(this.data.id, this.formulario.value).subscribe(respnse => {
        this.dialogRef.close()
      })
    }
  }

  getForm():FormGroup{
    return this.fb.group({
      titulo:[],
      entidad:[],
      coordinadorEquipoInvestigacionId:[this.data.coordinadorEquipoInvestigacionId]
    })
  }
}
