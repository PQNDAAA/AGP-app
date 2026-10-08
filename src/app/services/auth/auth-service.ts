import {inject, Injectable, signal} from '@angular/core';
import {Api} from "../api/api";
import {firstValueFrom} from "rxjs";
import {NavController} from "@ionic/angular";
import {InternalControlsService} from "../internal-controls-service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = inject(Api);
  private navCtrl = inject(NavController);
  private internalControlsService = inject(InternalControlsService);

  readonly isLoggedIn = signal(false);

  constructor() {}

  async checkToken() {
    try {
      await firstValueFrom(this.api.me());
      this.isLoggedIn.set(true);
    } catch (e) {
      this.isLoggedIn.set(false);
      //401 : déjà géré par l'interceptor (suppression du token + redirection)
    }
  }

  async disconnect() {
    this.isLoggedIn.set(false);
    this.internalControlsService.clearInternalControls();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    await this.navCtrl.navigateRoot('/auth', { replaceUrl: true });
  }
}
