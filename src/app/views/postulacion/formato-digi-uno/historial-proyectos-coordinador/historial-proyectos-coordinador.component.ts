import {Component, Input, OnInit} from '@angular/core';
import { CommonModule} from "@angular/common";
import { CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import {HistorialProyectosCoordinadorInterface} from "../../../../models/historial-proyectos-coordinador-interface";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {HistorialProyectosCoordinadorService} from "../../../../services/historial-proyectos-coordinador.service";
import {FormacionAcademicaInterface} from "../../../../models/formacion-academica-interface";
import {
  FormacionAcademicaEditComponent
} from "../formacion-academica/formacion-academica-edit/formacion-academica-edit.component";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";
import {
  HistorialProyectosCoordinadorEditComponent
} from "./historial-proyectos-coordinador-edit/historial-proyectos-coordinador-edit.component";

@Component({
  selector: 'app-historial-proyectos-coordinador',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './historial-proyectos-coordinador.component.html',
  styleUrl: './historial-proyectos-coordinador.component.scss'
})
export class HistorialProyectosCoordinadorComponent implements OnInit{
  @Input() coordinadorEquipoInvestigacionId!: number

  registers: HistorialProyectosCoordinadorInterface[] = []
  register: HistorialProyectosCoordinadorInterface

  displayedColumns: string[] = ['id', 'titulo', 'entidad', 'opciones'];

  ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
  ]

  dataSource = this.ELEMENT_DATA;

  constructor(private dialog: MatDialog,
              private historialProyectosCoordinadorService: HistorialProyectosCoordinadorService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  all():void{
    this.historialProyectosCoordinadorService.all(this.coordinadorEquipoInvestigacionId).subscribe(response => {
      if(response.ok){
        this.registers = response.data
      }
    })
  }

  doCrear():void{
    const dialogRef: MatDialogRef<HistorialProyectosCoordinadorEditComponent> = this.dialog.open(HistorialProyectosCoordinadorEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 1, coordinadorEquipoInvestigacionId: this.coordinadorEquipoInvestigacionId},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  ngOnInit(): void {
    this.all()
  }

  onEditar(element: HistorialProyectosCoordinadorInterface):void{

    const dialogRef: MatDialogRef<HistorialProyectosCoordinadorEditComponent> = this.dialog.open(HistorialProyectosCoordinadorEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Formación académica', role: 2, equipoInvestigacionId: this.coordinadorEquipoInvestigacionId, id: element.id},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onBorrar(element: HistorialProyectosCoordinadorInterface):void{
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.historialProyectosCoordinadorService.del(element.id ?? 0).subscribe(resp => {
          this.all()
        })
      }
    });
  }

}
