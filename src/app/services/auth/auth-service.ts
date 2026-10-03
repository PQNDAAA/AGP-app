import {inject, Injectable} from '@angular/core';
import {Api} from "../api/api";
import {firstValueFrom} from "rxjs";
import {NavController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api = inject(Api);
  private navCtrl = inject(NavController);


  async checkToken() {
    try {
      await firstValueFrom(this.api.me());
    } catch (e) {
      if(e instanceof HttpErrorResponse && e.status === 401){
        localStorage.removeItem('token');
        await this.navCtrl.navigateRoot('/auth');
      }
    }
  }

}
