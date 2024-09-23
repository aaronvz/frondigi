import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {EstrategiaDifusionDivulgacionInterface} from "../models/estrategia-difusion-divulgacion-interface";

@Injectable({
  providedIn: 'root'
})
export class EstrategiaDifusionDivulgacionService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(formatoDIGIDosId:number): Observable<ResponseInterface<EstrategiaDifusionDivulgacionInterface[]>>{
    return this.http.get<ResponseInterface<EstrategiaDifusionDivulgacionInterface[]>>(this.env.HOST_BACKEND + '/api/estrategiaDifusionDivulgacion/all/formatoDIGIDos/' + formatoDIGIDosId)
  }

  public add(estrategiaDifusionDivulgacion: EstrategiaDifusionDivulgacionInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/estrategiaDifusionDivulgacion', estrategiaDifusionDivulgacion)
  }

  public get(id:number):Observable<ResponseInterface<EstrategiaDifusionDivulgacionInterface>>{
    return this.http.get<ResponseInterface<EstrategiaDifusionDivulgacionInterface>>(this.env.HOST_BACKEND + '/api/estrategiaDifusionDivulgacion/'+id)
  }

  public set(id:number, estrategiaDifusionDivulgacion:EstrategiaDifusionDivulgacionInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/estrategiaDifusionDivulgacion/'+id, estrategiaDifusionDivulgacion)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/estrategiaDifusionDivulgacion/'+id)
  }
}
