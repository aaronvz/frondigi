import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule } from "../../../../common/common-material/common-material.module";
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsuariosComponent} from "../usuarios.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UsuarioInternoInterface} from "../../../../models/usuario.interno.interface";
import {RoleService} from "../../../../services/role.service";
import {RoleInterface} from "../../../../models/role.interface";
import {UsuariosInternosService} from "../../../../services/usuarios.internos.service";
import {ResponseInterface} from "../../../../models/response.interface";

@Component({
  selector: 'app-usuarios-internos-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './usuarios-internos-edit.component.html',
  styleUrl: './usuarios-internos-edit.component.scss'
})
export class UsuariosInternosEditComponent implements OnInit{

  role: number
  formulario: FormGroup
  roleItems: RoleInterface[] = []

  constructor(public dialogRef: MatDialogRef<UsuariosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private roleService: RoleService,
              private usuarioInternoService: UsuariosInternosService) {
    this.role = data.role
    this.formulario = this.getFormulario()
  }

  ngOnInit(): void {
    this.getCatalogos();
    if(this.data.role == 2){
      this.usuarioInternoService.get(this.data.id).subscribe(
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
      activo:[]
    })
  }

  doCerrar(): void {
    this.dialogRef.close();
  }

  doAceptar(): void {
    if(this.formulario.valid){
      this.usuarioInternoService.add(this.formulario.value).subscribe(request =>{
        this.dialogRef.close()
      })
    }
  }

  doActualizar(): void{
    if(this.formulario.valid){
      this.usuarioInternoService.set(this.data.id, this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }
}
