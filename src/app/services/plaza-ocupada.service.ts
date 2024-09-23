import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {EjeTematicoInterface} from "../models/eje-tematico.interface";
import {PlazaOcupadaInterface} from "../models/plaza-ocupada-interface";

@Injectable({
  providedIn: 'root'
})
export class PlazaOcupadaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<PlazaOcupadaInterface[]>>{
    return this.http.get<ResponseInterface<PlazaOcupadaInterface[]>>(this.env.HOST_BACKEND + '/api/plazaOcupada')
  }

  public get(id:number):Observable<ResponseInterface<PlazaOcupadaInterface>>{
    return this.http.get<ResponseInterface<PlazaOcupadaInterface>>(this.env.HOST_BACKEND + '/api/plazaOcupada/'+id)
  }

}
