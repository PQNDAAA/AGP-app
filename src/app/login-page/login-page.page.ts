import {Component, inject, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {LoginCredentials} from "../interface/login-credentials";
import {NavController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {InternalControlsService} from "../services/internal-controls-service";
import {Api} from "../services/api/api";
import {firstValueFrom} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../services/auth/auth-service";

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
  private authService = inject(AuthService);

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
        this.authService.isLoggedIn.set(true);
        const storage = this.credentials.rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', result.data); //On stocke le token dans le storage
        await this.navCtrl.navigateForward('/login-animation', { replaceUrl: true });
      }
    } catch (e: any) {
      if(e instanceof HttpErrorResponse && e.status === 401) {
        this.errorMessage = e.error.message;
      }
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
