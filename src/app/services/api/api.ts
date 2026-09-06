import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = 'https://api.agp-app.fr';
  private http = inject(HttpClient);

  constructor() {}

  getHello(){
    return this.http.get(this.baseUrl);
  }
}
