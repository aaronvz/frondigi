import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule } from "../../../../common/common-material/common-material.module";
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsuariosComponent} from "../usuarios.component";

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
export class UsuariosInternosEditComponent {

  constructor(public dialogRef: MatDialogRef<UsuariosComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  close(): void {
    this.dialogRef.close();
    console.log("Nuevo botón de cierre.")
  }

  accept(): void {
    this.dialogRef.close();
    console.log("Ejecutar procedimiento.")
  }
}
