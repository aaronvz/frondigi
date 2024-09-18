import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  public readonly HOST_BACKEND: string = 'http://localhost:8080/sigi';
}
