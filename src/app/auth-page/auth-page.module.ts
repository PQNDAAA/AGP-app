import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPagePageRoutingModule } from './auth-page-routing.module';

import { AuthPagePage } from './auth-page.page';
import {FooterAppComponent} from "../footer-app/footer-app.component";
import {LoginBrandComponent} from "../login-brand/login-brand.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPagePageRoutingModule,
    FooterAppComponent,
    LoginBrandComponent
  ],
  declarations: [AuthPagePage]
})
export class AuthPagePageModule {}
