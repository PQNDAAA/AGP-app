import {Component, inject, OnInit} from '@angular/core';
import {RegisterCredentials} from "../interface/register-credentials";
import {NavController} from "@ionic/angular";
import {Api} from "../services/api/api";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: false
})
export class RegisterPagePage implements OnInit {

  private navCtrl = inject(NavController);
  private api = inject(Api);

  credentials: RegisterCredentials = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  async register(){
    try {
      const result = await firstValueFrom(this.api.register(this.credentials));

      if(result.success){
        await this.navCtrl.navigateRoot("/auth");
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  async backToLogin(){
    await this.navCtrl.navigateBack("/auth")
  }

}
