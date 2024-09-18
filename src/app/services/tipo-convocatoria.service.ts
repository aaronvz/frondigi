import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {PagingParameterInterface} from "../models/paging.parameter.interface";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";
import {ConvocatoriaInterface} from  "../models/convocatoria.interface";
import {TipoConvocatoriaInterface} from "../models/tipo-convocatoria.interface";

@Injectable({
  providedIn: 'root'
})
export class TipoConvocatoriaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(): Observable<ResponseInterface<TipoConvocatoriaInterface[]>>{
    return this.http.get<ResponseInterface<TipoConvocatoriaInterface[]>>(this.env.HOST_BACKEND + '/api/tipoConvocatoria')
  }

}
