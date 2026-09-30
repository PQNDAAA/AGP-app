import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAnimationPage } from './login-animation.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAnimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAnimationPageRoutingModule {}
