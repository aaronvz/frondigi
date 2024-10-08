import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../../common/common-material/common-material.module";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormacionAcademicaService} from "../../../../../services/formacion-academica.service";
import {GradoAcademicoService} from "../../../../../services/grado-academico.service";
import {BeneficiarioService} from "../../../../../services/beneficiario.service";

@Component({
  selector: 'app-beneficiario-edit',
  standalone: true,
    imports: [
      CommonModule,
      CommonMaterialModule
    ],
  templateUrl: './beneficiario-edit.component.html',
  styleUrl: './beneficiario-edit.component.scss'
})
export class BeneficiarioEditComponent implements OnInit {

  formulario: FormGroup
  role:number

  constructor(public dialogRef: MatDialogRef<BeneficiarioEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private beneficiarioService: BeneficiarioService
  ) {
    this.role = this.data.role
    this.formulario = this.getForm()
  }

  ngOnInit(): void {
    this.get()
  }

  get():void{
    if(this.data.role == 2){
      this.beneficiarioService.get(this.data.id).subscribe(response => {
        if(response.ok){
          this.formulario.patchValue(response.data)
        }
      })
    }
  }

  getForm():FormGroup{
    return this.fb.group({
      nombreProducto:[],
      nombreBeneficiario:[],
      numeroBeneficiarios:[],
      numeroDirectos:[],
      numeroIndirectos:[],
      formatoDIGIDosId:[this.data.formatoDIGIDosId]
    })
  }

  doCerrar():void{
    this.dialogRef.close();
  }
  doAceptar():void{
    if(this.formulario.valid){
      this.beneficiarioService.add(this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

  doActualizar():void{
    if(this.formulario.valid){
      this.beneficiarioService.set(this.data.id,this.formulario.value).subscribe(response => {
        this.dialogRef.close()
      })
    }
  }

}
