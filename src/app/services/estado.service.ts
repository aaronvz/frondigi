import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {EstadoInterface} from "../models/estado.interface";

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public all(): Observable<ResponseInterface<EstadoInterface[]>>{
    return this.http.get<ResponseInterface<EstadoInterface[]>>(this.env.HOST_BACKEND + '/api/estado/all')
  }

}
