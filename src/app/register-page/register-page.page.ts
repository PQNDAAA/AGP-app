import {Component, inject, OnInit} from '@angular/core';
import {RegisterCredentials} from "../interface/register-credentials";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: false
})
export class RegisterPagePage implements OnInit {

  private navCtrl = inject(NavController);

  credentials: RegisterCredentials = {
    email: '',
    password: ''
  };

  constructor() { }

  ngOnInit() {
  }

  async backToLogin(){
    await this.navCtrl.navigateBack("/auth")
  }

}
