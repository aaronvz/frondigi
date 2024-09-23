import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsuariosComponent} from "../../usuarios/usuarios.component";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RoleInterface} from "../../../../models/role.interface";
import {RoleService} from "../../../../services/role.service";
import {UsuarioExternoService} from "../../../../services/usuario-externo.service";
import {ResponseInterface} from "../../../../models/response.interface";
import {UsuarioInternoInterface} from "../../../../models/usuario.interno.interface";

@Component({
  selector: 'app-usuarios-externos-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './usuarios-externos-edit.component.html',
  styleUrl: './usuarios-externos-edit.component.scss'
})
export class UsuariosExternosEditComponent implements OnInit{

  role: number
  formulario: FormGroup
  roleItems: RoleInterface[] = []

  constructor(public dialogRef: MatDialogRef<UsuariosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private roleService: RoleService,
              private usuarioExternoService: UsuarioExternoService,
              private fb: FormBuilder) {
    this.role = data.role
    this.formulario = this.getFormulario()
  }

  ngOnInit(): void {
    this.getCatalogos();
    if(this.data.role == 2){
      this.usuarioExternoService.get(this.data.id).subscribe(
        (resp: ResponseInterface<UsuarioInternoInterface>): void => {
          this.formulario.patchValue(resp.data)
        })
    }
  }

  getCatalogos(): void{
    this.roleService.all().subscribe(response => {
      if(response.ok){
        this.roleItems = response.data
      }
    })
  }

  getFormulario(): FormGroup{
    return this.fb.group({
      usuario:[],
      nombres:[],
      apellidos:[],
      telefono:[],
      roleId:[],
      activo:[],
      fechaNacimiento:[],
      tipoDocumento:[],
      numeroDocumento:[],
      password:[]
    })
  }

  doCerrar(): void {
    this.dialogRef.close()
  }

  doAceptar(): void {
    if(this.formulario.valid){
      this.usuarioExternoService.add(this.formulario.value).subscribe(request =>{
        this.dialogRef.close()
      })
    }
  }

  doActualizar(): void {
    if(this.formulario.valid){
      this.usuarioExternoService.set(this.data.id, this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

}
