import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild} from '@angular/core';
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
import {ObjetivoEspecificoComponent} from "./objetivo-especifico/objetivo-especifico.component";
import {
  ObjetivoEspecificoVariablesComponent
} from "./objetivo-especifico-variables/objetivo-especifico-variables.component";
import {CronogramaComponent} from "./cronograma/cronograma.component";
import {ObjetivoEspecificoMetodosComponent} from "./objetivo-especifico-metodos/objetivo-especifico-metodos.component";
import {
  EstrategiaDifusionDivulgacionComponent
} from "./estrategia-difusion-divulgacion/estrategia-difusion-divulgacion.component";
import {ReferenciaApaComponent} from "./referencia-apa/referencia-apa.component";
import {BeneficiarioComponent} from "./beneficiario/beneficiario.component";
import {forkJoin} from "rxjs";
import {AlcanceService} from "../../../services/alcance.service";
import {EnfoqueService} from "../../../services/enfoque.service";
import {AlcanceInterface} from "../../../models/alcance-interface";
import {EnfoqueInterface} from "../../../models/enfoque-interface";
import {MatRadioChange} from "@angular/material/radio";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-formato-digi-dos',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    CommonCoreuiModule,
    ObjetivoEspecificoComponent,
    ObjetivoEspecificoVariablesComponent,
    CronogramaComponent,
    ObjetivoEspecificoMetodosComponent,
    EstrategiaDifusionDivulgacionComponent,
    ReferenciaApaComponent,
    BeneficiarioComponent
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
  alcances: AlcanceInterface[] = []
  enfoques: EnfoqueInterface[] = []
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild('referenciaObjetivoEspecificoVariables', { static: false }) childObjetivoEspecificoVariable!: ObjetivoEspecificoVariablesComponent;
  @ViewChild('referenciaObjetivoEspecificoMetodos', { static: false }) childObjetivoEspecificoMetodos!: ObjetivoEspecificoMetodosComponent;

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'otro']

  constructor(private dialog: MatDialog,
              private formatoDigiDosService: FormatoDigiDosService,
              private alacanceService: AlcanceService,
              private enfoqueService: EnfoqueService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef){
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


  onNgIfChange() {
    // Fuerza la detección de cambios
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.all()
  }

  onSelectionChange(evento: MatRadioChange){
    this.onNgIfChange();
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };

    this.onNgIfChange();
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

  getCatalogos(): void {
    forkJoin([
      this.alacanceService.getAll(),
      this.enfoqueService.getAll()
     ]).subscribe(([
        elementA,
        elementE
     ]) => {
      if(elementA.ok && elementE.ok){
        this.enfoques = elementE.data
        this.alcances = elementA.data
      }
    })
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
      alcanceId:[],
      alcanceDescripcion:[],
      enfoqueId:[],
      tecnicas:[],
      procesamientoAnalisis:[],
      aspectosEticos:[],
      vinculacionActoresOtrasInstituciones:[],
      proteccionIntelectual:[],
      contribucionPropuesta:[],

      siAplicaHipotesis:[false],
      hipotesisDescripcion:[],

      enfoqueDisenoId:[],
      enfoqueOpcionId:[],
      enfoqueOpcionNivelDosId:[],
      enfoqueOpcionNivelTresId:[],
      cuantitativoExperimentalDescripcion:[],
      cualitativoDescripcion:[],
      mixtoExperimentalDescripcion:[],
      mixtoCualitativoDescripcion:[],

      tipoMuestraId:[],
      tecnicaMuestraId:[],
      muestraDescripcion:[],
      noProbabilisticoDescripcion:[],
      muestraPoblacion:[],
      muestraNivelConfianza:[],
      muestraMargenError:[],
      muestraMinima:[]

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
            this.openSnackBar()
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
          this.getCatalogos()
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

  actualizarObjetivos():void{
    this.childObjetivoEspecificoVariable.all()
    this.childObjetivoEspecificoMetodos.all()
  }

  openSnackBar() {
    this._snackBar.open('La información se grabo', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1 * 1000,
    });
  }
}
