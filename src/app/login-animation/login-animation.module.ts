import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginAnimationPageRoutingModule } from './login-animation-routing.module';

import { LoginAnimationPage } from './login-animation.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginAnimationPageRoutingModule
  ],
  declarations: [LoginAnimationPage]
})
export class LoginAnimationPageModule {}
