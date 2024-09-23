import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule } from "../../../common/common-material/common-material.module";
import { CommonCoreuiModule} from "../../../common/common-coreui/common-coreui.module";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {PagingParameterInterface} from "../../../models/paging.parameter.interface";
import {UsuarioInternoInterface} from "../../../models/usuario.interno.interface";
import {UsuariosInternosService} from "../../../services/usuarios.internos.service";
import {ResponseInterface} from "../../../models/response.interface";
import {PagingResponseInterface} from "../../../models/paging.response.interface";
import {UsuariosInternosEditComponent} from "./usuarios-internos-edit/usuarios-internos-edit.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-usuarios',
  standalone: true,
    imports: [
        CommonModule,
        CommonMaterialModule,
        CommonCoreuiModule
    ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  register!: UsuarioInternoInterface
  registers: UsuarioInternoInterface[] = []
  paging: PagingParameterInterface

  displayedColumns: string[] = [
    'id',
    'usuario',
    'nombreCompleto',
    'roleNombre',
    'telefono',
    'activo',
    'options'
  ];

  pageSizeOptions: number[] = [5, 10, 25, 50]

  DATA: UsuarioInternoInterface[] = [
    {
      id: 0,
      usuario: '',
      nombreCompleto: '',
      roleNombre: '',
      telefono: '',
      activo: false
    }
  ]

  dataSource = new MatTableDataSource<UsuarioInternoInterface>(this.DATA)

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator

  constructor(private dialog: MatDialog,
              private usuarioInternosService: UsuariosInternosService) {
    this.paging = {
      globalFilter: '',
      sortField: 'id',
      sortOrder: 0,
      rows: 5,
      first: 0
    }
    this.dataSource = new MatTableDataSource(this.registers)
  }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
    this.all()
  }

  all(): void{
    this.usuarioInternosService.all(this.paging)
      .subscribe(
        (resp: ResponseInterface<PagingResponseInterface<UsuarioInternoInterface>>): void => {
          this.registers = resp.data.data
          this.dataSource.data = this.registers
          this.paginator.length = resp.data.totalRows
        }
      )
  }

  onFilterChange(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value
    this.paging.globalFilter = filterValue.trim().toLowerCase()
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

  closeModal(): void {
  }

  doCrear() : void{
    const dialogRef: MatDialogRef<UsuariosInternosEditComponent> = this.dialog.open(UsuariosInternosEditComponent,{
      width: '40%',
      data: { title: 'Crear usuario', role:1},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  // get(userId: number): void{
  //   this.usuarioInternosService.get(userId)
  //     .subscribe(
  //       (resp: ResponseInterface<UsuarioInternoInterface>): void => {
  //         this.register = resp.data        }
  //     )
  // }

  onEdit(element: UsuarioInternoInterface): void{
    const dialogRef: MatDialogRef<UsuariosInternosEditComponent> = this.dialog.open(UsuariosInternosEditComponent,{
      width: '40%',
      data: { title: 'Editar usuario', role:2, id: element.id},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  put(): void{
  }
  del(): void{}
}
