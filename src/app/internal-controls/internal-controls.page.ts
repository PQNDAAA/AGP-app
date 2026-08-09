import { Component, OnInit } from '@angular/core';
import {FormSegment} from "../interface/form-segment";
import {InternalControlEntry, InternalControlEntryDefaultSettings} from "../interface/internal-control-entry";
import {BehaviorSubject, Observable} from "rxjs";
import {InternalControlsService} from "../services/internal-controls-service";

@Component({
  selector: 'app-internal-controls',
  templateUrl: './internal-controls.page.html',
  styleUrls: ['./internal-controls.page.scss'],
  standalone: false
})
export class InternalControlsPage implements OnInit {

  internalControls$: Observable<InternalControlEntry[]>;

  internalControlEntry: InternalControlEntry = InternalControlEntryDefaultSettings;

  segmentList: FormSegment[] = [
    {
      name: 'Tenue de travail réglementaire'
    },
    {
      name: 'Tenue de poste de travail'
    },
    {
      name: 'équipements et matériels'
    },
    {
      name: 'carte professionnelle'
    },
    {
      name: 'Tests et fonct. du pti'
    }
  ];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private icService: InternalControlsService) {
    this.internalControls$ = this.icService.internalControls$;
  }

  ngOnInit() {
  }

  async test(){
    this.icService.addIC(this.internalControlEntry);
    this.internalControlEntry = {...this.internalControlEntry, agentName: ""};
  }

  get numberOfIC(){
    return this.icService.icsLength;
  }

}
