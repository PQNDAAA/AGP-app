import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {authGuard, guestGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'internal-controls',
    loadChildren: () => import('./internal-controls/internal-controls.module').then( m => m.InternalControlsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login-animation',
    loadChildren: () => import('./login-animation/login-animation.module').then( m => m.LoginAnimationPageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-page/auth-page.module').then( m => m.AuthPagePageModule),
    canActivate: [guestGuard]
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, canceledNavigationResolution: 'computed' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
