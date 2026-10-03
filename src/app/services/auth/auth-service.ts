import {inject, Injectable} from '@angular/core';
import {Api} from "../api/api";
import {firstValueFrom} from "rxjs";
import {NavController} from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = inject(Api);
  private navCtrl = inject(NavController);


  async checkToken() {
    try {
      await firstValueFrom(this.api.me());
      await this.navCtrl.navigateRoot('/home');
    } catch (e) {
      //401 : déjà géré par l'interceptor (suppression du token + redirection)
    }
  }

  async disconnect() {
    localStorage.removeItem('token');
    await this.navCtrl.navigateRoot('/auth');
  }
}
