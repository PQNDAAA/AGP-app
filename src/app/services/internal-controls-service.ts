import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {InternalControlEntry} from "../interface/internal-control-entry";
import {Api} from "./api/api";
import {formSegmentDefaultSettings} from "../interface/form-segment";
import {UtilsService} from "./utils/utils-service";

@Injectable({
  providedIn: 'root',
})
export class InternalControlsService {

  internalControls: InternalControlEntry[] = [];

  private internalControlsSubject = new BehaviorSubject<InternalControlEntry[]>([]);

  internalControls$ = this.internalControlsSubject.asObservable();

  private api = inject(Api);
  private utilsService = inject(UtilsService);

  constructor() {}

  async initInternalControls() {
    console.log("Initial Controls Initialized...");
    await this.getInternalControls();
    this.refreshIC();
  }

  async getInternalControls() {
    try {
      const response = await firstValueFrom(this.api.getInternalControls());
      const data = JSON.stringify(response);
      const parse = JSON.parse(data);

      const newInternalControls: InternalControlEntry[] = [];

      for (const internalControl of parse) {
        const newFormSegment = structuredClone(formSegmentDefaultSettings.map(segment =>
          ({...segment, value: internalControl[segment.name]})));

        const targetInternalControl: InternalControlEntry = {
          id: internalControl.id,
          entryDate: internalControl.entrydate,
          entryDateDisplay: this.utilsService.convertISOtoLocaleDateString(internalControl.entrydate),
          agentName: internalControl.agentname,
          domainName: internalControl.domainname,
          booleans: newFormSegment,
          comment: internalControl.comment,
          professionalCardNumber: internalControl.professionalcardnumber,
        };
        console.log(internalControl);
        newInternalControls.push(targetInternalControl);
      }
      this.internalControls = newInternalControls;
    } catch (e) {
      console.error(e);
    }
  }


  async addInternalControl(internalControl: InternalControlEntry) {
    const {entryDateDisplay, ...payload} = internalControl; // VA SUPPRIMER LA VALEUR (entryDateDisplay) D'UN OBJET ET RECREER UNE INSTANCE

    const booleansPayload = payload.booleans.map(({id,displayName, ...segment}) => segment); //ON VA EXCLURE (id, displayName) PUIS GARDER TOUT CE QUIL RESTE (...segment) EN VALEUR
    const booleans = Object.fromEntries(booleansPayload.map(({name, value}) => [name, value])); //VOIR DOCUMENTATION POUR FROMENTRIES

    try{
      const response = await firstValueFrom(this.api.addInternalControl({
        entrydate: payload.entryDate,
        agentname: payload.agentName,
        domainname:payload.domainName,
        requiredworkuniform: booleans["requiredworkuniform"],
        workstationuniform: booleans["workstationuniform"],
        equipmentmaterials: booleans["equipmentmaterials"],
        professionalcard: booleans["professionalcard"],
        ptiisworking: booleans["ptiisworking"],
        comment: payload.comment,
        professionalcardnumber: payload.professionalCardNumber,
      }));
      console.log(response);

      if(response){
        const data = JSON.stringify(response);
        const parse = JSON.parse(data);

        internalControl.id = parse.id;

        this.internalControls.push(internalControl);
        this.refreshIC();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async deleteInternalControl(target: InternalControlEntry) {
    try {
      if (!target.id) {
        return;
      }

      const response = await firstValueFrom(this.api.deleteInternalControl(target.id));
      console.log(response);

      if(response){
        this.internalControls = this.internalControls.filter(ic => ic.id !== target.id);
        this.refreshIC();
      }
    } catch (e) {
      console.error(e);
    }
  }

  get icsLength() {
    return this.internalControls.length;
  }

  refreshIC() {
    this.internalControlsSubject.next(this.internalControls);
    console.log("Refreshing IC...", this.internalControlsSubject.value);
  }

  deleteIC(internalControl: InternalControlEntry) {
    this.internalControls = this.internalControls.filter(ic => ic !== internalControl);
    this.refreshIC();
  }
}
