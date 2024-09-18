import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {UnidadInvestigacionInterface} from "../models/unidad-investigacion-interface";

@Injectable({
  providedIn: 'root'
})
export class UnidadInvestigacionService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(): Observable<ResponseInterface<UnidadInvestigacionInterface[]>>{
    return this.http.get<ResponseInterface<UnidadInvestigacionInterface[]>>(this.env.HOST_BACKEND + '/api/unidadInvestigacion')
  }
}
