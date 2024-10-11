import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CommonMaterialModule} from "../../../common/common-material/common-material.module";
import {CommonCoreuiModule} from "../../../common/common-coreui/common-coreui.module";
import {FormatoDigiUnoAddComponent} from "./formato-digi-uno-add/formato-digi-uno-add.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormatoDigiUnoService} from "../../../services/formato-digi-uno.service";
import {FormatoDigiUnoInterface} from "../../../models/formato-digi-uno-interface";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PagingParameterInterface} from "../../../models/paging.parameter.interface";
import {Sort} from "@angular/material/sort";
import {ConvocatoriaInterface} from "../../../models/convocatoria.interface";
import {DialogConfirmComponent} from "../../../common/dialog-confirm/dialog-confirm.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UnidadAcademicaInterface} from "../../../models/unidad-academica-interface";
import {UnidadInvestigacionInterface} from "../../../models/unidad-investigacion-interface";
import { forkJoin } from 'rxjs';
import {UnidadAcademicaService} from "../../../services/unidad-academica.service";
import {UnidadInvestigacionService} from "../../../services/unidad-investigacion.service";
import {MetaPrioridadNacionalDesarrolloService} from "../../../services/meta-prioridad-nacional-desarrollo.service";
import {EjeTematicoService} from "../../../services/eje-tematico.service";
import {MetaPrioridadNacionalDesarrolloInterface} from "../../../models/meta-prioridad-nacional-desarrollo-interface";
import {EjeTematicoInterface} from "../../../models/eje-tematico.interface";
import {AreaConocimientoService} from "../../../services/area-conocimiento.service";
import {TipoInvestigacionService} from "../../../services/tipo-investigacion.service";
import {TipoInvestigacionInterface} from "../../../models/tipo-investigacion-interface";
import {AreaConocimientoInterface} from "../../../models/area-conocimiento-interface";
import {FormacionAcademicaComponent} from "./formacion-academica/formacion-academica.component";
import {PlazaOcupadaInterface} from "../../../models/plaza-ocupada-interface";
import {PlazaOcupadaService} from "../../../services/plaza-ocupada.service";
import {
  HistorialProyectosCoordinadorComponent
} from "./historial-proyectos-coordinador/historial-proyectos-coordinador.component";
import {EquipoInvestigacionComponent} from "./equipo-investigacion/equipo-investigacion.component";
import {DownloadFileService} from "../../../services/download-file.service";
import {NivelTitularidadInterface} from "../../../models/nivel-titularidad-interface";
import {NivelTitularidadService} from "../../../services/nivel-titularidad.service";
import { ConvocatoriaService } from 'src/app/services/convocatoria.service';
import { CambioEstadoService } from 'src/app/services/cambio-estado.service';
import { TipoEstadoService } from 'src/app/services/tipo-estado.service';
import { TipoEstadoInterface } from 'src/app/models/tipo-estado-interface';
import {CondicionesComponent} from "./condiciones/condiciones.component";
import { CambiarEstadoComponent } from './cambiar-estado/cambiar-estado.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import { sortedUniq } from 'lodash-es';

@Component({
  selector: 'app-formato-digi-uno',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    CommonCoreuiModule,
    FormacionAcademicaComponent,
    HistorialProyectosCoordinadorComponent,
    EquipoInvestigacionComponent
  ],
  templateUrl: './formato-digi-uno.component.html',
  styleUrl: './formato-digi-uno.component.scss'
})
export class FormatoDigiUnoComponent implements OnInit, AfterViewInit{
  role: number = 0
  id: number
  registers: FormatoDigiUnoInterface[] = []
  register!: FormatoDigiUnoInterface
  paging: PagingParameterInterface
  formulario: FormGroup
  reporteProyectoForm: FormGroup
  acepta: boolean
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  unidadesAcademicas: UnidadAcademicaInterface[] = []
  unidadesInvestigacion: UnidadInvestigacionInterface[] = []
  metasPrioridadNacionalDesarrollo: MetaPrioridadNacionalDesarrolloInterface[] = []
  ejesTematicos: EjeTematicoInterface[] = []
  tiposInvestigacion: TipoInvestigacionInterface[] = []
  areasConocimiento: AreaConocimientoInterface[] = []
  plazasOcupadas: PlazaOcupadaInterface[] = []
  nivelesTitularidad: NivelTitularidadInterface[] = []
  anosConvocatorias: any[] = []
  convocatorias: any = {}
  convocatoriasByAno: any[] = []

