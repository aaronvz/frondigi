import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {PagingParameterInterface} from "../models/paging.parameter.interface";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";
import { FormatoDigiDosInterface } from "../models/formato-digi-dos-interface";

@Injectable({
  providedIn: 'root'
})
export class FormatoDigiDosService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(paging: PagingParameterInterface): Observable<ResponseInterface<PagingResponseInterface<FormatoDigiDosInterface>>>{
    const params : HttpParams = new HttpParams()
      .set('first', paging.first)
      .set('rows', paging.rows)
      .set('sortOrder', paging.sortOrder)
      .set('sortField', paging.sortField)
      .set('globalFilter', paging.globalFilter)
    return this.http.get<ResponseInterface<PagingResponseInterface<FormatoDigiDosInterface>>>(this.env.HOST_BACKEND + '/api/formatoDIGIDos/all', {params: params})
  }

  public add(formatoDigiUno: FormatoDigiDosInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/formatoDIGIDos', formatoDigiUno)
  }

  public get(id:number):Observable<ResponseInterface<FormatoDigiDosInterface>>{
    return this.http.get<ResponseInterface<FormatoDigiDosInterface>>(this.env.HOST_BACKEND + '/api/formatoDIGIDos/'+id)
  }

  public set(id:number, formatoDigiUno:FormatoDigiDosInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/formatoDIGIDos/'+id, formatoDigiUno)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/formatoDIGIDos/'+id)
  }
}
