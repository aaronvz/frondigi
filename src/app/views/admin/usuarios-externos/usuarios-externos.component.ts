import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonMaterialModule } from "../../../common/common-material/common-material.module";
import { CommonCoreuiModule} from "../../../common/common-coreui/common-coreui.module";
import {CommonModule} from "@angular/common";
import {Sort} from "@angular/material/sort";
import {PagingParameterInterface} from "../../../models/paging.parameter.interface";
import {ResponseInterface} from "../../../models/response.interface";
import {PagingResponseInterface} from "../../../models/paging.response.interface";
import {MatTableDataSource} from "@angular/material/table";
import {UsuarioExternoInterface} from "../../../models/usuario-externo-interface";
import {UsuarioInternoInterface} from "../../../models/usuario.interno.interface";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UsuariosInternosService} from "../../../services/usuarios.internos.service";
import {UsuarioExternoService} from "../../../services/usuario-externo.service";

@Component({
  selector: 'app-usuarios-externos',
  standalone: true,
    imports: [
      CommonModule,
      CommonMaterialModule,
      CommonCoreuiModule
    ],
  templateUrl: './usuarios-externos.component.html',
  styleUrl: './usuarios-externos.component.scss'
})
export class UsuariosExternosComponent implements OnInit {
  register!: UsuarioExternoInterface
  registers: UsuarioExternoInterface[] = []
  paging: PagingParameterInterface
  total: number = 0

  displayedColumns: string[] = [
    'id',
    'usuario',
    'nombreCompleto',
    'roleNombre',
    'tipoDocumento',
    'numeroDocumento',
    'telefono',
    'activo',
    'options'
  ];

  pageSizeOptions: number[] = [5, 10, 25, 50]

  DATA: UsuarioExternoInterface[] = [
    {
      id: 0,
      usuario: '',
      nombreCompleto: '',
      roleNombre: '',
      tipoDocumento: '',
      numeroDocumento: '',
      telefono: '',
      activo: false
    }
  ]

  dataSource = new MatTableDataSource<UsuarioExternoInterface>(this.DATA)

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator

  constructor(private dialog: MatDialog,
              private usuarioExternoService: UsuarioExternoService) {
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
    this.usuarioExternoService.all(this.paging)
      .subscribe(
        (resp: ResponseInterface<PagingResponseInterface<UsuarioExternoInterface>>): void => {
          this.registers = resp.data.data
          this.dataSource.data = this.registers
          this.total = resp.data.totalRows
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
    this.paginator.firstPage()
    this.paging.rows = event.pageSize
    this.all()
  }

  openModal() : void{

  }

  onEdit(): void{
4
  }
}
