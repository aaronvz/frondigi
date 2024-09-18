import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import { LoginInterface } from "../models/login.interface"
import {EnvironmentService} from "./environment.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private env: EnvironmentService) {
  }

  login(user: LoginInterface  ): Observable<any> {
    const params: any = user
    return this.http.post(this.env.HOST_BACKEND + "/api/authenticate",  params ).pipe(
      catchError(error => {
          console.log("Error en login")
          return of([])
        }
      )
    )
  }
}
