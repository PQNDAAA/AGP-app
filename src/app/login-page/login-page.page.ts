import {Component, inject, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoginCredentials} from "../interface/login-credentials";
import {NavController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {InternalControlsService} from "../services/internal-controls-service";
import {Api} from "../services/api/api";
import {firstValueFrom} from "rxjs";

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
  private api = inject(Api);
  private internalControlsService = inject(InternalControlsService);

  constructor() { }

  ngOnInit() {
  }

  async login(form: NgForm) {
    if (!form.valid || this.isSubmitting) return;
    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      const result = await firstValueFrom(this.api.login(this.credentials));

      if(result.success){
        localStorage.setItem('token', result.data); //On stocke le token dans le local storage
        await this.navCtrl.navigateForward('/login-animation');
      }
    } catch (e) {
      console.error('Une erreur est survenue lors de la connexion :',e);
    } finally {
      this.isSubmitting = false;
    }
  }

  forgotPassword() {
  }

  async goToRegister(){
    await this.navCtrl.navigateForward('auth/register');
  }

}
