import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {UnidadAcademicaInterface} from "../models/unidad-academica-interface";

@Injectable({
  providedIn: 'root'
})
export class UnidadAcademicaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(): Observable<ResponseInterface<UnidadAcademicaInterface[]>>{
    return this.http.get<ResponseInterface<UnidadAcademicaInterface[]>>(this.env.HOST_BACKEND + '/api/unidadAcademica')
  }
}
