import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {MetaPrioridadNacionalDesarrolloInterface} from "../models/meta-prioridad-nacional-desarrollo-interface";

@Injectable({
  providedIn: 'root'
})
export class MetaPrioridadNacionalDesarrolloService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<MetaPrioridadNacionalDesarrolloInterface[]>>{
    return this.http.get<ResponseInterface<MetaPrioridadNacionalDesarrolloInterface[]>>(this.env.HOST_BACKEND + '/api/metaPrioridadNacionalDesarrollo')
  }
}
