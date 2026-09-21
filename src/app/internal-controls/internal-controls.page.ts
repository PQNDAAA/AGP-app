import {Component, inject, OnInit} from '@angular/core';
import {
  InternalControlEntry,
  internalControlEntryDefaultSettings,
} from "../interface/internal-control-entry";
import {InternalControlsService} from "../services/internal-controls-service";
import {ModalController} from "@ionic/angular";
import {FormulaireModalComponent} from "../formulaire-modal/formulaire-modal.component";
import {PdfExport} from "../services/pdf-export/pdf-export";

@Component({
  selector: 'app-internal-controls',
  templateUrl: './internal-controls.page.html',
  styleUrls: ['./internal-controls.page.scss'],
  standalone: false
})
export class InternalControlsPage {

  internalControlEntry: InternalControlEntry = internalControlEntryDefaultSettings();

  private icService = inject(InternalControlsService);
  private modalController = inject(ModalController);
  private pdfExportService = inject(PdfExport);

  constructor() {
  }

  async addModal(){
    const modal = await this.modalController.create({
      component: FormulaireModalComponent,
      componentProps: {
        internalControlEntry: this.internalControlEntry,
        isEdit: false
      }
    });
    await modal.present();
  }

  async exportDocument(){
    await this.pdfExportService.exportDocument();
  }

// NOM FONCTION A CHANGER
  get numberOfIC() {
    return this.icService.icsLength;
  }
}
