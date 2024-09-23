import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {PagingParameterInterface} from "../models/paging.parameter.interface";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";
import {ConvocatoriaInterface} from "../models/convocatoria.interface";

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<any>>{
    return this.http.get<ResponseInterface<any>>(this.env.HOST_BACKEND + '/api/convocatoria')
  }

  public all(paging: PagingParameterInterface): Observable<ResponseInterface<PagingResponseInterface<ConvocatoriaInterface>>>{
    const params : HttpParams = new HttpParams()
      .set('first', paging.first)
      .set('rows', paging.rows)
      .set('sortOrder', paging.sortOrder)
      .set('sortField', paging.sortField)
      .set('globalFilter', paging.globalFilter)
    return this.http.get<ResponseInterface<PagingResponseInterface<ConvocatoriaInterface>>>(this.env.HOST_BACKEND + '/api/convocatoria/all', {params: params})
  }

  public add(convocatoria: ConvocatoriaInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/convocatoria', convocatoria)
  }

  public get(id:number):Observable<ResponseInterface<ConvocatoriaInterface>>{
    return this.http.get<ResponseInterface<ConvocatoriaInterface>>(this.env.HOST_BACKEND + '/api/convocatoria/'+id)
  }

  public set(id:number, convocatoria:ConvocatoriaInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/convocatoria/'+id, convocatoria)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/convocatoria/'+id)
  }

}
