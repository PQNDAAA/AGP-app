import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
    selector: 'app-footer-app',
    templateUrl: './footer-app.component.html',
    styleUrls: ['./footer-app.component.scss'],
    imports: [
        IonicModule
    ]
})
export class FooterAppComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
