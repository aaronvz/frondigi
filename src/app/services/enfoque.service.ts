import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";
import {Observable} from "rxjs";
import {ResponseInterface} from "../models/response.interface";
import {EtniaInterface} from "../models/etnia-interface";
import {EnfoqueInterface} from "../models/enfoque-interface";

@Injectable({
  providedIn: 'root'
})
export class EnfoqueService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) { }

  public getAll(): Observable<ResponseInterface<EnfoqueInterface[]>>{
    return this.http.get<ResponseInterface<EnfoqueInterface[]>>(this.env.HOST_BACKEND + '/api/enfoque')
  }

  public get(id:number):Observable<ResponseInterface<EnfoqueInterface>>{
    return this.http.get<ResponseInterface<EnfoqueInterface>>(this.env.HOST_BACKEND + '/api/enfoque/'+id)
  }
}
