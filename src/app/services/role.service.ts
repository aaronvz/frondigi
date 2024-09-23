import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EnvironmentService} from "./environment.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient,
              private env: EnvironmentService) {
  }

  public all(){
   return this.http.get<any>(this.env.HOST_BACKEND + '/api/roles')
  }
}
