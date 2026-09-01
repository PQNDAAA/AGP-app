import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
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

  constructor() { }

  ngOnInit() {}

}
