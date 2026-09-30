import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPagePageRoutingModule } from './login-page-routing.module';

import { LoginPagePage } from './login-page.page';
import {FooterAppComponent} from "../footer-app/footer-app.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPagePageRoutingModule,
        FooterAppComponent
    ],
  declarations: [LoginPagePage]
})
export class LoginPagePageModule {}
