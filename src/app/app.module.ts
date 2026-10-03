import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthInterceptor} from "./services/http-interceptor/auth.interceptor";
import {Api} from "./services/api/api";
import {firstValueFrom} from "rxjs";
import {AuthService} from "./services/auth/auth-service";

export function checkToken(auth: AuthService){
  return async () =>
    await auth.checkToken();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CommonModule,HttpClientModule],
  providers: [
    {provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},
    {provide: APP_INITIALIZER,
    useFactory: checkToken,
    deps: [AuthService],
    multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
