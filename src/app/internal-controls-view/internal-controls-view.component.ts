import {Component, inject, Input, OnInit} from '@angular/core';
import {AlertController, IonicModule, ModalController} from "@ionic/angular";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormSegment, formSegmentDefaultSettings} from "../interface/form-segment";
import {InternalControlEntry} from "../interface/internal-control-entry";
import {InternalControlsService} from "../services/internal-controls-service";
import {Observable} from "rxjs";
import {FormulaireModalComponent} from "../formulaire-modal/formulaire-modal.component";

@Component({
  selector: 'app-internal-controls-view',
  templateUrl: './internal-controls-view.component.html',
  styleUrls: ['./internal-controls-view.component.scss'],
  imports: [
    IonicModule,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  standalone: true
})
export class InternalControlsViewComponent  implements OnInit {

  internalControls$: Observable<InternalControlEntry[]>;

  segmentList: FormSegment[] = formSegmentDefaultSettings();

  private modalController = inject(ModalController);
  private icService = inject(InternalControlsService);
  private alertController = inject(AlertController);

  constructor() {
    this.internalControls$ = this.icService.internalControls$;
  }

  ngOnInit() {}

  async openEditingModal(internalControl: InternalControlEntry) {
    const modal = await this.modalController.create({
      component: FormulaireModalComponent,
      componentProps: {
        internalControlEntry: internalControl,
        isEdit: true,
      }
    });
    await modal.present();
  }

  async openDeleteModal(targetInternalControl: InternalControlEntry){
    const alert = await this.alertController.create({
      header: 'Supprimer le contrôle interne',
      message: 'Êtes-vous sûr de vouloir supprimer ce contrôle interne ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          role: 'delete',
          handler: async () =>
            await this.deleteInternalControl(targetInternalControl),
        }
      ]
    });
    await alert.present();
  }

  async deleteInternalControl(internalControl: InternalControlEntry) {
    await this.icService.deleteInternalControl(internalControl);
  }

}
