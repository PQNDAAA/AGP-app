import {Component, inject, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {InternalControlEntry} from "../interface/internal-control-entry";
import {InternalControlsAddComponent} from "../internal-controls-add/internal-controls-add.component";

@Component({
  selector: 'app-formulaire-modal',
  templateUrl: './formulaire-modal.component.html',
  styleUrls: ['./formulaire-modal.component.scss'],
  imports: [
    IonicModule,
    InternalControlsAddComponent
  ],
  standalone: true
})
export class FormulaireModalComponent implements OnInit{

  @Input() internalControlEntry!: InternalControlEntry;

  localInternalControlEntry!: InternalControlEntry;

  private modalController = inject(ModalController);

  constructor() {}

  ngOnInit() {
    this.localInternalControlEntry = structuredClone(this.internalControlEntry);
  }


  async dismissModal() {
    await this.modalController.dismiss();
  }

}
