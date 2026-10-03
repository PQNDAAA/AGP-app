import {Component, inject, OnInit} from '@angular/core';
import {InternalControlsService} from "../services/internal-controls-service";
import {AuthService} from "../services/auth/auth-service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  private internalControlsService = inject(InternalControlsService);
  private authService = inject(AuthService);

  constructor() {
  }

  async ngOnInit() {
    await this.initApp();
  }

  async initApp() {
    console.log('Initializing App...');
    await this.internalControlsService.initInternalControls();
  }

  async disconnect() {
    await this.authService.disconnect();
  }

}
