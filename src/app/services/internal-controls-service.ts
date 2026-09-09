import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, throwError} from "rxjs";
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
        const targetInternalControl: InternalControlEntry = {
          entrydate: internalControl.entrydate,
          entryDateDisplay: this.utilsService.convertISOtoLocaleDateString(internalControl.entrydate),
          agentname: internalControl.agentname,
          domainname: internalControl.domainname,
          booleans: formSegmentDefaultSettings,
          comment: internalControl.comment
        };
        newInternalControls.push(targetInternalControl);
      }
      this.internalControls = newInternalControls;
    } catch (e) {
      console.error(e);
    }
  }


  async addIC(internalControl: InternalControlEntry) {
    const {entryDateDisplay, ...payload} = internalControl; // VA SUPPRIMER LA VALEUR (entryDateDisplay) D'UN OBJET ET RECREER UNE INSTANCE

    const booleansPayload = payload.booleans.map(({id,displayName, ...segment}) => segment); //ON VA EXCLURE (id, displayName) PUIS GARDER TOUT CE QUIL RESTE (...segment) EN VALEUR
    const booleans = Object.fromEntries(booleansPayload.map(({name, value}) => [name, value])); //VOIR DOCUMENTATION POUR FROMENTRIES

    try{
      const response = await firstValueFrom(this.api.addInternalControl({
        entrydate: payload.entrydate,
        agentname: payload.agentname,
        domainname:payload.domainname,
        requiredworkuniform: booleans["requiredWorkUniform"],
        workstationuniform: booleans["workStationUniform"],
        equipmentmaterials: booleans["equipmentMaterials"],
        professionalcard: booleans["professionalCard"],
        ptiisworking: booleans["ptiIsWorking"],
        comment: payload.comment
      }));
      console.log(response);
    } catch (e) {
      console.error(e);
    }
    this.refreshIC();
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
