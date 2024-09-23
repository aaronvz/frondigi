import {Component, Inject, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {CommonCoreuiModule} from "../../../../../common/common-coreui/common-coreui.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormacionAcademicaService} from "../../../../../services/formacion-academica.service";
import {GradoAcademicoService} from "../../../../../services/grado-academico.service";
import {EquipoInvestigacionService} from "../../../../../services/equipo-investigacion.service";

@Component({
  selector: 'app-equipo-investigacion-edit',
  standalone: true,
    imports: [
      CommonModule,
      CommonMaterialModule,
      CommonCoreuiModule,
    ],
  templateUrl: './equipo-investigacion-edit.component.html',
  styleUrl: './equipo-investigacion-edit.component.scss'
})
export class EquipoInvestigacionEditComponent {

  role:number
  formulario: FormGroup


  constructor(public dialogRef: MatDialogRef<EquipoInvestigacionEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private equipoInvestigacion: EquipoInvestigacionService,
              private fb: FormBuilder) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  doCerrar():void{
    this.dialogRef.close();
  }

  doAceptar():void{
    if(this.formulario.valid){
      this.equipoInvestigacion.add(this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  doActualizar():void {
  }

  getForm():FormGroup{
    return this.fb.group({
      gradoAcademicoId:[],
      titulo:[]
    })
  }

}
