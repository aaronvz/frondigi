import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {TipoInvestigacionInterface} from "../models/tipo-investigacion-interface";
import {AreaConocimientoInterface} from "../models/area-conocimiento-interface";

@Injectable({
  providedIn: 'root'
})
export class AreaConocimientoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<AreaConocimientoInterface[]>>{
    return this.http.get<ResponseInterface<AreaConocimientoInterface[]>>(this.env.HOST_BACKEND + '/api/areaConocimiento')
  }

  public get(id:number):Observable<ResponseInterface<AreaConocimientoInterface>>{
    return this.http.get<ResponseInterface<AreaConocimientoInterface>>(this.env.HOST_BACKEND + '/api/areaConocimiento/'+id)
  }
}
