import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {HistorialProyectosCoordinadorInterface} from "../models/historial-proyectos-coordinador-interface";

@Injectable({
  providedIn: 'root'
})
export class HistorialProyectosCoordinadorService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(id: number): Observable<ResponseInterface<HistorialProyectosCoordinadorInterface[]>>{
    return this.http.get<ResponseInterface<HistorialProyectosCoordinadorInterface[]>>(this.env.HOST_BACKEND + '/api/historialProyectosCoordinador/all/coordinadorEquipoInvestigacion/' + id)
  }

  public add(historialProyectosCoordinador: HistorialProyectosCoordinadorInterface):Observable<ResponseInterface<number>>{
    return this.http.post<ResponseInterface<number>>(this.env.HOST_BACKEND + '/api/historialProyectosCoordinador', historialProyectosCoordinador)
  }

  public get(id:number):Observable<ResponseInterface<HistorialProyectosCoordinadorInterface>>{
    return this.http.get<ResponseInterface<HistorialProyectosCoordinadorInterface>>(this.env.HOST_BACKEND + '/api/historialProyectosCoordinador/'+id)
  }

  public set(id:number, historialProyectosCoordinador:HistorialProyectosCoordinadorInterface):Observable<ResponseInterface<string>>{
    return this.http.put<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/historialProyectosCoordinador/'+id, historialProyectosCoordinador)
  }

  public del(id:number):Observable<ResponseInterface<string>>{
    return this.http.delete<ResponseInterface<string>>(this.env.HOST_BACKEND + '/api/historialProyectosCoordinador/'+id)
  }
}
