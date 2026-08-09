import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InternalControlEntry} from "../interface/internal-control-entry";

@Injectable({
  providedIn: 'root',
})
export class InternalControlsService {

  internalControls: InternalControlEntry[] = [];

  private internalControlsSubject = new BehaviorSubject<InternalControlEntry[]>([]);

  internalControls$ = this.internalControlsSubject.asObservable();


  addIC(internalControl: InternalControlEntry){
    this.internalControls.push(structuredClone(internalControl));
    this.refreshIC();
  }

  get icsLength(){
    return this.internalControls.length;
  }


   refreshIC(){
    this.internalControlsSubject.next(this.internalControls);
    console.log("Refreshing IC...", this.internalControlsSubject.value);
  }

}
