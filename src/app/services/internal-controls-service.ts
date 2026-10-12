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

  constructor() {
  }

  async initInternalControls() {
    const success = await this.getInternalControls();
    if(!success) return;

    this.refreshIC();
  }

  async getInternalControls() : Promise<boolean> {
    try {
      const response = await firstValueFrom(this.api.getInternalControls());

      const newInternalControls: InternalControlEntry[] = [];

      for (const internalControl of response.data) {
        const newFormSegment = formSegmentDefaultSettings().map(segment =>
          ({...segment, value: internalControl[segment.name]}));

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
        newInternalControls.push(targetInternalControl);
      }
      this.internalControls = newInternalControls;
    } catch (e) {
      console.error('Erreur lors de la récupération des contrôles internes : ', e);
      return false;
    }
    return true;
  }


  async addInternalControl(internalControl: InternalControlEntry) : Promise<boolean> {
    try {
      const convertedInternalControl = this.convertInternalControl(internalControl);
      const response = await firstValueFrom(this.api.addInternalControl(convertedInternalControl));

      internalControl.id = response.data.id;
      this.internalControls.push(internalControl);
      this.refreshIC();

      this.utilsService.createToast('Le contrôle interne a bien été ajouté.', 1500);
    } catch (e) {
      console.error('Erreur lors de l ajout du contrôle interne : ', e);
      return false;
    }
    return true;
  }

  async deleteInternalControl(target: InternalControlEntry): Promise<boolean> {
    try {
      if (!target.id) {
        console.log("ID is undefined or null");
        return false;
      }
      const response = await firstValueFrom(this.api.deleteInternalControl(target.id));

      if(!response.success){
        this.utilsService.createToast(response.message,2000);
      }

      this.internalControls = this.internalControls.filter(ic => ic.id !== target.id);
      this.refreshIC();
    } catch (e) {
      console.error('Erreur lors de la suppression du contrôle interne : ', e);
      return false;
    }
    return true;
  }

  async modifyInternalControl(internalControl: InternalControlEntry) : Promise<boolean> {
    try {
      if (!internalControl.id) {
        console.error("ID is undefined or null");
        return false;
      }
      const convertedInternalControl = this.convertInternalControl(internalControl);
      const response = await firstValueFrom(this.api.updateInternalControl(internalControl.id, convertedInternalControl));

      if(!response.success){
        this.utilsService.createToast(response.message,2000);
        return false;
      }

      this.internalControls = this.internalControls.map(ic => ic.id === internalControl.id ? internalControl : ic);
      this.refreshIC();

      this.utilsService.createToast('Le contrôle interne a bien été modifié.', 1500);
    } catch (e) {
      console.error('Erreur lors de la modification du contrôle interne : ', e);
      return false;
    }
    return true;
  }

  get icsLength() {
    return this.internalControls.length;
  }

  refreshIC() {
    this.internalControlsSubject.next(this.internalControls);
  }

  clearInternalControls() {
    if (this.internalControls.length === 0) {
      return;
    }
    this.internalControls = [];
    this.refreshIC();
  }

  convertInternalControl(internalControl: InternalControlEntry): any {
    const {entryDateDisplay, ...payload} = internalControl; // VA SUPPRIMER LA VALEUR (entryDateDisplay) D'UN OBJET ET RECREER UNE INSTANCE

    const booleansPayload = payload.booleans.map(({id, displayName, ...segment}) => segment); //ON VA EXCLURE (id, displayName) PUIS GARDER TOUT CE QUIL RESTE (...segment) EN VALEUR
    const booleans = Object.fromEntries(booleansPayload.map(({name, value}) => [name, value])); //VOIR DOCUMENTATION POUR FROMENTRIES

    return {
      entrydate: payload.entryDate,
      agentname: payload.agentName,
      domainname: payload.domainName,
      requiredworkuniform: booleans["requiredworkuniform"],
      workstationuniform: booleans["workstationuniform"],
      equipmentmaterials: booleans["equipmentmaterials"],
      professionalcard: booleans["professionalcard"],
      ptiisworking: booleans["ptiisworking"],
      comment: payload.comment,
      professionalcardnumber: payload.professionalCardNumber,
    }
  }
}
