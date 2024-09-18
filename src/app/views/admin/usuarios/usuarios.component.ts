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
  total: number = 0

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
      sortOrder: 1,
      rows: 1,
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
          this.total = resp.data.totalRows
          //this.paginator.length = resp.data.totalRows
        }
      )
  }

  onFilterChange(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value
    this.paging.globalFilter = filterValue.trim().toLowerCase()
    //this.paging.rows = this.paginator.pageSize
    //this.paging.first = this.paginator.pageIndex
    this.all()
  }

  onSortChange(event: Sort): void {
    this.paging.sortOrder = (event.direction == 'desc' ? 0 : 1)
    this.paging.sortField = event.active
    this.all()
  }

  onPageChange(event: PageEvent): void {
    //this.paging.first = this.paginator.pageIndex
    this.paginator.firstPage()
    this.paging.rows = event.pageSize
    //this.paginator.pageSize = event.pageSize
    this.all()
  }

  closeModal(): void {
  }

  openModal() : void{
    const dialogRef: MatDialogRef<UsuariosInternosEditComponent> = this.dialog.open(UsuariosInternosEditComponent,{
      width: '40%',
      data: { title: 'Crear usuario'},
      disableClose: true,
      //hasBackdrop: false,
      //restoreFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
    });
  }

  get(userId: number): void{
    // this.userService.get(userId)
    //   .subscribe(
    //     (resp: ResponseInterface<UserInterface>): void => {
    //       this.register = resp.data
    //     }
    //   )
  }
  onEdit(): void{
    const dialogRef: MatDialogRef<UsuariosInternosEditComponent> = this.dialog.open(UsuariosInternosEditComponent,{
      width: '40%',
      data: { title: 'Editar usuario'},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado');
    });
  }

  put(): void{
  }
  del(): void{}
}
