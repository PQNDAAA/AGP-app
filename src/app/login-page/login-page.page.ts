import {Component, inject, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoginCredentials} from "../interface/login-credentials";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: false
})
export class LoginPagePage implements OnInit {

  credentials: LoginCredentials = {
    email: '',
    password: '',
    rememberMe: false
  };

  isSubmitting = false;
  errorMessage = '';

  private navCtrl = inject(NavController);

  constructor() { }

  ngOnInit() {
  }

  async login(form: NgForm) {
    if (!form.valid || this.isSubmitting) return;
    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      await this.navCtrl.navigateForward('/login-animation');
    } catch (e) {
      this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
    } finally {
      this.isSubmitting = false;
    }
  }

  forgotPassword() {
  }

}
