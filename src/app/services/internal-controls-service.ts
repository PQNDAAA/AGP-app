import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {InternalControlEntry} from "../interface/internal-control-entry";
import {Api} from "./api/api";
import {formSegmentDefaultSettings} from "../interface/form-segment";

@Injectable({
  providedIn: 'root',
})
export class InternalControlsService {

  internalControls: InternalControlEntry[] = [];

  private internalControlsSubject = new BehaviorSubject<InternalControlEntry[]>([]);

  internalControls$ = this.internalControlsSubject.asObservable();

  private api =  inject(Api);

  async initInternalControls(){
    console.log("Initial Controls Initialized...");
    this.api.getInternalControls().subscribe(response => {
      const data = JSON.stringify(response);
      const parse = JSON.parse(data);

      const newInternalControls: InternalControlEntry[] = [];

      for(const internalControl of parse){
        const targetInternalControl : InternalControlEntry = {
          entryDate: "",
          entryDateDisplay: "",
          agentName: internalControl.agentname,
          domainName: internalControl.domainname,
          segmentList: formSegmentDefaultSettings,
          comment: internalControl.comment
        };
        newInternalControls.push(targetInternalControl);
      }
      this.internalControls = newInternalControls;
      this.refreshIC();
    });
  }


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


  deleteIC(internalControl: InternalControlEntry){
    this.internalControls = this.internalControls.filter(ic => ic !== internalControl);
    this.refreshIC();
  }

}
