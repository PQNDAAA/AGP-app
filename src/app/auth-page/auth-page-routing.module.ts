import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPagePage } from './auth-page.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPagePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../login-page/login-page.module').then(m => m.LoginPagePageModule),
      },
      {
        path: 'register',
        loadChildren: () => import('../register-page/register-page.module').then(m => m.RegisterPagePageModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPagePageRoutingModule {}
