import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {PuestoMiembroEquipoInterface} from "../models/puesto-miembro-equipo-interface";

@Injectable({
  providedIn: 'root'
})
export class PuestoMiembroEquipoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<PuestoMiembroEquipoInterface[]>>{
    return this.http.get<ResponseInterface<PuestoMiembroEquipoInterface[]>>(this.env.HOST_BACKEND + '/api/puestoMiembroEquipo')
  }

  public get(id:number):Observable<ResponseInterface<PuestoMiembroEquipoInterface>>{
    return this.http.get<ResponseInterface<PuestoMiembroEquipoInterface>>(this.env.HOST_BACKEND + '/api/puestoMiembroEquipo/'+id)
  }
}
