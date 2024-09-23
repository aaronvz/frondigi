import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {EtniaInterface} from "../models/etnia-interface";
import {AlcanceInterface} from "../models/alcance-interface";

@Injectable({
  providedIn: 'root'
})
export class AlcanceService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<AlcanceInterface[]>>{
    return this.http.get<ResponseInterface<AlcanceInterface[]>>(this.env.HOST_BACKEND + '/api/alcance')
  }

  public get(id:number):Observable<ResponseInterface<AlcanceInterface>>{
    return this.http.get<ResponseInterface<AlcanceInterface>>(this.env.HOST_BACKEND + '/api/alcance/'+id)
  }
}
