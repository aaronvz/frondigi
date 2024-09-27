import {Component, Inject, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {CommonCoreuiModule} from "../../../../../common/common-coreui/common-coreui.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormacionAcademicaService} from "../../../../../services/formacion-academica.service";
import {GradoAcademicoService} from "../../../../../services/grado-academico.service";
import {EquipoInvestigacionService} from "../../../../../services/equipo-investigacion.service";
import {PuestoMiembroEquipoInterface} from "../../../../../models/puesto-miembro-equipo-interface";
import {PuestoMiembroEquipoService} from "../../../../../services/puesto-miembro-equipo.service";
import {EtniaService} from "../../../../../services/etnia.service";
import {GeneroService} from "../../../../../services/genero.service";
import {forkJoin} from "rxjs";
import {GeneroInterface} from "../../../../../models/genero-interface";
import {EtniaInterface} from "../../../../../models/etnia-interface";
import {MiembroEquipoInvestigacionService} from "../../../../../services/miembro-equipo-investigacion.service";
import {FormacionAcademicaComponent} from "../../formacion-academica/formacion-academica.component";
import {MiembroEquipoInvestigacionInterface} from "../../../../../models/miembro-equipo-investigacion-interface";

@Component({
  selector: 'app-equipo-investigacion-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    CommonCoreuiModule,
    FormacionAcademicaComponent,
  ],
  templateUrl: './equipo-investigacion-edit.component.html',
  styleUrl: './equipo-investigacion-edit.component.scss'
})
export class EquipoInvestigacionEditComponent implements OnInit{

  role:number
  formulario: FormGroup
  puestosMiembros: PuestoMiembroEquipoInterface[] = []
  generos: GeneroInterface[] = []
  etnias: EtniaInterface[] = []
  register: MiembroEquipoInvestigacionInterface

  constructor(public dialogRef: MatDialogRef<EquipoInvestigacionEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private equipoInvestigacion: EquipoInvestigacionService,
              private miembroEquipoInvestigacionServicio: MiembroEquipoInvestigacionService,
              private puestoMiembroEquipoService: PuestoMiembroEquipoService,
              private etniaService: EtniaService,
              private generoService: GeneroService,
              private fb: FormBuilder) {
    this.role = this.data.role
    this.register = {}
    this.formulario = this.getForm()
  }

  ngOnInit(): void {
    this.get()
  }

  get(): void{
    forkJoin([
      this.puestoMiembroEquipoService.getAll(),
      this.generoService.getAll(),
      this.etniaService.getAll(),
      this.miembroEquipoInvestigacionServicio.get(this.data.id)
    ]).subscribe(([
                                  elementPme,
                                  elementG,
                                  elementE,
                                  elementMei
                                ])=> {
      if(elementPme.ok && elementG.ok && elementE.ok && elementMei.ok){
        this.puestosMiembros = elementPme.data
        this.generos = elementG.data
        this.etnias = elementE.data
        this.register = elementMei.data
        if(this.data.role == 2)
          this.formulario.patchValue(this.register)
      }
    })
  }

  doCerrar():void{
    this.dialogRef.close();
  }

  doAceptar():void{
    if(this.formulario.valid){
      this.miembroEquipoInvestigacionServicio.add(this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  doActualizar():void {
    if(this.formulario.valid){
      this.miembroEquipoInvestigacionServicio.set(this.data.id,this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  getForm():FormGroup{
    return this.fb.group({
      puestoMiembroEquipoId:[],
      nombres:[],
      apellidos:[],
      orcid:[],
      googleAcademico:[],
      generoId:[],
      etniaId:[],
      horasContratadas:[],
      horasSolicitadas:[],
      registroPersonal:[],
      formatoDIGIUnoId:[this.data.formatoDIGIUnoId]
    })
  }

}
