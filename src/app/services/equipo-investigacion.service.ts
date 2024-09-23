import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {EquipoInvestigacionInterface} from "../models/equipo-investigacion-interface";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";

@Injectable({
  providedIn: 'root'
})
export class EquipoInvestigacionService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(formatoDIGIUnoId:number): Observable<ResponseInterface<EquipoInvestigacionInterface[]>>{
    return this.http.get<ResponseInterface<EquipoInvestigacionInterface[]>>(this.env.HOST_BACKEND + '/api/equipoInvestigacion/all/formatoDIGIUno/' + formatoDIGIUnoId)
  }

  public add(equipoInvestigacion: EquipoInvestigacionInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/equipoInvestigacion', equipoInvestigacion)
  }

  public get(id:number):Observable<ResponseInterface<EquipoInvestigacionInterface>>{
    return this.http.get<ResponseInterface<EquipoInvestigacionInterface>>(this.env.HOST_BACKEND + '/api/equipoInvestigacion/'+id)
  }

  public set(id:number, equipoInvestigacion:EquipoInvestigacionInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/equipoInvestigacion/'+id, equipoInvestigacion)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/equipoInvestigacion/'+id)
  }
}
