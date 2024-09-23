import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {GeneroInterface} from "../models/genero-interface";

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<GeneroInterface[]>>{
    return this.http.get<ResponseInterface<GeneroInterface[]>>(this.env.HOST_BACKEND + '/api/genero')
  }

  public get(id:number):Observable<ResponseInterface<GeneroInterface>>{
    return this.http.get<ResponseInterface<GeneroInterface>>(this.env.HOST_BACKEND + '/api/genero/'+id)
  }
}
