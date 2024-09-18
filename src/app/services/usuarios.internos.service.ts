import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";
import {UsuarioInternoInterface} from "../models/usuario.interno.interface";
import {PagingParameterInterface} from "../models/paging.parameter.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuariosInternosService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(paging: PagingParameterInterface): Observable<ResponseInterface<PagingResponseInterface<UsuarioInternoInterface>>>{
    const params : HttpParams = new HttpParams()
      .set('first', paging.first)
      .set('rows', paging.rows)
      .set('sortOrder', paging.sortOrder)
      .set('sortField', paging.sortField)
      .set('globalFilter', paging.globalFilter)
    return this.http.get<ResponseInterface<PagingResponseInterface<UsuarioInternoInterface>>>(this.env.HOST_BACKEND + '/api/internos/all', {params: params})
  }

}
