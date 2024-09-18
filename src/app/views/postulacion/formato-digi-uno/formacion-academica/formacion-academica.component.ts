import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../../common/common-material/common-material.module";
// import {MatPaginator, PageEvent} from "@angular/material/paginator";
// import {MatTableDataSource} from "@angular/material/table";
// import {PagingParameterInterface} from "../../../../models/paging.parameter.interface";
// import {Sort} from "@angular/material/sort";
import {FormacionAcademicaInterface} from "../../../../models/formacion-academica-interface";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
// import {ResponseInterface} from "../../../../models/response.interface";
// import {PagingResponseInterface} from "../../../../models/paging.response.interface";
import {FormacionAcademicaService} from "../../../../services/formacion-academica.service";

@Component({
  selector: 'app-formacion-academica',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule
  ],
  templateUrl: './formacion-academica.component.html',
  styleUrl: './formacion-academica.component.scss'
})
export class FormacionAcademicaComponent implements OnInit{
  @Input() equipoInvestigacionId!: number

  registers: FormacionAcademicaInterface[] = []
  register: FormacionAcademicaInterface
  displayedColumns: string[] = ['id', 'gradoAcademicoNombre', 'titulo', 'opciones'];

  constructor(private dialog: MatDialog,
              private formacionAcademicaService: FormacionAcademicaService,
              private fb: FormBuilder){
    this.register = {id:0}
  }

  ngOnInit(): void {
    this.all()
  }

  all(): void {
    this.formacionAcademicaService.getAll(this.equipoInvestigacionId)
      .subscribe(
        (response): void => {
          if(response.ok){
            this.registers = response.data
          }
        }
      )
  }


}
