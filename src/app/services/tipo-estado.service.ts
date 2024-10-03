import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {TipoEstadoInterface} from "../models/tipo-estado-interface";

@Injectable({
  providedIn: 'root'
})
export class TipoEstadoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(): Observable<ResponseInterface<TipoEstadoInterface[]>>{
    return this.http.get<ResponseInterface<TipoEstadoInterface[]>>(this.env.HOST_BACKEND + '/api/tipoEstado')
  }

  public get(id:number):Observable<ResponseInterface<TipoEstadoInterface>>{
    return this.http.get<ResponseInterface<TipoEstadoInterface>>(this.env.HOST_BACKEND + '/api/tipoEstado/'+id)
  }

}
