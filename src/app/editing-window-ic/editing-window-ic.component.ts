import {Component, Input, OnInit,inject} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {InternalControlEntry} from "../interface/internal-control-entry";

@Component({
  selector: 'app-editing-window-ic',
  templateUrl: './editing-window-ic.component.html',
  styleUrls: ['./editing-window-ic.component.scss'],
  imports: [
    IonicModule
  ]
})
export class EditingWindowICComponent  implements OnInit {

  @Input() internalControl!: InternalControlEntry;

  private modalController = inject(ModalController);

  constructor() { }

  ngOnInit() {}

  async dismissModal(){
    await this.modalController.dismiss()
  }

}
