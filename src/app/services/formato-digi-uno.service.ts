import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {FormatoDigiUnoInterface} from "../models/formato-digi-uno-interface";
import {PagingParameterInterface} from "../models/paging.parameter.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";

@Injectable({
  providedIn: 'root'
})
export class FormatoDigiUnoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(paging: PagingParameterInterface): Observable<ResponseInterface<PagingResponseInterface<FormatoDigiUnoInterface>>>{
    const params : HttpParams = new HttpParams()
      .set('first', paging.first)
      .set('rows', paging.rows)
      .set('sortOrder', paging.sortOrder)
      .set('sortField', paging.sortField)
      .set('globalFilter', paging.globalFilter)
    return this.http.get<ResponseInterface<PagingResponseInterface<FormatoDigiUnoInterface>>>(this.env.HOST_BACKEND + '/api/formatoDIGIUno/all', {params: params})
  }

  public add(formatoDigiUno: FormatoDigiUnoInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/formatoDIGIUno', formatoDigiUno)
  }

  public get(id:number):Observable<ResponseInterface<FormatoDigiUnoInterface>>{
    return this.http.get<ResponseInterface<FormatoDigiUnoInterface>>(this.env.HOST_BACKEND + '/api/formatoDIGIUno/'+id)
  }

  public set(id:number, formatoDigiUno:FormatoDigiUnoInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/formatoDIGIUno/'+id, formatoDigiUno)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/formatoDIGIUno/'+id)
  }

  public generatePdf(convocatoria: number, estado: number): Observable<Blob>{
    const params : HttpParams = new HttpParams()
    return this.http.get(this.env.HOST_BACKEND + `/api/formatoDIGIUno/${convocatoria}/${estado}`, {params: params , responseType: 'blob' })
  }


}
