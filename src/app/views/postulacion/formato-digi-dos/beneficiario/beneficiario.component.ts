import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {BeneficiarioInterface} from "../../../../models/beneficiario-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {BeneficiarioService} from "../../../../services/beneficiario.service";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";
import {BeneficiarioEditComponent} from "./beneficiario-edit/beneficiario-edit.component";


@Component({
  selector: 'app-beneficiario',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './beneficiario.component.html',
  styleUrl: './beneficiario.component.scss'
})
export class BeneficiarioComponent implements OnInit{
  @Input() formatoDIGIDosId!:number
  registers: BeneficiarioInterface[] = []
  register: BeneficiarioInterface
  displayedColumns: string[] = ['id', 'nombreProducto', 'nombreBeneficiario', 'numeroBeneficiario', 'numeroDirecto', 'numeroIndirecto', 'opciones'];

  constructor(private dialog: MatDialog,
              private beneficiarioService: BeneficiarioService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.beneficiarioService.all(this.formatoDIGIDosId)
      .subscribe(
        (response): void => {
          if(response.ok){
            this.registers = response.data
          }
        }
      )
  }

  doCreate(): void {
    const dialogRef: MatDialogRef<BeneficiarioEditComponent> = this.dialog.open(BeneficiarioEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 1, formatoDIGIDosId: this.formatoDIGIDosId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onEditar(element: BeneficiarioInterface):void{

    const dialogRef: MatDialogRef<BeneficiarioEditComponent> = this.dialog.open(BeneficiarioEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 2, formatoDIGIDosId: this.formatoDIGIDosId, id: element.id},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onBorrar(element: BeneficiarioInterface):void{
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.beneficiarioService.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }


}
