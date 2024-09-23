import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {CronogramaInterface} from "../models/cronograma-interface";

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(formatoDIGIDosId:number): Observable<ResponseInterface<CronogramaInterface[]>>{
    return this.http.get<ResponseInterface<CronogramaInterface[]>>(this.env.HOST_BACKEND + '/api/cronograma/all/formatoDIGIDos/' + formatoDIGIDosId)
  }

  public add(cronograma: CronogramaInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/cronograma', cronograma)
  }

  public get(id:number):Observable<ResponseInterface<CronogramaInterface>>{
    return this.http.get<ResponseInterface<CronogramaInterface>>(this.env.HOST_BACKEND + '/api/cronograma/'+id)
  }

  public set(id:number, cronograma:CronogramaInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/cronograma/'+id, cronograma)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/cronograma/'+id)
  }
}
