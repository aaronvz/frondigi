import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {TipoDifusionInterface} from "../models/tipo-difusion-interface";

@Injectable({
  providedIn: 'root'
})
export class TipoDifusionService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<TipoDifusionInterface[]>>{
    return this.http.get<ResponseInterface<TipoDifusionInterface[]>>(this.env.HOST_BACKEND + '/api/tipoDifusion')
  }

  public get(id:number):Observable<ResponseInterface<TipoDifusionInterface>>{
    return this.http.get<ResponseInterface<TipoDifusionInterface>>(this.env.HOST_BACKEND + '/api/tipoDifusion/'+id)
  }
}
