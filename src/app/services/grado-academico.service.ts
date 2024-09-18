import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {TipoInvestigacionInterface} from "../models/tipo-investigacion-interface";
import {GradoAcademicoInterface} from "../models/grado-academico-interface";

@Injectable({
  providedIn: 'root'
})
export class GradoAcademicoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<GradoAcademicoInterface[]>>{
    return this.http.get<ResponseInterface<GradoAcademicoInterface[]>>(this.env.HOST_BACKEND + '/api/gradoAcademico')
  }

  public get(id:number):Observable<ResponseInterface<GradoAcademicoInterface>>{
    return this.http.get<ResponseInterface<GradoAcademicoInterface>>(this.env.HOST_BACKEND + '/api/gradoAcademico/'+id)
  }
}