  displayedColumnsFormat: string[] = [
    'id',
    'titulo',
    'convocatoriaNombre',
    'convocatoriaAno',
    'estadoNombre',
    'fechaCreacion',
    'fechaModificacion',
    'options'
  ]

  displayedColumnsFormatLog: string[] = [
    'fechaHora',
    'idUsuario',
    'estadoNombre',
    'estadoTipoEstadoId',
    'observacion',
    'archivo',
  ]

  pageSizeOptions: number[] = [5, 10, 25, 50]

  DATA: FormatoDigiUnoInterface[] = [
    {
      id: 0,
      unidadAcademicaId:0,
      unidadInvestigacionId:0
    }
  ]

  dataSourceFormat = new MatTableDataSource<FormatoDigiUnoInterface>(this.DATA)

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator

  ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
  ]

  etapas: TipoEstadoInterface[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns2: string[] = ['position', 'name', 'field0', 'weight', 'symbol','field1','field2'];

  dataSource = this.ELEMENT_DATA;

  ngOnInit(): void {
    this.all()
    this.formulario.get('unidadAcademicaId')?.valueChanges.subscribe( value => {
      this.unidadInvestifacionService.all(value).subscribe(element => {
        if(element.ok){
          this.unidadesInvestigacion = element.data;
        }
      })
    })
  }

  getCatalogs(): void{
    if(this.register.convocatoriaId){
      forkJoin([
        this.unidadAcademicaService.all(),
        //this.unidadInvestifacionService.all(),
        this.metaPrioridadNacionalDesarrolloService.getAll(),
        this.ejeTematicoService.getAll(this.register.convocatoriaId),
        this.tipoInvestigacionService.getAll(),
        this.areaConocimientoService.getAll(),
        this.plazaOcupadaService.getAll(),
        this.nivelTitularidadService.all(),
      ]).subscribe(([elementUa,
                      //elementUi,
                      elementPnd,
                      elementEt ,
                      elementTi,
                      elementAc,
                      elementPo,
                      elementNt])=> {
        if(/*elementUi.ok &&*/ elementUa.ok && elementPnd.ok && elementEt.ok && elementTi.ok && elementAc.ok && elementPo.ok && elementNt.ok){
          //this.unidadesInvestigacion = elementUi.data
          this.unidadesAcademicas = elementUa.data
          this.metasPrioridadNacionalDesarrollo = elementPnd.data
          this.ejesTematicos = elementEt.data
          this.areasConocimiento = elementAc.data
          this.tiposInvestigacion = elementTi.data
          this.plazasOcupadas = elementPo.data
          this.nivelesTitularidad = elementNt.data
          this.doCalcular()
        }
      })
    }
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

  constructor(private dialog: MatDialog,
              private formatoDigiUnoService: FormatoDigiUnoService,
              private unidadAcademicaService: UnidadAcademicaService,
              private unidadInvestifacionService: UnidadInvestigacionService,
              private metaPrioridadNacionalDesarrolloService: MetaPrioridadNacionalDesarrolloService,
              private ejeTematicoService: EjeTematicoService,
              private areaConocimientoService: AreaConocimientoService,
              private tipoInvestigacionService: TipoInvestigacionService,
              private plazaOcupadaService: PlazaOcupadaService,
              private downloadFileService: DownloadFileService,
              private nivelTitularidadService: NivelTitularidadService,
              private convocatoriaService: ConvocatoriaService,
              private tipoEstadoService: TipoEstadoService,
              private cambioEstadoService: CambioEstadoService,
              private fb: FormBuilder) {
    this.role = 1
    this.id = 0
    this.paging = {
      globalFilter: '',
      sortField: 'id',
      sortOrder: 0,
      rows: 5,
      first: 0
    }
    this.dataSourceFormat = new MatTableDataSource(this.registers)
    this.formulario = this.getForm()
    this.reporteProyectoForm= this.getReporteProyectoForm()
    this.acepta = false
  }


  all(): void {
    forkJoin([
      this.formatoDigiUnoService.all(this.paging),
      this.convocatoriaService.getAll(),
      this.tipoEstadoService.all(),
    ]).subscribe(([
      elementFdu,
      elementC,
      elementTe
    ]) =>{
      if(elementFdu.ok && elementC.ok && elementTe.ok){
        //  Getting formato DIGI-1
        this.registers = elementFdu.data.data
        this.dataSourceFormat.data = this.registers
        this.paginator.length = elementFdu.data.totalRows

        //  Setting Convocatorias
        elementC.data.forEach((convocatoria: any)=>{
          if(!this.convocatorias[convocatoria.ano]){
            this.anosConvocatorias.push(convocatoria.ano);
            this.convocatorias[convocatoria.ano] = [convocatoria];
          } else {
            this.convocatorias[convocatoria.ano] = [...this.convocatorias[convocatoria.ano], convocatoria];
          }
        })

        this.etapas = elementTe.data
      }
    })
    /*
    this.formatoDigiUnoService.all(this.paging)
      .subscribe(
        (resp: ResponseInterface<PagingResponseInterface<any>>): void => {
          this.registers = resp.data.data
          this.dataSourceFormat.data = this.registers
          this.paginator.length = resp.data.totalRows
        }
      )*/
  }

  anoSelected(ano: any) {
    this.convocatoriasByAno = this.convocatorias[ano];
    this.reporteProyectoForm.controls['convocatoria'].setValue('');
    this.reporteProyectoForm.controls['etapa'].setValue(null);
  }

  convocatoriaSelected(ano: any) {
    this.reporteProyectoForm.controls['etapa'].setValue(null);
  }

  getForm():FormGroup{
    return this.fb.group({
      montoSolicitado:[],
      unidadInvestigacionId:[],
      unidadAcademicaId:[],
      fechaInicio:[],
      fechaFin:[],
      metaPrioridadNacionalDesarrolloId: [],
      ejeTematicoId:[],
      areaConocimientoId:[],
      tipoInvestigacionId:[],
      coordinadorNombres:[],
      coordinadorApellidos:[],
      coordinadorOrcid:[],
      coordinadorGoogleAcademico:[],
      coordinadorEspecialidadExperiencia:[],
      coordinadorUnidadAcademicaId:[],
      coordinadorPlazaOcupaId:[],

      coordinadorNivelTitularidadId:[],

      coordinadorEntidadesOtrasContratos:[],
      coordinadorHaCoordinadoInvestigacionesCofinanciadas:[],
      coordinadorActualmenteEjecutaInvestigacion:[],
      coordinadorHorasContratadas:[],
      coordinadorHorasSolicitadas:[],
      aceptaCondiciones:[],
      dias:[{disabled: true}],

      coordinadorUbicacionFormatoAvalAutorizado:[],
      coordinadorUbicacionCurriculumVitae:[],
      coordinadorUbicacionInvestigacionesCofinanciadas:[],
      coordinadorUbicacionEjecutandoInvestigacion:[],
      coordinadorUbicacionDeclaracionJuradaCargos:[],
      coordinadorUbicacionAvalComiteEtica:[],
      coordinadorUbicacionSolvenciaProfesionalIDAEH:[],
      coordinadorUbicacionReporteSoftwareCoincidencias:[],
      coordinadorUbicacionFormatoDIGITres:[],

      titulo:[]

    })
  }

  getReporteProyectoForm():FormGroup{
    return this.fb.group({
      ano: ['', Validators.required],
      convocatoria: ['', Validators.required],
      etapa: ['', Validators.required]
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
    const dialogRef: MatDialogRef<FormatoDigiUnoAddComponent> = this.dialog.open(FormatoDigiUnoAddComponent,{
      width: '40vw',
      maxWidth: '40vw',
      data: { title: 'Postularse', role: 1},
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe(result => {
      this.id = dialogRef.componentInstance.id
      if(this.id > 0){
        this.formatoDigiUnoService.get(this.id).subscribe(response => {
          if(response.ok){
            this.register = response.data;
            this.getCatalogs()
            this.role = 2
          }else{
            this.all()
          }
        })
      }
    })
  }

  onBack(): void {
    this.role = 1
    this.all()
  }

  onFileSelected(event: Event, nombre: string) {

    console.log('Seleccion del archivo')
    const inputNode = event.target as HTMLInputElement;
    let archivoBase64: string

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = () => {
        archivoBase64 = reader.result as string
        this.formulario.get(nombre)?.setValue(archivoBase64)
      };

      reader.onerror = (error) => {
        console.error('Error al convertir el archivo a Base64:', error);
      };

      if(inputNode.files && inputNode.files.length > 0){
        reader.readAsDataURL(inputNode.files[0]);
        inputNode.value = ''
        //reader.readAsArrayBuffer(inputNode.files[0]);
      }
    }
  }

  generarPdf(){
    if(this.reporteProyectoForm.valid){
      const idConvocatoria = this.reporteProyectoForm.value['convocatoria'];
      const etapa = this.reporteProyectoForm.value['etapa'];
      this.formatoDigiUnoService.generatePdf(idConvocatoria, etapa).subscribe(
        (blob) => {
          const url = window.URL.createObjectURL(blob);
          window.open(url);
          window.URL.revokeObjectURL(url);
        })
    }
  }

  onFileDownload(nombre: string): void{
    let ordinal: number = 0
    switch(nombre){
      case 'coordinadorUbicacionFormatoAvalAutorizado':{
        ordinal = 1;
        break;
      }
      case 'coordinadorUbicacionCurriculumVitae':{
        ordinal = 2;
        break;
      }
      case 'coordinadorUbicacionInvestigacionesCofinanciadas':{
        ordinal = 3;
        break;
      }
      case 'coordinadorUbicacionEjecutandoInvestigacion':{
        ordinal = 4;
        break;
      }
      case 'coordinadorUbicacionDeclaracionJuradaCargos':{
        ordinal = 5;
        break;
      }
      case 'coordinadorUbicacionAvalComiteEtica':{
        ordinal = 6;
        break;
      }
      case 'coordinadorUbicacionSolvenciaProfesionalIDAEH':{
        ordinal = 7;
        break;
      }
      case 'coordinadorUbicacionReporteSoftwareCoincidencias':{
        ordinal = 8;
        break;
      }
      case 'coordinadorUbicacionFormatoDIGITres':{
        ordinal = 9;
        break;
      }
    }
    this.downloadFileService.downloadFile(this.register.coordinadorId ?? 0, ordinal).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        window.URL.revokeObjectURL(url);
      }
    )
  }

  
  
  Report():void{
    this.downloadFileService.descargarReporteFormatoDIGIUno(this.id).subscribe(
       (blob ) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        window.URL.revokeObjectURL(url);
      }
    )
  }

  onFileDelete(nombre: string): void{
    if(this.formulario.valid){
      this.formulario.get(nombre)?.setValue('BORRAR')
      this.onSave()
    }
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
    if(element.id){
      this.id = element.id
      this.formatoDigiUnoService.get(this.id).subscribe(response => {
        if(response.ok){
          this.register = response.data
          this.getCatalogs()
          this.formulario.patchValue(this.register)
          this.formulario.get('coordinadorUbicacionFormatoAvalAutorizado')?.setValue(null)
          this.formulario.get('coordinadorUbicacionCurriculumVitae')?.setValue(null)
          this.formulario.get('coordinadorUbicacionInvestigacionesCofinanciadas')?.setValue(null)
          this.formulario.get('coordinadorUbicacionEjecutandoInvestigacion')?.setValue(null)
          this.formulario.get('coordinadorUbicacionDeclaracionJuradaCargos')?.setValue(null)
          this.formulario.get('coordinadorUbicacionAvalComiteEtica')?.setValue(null)
          this.formulario.get('coordinadorUbicacionSolvenciaProfesionalIDAEH')?.setValue(null)
          this.formulario.get('coordinadorUbicacionReporteSoftwareCoincidencias')?.setValue(null)
          this.formulario.get('coordinadorUbicacionFormatoDIGITres')?.setValue(null)
          this.role = 2

          // if(this.register.estadoId == 4 ){
          //   this.formulario.disable()
          //   console.log('Aquí pasa....... disable form')
          // }

        }
      })
    }
  }

  onDelete(element: ConvocatoriaInterface){
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formatoDigiUnoService.del(element.id).subscribe(resp => {
          this.all()
        })
      }
    });
  }

  onSave():void {
    if(this.formulario.valid){
      if(this.register.id){
        this.formatoDigiUnoService.set(this.register.id, this.formulario.value).subscribe(response => {
          if(response.ok){
            this.formatoDigiUnoService.get(this.register.id ?? 0).subscribe(resp => {
              if(resp.ok){
                this.register = resp.data
                this.openSnackBar()
              }
            })
          }
        })
      }
    }
  }

  onChangeState(element: FormatoDigiUnoInterface): void {
    const dialogRef: MatDialogRef<CambiarEstadoComponent> = this.dialog.open(CambiarEstadoComponent,{
      width: '40%',
      data: { title: 'Cambiar Estado', role:2, id: element.id},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.all()
    });
  }

  showProyectoLog(element: FormatoDigiUnoInterface):void{
    this.role = 4;
    this.cambioEstadoService.all().subscribe((response) => {
      console.log(response)
    })
  }

  doCalcular():void{
    try{
      //this.formulario.get('dias')?.disable()
      let dias: number = this.calculateDaysBetween(this.formulario.get('fechaInicio')?.value, this.formulario.get('fechaFin')?.value)
      this.formulario.get("dias")?.setValue(dias)
    }catch (e){
      this.formulario.get("dias")?.setValue(0)
    }
  }

  calculateDaysBetween(startDate: string, endDate: string): number {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const yearsDifference = date2.getFullYear() - date1.getFullYear();
    const monthsDifference = date2.getMonth() - date1.getMonth();

    return (yearsDifference * 12) + monthsDifference;
  }

  onFinalizar():void{
    const dialogRef: MatDialogRef<CondicionesComponent> = this.dialog.open(CondicionesComponent,{
      width: '40vw',
      maxWidth: '40vw',
      data: { title: 'Condiciones', role: 1, id: this.register.id},
      disableClose: true,
    })
    dialogRef.afterClosed().subscribe(result => {
      if(dialogRef.componentInstance.acepta){
        this.formulario.get("aceptaCondiciones")?.setValue(dialogRef.componentInstance.acepta)
        this.onSave()
        this.onBack()
        this.all()
      }else{
        this.formulario.get("aceptaCondiciones")?.setValue(false)
        this.onSave()
        this.onBack()
        this.all()
      }
    })
  }

  openSnackBar() {
    this._snackBar.open('La información se grabo', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1 * 1000,
    });
  }
}
