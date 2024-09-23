import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {ObjetivoEspecificoInterface} from "../models/objetivo-especifico-interface";

@Injectable({
  providedIn: 'root'
})
export class ObjetivoEspecificoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(formatoDIGIDosId:number): Observable<ResponseInterface<ObjetivoEspecificoInterface[]>>{
    return this.http.get<ResponseInterface<ObjetivoEspecificoInterface[]>>(this.env.HOST_BACKEND + '/api/objetivoEspecifico/all/formatoDIGIDos/' + formatoDIGIDosId)
  }

  public add(objetivoEspecifico: ObjetivoEspecificoInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/objetivoEspecifico', objetivoEspecifico)
  }

  public get(id:number):Observable<ResponseInterface<ObjetivoEspecificoInterface>>{
    return this.http.get<ResponseInterface<ObjetivoEspecificoInterface>>(this.env.HOST_BACKEND + '/api/objetivoEspecifico/'+id)
  }

  public set(id:number, objetivoEspecifico:ObjetivoEspecificoInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/objetivoEspecifico/'+id, objetivoEspecifico)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/objetivoEspecifico/'+id)
  }
}
