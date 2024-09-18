import {Component, Inject, ViewChild} from '@angular/core';
import { CommonModule } from "@angular/common";
import { CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {EjeTematicoEditComponent} from "../eje-tematico-edit/eje-tematico-edit.component";
import {ConvocatoriaEditComponent} from "../convocatoria-edit/convocatoria-edit.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-grupo-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    ConvocatoriaEditComponent,
    EjeTematicoEditComponent
  ],
  templateUrl: './grupo-edit.component.html',
  styleUrl: './grupo-edit.component.scss'
})
export class GrupoEditComponent {

  @ViewChild(ConvocatoriaEditComponent) convocatoria!: ConvocatoriaEditComponent

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<any>) {
  }

  close(): void {
    this.dialogRef.close();
  }

  accept(): void {
    this.convocatoria.acceptUpdate()
  }

}
