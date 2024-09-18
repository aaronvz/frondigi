import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {PagingParameterInterface} from "../models/paging.parameter.interface";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";
import {EjeTematicoInterface} from "../models/eje-tematico.interface";

@Injectable({
  providedIn: 'root'
})
export class EjeTematicoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }


  public getAll(convocatoriaId: number): Observable<ResponseInterface<EjeTematicoInterface[]>>{
    return this.http.get<ResponseInterface<EjeTematicoInterface[]>>(this.env.HOST_BACKEND + '/api/ejeTematico/all/convocatoria/' + convocatoriaId)
  }

  public all(paging: PagingParameterInterface, convocatoriaId: number): Observable<ResponseInterface<PagingResponseInterface<EjeTematicoInterface>>>{
    const params : HttpParams = new HttpParams()
      .set('first', paging.first)
      .set('rows', paging.rows)
      .set('sortOrder', paging.sortOrder)
      .set('sortField', paging.sortField)
      .set('globalFilter', paging.globalFilter)
    return this.http.get<ResponseInterface<PagingResponseInterface<EjeTematicoInterface>>>(this.env.HOST_BACKEND + '/api/ejeTematico/all/'+convocatoriaId, {params: params})
  }

  public add(ejeTematico: any):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/ejeTematico', ejeTematico)
  }

  public get(id:number):Observable<ResponseInterface<EjeTematicoInterface>>{
    return this.http.get<ResponseInterface<EjeTematicoInterface>>(this.env.HOST_BACKEND + '/api/ejeTematico/'+id)
  }

  public set(id:number, ejeTematico:any):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/ejeTematico/'+id, ejeTematico)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/ejeTematico/'+id)
  }

}
