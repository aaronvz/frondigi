import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {TipoInvestigacionInterface} from "../models/tipo-investigacion-interface";

@Injectable({
  providedIn: 'root'
})
export class TipoInvestigacionService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<TipoInvestigacionInterface[]>>{
    return this.http.get<ResponseInterface<TipoInvestigacionInterface[]>>(this.env.HOST_BACKEND + '/api/tipoInvestigacion')
  }

  public get(id:number):Observable<ResponseInterface<TipoInvestigacionInterface>>{
    return this.http.get<ResponseInterface<TipoInvestigacionInterface>>(this.env.HOST_BACKEND + '/api/tipoInvestigacion/'+id)
  }
}
