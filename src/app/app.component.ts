import {Component, inject, OnInit} from '@angular/core';
import {InternalControlsService} from "./services/internal-controls-service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  private internalControlsService = inject(InternalControlsService);

  constructor() {
  }
}
