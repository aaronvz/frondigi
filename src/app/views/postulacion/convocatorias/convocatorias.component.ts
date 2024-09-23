import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule } from "../../../common/common-material/common-material.module";
import { CommonCoreuiModule } from "../../../common/common-coreui/common-coreui.module";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UsuarioInternoInterface} from "../../../models/usuario.interno.interface";
import {PagingParameterInterface} from "../../../models/paging.parameter.interface";
import {ResponseInterface} from "../../../models/response.interface";
import {PagingResponseInterface} from "../../../models/paging.response.interface";
import {ConvocatoriaService} from "../../../services/convocatoria.service";
import {ConvocatoriaEditComponent} from "./convocatoria-edit/convocatoria-edit.component";
import {EjeTematicoEditComponent} from "./eje-tematico-edit/eje-tematico-edit.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ConvocatoriaInterface} from "../../../models/convocatoria.interface";
import {DialogConfirmComponent} from "../../../common/dialog-confirm/dialog-confirm.component";
import {GrupoEditComponent} from "./grupo-edit/grupo-edit.component";

@Component({
  selector: 'app-convocatorias',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    CommonCoreuiModule
  ],
  templateUrl: './convocatorias.component.html',
  styleUrl: './convocatorias.component.scss'
})
export class ConvocatoriasComponent implements OnInit {

  registers: UsuarioInternoInterface[] = []
  paging: PagingParameterInterface

  formulario: FormGroup

  displayedColumns: string[] = [
    'id',
    'nombre',
    'ano',
    'fechaInicio',
    'fechaFin',
    'tipoConvocatoriaNombre',
    'options'
  ];

  pageSizeOptions: number[] = [5, 10, 25, 50]

  DATA: UsuarioInternoInterface[] = [
    {
      id: 0,
      usuario: '',
      telefono: ''
    }
  ]

  dataSource = new MatTableDataSource<UsuarioInternoInterface>(this.DATA)
  //@ViewChild(MatTable) table!: MatTable<ConvocatoriaInterface>

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página'
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1
      const end = (page + 1) * pageSize
      return `${start} - ${end} de ${length}`
    };
  }

  constructor(private dialog: MatDialog,
              private convocatoriaService: ConvocatoriaService,
              private fb: FormBuilder) {
    this.paging = {
      globalFilter: '',
      sortField: 'id',
      sortOrder: 2,
      rows: 5,
      first: 0
    }
    this.dataSource = new MatTableDataSource(this.registers)
    this.formulario = this.getForm()

    this.all()
  }

  getForm():FormGroup{
    return this.fb.group({
      texto:[]
    })
  }

  all(): void{
    this.convocatoriaService.all(this.paging)
      .subscribe(
        (resp: ResponseInterface<PagingResponseInterface<any>>): void => {
          this.registers = resp.data.data
          this.dataSource.data = this.registers
          this.paginator.length = resp.data.totalRows
        }
      )
  }

  onFilterChange(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value
    this.paging.globalFilter = filterValue.trim().toLowerCase()
    this.paging.rows = this.paginator.pageSize
    this.paging.first = this.paginator.pageIndex
    this.all()
  }

  onSortChange(event: Sort): void {
    this.paging.sortOrder = (event.direction == 'desc' ? 0 : 1)
    this.paging.sortField = event.active
    this.all()
  }

  onPageChange(event: PageEvent): void {
    this.paging.first = this.paginator.pageIndex
    this.paging.rows = event.pageSize
    this.paginator.pageSize = event.pageSize
    this.all()
  }

  onCreate() : void{
    const dialogRef: MatDialogRef<ConvocatoriaEditComponent> = this.dialog.open(ConvocatoriaEditComponent,{
      width: '30vw',
      maxWidth: '30vw',
      data: { title: 'Crear convocatoria', role: 1},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  // onEdit(element: ConvocatoriaInterface): void{
  //   const dialogRef: MatDialogRef<ConvocatoriaEditComponent> = this.dialog.open(ConvocatoriaEditComponent,{
  //     width: '30vw',
  //     maxWidth: '30vw',
  //     data: { title: 'Editar usuario', role: 2, id: element.id},
  //     disableClose: true
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.all()
  //   });
  // }

  onEdition(element: ConvocatoriaInterface): void{
    const dialogRef: MatDialogRef<GrupoEditComponent> = this.dialog.open(GrupoEditComponent,{
      width: '50vw',
      maxWidth: '65vw',
      data: { title: 'Editar', role: 2, id: element.id},
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(result => {
      //dialogRef.componentInstance.accept()
      this.all()
    })
  }

  onEjeTematicoEdit(element: ConvocatoriaInterface): void{
    const dialogRef: MatDialogRef<EjeTematicoEditComponent> = this.dialog.open(EjeTematicoEditComponent,{
      width: '40vw',
      maxWidth: '40vw',
      data: { title: 'Ejes temáticos', id: element.id},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  onDelete(element: ConvocatoriaInterface){
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.convocatoriaService.del(element.id).subscribe(resp => {
          this.all()
        })
      }
    });
  }

}
