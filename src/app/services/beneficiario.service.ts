import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {BeneficiarioInterface} from "../models/beneficiario-interface";

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(formatoDIGIDosId:number): Observable<ResponseInterface<BeneficiarioInterface[]>>{
    return this.http.get<ResponseInterface<BeneficiarioInterface[]>>(this.env.HOST_BACKEND + '/api/beneficiario/all/formatoDIGIDos/' + formatoDIGIDosId)
  }

  public add(beneficiario: BeneficiarioInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/beneficiario', beneficiario)
  }

  public get(id:number):Observable<ResponseInterface<BeneficiarioInterface>>{
    return this.http.get<ResponseInterface<BeneficiarioInterface>>(this.env.HOST_BACKEND + '/api/beneficiario/'+id)
  }

  public set(id:number, beneficiario:BeneficiarioInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/beneficiario/'+id, beneficiario)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/beneficiario/'+id)
  }
}
