import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {ObjetivoEspecificoInterface} from "../../../../models/objetivo-especifico-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ObjetivoEspecificoService} from "../../../../services/objetivo-especifico.service";
import {
  ObjetivoEspecificoVariablesEditComponent
} from "./objetivo-especifico-variables-edit/objetivo-especifico-variables-edit.component";
@Component({
  selector: 'app-objetivo-especifico-variables',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './objetivo-especifico-variables.component.html',
  styleUrl: './objetivo-especifico-variables.component.scss'
})
export class ObjetivoEspecificoVariablesComponent implements OnInit{
  @Input() formatoDIGIDosId!:number

  registers: ObjetivoEspecificoInterface[] = []
  register: ObjetivoEspecificoInterface
  displayedColumns: string[] = ['id', 'nombre', 'variable', 'instrumentos', 'unidadMedida', 'opciones'];

  constructor(private dialog: MatDialog,
              private objetivoGeneralService: ObjetivoEspecificoService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.objetivoGeneralService.all(this.formatoDIGIDosId)
      .subscribe(response => {
          if(response.ok){
            this.registers = response.data
          }
        }
      )
  }

  // doCreate(): void {
  //   const dialogRef: MatDialogRef<ObjetivoEspecificoVariablesEditComponent> = this.dialog.open(ObjetivoEspecificoVariablesEditComponent,{
  //     width: '30vw',
  //     maxWidth: '30vw',
  //     data: { title: 'Formación académica', role: 1, formatoDIGIDosId: this.formatoDIGIDosId},
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.all()
  //   });
  // }

  onEditar(element: ObjetivoEspecificoInterface):void{
    const dialogRef: MatDialogRef<ObjetivoEspecificoVariablesEditComponent> = this.dialog.open(ObjetivoEspecificoVariablesEditComponent,{
      width: '40vw',
      maxWidth: '40vw',
      data: { title: 'Operacionalización de las variables o unidades de análisis', role: 2, formatoDIGIDosId: this.formatoDIGIDosId, id: element.id},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onBorrar(element: ObjetivoEspecificoInterface):void{
    // const dialogRef = this.dialog.open(DialogConfirmComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.objetivoGeneralService.del(element.id ?? 0).subscribe(resp => {
    //       this.all()
    //     })
    //   }
    // });
  }


}
