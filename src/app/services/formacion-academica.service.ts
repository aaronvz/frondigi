import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PagingParameterInterface} from "../models/paging.parameter.interface";
import {PagingResponseInterface} from "../models/paging.response.interface";
import {FormacionAcademicaInterface} from "../models/formacion-academica-interface";

@Injectable({
  providedIn: 'root'
})
export class FormacionAcademicaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }


  public getAll(equipoInvestigacionId: number): Observable<ResponseInterface<FormacionAcademicaInterface[]>>{
    return this.http.get<ResponseInterface<FormacionAcademicaInterface[]>>(this.env.HOST_BACKEND + '/api/formacionAcademica/all/equipoInvestigacion/' + equipoInvestigacionId)
  }

  public all(paging: PagingParameterInterface, equipoInvestigacionId: number): Observable<ResponseInterface<PagingResponseInterface<FormacionAcademicaInterface>>>{
    const params : HttpParams = new HttpParams()
      .set('first', paging.first)
      .set('rows', paging.rows)
      .set('sortOrder', paging.sortOrder)
      .set('sortField', paging.sortField)
      .set('globalFilter', paging.globalFilter)
    return this.http.get<ResponseInterface<PagingResponseInterface<FormacionAcademicaInterface>>>(this.env.HOST_BACKEND + '/api/formacionAcademica/all/'+equipoInvestigacionId, {params: params})
  }

  public add(formacionAcademica: any):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/formacionAcademica', formacionAcademica)
  }

  public get(id:number):Observable<ResponseInterface<FormacionAcademicaInterface>>{
    return this.http.get<ResponseInterface<FormacionAcademicaInterface>>(this.env.HOST_BACKEND + '/api/formacionAcademica/'+id)
  }

  public set(id:number, formacionAcademica:any):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/formacionAcademica/'+id, formacionAcademica)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/formacionAcademica/'+id)
  }
}
