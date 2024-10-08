import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {ConvocatoriaInterface} from "../models/convocatoria.interface";

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }


  public get(id:number):Observable<ResponseInterface<ConvocatoriaInterface>>{
    return this.http.get<ResponseInterface<ConvocatoriaInterface>>(this.env.HOST_BACKEND + '/api/coordinadorEquipoInvestigacion/'+id)
  }

  // @ts-ignore
  downloadFile(id: number, ordinalFile: number): Observable<Blob> {
    return this.http.get(this.env.HOST_BACKEND + '/api/coordinadorEquipoInvestigacion/'+ id + '/archivo/' + ordinalFile , { responseType: 'blob' });
  }

  descargarReporteFormatoDIGIUno(id: number): Observable<Blob> {
    return this.http.get(this.env.HOST_BACKEND + '/api/formatoDIGIUno/reporte/' + id, { responseType: 'blob' })
  }

  descargarReporteFormatoDIGIDos(id: number): Observable<Blob> {
    return this.http.get(this.env.HOST_BACKEND + '/api/formatoDIGIDos/reporte/' + id, { responseType: 'blob' })
  }

}
