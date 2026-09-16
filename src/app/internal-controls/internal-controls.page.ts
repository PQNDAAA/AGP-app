import {Component, inject, OnInit} from '@angular/core';
import {
  InternalControlEntry,
  internalControlEntryDefaultSettings,
} from "../interface/internal-control-entry";
import {InternalControlsService} from "../services/internal-controls-service";

@Component({
  selector: 'app-internal-controls',
  templateUrl: './internal-controls.page.html',
  styleUrls: ['./internal-controls.page.scss'],
  standalone: false
})
export class InternalControlsPage {

  internalControlEntry: InternalControlEntry = internalControlEntryDefaultSettings();

  private icService = inject(InternalControlsService);

  constructor() {
  }

// NOM FONCTION A CHANGER
  get numberOfIC() {
    return this.icService.icsLength;
  }
}
