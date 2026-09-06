import {Component, inject, OnInit} from '@angular/core';
import {InternalControlsService} from "./services/internal-controls-service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  private internalControlsService = inject(InternalControlsService);

  constructor() {
  }

  async ngOnInit() {
    await this.initApp();
  }

  async initApp() {
    console.log('Initializing App...');
    await this.internalControlsService.initInternalControls();
  }
}
