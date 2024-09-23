import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {EtniaInterface} from "../models/etnia-interface";

@Injectable({
  providedIn: 'root'
})
export class EtniaService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<EtniaInterface[]>>{
    return this.http.get<ResponseInterface<EtniaInterface[]>>(this.env.HOST_BACKEND + '/api/etnia')
  }

  public get(id:number):Observable<ResponseInterface<EtniaInterface>>{
    return this.http.get<ResponseInterface<EtniaInterface>>(this.env.HOST_BACKEND + '/api/etnia/'+id)
  }
}
