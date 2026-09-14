import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {InternalControlEntry} from "../../interface/internal-control-entry";

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = 'https://api.agp-app.fr';
  private http = inject(HttpClient);

  constructor() {}

  getHello(){
    return this.http.get(`${this.baseUrl}`);
  }

   getInternalControls(){
    return this.http.get(`${this.baseUrl}/app/ic`);
  }

  addInternalControl(internalControl: any){
    return this.http.post(`${this.baseUrl}/app/internalControl`, internalControl);
  }

  deleteInternalControl(id : number){
    return this.http.delete(`${this.baseUrl}/app/internalControl/${id}`);
  }
}
