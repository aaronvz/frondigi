import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule } from "../../../common/common-material/common-material.module";
import {CommonCoreuiModule} from "../../../common/common-coreui/common-coreui.module";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormatoDigiDosService} from "../../../services/formato-digi-dos.service";
import {FormatoDigiDosInterface} from "../../../models/formato-digi-dos-interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PagingParameterInterface} from "../../../models/paging.parameter.interface";
import {ResponseInterface} from "../../../models/response.interface";
import {PagingResponseInterface} from "../../../models/paging.response.interface";
import {Sort} from "@angular/material/sort";
import {FormatoDigiUnoInterface} from "../../../models/formato-digi-uno-interface";
import {ConvocatoriaInterface} from "../../../models/convocatoria.interface";
import {DialogConfirmComponent} from "../../../common/dialog-confirm/dialog-confirm.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-formato-digi-dos',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    CommonCoreuiModule
  ],
  templateUrl: './formato-digi-dos.component.html',
  styleUrl: './formato-digi-dos.component.scss'
})
export class FormatoDigiDosComponent implements OnInit, AfterViewInit{

  role: number = 0
  id: number
  registers: FormatoDigiDosInterface[]
  register!: FormatoDigiDosInterface
  formulario: FormGroup

  displayedColumnsFormat: string[] = [
    'id',
    'formatoDIGIUnoTitulo',
    'formatoDIGIUnoConvocatoriaNombre',
    'formatoDIGIUnoConvocatoriaAno',
    'estadoNombre',
    'fechaCreacion',
    'fechaModificacion',
    'options'
  ];

  pageSizeOptions: number[] = [5, 10, 25, 50]

  DATA: FormatoDigiDosInterface[] = [
    {
      id: 0
    }
  ]

  dataSourceFormat = new MatTableDataSource<FormatoDigiDosInterface>(this.DATA)

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator
  paging: PagingParameterInterface

  ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', otro:''},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', otro:''},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', otro:''},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', otro:''},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', otro:''}
  ]

  ELEMENT_DATA1: any[] = [
    {no: '1', nombre: 'Objetivo 1', descripcion: ''},
    {no:'2', nombre:'Objetivo 1', descripcion: ''},
    {no:'3', nombre:'Objetivo 2', descripcion: ''},
    {no:'4', nombre:'Objetivo 3', descripcion: ''},
    {no:'5', nombre:'Objetivo 4', descripcion: ''}
  ]

  ELEMENT_DATA2: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
  ]

  ELEMENT_DATA3: any[] = [
    {no: '1', nombre: 'Objetivo 1', descripcion: ''},
    {no:'2', nombre:'Objetivo 1', descripcion: ''},
    {no:'3', nombre:'Objetivo 2', descripcion: ''},
    {no:'4', nombre:'Objetivo 3', descripcion: ''},
    {no:'5', nombre:'Objetivo 4', descripcion: ''}
  ]

  ELEMENT_DATA4: any[] = [
    {no: '1', nombre: 'Objetivo 1'},
    {no:'2', nombre:'Objetivo 1'},
    {no:'3', nombre:'Objetivo 2'},
    {no:'4', nombre:'Objetivo 3'},
    {no:'5', nombre:'Objetivo 4'}
  ]

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'otro']
  displayedColumns1: string[] = ['no', 'nombre', 'descripcion','opciones']
  displayedColumns2: string[] = ['position', 'name', 'weight', 'opciones']
  displayedColumns3: string[] = ['no', 'nombre', 'descripcion']
  displayedColumns4: string[] = ['no', 'nombre', 'opciones']

  constructor(private dialog: MatDialog,
              private formatoDigiDosService: FormatoDigiDosService,
              private fb: FormBuilder){
    this.role = 1
    this.id = 0
    this.registers = []

    this.paging = {
      globalFilter: '',
      sortField: 'id',
      sortOrder: 0,
      rows: 5,
      first: 0
    }
    this.formulario = this.getForm()
    this.dataSourceFormat = new MatTableDataSource(this.registers)
  }

  ngOnInit(): void {
    this.all()
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

  all(): void {
    this.formatoDigiDosService.all(this.paging)
      .subscribe(
        (resp: ResponseInterface<PagingResponseInterface<any>>): void => {
          this.registers = resp.data.data
          this.dataSourceFormat.data = this.registers
          this.paginator.length = resp.data.totalRows
        }
      )
  }

  getForm():FormGroup{
    return this.fb.group({
      resumen:[''],
      palabraUno:[''],
      palabraDos:[''],
      palabraTres:[''],
      palabraCuatro:[''],
      palabraCinco:[''],
      introduccion:[''],
      contexto:[''],
      revisionLiteratura:[''],
      planteamientoProblema:[''],
      objetivoGeneral:[''],
      siAplicaHipotesis:[false]
    })
  }
  onFilterChange(event: KeyboardEvent): void {
    const filterValue: string = (event.target as HTMLInputElement).value
    this.paging.globalFilter = filterValue.trim().toLowerCase()
    this.paging.rows = this.paginator.pageSize
    this.paging.first = this.paginator.pageIndex
    this.all()
  }

  onCreate() : void {
    this.role = 2
    // const dialogRef: MatDialogRef<ConvocatoriaEditComponent> = this.dialog.open(ConvocatoriaEditComponent,{
    //   width: '30vw',
    //   maxWidth: '30vw',
    //   data: { title: 'Crear convocatoria', role: 1},
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.all()
    // });
  }

  onBack(): void {
    this.role = 1
  }

  onSave():void {
    if(this.formulario.valid){
      console.log("Se valida el formulario")
      if(this.register.id){
        this.formatoDigiDosService.set(this.register.id, this.formulario.value).subscribe(response => {
          if(response.ok){
            console.log("Información guardada.....")
          }
        })
      }
    }
  }

  onFileSelected() {
    // const inputNode: any = document.querySelector('#file');
    //
    // if (typeof (FileReader) !== 'undefined') {
    //   const reader = new FileReader();
    //
    //   reader.onload = (e: any) => {
    //     this.srcResult = e.target.result;
    //   };
    //
    //   reader.readAsArrayBuffer(inputNode.files[0]);
    // }
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

  onEdition(element: FormatoDigiUnoInterface): void{
    // const dialogRef: MatDialogRef<GrupoEditComponent> = this.dialog.open(GrupoEditComponent,{
    //   width: '50vw',
    //   maxWidth: '65vw',
    //   data: { title: 'Editar', role: 2, id: element.id},
    //   disableClose: true
    // })
    // dialogRef.afterClosed().subscribe(result => {
    //   //dialogRef.componentInstance.accept()
    //   this.all()
    // })
    if(element.id){
      this.id = element.id
      this.formatoDigiDosService.get(this.id).subscribe(response => {
        if(response.ok){
          this.register = response.data
          this.formulario.patchValue(this.register)
          this.role = 2
        }
      })
    }
  }

  onDelete(element: ConvocatoriaInterface){
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formatoDigiDosService.del(element.id).subscribe(resp => {
          this.all()
        })
      }
    });
  }
}
