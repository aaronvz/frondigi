import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {PagingParameterInterface} from "../models/paging.parameter.interface";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";
import {UsuarioExternoInterface} from "../models/usuario-externo-interface";

@Injectable({
  providedIn: 'root'
})
export class UsuarioExternoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }


  public all(paging: PagingParameterInterface): Observable<ResponseInterface<PagingResponseInterface<UsuarioExternoInterface>>>{
    const params : HttpParams = new HttpParams()
      .set('first', paging.first)
      .set('rows', paging.rows)
      .set('sortOrder', paging.sortOrder)
      .set('sortField', paging.sortField)
      .set('globalFilter', paging.globalFilter)
    return this.http.get<ResponseInterface<PagingResponseInterface<UsuarioExternoInterface>>>(this.env.HOST_BACKEND + '/api/externos/all', {params: params})
  }

  public add(usuarioExterno: any):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/externos', usuarioExterno)
  }

  public get(id:number):Observable<ResponseInterface<UsuarioExternoInterface>>{
    return this.http.get<ResponseInterface<UsuarioExternoInterface>>(this.env.HOST_BACKEND + '/api/externos/'+id)
  }

  public set(id:number, usuarioExterno:any):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/externos/'+id, usuarioExterno)
  }
}
