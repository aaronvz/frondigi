import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CommonMaterialModule} from "../../../../common/common-material/common-material.module";
import { CommonCoreuiModule } from "../../../../common/common-coreui/common-coreui.module";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConvocatoriaService} from "../../../../services/convocatoria.service";
import {ConvocatoriaInterface} from "../../../../models/convocatoria.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormatoDigiUnoService} from "../../../../services/formato-digi-uno.service";

@Component({
  selector: 'app-formato-digi-uno-add',
  standalone: true,
    imports: [
        CommonModule,
        CommonMaterialModule,
        CommonCoreuiModule
    ],
  templateUrl: './formato-digi-uno-add.component.html',
  styleUrl: './formato-digi-uno-add.component.scss'
})
export class FormatoDigiUnoAddComponent implements OnInit{

  convocatorias: ConvocatoriaInterface[] = []
  group: FormGroup
  id: number

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<any>,
              private convocatoriaService: ConvocatoriaService,
              private fb: FormBuilder,
              private formatoDIGIUnoService: FormatoDigiUnoService) {
    this.group = this.getForm()
    this.id = 0
  }

  ngOnInit(): void {
    this.convocatoriaService.getAll().subscribe(response=> {
      if(response.ok){
        this.convocatorias = response.data
      }
    })
  }

  getForm():FormGroup{
    return this.fb.group({
      titulo:[''],
      convocatoriaId:['']
    })
  }

  close():void{
    this.dialogRef.close()
  }
  accept():void{
    if(this.group.valid){
      this.formatoDIGIUnoService.add(this.group.value).subscribe(response => {
        if(response.ok){
          this.id = response.data
          this.close()
        }
      })
    }
  }


}
