import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {CambioEstadoInterface} from "../models/cambio-estado.interface";

@Injectable({
  providedIn: 'root'
})
export class CambioEstadoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

    private getMultiAcceptHeaders(): HttpHeaders {
        return new HttpHeaders({enctype: 'multipart/form-data', })
    }

  public all(): Observable<ResponseInterface<CambioEstadoInterface[]>>{
    return this.http.get<ResponseInterface<CambioEstadoInterface[]>>(this.env.HOST_BACKEND + '/api/cambioEstado/all')
  }

  public add(cambioEstado: CambioEstadoInterface, file: File):Observable<ResponseInterface<number>>{
    let formData = new FormData();
    formData.append('file', file);
    formData.append('cambioEstadoDtoPost', new Blob([JSON.stringify(cambioEstado)],{type: 'application/json'}),'cambioEstadoDtoPost');
    formData.append('cambioEstadoDtoPost', JSON.stringify(cambioEstado))
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/cambioEstado', formData,)
  }

}
