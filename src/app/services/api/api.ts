import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {InternalControlEntry} from "../../interface/internal-control-entry";
import {Observable} from "rxjs";
import {Response} from "../../interface/response";

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = 'https://api.agp-app.fr';
  private http = inject(HttpClient);

  constructor() {}

   getInternalControls(): Observable<Response>{
    return this.http.get<Response>(`${this.baseUrl}/app/ic`);
  }

  addInternalControl(internalControl: any): Observable<Response>{
    return this.http.post<Response>(`${this.baseUrl}/app/internalControl`, internalControl);
  }

  deleteInternalControl(id : number): Observable<Response>{
    return this.http.delete<Response>(`${this.baseUrl}/app/internalControl/${id}`);
  }

  updateInternalControl(id : number, internalControl: any): Observable<Response>{
    return this.http.put<Response>(`${this.baseUrl}/app/internalControl/${id}`, internalControl);
  }
}
