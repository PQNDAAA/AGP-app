import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'internal-controls',
    loadChildren: () => import('./internal-controls/internal-controls.module').then( m => m.InternalControlsPageModule)
  },
  {
    path: 'login-animation',
    loadChildren: () => import('./login-animation/login-animation.module').then( m => m.LoginAnimationPageModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-page/auth-page.module').then( m => m.AuthPagePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
