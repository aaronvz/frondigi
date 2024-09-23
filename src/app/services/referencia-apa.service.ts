import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {ReferenciaApaInterface} from "../models/referencia-apa-interface";

@Injectable({
  providedIn: 'root'
})
export class ReferenciaApaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(formatoDIGIDosId:number): Observable<ResponseInterface<ReferenciaApaInterface[]>>{
    return this.http.get<ResponseInterface<ReferenciaApaInterface[]>>(this.env.HOST_BACKEND + '/api/referenciaApa/all/formatoDIGIDos/' + formatoDIGIDosId)
  }

  public add(referenciaApa: ReferenciaApaInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/referenciaApa', referenciaApa)
  }

  public get(id:number):Observable<ResponseInterface<ReferenciaApaInterface>>{
    return this.http.get<ResponseInterface<ReferenciaApaInterface>>(this.env.HOST_BACKEND + '/api/referenciaApa/'+id)
  }

  public set(id:number, referenciaApa:ReferenciaApaInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/referenciaApa/'+id, referenciaApa)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/referenciaApa/'+id)
  }
}
