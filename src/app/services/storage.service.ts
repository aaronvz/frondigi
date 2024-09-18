import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor(private router: Router) {
  }

  setToken(token: string){
    // @ts-ignore
    localStorage.setItem("token",token);
  }

}
