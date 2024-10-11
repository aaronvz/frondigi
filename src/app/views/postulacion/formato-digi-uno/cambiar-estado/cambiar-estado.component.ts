import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule } from "../../../../common/common-material/common-material.module";
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormatoDigiUnoComponent} from "../formato-digi-uno.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../../services/role.service";
import {RoleInterface} from "../../../../models/role.interface";
import {ResponseInterface} from "../../../../models/response.interface";
import { FormatoDigiUnoService } from 'src/app/services/formato-digi-uno.service';
import { TipoInvestigacionInterface } from 'src/app/models/tipo-investigacion-interface';
import { forkJoin } from 'rxjs';
import { TipoEstadoService } from 'src/app/services/tipo-estado.service';
import { TipoEstadoInterface } from 'src/app/models/tipo-estado-interface';
import { EstadoInterface } from 'src/app/models/estado.interface';
import { EstadoService } from 'src/app/services/estado.service';
import { CambioEstadoService } from 'src/app/services/cambio-estado.service';

@Component({
  selector: 'cambiar-estado-component',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './cambiar-estado.component.html',
  styleUrl: './cambiar-estado.component.scss'
})
export class CambiarEstadoComponent implements OnInit{

  role: number
  formulario: FormGroup
  roleItems: RoleInterface[] = []
  tiposInvestigacion: TipoInvestigacionInterface[] = []
  tipoEstados: TipoEstadoInterface[] = []
  estados: EstadoInterface[] = []
  estadosSelected: EstadoInterface[] = []
  file: File | null = null;
  proyectoId: number = 0;

  constructor(public dialogRef: MatDialogRef<FormatoDigiUnoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private formatoDigiUnoService: FormatoDigiUnoService,
              private tipoEstadoService: TipoEstadoService,
              private estadoService: EstadoService,
              private cambioEstadoService: CambioEstadoService
            ) {
              this.proyectoId = this.data.id
              this.role = data.role
              this.formulario = this.getFormulario()
  }

  ngOnInit(): void {
    this.getCatalogos();
  }

  getCatalogos(): void{
    forkJoin([
      this.formatoDigiUnoService.get(this.proyectoId),
      this.tipoEstadoService.all(),
      this.estadoService.all()
    ]).subscribe(([
      elementFdu,
      elementTe,
      elementE,
    ]) =>{
      if(elementFdu.ok && elementTe.ok && elementE.ok){
        //  Getting formato DIGI-1
        this.formulario.patchValue(elementFdu.data)
        this.tipoEstados = elementTe.data
        this.tipoEstados.shift()
        this.estados = elementE.data
      }
    })
  }

  tipoEstadoSelected(tipoEstadoId: any): void{
    this.estadosSelected = []
    this.estados.forEach(( estado: EstadoInterface ) => {
      if(estado.tipoEstadoId === tipoEstadoId)
        this.estadosSelected.push(estado)
    })
  }

  estadoSelected(estado: EstadoInterface):void{
    
  }
  
  handleFileInputChange(event: any): void {

    const file: File = event.target.files[0];
    /*if (file) {
      this.archivos[index].status = "initial";
      this.archivos[index].file = file;
    }*/
    this.formulario.controls['archivo'].setValue(file.name) 
    console.log(file.name)
    console.log(file.size)
    this.file = file;
    //this.file_store = l;

    /*if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }*/
  }

  getFormulario(): FormGroup{
    return this.fb.group({
      id:[{value:'',disabled: true},Validators.required],
      titulo:[{value:'',disabled: true},Validators.required],
      estadoNombre:[{value:'',disabled: true},Validators.required],
      estado:[],
      tipoEstado:[],
      observacion:[],
      archivo:[],
      formatoDigiUnoId: [this.proyectoId],
    })
  }

  doCerrar(): void {
    this.dialogRef.close();
  }

  doAceptar(): void {


    if(this.file != null ){
      this.cambioEstadoService.add(this.formulario.value, this.file).subscribe(
        () => {
          this.dialogRef.close()  
        }
      )
    }
    //}
  }

  doActualizar(): void{
    if(this.formulario.valid){
      /*this.usuarioInternoService.set(this.data.id, this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })*/
    }
  }
}
