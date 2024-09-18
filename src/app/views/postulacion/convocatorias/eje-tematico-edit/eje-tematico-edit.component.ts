import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule } from "../../../../common/common-material/common-material.module";
import { CommonCoreuiModule } from "../../../../common/common-coreui/common-coreui.module";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {EjeTematicoInterface} from "../../../../models/eje-tematico.interface";
import {PagingParameterInterface} from "../../../../models/paging.parameter.interface";
import {ResponseInterface} from "../../../../models/response.interface";
import {PagingResponseInterface} from "../../../../models/paging.response.interface";
import {EjeTematicoService} from "../../../../services/eje-tematico.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DialogConfirmComponent} from "../../../../common/dialog-confirm/dialog-confirm.component";

@Component({
  selector: 'app-eje-tematico-edit',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    CommonCoreuiModule
  ],
  templateUrl: './eje-tematico-edit.component.html',
  styleUrl: './eje-tematico-edit.component.scss'
})
export class EjeTematicoEditComponent implements OnInit{
  role: number = 1
  register: EjeTematicoInterface
  registers: EjeTematicoInterface[] = []
  paging: PagingParameterInterface
  displayedColumns: string[] = [
    'id',
    'nombre',
    'options'
  ];
  pageSizeOptions: number[] = [3]
  group: FormGroup
  DATA: any[] = [
    {
      id: 0,
      nombre: '',
      convocatoriaId: 0
    }
  ]
  dataSource = new MatTableDataSource<any>(this.DATA)

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator

  ngOnInit(): void {
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        const start = page * pageSize + 1;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} de ${length}`;
      };
  }

  public constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                     public dialogRef: MatDialogRef<EjeTematicoEditComponent>,
                     private fb: FormBuilder,
                     private dialog: MatDialog,
                     private ejeTematicoService: EjeTematicoService){
    this.paging = {
      globalFilter: '',
      sortField: 'id',
      sortOrder: 2,
      rows: 3,
      first: 0
    }
    this.dataSource = new MatTableDataSource(this.registers)
    this.group = this.getForm()
    this.all()
    this.register =  {
      id: 0,
      nombre: '',
      convocatoriaId: 0
    }
  }

  all(): void{
    this.ejeTematicoService.all(this.paging, this.data.id)
      .subscribe(
        (resp: ResponseInterface<PagingResponseInterface<any>>): void => {
          this.registers = resp.data.data
          this.dataSource.data = this.registers
          this.paginator.length = resp.data.totalRows
        }
      )
  }

  getForm():FormGroup{
    return this.fb.group({
      nombre:[]
    })
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

  close(): void {
    this.dialogRef.close();
  }

  accept(): void {
    if(this.group.valid){
      this.dialogRef.close();
      console.log("Ejecutar procedimiento.")
    }
  }

  onCreate():void{
    if(this.group.valid){
      const value  = {
        convocatoriaId: this.data.id,
        nombre: this.group.get('nombre')?.value
      }
      this.ejeTematicoService.add(value).subscribe(result =>{
        this.all()
        this.group.patchValue({nombre:''})
      })
    }
  }

  onUpdate(): void{
    const put = {
      nombre: this.group.get('nombre')?.value,
      convocatoriaId: this.data.id
    }
    this.ejeTematicoService.set(this.register.id, put).subscribe(result =>{
      this.role = 1
      this.group.patchValue({nombre:''})
      this.all()
    })
  }

  onCancel(): void{
    this.role = 1
    this.group.patchValue({nombre:''})
  }

  onEdit(element:EjeTematicoInterface):void{
    this.ejeTematicoService.get(element.id).subscribe(result =>{
      this.register = result.data
      this.group.patchValue({nombre: this.register.nombre})
      this.role = 2
    })
  }

  onDelete(element:EjeTematicoInterface):void{
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ejeTematicoService.del(element.id).subscribe(resp=> {
          this.all()
        })
      }
    })
  }

}
