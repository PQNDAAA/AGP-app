import { Component, OnInit } from '@angular/core';
import {FormSegment, formSegmentDefaultSettings} from "../interface/form-segment";
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

  segmentList: FormSegment[] = formSegmentDefaultSettings;

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

  segmentChange(e: any, id: number) {
    const value = e.target.value;
    const currentFormSegment = this.internalControlEntry.segmentList;
    const targetFormSegment = currentFormSegment.find(segment => segment.id === id);

    if (!targetFormSegment) return;

    const index = currentFormSegment.indexOf(targetFormSegment);
    targetFormSegment.value = value;
    currentFormSegment[index] = targetFormSegment;
    this.internalControlEntry.segmentList = currentFormSegment;
    console.log(currentFormSegment);
    console.log("Ion segment n°" + id, value);
  }

  get numberOfIC(){
    return this.icService.icsLength;
  }

}
