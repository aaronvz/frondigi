import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {MiembroEquipoInvestigacionInterface} from "../models/miembro-equipo-investigacion-interface";

@Injectable({
  providedIn: 'root'
})
export class MiembroEquipoInvestigacionService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(formatoDIGIUnoId:number): Observable<ResponseInterface<MiembroEquipoInvestigacionInterface[]>>{
    return this.http.get<ResponseInterface<MiembroEquipoInvestigacionInterface[]>>(this.env.HOST_BACKEND + '/api/miembroEquipoInvestigacion/all/formatoDIGIUno/' + formatoDIGIUnoId)
  }

  public add(miembroEquipoInvestigacion: MiembroEquipoInvestigacionInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/miembroEquipoInvestigacion', miembroEquipoInvestigacion)
  }

  public get(id:number):Observable<ResponseInterface<MiembroEquipoInvestigacionInterface>>{
    return this.http.get<ResponseInterface<MiembroEquipoInvestigacionInterface>>(this.env.HOST_BACKEND + '/api/miembroEquipoInvestigacion/'+id)
  }

  public set(id:number, miembroEquipoInvestigacion:MiembroEquipoInvestigacionInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/miembroEquipoInvestigacion/'+id, miembroEquipoInvestigacion)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/miembroEquipoInvestigacion/'+id)
  }
}
